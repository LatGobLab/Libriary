import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'

export default function Contact() {
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

            <form className="p-4 flex clear-both w-full items-center justify-center">
                <div className="flex w-full max-w-screen-md items-center space-x-2">
                    <Input placeholder="Escribe tu pregunta a la IA " />
                    <Button type="submit" className='px-10'>Pregunta</Button>
                </div>
            </form>
        </div>
    )
}
