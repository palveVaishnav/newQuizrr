"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { packType } from "@/types/pack";
import { AllPacks } from "@/components/PackCard";

export default function Home() {
    const { data: session, status } = useSession();
    const [packs, setPacks] = useState<packType[]>([]);
    const router = useRouter();

    useEffect(() => {
        const getPacks = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8080/packs`);
                console.log(response.data);
                setPacks(response.data);
            } catch {
                console.log("Failed to fetch packs");
            }
        };
        getPacks();
    }, []);

    if (status === "loading") {
        return <p>Loading...</p>;
    }

    if (!session) {
        router.push("/");
        return null;
    }

    return (
        <div>
            <h1>Available Packs:</h1>
            {packs.length > 0 && <AllPacks packs={packs} />}
        </div>
    );
}
