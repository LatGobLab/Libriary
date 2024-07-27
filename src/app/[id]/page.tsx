"use client"
import React, { useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { Chat } from '@/components/chat';
import PDFViewer from '@/components/pdf/PDFViewer';
import { companies } from '@/components/const/companies';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';


export default function page() {

    const pathname = usePathname();
    const searchParams = useSearchParams();

    const pathformatted = pathname.split('/').pop() ?? '';
    const queryParam = searchParams.get('query') ?? '';

    console.log("Dynamic Param: ", pathformatted);
    console.log("Query Param: ", queryParam);


    const company = companies.find(company => company.id === pathformatted);

    const [selectBook, setSelectBook] = useState<string | null>(company?.books?.[0] ?? null);

    function handleBook(book: string) {
        setSelectBook(book)
    }


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
                    <Chat path={pathformatted} userMessage={queryParam} />
                </div>
            </ResizablePanel>
        </ResizablePanelGroup>
    )
}
