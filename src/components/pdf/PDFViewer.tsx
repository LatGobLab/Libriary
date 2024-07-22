import React from 'react'

type Promps = {
    path: string,
    document: string | null
}

function PDFViewer({ path, document }: Promps) {
    console.log(path, document)

    try {
        return (
            <iframe src={`https://firebasestorage.googleapis.com/v0/b/libriary-latgoblab.appspot.com/o/${path}%2F${document}.pdf?alt=media&token=46e687b3-063b-4aa1-af5e-860ffe88147d`} className='w-full h-[85vh]' style={{ border: 'none' }}></iframe>
        )
    } catch (error) {
        console.log(error)
    }
}

export default PDFViewer