"use client";

import { initialMessages } from "@/lib/utils";
import { ChatLine } from "./chat-line";
import { useChat, Message } from "ai/react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect, useRef, useState } from "react";
import { Spinner } from "./ui/spinner";

export function Chat({ path }: { path: String }) {
    const containerRef = useRef<HTMLDivElement | null>(null);

    const { messages, input, handleInputChange, handleSubmit, setMessages, isLoading } =
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
                console.log("API Response:", data);
                setMessages(data.messages);
            },
        });

    console.log("Mensajes desde Chat: ", messages)
    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [messages]);

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
                    placeholder={"Type to chat with AI..."}
                    onChange={handleInputChange}
                    className="mr-2"
                />

                <Button type="submit" className="w-24">
                    {isLoading ? <Spinner /> : "Ask"}
                </Button>
            </form>
        </div>
    );
}