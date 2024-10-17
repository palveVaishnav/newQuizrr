"use client"
import React, { useEffect } from 'react';
import axios from 'axios';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { ProviderUser } from '@/state/user';
import { UserAtom } from '@/state/user'; // Import the new user atom
import RightPanel from '@/components/Rightpanel';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Layout({
    children
}: {
    children: JSX.Element
}) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const user = useRecoilValue(ProviderUser);
    const setUser = useSetRecoilState(UserAtom); // Create a setter for the user atom

    useEffect(() => {
        // Send the POST request when the component mounts or when the user state changes
        const sendUserData = async () => {
            try {
                const response = await axios.post(`${process.env.BACKEND_URL}/api/getuser`, user, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                console.log('User data sent successfully:', response.data);

                // Store the user data in the user atom
                setUser(response.data.user);
            } catch (error) {
                console.error('Failed to send user data:', error);
            }
        };

        // Only send the request if the user data is populated
        if (user.providerId) {
            sendUserData();
        }
    }, [user, setUser]); // Re-run the effect if the user state changes
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
