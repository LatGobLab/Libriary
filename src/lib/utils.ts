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
      "Hola, soy su asistente de PDF. Estaré encantado de ayudarte con tus preguntas sobre tus PDF. ¿En qué puedo ayudarle hoy?",
  },
];

