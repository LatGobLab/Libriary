"use client"
import React from 'react'
import { usePathname } from 'next/navigation';
import { Chat } from '@/components/chat';
import initPineconeClient from '@/lib/pinecone-client';
import { Button } from '@/components/ui/button';
import langchain from '@/lib/langchain';

export default function page() {
    const pathname = usePathname();

    const pineconeClient = initPineconeClient();

    const handler = async () => {
        const result = await langchain();
        console.log(result);
    }

    return (
        <div className="flex flex-1 py-4">
            <div className="w-full">
                <Button onClick={() => handler()}>Get Similar Items</Button>
            </div>
        </div>
    )
}
