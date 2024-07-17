"use client"
import React from 'react'
import { usePathname } from 'next/navigation';
import { Chat } from '@/components/chat';
import initPineconeClient from '@/lib/pinecone-client';
import { Button } from '@/components/ui/button';
import langchain from '@/lib/langchain';

function formatPath(pathname: string) {
    return pathname.startsWith('/') ? pathname.slice(1) : pathname;
}

export default function page() {

    const pathname = usePathname();

    const pathformatted = formatPath(pathname);

    return (
        <div className="flex content-between py-4">
            <div className="w-full">
                <Chat path={pathformatted} />
            </div>
        </div>
    )
}