"use client"
import React from 'react';
import RightPanel from '@/components/Rightpanel';

export default function Layout({
    children
}: {
    children: JSX.Element
}) {

    return (
        <div className="h-screen grid w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <RightPanel />
            <div className="flex flex-col h-screen overflow-y-scroll">
                {children}
            </div>
        </div>
    )
}
