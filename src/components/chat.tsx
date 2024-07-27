"use client";

import { initialMessages } from "@/lib/utils";
import { ChatLine } from "./chat-line";
import { useChat, Message } from "ai/react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect, useRef } from "react";
import { Spinner } from "./ui/spinner";

type Props = {
    path: string;
    userMessage: string;
}

export function Chat({ path, userMessage }: Props) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const submitButtonRef = useRef<HTMLButtonElement | null>(null);

    const { messages, input, handleInputChange, handleSubmit, setMessages, setInput, isLoading } =
        useChat({
            api: "/api/chat",
            body: {
                path: path,
            },
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
        if (userMessage && userMessage.trim() !== '') {
            setInput(userMessage);
            console.log("User Message", userMessage);

            setTimeout(() => {
                if (submitButtonRef.current) {
                    submitButtonRef.current.click();
                }
            }, 0);
        }

        userMessage = '';
    }, [userMessage, setInput]);

    return (
        <div className="rounded-2xl w-full border  h-[85vh] flex flex-col justify-between">
            <div className="p-6 overflow-auto" ref={containerRef}>
                {messages.map(({ id, role, content, annotations }: Message, index: number) => (
                    <ChatLine
                        key={id}
                        role={role}
                        content={content}
                        annotations={annotations}
                        isLastMessage={index === messages.length - 1}
                    />
                ))}
            </div>

            <form onSubmit={handleSubmit} className="p-4 flex clear-both">
                <Input
                    value={input}
                    placeholder={"Escribe tu pregunta a " + path}
                    onChange={handleInputChange}
                    className="mr-2"
                />

                <Button type="submit" className="w-24" ref={submitButtonRef}>
                    {isLoading ? <Spinner /> : "Ask"}
                </Button>

            </form>
        </div>
    );
}