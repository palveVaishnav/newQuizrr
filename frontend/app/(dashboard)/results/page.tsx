"use client"
import { allAttemptsAtom } from "@/state/results"
import { useRecoilValue } from "recoil"
import { LightbulbIcon } from "lucide-react"
import { Card } from "@/components/ui/card"
import Image from "next/image"

export default function ResultPage() {
    const allAttempts = useRecoilValue(allAttemptsAtom)
    // console.log(JSON.stringify(allAttempts))
    // Sort attempts by score in descending order

    const sortedAttempts = [...allAttempts].sort((a, b) => b.score - a.score)

    return (
        <div className="flex justify-center p-2">
            <div className="w-full overflow-hidden">
                <div className="mt-10">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-bold flex items-center">
                            <LightbulbIcon className="mr-2 text-orange-400" /> Test Leaderboard
                        </h2>
                    </div>
                    <div className="space-y-2">
                        {sortedAttempts.map((attempt, index) => (
                            <Card key={index} className="flex items-center border rounded-lg p-2">
                                <span className="w-8 text-center text-zinc-500">#{index + 1}</span>
                                <Image
                                    src={`https://avatar.iran.liara.run/public`}
                                    alt={`Rank ${index + 4}`} className="w-20 h-20 rounded-full mx-2"
                                    width={20}
                                    height={20}
                                />
                                <span className="flex-grow">{attempt.userId.split('@')[0]}</span>
                                <span className="text-green-500 font-bold mr-4">Score: {attempt.score}</span>
                                <span className="text-red-500">Mistakes: {attempt.mistakes.length}</span>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}