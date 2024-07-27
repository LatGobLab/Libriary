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
        <div className="flex flex-col items-center justify-between h-[90vh]">
            <div className="flex items-center space-x-4 mt-10">
                <div>
                    <img
                        src={`/assets/latgoblab.png`}
                        alt="Company Logo"
                        width={300}
                        height={200}
                        className="object-cover"
                    />
                </div>
                <div className="text-center">
                    <div className="flex items-center space-x-2">
                        <h1 className="text-4xl font-bold">Hola,</h1>
                        <p className="text-sm">soy un asistente dedicado a las ciudades</p>
                    </div>
                    <h2 className="mt-8 text-4xl font-bold tracking-tighter text-foreground">¿Cómo puedo ayudarte?</h2>
                </div>
            </div>

            <div className="flex w-full max-w-screen-md items-center space-x-2">
                <PlaceholdersAndVanishInput
                    placeholders={placeholders}
                    onChange={handleInputChange}
                    onSubmit={handleSubmit} />
            </div>

            {/* <form onSubmit={handleSubmit} className="p-4 flex clear-both w-full items-center justify-center">

                <div className="flex w-full max-w-screen-md items-center space-x-2">
                    <Input type="text"
                        placeholder="Escribe tu pregunta a la IA"
                        value={inputValue}
                        onChange={handleInputChange} />

                    <Button type="submit" className='px-10'>Pregunta</Button>
                </div> 
            </form>*/}

        </div>
    )
}

export default App