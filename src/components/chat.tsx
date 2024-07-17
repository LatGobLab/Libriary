"use client";

import { scrollToBottom, initialMessages } from "@/lib/utils";
import { ChatLine } from "./chat-line";
import { useChat, Message } from "ai/react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect, useRef } from "react";
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
                const api = await response.json();
                console.log("API Response:", api);
                setMessages(api);
            },
        });

    console.log("Mensajes desde Chat: ", messages);

    useEffect(() => {
        setTimeout(() => scrollToBottom(containerRef), 100);
    }, [messages]);

    return (
        <div className="rounded-2xl border h-[75vh] flex flex-col justify-between">
            <div className="p-6 overflow-auto" ref={containerRef}>
                {messages.map(({ id, role, content }: Message, index: number) => (
                    <ChatLine
                        key={id}
                        role={role}
                        content={content}
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