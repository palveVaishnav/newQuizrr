"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import { useRouter } from "next/navigation";
import { ProviderUser } from "@/state/user";
import axios from "axios";
import { packType } from "@/types/pack";
import { AllPacks } from "@/components/PackCard";

export default function Home() {
    const { data: session, status } = useSession();
    const [user, setUser] = useRecoilState(ProviderUser);
    const [packs, setPacks] = useState<packType[]>([]);
    const router = useRouter();

    useEffect(() => {
        const getPacks = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/packs`);
                console.log(response.data);
                setPacks(response.data);
            } catch {
                console.log("Failed to fetch packs");
            }
        };
        if (session && session.user) {
            // Store the session data in Recoil state
            setUser({
                providerId: session.user.id || "",
                name: session.user.name || "",
                email: session.user.email || "",
                picture: session.user.image || "",
            });
            getPacks();
        }
    }, [session, setUser]);

    if (status === "loading") {
        return <p>Loading...</p>;
    }

    if (!session) {
        router.push("/");
        return null;
    }

    return (
        <div className="mt-10">
            <span className="text-3xl font-bold">Hello, {user.name}</span>
            <p className="text-md">Welcome Back! All the best because #phodnahai </p>
            <h2 className="mt-10">
                {packs.length === 0 ? "You Dont Have any Packs!!" : "Available Packs:"}
            </h2>
            {packs.length > 0 && <AllPacks packs={packs} />}
        </div>
    );
}
