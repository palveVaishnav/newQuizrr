"use client";
import { Button } from "@/components/ui/button";
import { allPacksSelector } from "@/state/pack";
import { packWithTests } from "@/types/pack";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";

export default function Home() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const packs: packWithTests[] = useRecoilValue(allPacksSelector)
    if (status === "loading") {
        return <p>Loading...</p>;
    }

    if (!session) {
        router.push("/");
        return null;
    }
    console.log(packs)
    return (
        <div>
            <h1>Available Packs:</h1>
            <div>
                {packs.length > 0 ? (
                    packs.map(pack => (
                        <div key={pack.id} className="border m-2">
                            <h3>{pack.title}</h3>
                            <ul>
                                {pack.tests.map(test => (
                                    <li key={test.id}>{test.title}</li>
                                ))}
                            </ul>
                            <Button
                                onClick={() =>
                                    router.push(`/packs/${pack.id}`)
                                }
                            >view Pack</Button>
                        </div>
                    ))
                ) : (
                    <div>Loading...</div>
                )}
            </div>
        </div>
    );
}
