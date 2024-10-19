"use client"
import { Button } from "@/components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn } from 'next-auth/react';


export function Menu() {

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        // Function to handle scroll
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            // Change background to white after scrolling 50px
            setIsScrolled(scrollTop > 50);
        };

        // Attach scroll event listener
        window.addEventListener("scroll", handleScroll);

        // Cleanup on component unmount
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    return (
        <header className={`container mx-auto flex items-center justify-between px-60 w-full mix-blend-difference ${isScrolled ? 'bg-white' : 'text-white'}`}>
            <div className="flex items-center h-20 w-40">
                <Image
                    alt="logo"
                    src="/logo.png"
                    className="mix-blend-difference"
                    width={120}
                    height={50}
                />
            </div>
            <nav className="hidden md:flex space-x-6 font-semibold items-center">
                <a href="/" className="">
                    Home
                </a>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <a href="#" className="">
                                Test Series
                            </a>
                        </TooltipTrigger>
                        <TooltipContent className="bg-white text-black grid gap-4">
                            {Array.from({ length: 6 }, (_, idx) => (
                                <Button variant={'ghost'}
                                    key={idx}
                                    className="w-40">
                                    Jee Mock Test 1
                                </Button>
                            ))}
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <a href="#" className="">
                    For Institutes
                </a>
                <a href="#" className="">
                    Contact Us
                </a>
                <button
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                    // I forgot why i used /dashboard, there is no actual /dashboard route. does it also consider () folders
                    onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
                >
                    Login
                </button>
            </nav>
        </header>
    )
}
