"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
import { Clock, FileText, CheckCircle, LockIcon } from "lucide-react"
import Image from "next/image"
import { useRecoilValue } from "recoil"
import { currentTest } from "@/state/test"

export default function TestInstructionsAndInfo() {
    const test = useRecoilValue(currentTest);
    return (
        <div className="container mx-auto p-4 space-y-6">
            <Card>
                <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-2xl font-bold mb-2 flex items-center">
                                {test?.title}
                                {test?.isLocked &&
                                    <LockIcon className="ml-2 h-5 w-5 text-yellow-500" />
                                }
                                {/* <Badge variant="secondary" className="ml-2 bg-green-100 text-green-800">Available</Badge> */}
                            </h2>
                            <p className="text-gray-500 mb-4">{test?.created}</p>
                            <div className="flex space-x-6">
                                <div className="flex items-center">
                                    <FileText className="h-5 w-5 mr-2 text-gray-400" />
                                    <div>
                                        <p className="text-sm text-gray-500">QUESTIONS</p>
                                        <p className="font-semibold">{test?.numberOfQuestions}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <Clock className="h-5 w-5 mr-2 text-gray-400" />
                                    <div>
                                        <p className="text-sm text-gray-500">TIME</p>
                                        <p className="font-semibold">{test?.testTime}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <CheckCircle className="h-5 w-5 mr-2 text-gray-400" />
                                    <div>
                                        <p className="text-sm text-gray-500">MARKS</p>
                                        <p className="font-semibold">{test?.maxMarks}</p>
                                    </div>
                                </div>
                            </div>
                            {test?.isLocked ?
                                <>
                                    <Button className="mt-4 bg-red-500 hover:bg-red-600 text-white">
                                        Unlock Test
                                    </Button>
                                    <p className="text-sm text-gray-500 mt-2">You need to join the pack to access this test.</p>
                                </>
                                :
                                <Button className="mt-4 bg-green-500 hover:bg-green-600">
                                    Attempt Now
                                </Button>
                            }
                        </div>
                        <div className="hidden md:block">
                            <Image
                                src="https://app.quizrr.in/assets/img/illustrations/test-details.svg"
                                alt="Students studying"
                                className="rounded-lg w-60 h-auto"
                                width={20}
                                height={20}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Important Instructions</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-500 mb-4">Please read the following test related instructions:</p>
                    <ul className="list-disc list-inside space-y-2">
                        <li>The total duration of this test is <strong>180 minutes</strong>.</li>
                        <li>The test is of <strong>300 marks</strong>.</li>
                        <li>There will be <strong>75 questions</strong> in the test.</li>
                        <li>There are <strong>3 subject(s)</strong> in the test: <strong>Physics, Chemistry,</strong> and <strong>Mathematics</strong></li>
                        <li>The paper is divided into <strong>6 sections</strong>.</li>
                        <li>There are following sections:</li>
                    </ul>
                    <ul className="list-none list-inside space-y-2 ml-6 mt-2">
                        <li>
                            <strong>Physics Single Correct</strong> consisting of <strong>20 single correct</strong> questions. For each correct response, you will get <strong>+4 mark</strong> while an incorrect response will get you <strong>-1 mark</strong>. <strong>0</strong> will be awarded for no response.
                        </li>
                        <li>
                            <strong>Physics Numerical</strong> consisting of <strong>10 numerical type</strong> questions. For each correct response, you will get <strong>+4 mark</strong> while an incorrect response will get you <strong>-1 mark</strong>. <strong>0</strong> will be awarded for no response.
                        </li>
                        <li>
                            <strong>Chemistry Single Correct</strong> consisting of <strong>20 single correct</strong> questions. For each correct response, you will get <strong>+4 mark</strong> while an incorrect response will get you <strong>-1 mark</strong>. <strong>0</strong> will be awarded for no response.
                        </li>
                        <li>
                            <strong>Chemistry Numerical</strong> consisting of <strong>10 numerical type</strong> questions. For each correct response, you will get <strong>+4 mark</strong> while an incorrect response will get you <strong>-1 mark</strong>. <strong>0</strong> will be awarded for no response.
                        </li>
                        <li>
                            <strong>Mathematics Single Correct</strong> consisting of <strong>20 single correct</strong> questions. For each correct response, you will get <strong>+4 mark</strong> while an incorrect response will get you <strong>-1 mark</strong>. <strong>0</strong> will be awarded for no response.
                        </li>
                        <li>
                            <strong>Mathematics Numerical</strong> consisting of <strong>10 numerical type</strong> questions. For each correct response, you will get <strong>+4 mark</strong> while an incorrect response will get you <strong>-1 mark</strong>. <strong>0</strong> will be awarded for no response.
                        </li>
                    </ul>
                </CardContent>
            </Card>


        </div>
    )
}