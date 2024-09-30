"use client";

import { initialMessages } from "@/lib/utils";
import { ChatLine } from "./chat-line";
import { useChat, Message } from "ai/react";

import { useEffect, useRef, useState } from "react";

import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";

type Props = {
  userMessage: string;
  placeholders?: string[];
};

export function Chat({ userMessage, placeholders }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const submitButtonRef = useRef<HTMLButtonElement | null>(null);
  const [isUserMessageUsed, setIsUserMessageUsed] = useState(false);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setMessages,
    setInput,
    isLoading,
  } = useChat({
    api: "/api/chat",
    initialMessages,
    onResponse: async (response) => {
      if (!response.ok) {
        console.error("Error en la respuesta del API");
        return;
      }
      const data = await response.json();
      setMessages(data.messages);
    },
  });

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (userMessage && userMessage.trim() !== "") {
      setInput(userMessage);
      setIsUserMessageUsed(true);
      setTimeout(() => {
        if (submitButtonRef.current) {
          submitButtonRef.current.click();
        }
      }, 0);
    }
  }, [userMessage, setInput]);

  useEffect(() => {
    if (isLoading && isUserMessageUsed) {
      setIsUserMessageUsed(false);
    }
  }, [isLoading]);

  return (
    <div className=" w-full h-[99vh] flex flex-col">
      <div className="flex-grow p-6 overflow-auto" ref={containerRef}>
        {messages.map(
          ({ id, role, content, annotations }: Message, index: number) => (
            <ChatLine
              key={id}
              role={role}
              content={content}
              annotations={annotations}
              isLastMessage={index === messages.length - 1}
            />
          )
        )}
      </div>
      {isUserMessageUsed ? (
        <form onSubmit={handleSubmit} className="p-4 flex">
          <Input
            value={input}
            placeholder={"Escribe tu pregunta"}
            onChange={handleInputChange}
            className="mr-2"
          />
          <Button type="submit" className="w-24" ref={submitButtonRef}>
            {isLoading ? <Spinner /> : "Ask"}
          </Button>
        </form>
      ) : (
        <div className="p-4 flex">
          <PlaceholdersAndVanishInput
            placeholders={placeholders || ["Escribe tu pregunta"]}
            onChange={handleInputChange}
            onSubmit={handleSubmit}
          />
        </div>
      )}
    </div>
  );
}
