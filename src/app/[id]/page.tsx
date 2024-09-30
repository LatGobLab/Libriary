"use client";
import React, { useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Chat } from "@/components/chat";
import PDFViewer from "@/components/pdf/PDFViewer";
import { books } from "@/components/const/books";

export default function Page() {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("query") ?? "";

  const pathname = usePathname();
  const pathformatted = pathname.split("/").pop() ?? "";

  const book = books.find((book) => book.id === pathformatted);

  return (
    <ResizablePanelGroup direction="horizontal" className=" border">
      <ResizablePanel defaultSize={50} className="hidden lg:block">
        <div className="flex items-center justify-center h-full">
          <PDFViewer path={pathformatted} document={book?.book || ""} />
        </div>
      </ResizablePanel>

      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>
        <div className="flex items-center justify-center h-full">
          <Chat userMessage={queryParam} placeholders={book?.placeholder} />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
