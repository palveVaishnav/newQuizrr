"use client"
import { Button } from "@/components/ui/button"
import { packToView } from "@/state/pack"
import { currentTest } from "@/state/test"
import { useParams, useRouter } from "next/navigation"
import { useRecoilValue, useSetRecoilState } from "recoil"


export default function Packs() {
    const { id } = useParams()
    const pack = useRecoilValue(packToView(id))
    const router = useRouter()
    const setTest = useSetRecoilState(currentTest)
    return (
        <div className="mt-20">
            <span className="text-2xl font-bold">
                Details of Clicked pack:
            </span>
            <div className="">
                {pack?.title}
                {pack?.tests.map((test) => (
                    <>
                        <p key={test.id}>{test.title}</p>
                        <Button
                            onClick={() => {
                                setTest(test)
                                router.push(`/test/${test.id}`)
                            }}
                        >Attempt Now</Button >
                    </>
                ))}
            </div>
        </div >
    )
}