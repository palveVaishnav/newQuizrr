"use client"
import { PackDetails } from "@/components/PackDetails"
import { packToView } from "@/state/pack"
import { useParams, useRouter } from "next/navigation"
import { useRecoilValue } from "recoil"

export default function Packs() {
    const { id } = useParams()
    const router = useRouter()
    const pack = useRecoilValue(packToView(id))
    if (!pack) {
        router.push('/home');
        return
    }

    return (
        <div className="mt-20">
            {/* how to solve this type error, have use undefined at the top for now */}
            <PackDetails {...pack} />
        </div >
    )
}
