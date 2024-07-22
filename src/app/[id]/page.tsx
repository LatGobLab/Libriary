"use client"
import React, { useState } from 'react'
import { usePathname } from 'next/navigation';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { Chat } from '@/components/chat';
import PDFViewer from '@/components/pdf/PDFViewer';
import { companies } from '@/lib/const';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

function formatPath(pathname: string) {
    return pathname.startsWith('/') ? pathname.slice(1) : pathname;
}


export default function page() {

    const pathname = usePathname();
    const pathformatted = formatPath(pathname);

    const company = companies.find(company => company.id === pathformatted);


    const [selectBook, setSelectBook] = useState<string | null>(company?.books?.[0] ?? null);

    function handleBook(book: string) {
        setSelectBook(book)
    }

    console.log(selectBook)


    console.log(company?.books)

    return (
        <ResizablePanelGroup
            direction="horizontal"
            className=" border">

            <ResizablePanel defaultSize={13}>
                <ScrollArea className="h-[90vh] rounded-md border">
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
            <ResizablePanel defaultSize={40}>
                <div className="flex items-center justify-center p-6">
                    <PDFViewer path={pathformatted} document={selectBook || ''} />
                </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={47}>
                <div className="flex items-center justify-center p-6">
                    <Chat path={pathformatted} />
                </div>
            </ResizablePanel>
        </ResizablePanelGroup>
    )
}
