import { NextRequest, NextResponse } from "next/server";
import { Message } from "ai";

const formatMessage = (message: Message) => {
    return `${message.role === "user" ? "User" : "Assistant"}: ${message.content}`;
};

export async function POST(req: NextRequest) {
    const { messages, path } = await req.json();

    console.log("mensaje: ", messages);

    const formattedMessages = messages.map(formatMessage);
    console.log("formattedMessages: ", formattedMessages);

    return NextResponse.json({ messages: formattedMessages });
}