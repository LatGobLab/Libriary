import React from "react";

function PDFViewer({ document }: { document: string | null }) {
  try {
    return (
      <iframe
        src={`https://rgijszbvkbxtzvzfrduf.supabase.co/storage/v1/object/public/Biblio/latgoblab/${document}.pdf`}
        className="w-full h-full"
        style={{ border: "none" }}
      ></iframe>
    );
  } catch (error) {
    console.log(error);
  }
}

export default PDFViewer;
