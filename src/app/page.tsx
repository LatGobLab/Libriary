"use client";

import { PlaceholdersAndVanishInput } from '@/components/ui/placeholders-and-vanish-input';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { placeholders } from '@/components/const/placeholders';


function App() {
    const [inputValue, setInputValue] = useState('');
    const router = useRouter();


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('inputValue', inputValue);
        router.push(`/amazon?query=${encodeURIComponent(inputValue)}`);
    };

    return (
        <>
            <a href="https://latgoblab.com/" className="flex pt-5 pl-5">
                <img src="https://latgob.school/pluginfile.php/1/core_admin/logocompact/300x300/1714967970/256x256.png" className="mr-3 h-6 sm:h-9" alt="latgoblab Logo" />
                <span className="self-center text-xl whitespace-nowrap ">Home: mensaje desde local</span>
            </a>

            <div className="flex flex-col items-center justify-center h-[90vh]">

                <div className="flex items-center">
                    <div className="text-center">
                        <div className="flex flex-col items-center">
                            <p className="text-xl text-zinc-400">¡Hola! Soy un agente especializado en</p>
                            <p className="text-xl text-zinc-400">literatura para el desarrollo</p>
                        </div>
                    </div>
                </div>

                <div className="flex w-full max-w-screen-md items-center mt-10">
                    <PlaceholdersAndVanishInput
                        placeholders={placeholders}
                        onChange={handleInputChange}
                        onSubmit={handleSubmit} />
                </div>

            </div>

        </>

    )
}

export default App