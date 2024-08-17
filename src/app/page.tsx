"use client";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { placeholders } from "@/components/const/placeholders";
import { Button } from "@/components/ui/button";
import { ArchiveIcon } from "@radix-ui/react-icons";
import Link from "next/link";

function shufflePlaceholders(array = placeholders) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function App() {
  const [inputValue, setInputValue] = useState("");
  const [shuffledPlaceholders, setShuffledPlaceholders] =
    useState(placeholders);
  const router = useRouter();

  useEffect(() => {
    setShuffledPlaceholders(shufflePlaceholders(placeholders));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/latgoblab?query=${encodeURIComponent(inputValue)}`);
  };

  return (
    <>
      {/* Enlace fijo en la parte superior izquierda */}
      <a
        href="https://latgoblab.com/"
        className="fixed top-0 left-0 flex items-center pt-5 pl-5 z-20"
      >
        <img
          src="https://latgob.school/pluginfile.php/1/core_admin/logocompact/300x300/1714967970/256x256.png"
          className="mr-3 h-6 sm:h-9"
          alt="latgoblab Logo"
        />
        <span className="self-center text-xl whitespace-nowrap">Home</span>
      </a>
      {/* Contenido centrado */}
      <div className="flex flex-col items-center justify-center w-full h-screen z-10">
        <div className="text-center">
          <div className="flex flex-col items-center">
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-zinc-400">
              ¡Hola! Soy un agente especializado en
            </p>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-zinc-400">
              literatura para el desarrollo
            </p>
          </div>
        </div>
        <div className="mt-10 w-80 sm:w-full max-w-screen-md">
          <PlaceholdersAndVanishInput
            placeholders={shuffledPlaceholders}
            onChange={handleInputChange}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
      <Link href="/libros">
        <Button
          variant="ghost"
          className="fixed bottom-5 right-5 z-20 w-36 h-12 text-sm md:bottom-5 md:right-5 md:top-auto md:left-auto top-3 "
        >
          <ArchiveIcon className="mr-2 h-4 w-4" /> Libros
        </Button>
      </Link>
    </>
  );
}

export default App;
