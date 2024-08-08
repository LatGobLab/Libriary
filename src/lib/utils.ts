import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Message } from "ai";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const initialMessages: Message[] = [
  {
    role: "assistant",
    id: "0",
    content:
      "Hola, soy su asistente ciudadano. Estaré encantado de ayudarte con tus preguntas sobre desarrollo en tu ciudad. ¿En qué puedo ayudarte hoy?",
  },
];

