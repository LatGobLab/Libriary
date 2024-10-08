"use client"
import React, { useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { Chat } from '@/components/chat';
import PDFViewer from '@/components/pdf/PDFViewer';
import { companies } from '@/components/const/companies';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';


export default function Page() {

    const searchParams = useSearchParams();

    const queryParam = searchParams.get('query') ?? '';


    const company = companies.find(company => company.id === "latgoblab");

    const [selectBook, setSelectBook] = useState<string | null>(company?.books?.[0] ?? null);

    function handleBook(book: string) {
        setSelectBook(book)
    }


    return (
        <ResizablePanelGroup
            direction="horizontal"
            className=" border">
            <ResizablePanel defaultSize={13} className="hidden lg:block">
                <ScrollArea className="h-full rounded-md border  ">
                    <div className="flex flex-col p-6 gap-4">
                        <div className="text-2xl font-bold mb-4 flex justify-center items-center">
                            <h2>{company?.name}</h2>
                        </div>
                        {company?.books.map((book, index) => (
                            <div key={index} className="flex w-full">
                                <Button
                                    {...(book === selectBook ? {} : { variant: "outline" })}
                                    onClick={() => handleBook(book)}
                                    className='w-full'>
                                    {book}
                                </Button>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </ResizablePanel>


            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={40} className="hidden lg:block">
                <div className="flex items-center justify-center h-full">
                        <PDFViewer document={selectBook || ''} />
                    </div>
                </ResizablePanel>


            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={47}>
                <div className="flex items-center justify-center h-full" >
                    <Chat userMessage={queryParam} />
                </div>
            </ResizablePanel>
        </ResizablePanelGroup>
    )
}
