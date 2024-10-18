"use client"
import React from 'react';
import RightPanel from '@/components/Rightpanel';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Layout({
    children
}: {
    children: JSX.Element
}) {
    const { data: session, status } = useSession();
    const router = useRouter()
    if (status === "loading") {
        return <p>Loading...</p>;
    }
    if (!session) {
        router.push("/");
        return null;
    }
    return (
        <div className="h-screen grid w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <RightPanel />
            <div className="flex flex-col h-screen overflow-y-scroll">
                {children}
            </div>
        </div>
    )
}