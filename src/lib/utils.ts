import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { placeholders } from "@/components/const/placeholders";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  annotations?: any[]; // Ajusta esto según la estructura exacta de tus anotaciones
}

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

function shufflePlaceholders() {
  // Creamos una copia del array original para no modificarlo directamente
  const shuffled = [...placeholders];
  
  // Algoritmo de Fisher-Yates para revolver el array
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled;
}

 export const shuffledPlaceholders = shufflePlaceholders();

