"use client"
import { Button } from "@/components/ui/button";
// data related to a test 
import { currentTest, testWithSections } from "@/state/test";
import { useRouter } from "next/navigation";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, FileText, Target } from "lucide-react"



export default function TestDetails({ testId }: { testId: string }) {
    const router = useRouter()
    const setLiveTest = useSetRecoilState(currentTest)
    const test = useRecoilValue(testWithSections(testId));

    if (testId === "" || !test || test === undefined) {
        router.push('/home')
        return
    }
    return (
        <div className="container mx-auto p-4">
            <Card className="mb-8">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <CardTitle className="text-2xl font-bold">{test.title}</CardTitle>
                            <Badge variant="outline" className="text-orange-500 border-orange-500">
                                <span className="mr-1">🔓</span> Available
                            </Badge>
                        </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{test.created}</p>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="flex items-center space-x-2">
                            <FileText className="h-5 w-5 text-muted-foreground" />
                            <div>
                                <p className="text-sm font-medium">QUESTIONS</p>
                                <p className="text-2xl font-bold">{test.numberOfQuestions}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Clock className="h-5 w-5 text-muted-foreground" />
                            <div>
                                <p className="text-sm font-medium">TIME</p>
                                <p className="text-2xl font-bold">{test.testTime}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Target className="h-5 w-5 text-muted-foreground" />
                            <div>
                                <p className="text-sm font-medium">MARKS</p>
                                <p className="text-2xl font-bold">{test.maxMarks}</p>
                            </div>
                        </div>
                    </div>
                    {test.isLocked ?
                        <>
                            <Button>Unlock now</Button>
                            <p className="text-sm text-muted-foreground mt-2">You need to join the pack to access this test.</p>
                        </>
                        :
                        <Button onClick={() => {
                            setLiveTest(test)
                            router.push('/livetest')
                        }}>
                            Start Test
                        </Button>
                    }
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Important Instructions</CardTitle>
                    <p className="text-sm text-muted-foreground">Please read the following test related instructions:</p>
                </CardHeader>
                <CardContent>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>The total duration of this test is <span className="font-semibold">180 minutes</span>.</li>
                        <li>The test is of <span className="font-semibold">300 marks</span>.</li>
                        <li>There will be <span className="font-semibold">75 questions</span> in the test.</li>
                        <li>There are <span className="font-semibold">3 subject(s)</span> in the test: <span className="font-semibold">Physics, Chemistry, and Mathematics</span></li>
                        <li>The paper is divided into <span className="font-semibold">6 sections</span>.</li>
                        <li>There are following sections:
                            <ul className="list-disc pl-5 mt-2 space-y-2">
                                <li><span className="font-semibold">Physics Single Correct</span> consisting of <span className="font-semibold">20 single correct</span> questions. For each correct response, you will get <span className="font-semibold">+4 mark</span> while an incorrect response will get you <span className="font-semibold">-1 mark</span>. <span className="font-semibold">0</span> will be awarded for no response.</li>
                                <li><span className="font-semibold">Physics Numerical</span> consisting of <span className="font-semibold">10 numerical type</span> questions. For each correct response, you will get <span className="font-semibold">+4 mark</span> while an incorrect response will get you <span className="font-semibold">-1 mark</span>. <span className="font-semibold">0</span> will be awarded for no response.</li>
                            </ul>
                        </li>
                    </ul>
                </CardContent>
            </Card>
        </div>
    )
}
