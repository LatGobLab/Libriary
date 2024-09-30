"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { books } from "@/components/const/books";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { placeholders } from "@/components/const/placeholders";
import { BackgroundGradient } from "@/components/ui/background-gradient";

type Book = {
  id: string;
  name: string;
  autor?: string;
  description: string;
  img: string | null;
  book: string;
  author: string;
  publicationYear: string;
  placeholders?: string[];
};

const BookItem: React.FC<{ book: Book }> = ({ book }) => (
  <div className="bg-background rounded-lg shadow-lg overflow-hidden group cursor-pointer">
    <Sheet>
      <SheetTrigger className="group block w-full">
        <div className="relative h-60 md:h-96 overflow-hidden">
          <img
            src={`/images/${book.img}`}
            alt={`${book.name} Logo`}
            className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <h3 className="text-white text-xl font-semibold">{book.name}</h3>
          </div>
        </div>
      </SheetTrigger>

      <SheetContent className="w-10/12 sm:w-7/12 md:w-7/12 lg:w-4/12 flex flex-col h-full !p-0">
        <div className="flex flex-col h-full overflow-hidden">
          <SheetHeader className="p-6 pb-2">
            <SheetTitle className="pt-5 text-center">{book.name}</SheetTitle>
          </SheetHeader>
          <div className="flex-grow overflow-y-auto p-6 pt-2">
            {/* Ajuste para diseño responsivo */}
            <div className="flex flex-col md:flex-row mb-4">
              <div className="w-full md:w-1/2 pr-2">
                <img
                  src={`/images/${book.img}`}
                  alt="Book Cover"
                  className="object-cover w-full h-auto"
                />
              </div>
              <div className="w-full md:w-1/2 pl-2 mt-4 md:mt-0">
                <SheetDescription>{book.description}</SheetDescription>
              </div>
            </div>
            <div className="mt-4 border-t pt-4">
              <p className="text-lg">
                <strong>Autor:</strong> {book.author}
              </p>
              <p className="text-lg">
                <strong>Año de publicación:</strong> {book.publicationYear}
              </p>
            </div>
          </div>
          <SheetFooter className="p-6 pt-2 mt-auto">
            <Link href={`${book.id}`} className="w-full">
              <Button className="w-full">Chatear</Button>
            </Link>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  </div>
);

const BooksGrid: React.FC<{ books: Book[]; title?: string }> = ({
  books,
  title,
}) => (
  <>
    <p className="text-3xl font-bold tracking-tight mb-6">{title}</p>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12">
      {books.map((book) => (
        <BookItem key={book.id} book={book} />
      ))}
    </div>
  </>
);

const Books: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredWorkspaces, setFilteredWorkspaces] = useState<Book[]>(books);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredWorkspaces(books);
    } else {
      const normalizedSearchTerm = searchTerm
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      const filtered = books.filter((book) => {
        const normalizedName = book.name
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");
        return normalizedName.includes(normalizedSearchTerm);
      });
      setFilteredWorkspaces(filtered);
    }
  }, [searchTerm]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("searchTerm", searchTerm);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <BackgroundGradient />

      <div className="relative z-10">
        <div className="w-full max-w-6xl mx-auto px-4 py-8 md:px-6 md:py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-8">
            <div className="flex flex-col items-center md:items-center">
              <h1 className="text-3xl font-bold tracking-tight">Bienvenido</h1>
              <p className="text-muted-foreground mt-2">
                Explora nuestra biblioteca
              </p>
            </div>
            <div className="w-full md:w-1/2">
              <p className="text-muted-foreground mb-3 text-center">
                Busca por el nombre del libro
              </p>
              <PlaceholdersAndVanishInput
                placeholders={placeholders}
                onChange={(e) => setSearchTerm(e.target.value)}
                onSubmit={handleSubmit}
              />
            </div>
          </div>
        </div>

        <main className="container mx-auto py-3 px-4 md:px-6">
          <div className="mt-12">
            <BooksGrid books={filteredWorkspaces} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Books;
