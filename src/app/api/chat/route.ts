import { NextRequest, NextResponse } from "next/server";
import langchain from "@/lib/langchain";

import { Message } from "ai/react";


export async function POST(req: NextRequest) {
    const { messages, path } = await req.json();

    const question = messages[messages.length - 1].content;

    const chatHistory: [string, string][] = [];
    let currentUserMessage = "";

    for (let i = 0; i < messages.length - 1; i++) {
        const message = messages[i];
        if (message.role === "user") {
            currentUserMessage = message.content;
        } else if (message.role === "assistant" && currentUserMessage) {
            chatHistory.push([currentUserMessage, message.content]);
            currentUserMessage = "";
        }
    }

    try {
        const result = await langchain({ question, chatHistory, path });


        const relevantDocuments = result.context.slice(0, 2);

        messages.push({
            id: Date.now().toString(),
            role: "assistant",
            content: result.answer,
            annotations: relevantDocuments
        });

        return NextResponse.json({
            messages: messages,
        });
    } catch (error) {
        console.error("Error en el API:", error);
        return NextResponse.json({ error: "Hubo un error al procesar la solicitud" }, { status: 500 });
    }

}