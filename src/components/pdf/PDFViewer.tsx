"use client";

import React from "react";
type Promps = {
  path: string;
  document: string | null;
};

function PDFViewer({ path, document }: Promps) {
  return (
    <iframe
      src={`/documents/${document}.pdf`}
      className="w-full h-full"
      style={{ border: "none" }}
    />
  );
}

export default PDFViewer;
