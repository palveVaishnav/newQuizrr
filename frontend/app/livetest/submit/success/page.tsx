import { Button } from "@/components/ui/button";
import { CircleCheckBig } from "lucide-react";
import Link from "next/link";

export default function Success() {
    return (
        <div className="grid h-screen place-content-center text-center">
            <span className="flex items-center text-[4em] gap-2">
                Test Submitted
                <CircleCheckBig className="text-green-500" size={48} />
            </span>
            <Link href={'/result'} >
                <Button>
                    View Leaderbaord
                </Button>
            </Link>
        </div>
    )
}
