"use client";
import PackCard from "@/components/PackCard";
import { Separator } from "@/components/ui/separator";
import { allPacksSelector } from "@/state/pack";
import { packWithTests } from '@/types/pack';
import { useRecoilValue } from "recoil";
export default function Home() {

    const packs: packWithTests[] = useRecoilValue(allPacksSelector)
    console.log(packs)
    return (
        <div className="mt-20">
            <span className="text-xl font-semibold">Available Packs:</span>
            <Separator />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-10">
                {packs.map((pack, index) => (
                    <PackCard key={index} {...pack} />
                ))}
            </div>
        </div >
    );
}
