"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { currentPack, relatedTests } from "@/state/pack"
import { currentTest } from "@/state/test"
import { CheckCircle, Lock, PlayCircle, Search } from "lucide-react"
import { useRouter } from "next/navigation"
import { useRecoilValue, useSetRecoilState } from "recoil"

export default function TestSeriesInterface() {
    const router = useRouter()
    const pack = useRecoilValue(currentPack)
    const tests = useRecoilValue(relatedTests)
    const setTestToView = useSetRecoilState(currentTest)
    return (
        <div className="container mx-auto p-4 space-y-4 mt-10">
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <CheckCircle className="text-green-500 h-6 w-6" />
                    <h1 className="text-xl font-bold">{pack?.title}</h1>
                </div>
            </div>


            <Tabs defaultValue="schedule" className="space-y-4">
                <TabsList className="grid grid-cols-5 gap-4 bg-inherit">
                    <TabsTrigger value="schedule" className="bg-green-100 text-green-800 px-1 py-2">Schedule</TabsTrigger>
                    <TabsTrigger value="recordings" className="bg-red-100 text-red-800 px-1 py-2">
                        <PlayCircle className="mr-2 h-4 w-4" />
                        Session Recordings
                    </TabsTrigger>
                    <TabsTrigger value="formula" className="bg-yellow-100 text-yellow-800 px-1 py-2">
                        Formula Sheets
                    </TabsTrigger>
                    <TabsTrigger value="notes" className="bg-blue-100 text-blue-800 px-1 py-2">
                        Revision Notes
                    </TabsTrigger>
                    <TabsTrigger value="mistakes" className="bg-red-100 text-red-800 px-1 py-2">
                        My Mistakes
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="schedule" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Tests</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Tabs defaultValue="qpt">
                                <TabsList>
                                    <TabsTrigger value="qpt">{pack?.subtitle}</TabsTrigger>
                                    <TabsTrigger value="qft">Full Tests (QFT)</TabsTrigger>
                                    <TabsTrigger value="pyq2024">2024 PYQs</TabsTrigger>
                                    <TabsTrigger value="pyq2020">2020 - 2023 PYQs</TabsTrigger>
                                </TabsList>
                                <TabsContent value="qpt" className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <Input placeholder="Search" className="max-w-sm" />
                                        <Button variant="outline">
                                            <Search className="mr-2 h-4 w-4" />
                                            Search
                                        </Button>
                                    </div>
                                    {tests.map((test) => (
                                        <Card key={test.id}>
                                            <CardContent className="flex justify-between items-center p-4">
                                                <div className="space-y-2">
                                                    <div className="flex items-center space-x-2">
                                                        <h3 className="font-bold text-lg">{test.title}</h3>
                                                        {test.isLocked && <Lock className="text-gray-500 h-4 w-4" />}
                                                    </div>
                                                    <p className="text-sm text-gray-600">
                                                        Syllabus and sections
                                                    </p>
                                                    <div className="flex space-x-4 text-sm text-gray-500">
                                                        <span>{test.numberOfQuestions} Questions</span>
                                                        <span>{test.testTime} Minutes</span>
                                                        <span>{test.created}</span>
                                                    </div>
                                                </div>
                                                <Button onClick={() => {
                                                    setTestToView(test)
                                                    router.push('/test')
                                                }}>
                                                    Attempt Now
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}