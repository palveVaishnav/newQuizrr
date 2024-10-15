"use client"

import { examAtom } from "@/state/test"
import { useRecoilState } from "recoil"

export default function TheTest() {
    const [exam, setExam] = useRecoilState(examAtom)
    return (
        <div>
            Test Interface
            {exam ? (
                <div>
                    <h2>{exam.title}</h2>
                    <p>Number of Sections: {exam.sections?.length || 0}</p>
                    {/* You can render more test-specific information here */}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}