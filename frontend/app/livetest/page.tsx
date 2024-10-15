"use client"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function LiveTest() {
    const router = useRouter();

    return (
        <div>
            Some Instructions and sections details
            <Button
                // trigger exam fetch 
                onClick={() => {
                    router.push('/livetest/start')
                }}
            >
                Yes Start
            </Button>
            <Button>Go Back</Button>
        </div>
    )
}