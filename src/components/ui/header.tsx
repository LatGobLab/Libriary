"use client"
import { ModeToggle } from '@/components/dark-mode'
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation';

export default function Header() {
    const pathname = usePathname();

    return (
        <>
            <header>
                <nav className=" border-gray-200 px-4 lg:px-6 py-2.5">
                    <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                        <a href="https://latgoblab.com/" className="flex items-center">
                            <img src="https://latgob.school/pluginfile.php/1/core_admin/logocompact/300x300/1714967970/256x256.png" className="mr-3 h-6 sm:h-9" alt="latgoblab Logo" />
                            <span className="self-center text-xl font-semibold whitespace-nowrap ">Menu</span>
                        </a>
                        <div className="flex items-center lg:order-2">
                            <ModeToggle />
                        </div>
                        <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">

                            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                                <li>
                                    <Link
                                        href="/"
                                        className={`block py-2 pr-4 pl-3 rounded lg:bg-transparent lg:p-0 ${pathname === '/' ? ' font-semibold ' : 'text-gray-700 hover:text-primary-700'
                                            }`}
                                    >
                                        Principal
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/companies"
                                        className={`block py-2 pr-4 pl-3 border-b border-gray-100 lg:border-0 lg:p-0 ${pathname === '/companies' ? 'font-semibold' : 'text-gray-700 hover:text-primary-700'
                                            }`}
                                    >
                                        Compañías
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/Contact"
                                        className={`block py-2 pr-4 pl-3 border-b border-gray-100 lg:border-0 lg:p-0 ${pathname === '/Contact' ? 'font-semibold' : 'text-gray-700 hover:text-primary-700'
                                            }`}
                                    >
                                        Contacto
                                    </Link>
                                </li>
                            </ul>

                        </div>
                    </div>
                </nav>
            </header>
        </>
    )
}
