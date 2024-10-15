"use client"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"


export function BeforeStart() {
    const router = useRouter();
    return (
        <div className="container mx-auto p-4">
            <header className="bg-blue-500 text-white p-4 mb-6">
                <h1 className="text-2xl font-bold">JEE MAIN 2023 24 JAN SHIFT 1 AS PER REDUCED SYLLABUS</h1>
            </header>

            <Card>
                <CardHeader>
                    <CardTitle>Important Instructions</CardTitle>
                    <p className="text-sm text-muted-foreground">Please read the instructions carefully</p>
                </CardHeader>
                <CardContent>
                    <h2 className="text-lg font-semibold mb-2">General Instructions:</h2>
                    <ol className="list-decimal pl-5 space-y-2 mb-4">
                        <li>Total duration of examination is 180 minutes.</li>
                        <li>The clock will be set at the server. The countdown timer in the top of the screen will display the remaining time available for you to complete the examination. When the timer reaches zero, the examination will end by itself. You will not be required to end or submit your examination.</li>
                        <li>The Question Palette displayed on the right side of screen will show the status of each question using one of the following symbols:</li>
                    </ol>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center space-x-2">
                            <span className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold p-2"
                            >
                                1
                            </span>
                            <span>{"Not Visited"} - You have not visited the question yet.</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="w-6 h-6 bg-red-500 flex items-center justify-center text-sm font-bold text-white p-2"
                                style={{
                                    clipPath: "polygon(0 0, 100% 0, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
                                }}
                            >
                                2
                            </span>
                            <span>{"Not Answered"} - You have not answered the question.</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="w-6 h-6 bg-green-500 flex items-center justify-center text-sm font-bold text-white p-2"
                                style={{
                                    clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 100% 100%, 0 100%, 0% 50%)",
                                }}
                            >
                                3
                            </span>
                            <span>{"Answered"} - You have answered the question.</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-sm font-bold text-white p-2">
                                4
                            </span>
                            <span>{"Marked for Review"} - You have NOT answered the question, but have marked the question for review.</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-sm font-bold text-white p-2">
                                5
                            </span>
                            <span>{"Answered and Marked for Review"} - The question(s) {"Answered and Marked for Review"} will be considered for evaluation.</span>
                        </div>
                    </div>
                    <p className="text-red-500 mb-4">All the questions will appear in English language.</p>

                    <div className="flex items-start space-x-2 mb-4">
                        <Checkbox id="terms" />
                        <label htmlFor="terms" className="text-sm">
                            I have read and understood the instructions. All computer hardware allotted to me are in proper working condition. I declare that I am not in possession of / not wearing / not carrying any prohibited gadget like mobile phone, bluetooth devices etc. /any prohibited material with me into the Examination Hall.I agree that in case of not adhering to the instructions, I shall be liable to be debarred from this Test and/or to disciplinary action, which may include ban from future Tests / Examinations
                        </label>
                    </div>
                    <div className="flex gap-4 justify-center">
                        <Button
                            // trigger exam fetch ? can we 
                            onClick={() => {
                                router.push('/livetest/start')
                            }}
                            className="bg-green-500"
                        >
                            I am ready to begin
                        </Button>
                        <Button className="bg-red-500">
                            Go Back
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}