"use client"
import { Button } from '@/components/ui/button'
import Link from 'next/link';
import React from 'react'
import { useState } from "react";

type Company = {
    id: string
    name: string
    description: string
    img: string | null
}
export default function App() {
    const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

    const handleCompanyClick = (company: Company) => {
        setSelectedCompany(company)
    }
    const companies = [
        {
            id: "amazon",
            name: "Acme Inc.",
            description:
                "Acme Inc. is a leading provider of innovative products and services. With a focus on quality and customer satisfaction, Acme has been a trusted name in the industry for over 50 years.",
            img: "amazon.jpg",

        },
        {
            id: "google",
            name: "Globex Corp.",
            description:
                "Globex Corp. is a multinational conglomerate with a diverse portfolio of businesses. From technology to manufacturing, Globex is at the forefront of innovation and growth.",
            img: "google.jpg",

        },
        {
            id: "microsoft",
            name: "Stark Industries",
            description:
                "Stark Industries is a leading technology and defense company, known for its innovative products and cutting-edge research. Led by the visionary Tony Stark, Stark Industries is shaping the future.",
            img: "microsoft.png",

        },
        {
            id: "latgoblab",
            name: "Wayne Enterprises",
            description:
                "Wayne Enterprises is a diversified conglomerate with interests in technology, real estate, and philanthropy. Led by the enigmatic Bruce Wayne, the company is committed to making the world a better place.",
            img: "latgoblab.png",

        },

    ]
    return (
        <div>
            <main className="container mx-auto py-12 px-4 md:px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {companies.map((company) => (
                        <div
                            key={company.name}
                            className="bg-background rounded-lg shadow-lg overflow-hidden group cursor-pointer"
                            onClick={() => handleCompanyClick(company as Company)}
                        >
                            <div className="relative h-40 md:h-48">
                                <img
                                    src={`/assets/${company.img}`}
                                    alt="Company Logo"
                                    width={400}
                                    height={300}
                                    className="object-cover w-full h-full"
                                />
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <h3 className="text-white text-xl font-semibold">{company.name}</h3>
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-semibold group-hover:opacity-50 transition-opacity">{company.name}</h3>
                                <p className="text-muted-foreground text-sm line-clamp-2 group-hover:opacity-50 transition-opacity">
                                    {company.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
            {selectedCompany && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-background rounded-lg shadow-lg p-6 max-w-md w-full">
                        <h2 className="text-2xl font-bold mb-4">{selectedCompany.name}</h2>
                        <p className="text-muted-foreground">{selectedCompany.description}</p>
                        <div className="mt-4 flex justify-between">
                            <Button variant="outline" onClick={() => setSelectedCompany(null)}>
                                Close
                            </Button>
                            <Link href={`${selectedCompany.id}`}>
                                <Button>
                                    Ask {selectedCompany.id}
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}