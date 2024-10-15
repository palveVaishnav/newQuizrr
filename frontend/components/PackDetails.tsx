import { Button } from "@/components/ui/button"
import { currentTest } from "@/state/test"
import { useRouter } from "next/navigation"
import { useSetRecoilState } from "recoil"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"   // will add lock in the buy button 
import { testType } from "@/types/test"
import { packWithTests } from "@/types/pack"
import Link from "next/link"


export function PackDetails({ batch, title, subtitle, description, schedule, tests }: packWithTests) {
    const router = useRouter()
    const setTest = useSetRecoilState(currentTest)
    return (
        <div className="container mx-auto p-4">
            <header className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold">{title}</h1>
                </div>
                {/* <Button>View All Details</Button> */}
            </header>
            <span className="">{subtitle}</span>
            <h1 className="text-md font-bold">{description}</h1>
            <p>Batch : {batch}</p>
            <Link href={schedule}>
                <Button>
                    Download Schedule
                </Button>
            </Link>

            <Card className="mt-10">
                <CardHeader>
                    <CardTitle>Tests</CardTitle>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="qpt">
                        <TabsList>
                            <TabsTrigger value="c1">Test Category - 1</TabsTrigger>
                            <TabsTrigger value="c2">Test Category - 2</TabsTrigger>
                            <TabsTrigger value="c3">Test Category - 3</TabsTrigger>
                            <TabsTrigger value="c4">Test Category - 4</TabsTrigger>
                        </TabsList>
                        <TabsContent value="c1" className="space-y-4">
                            <div className="flex justify-between items-center">
                                <Input className="max-w-sm" placeholder="Search" />
                                <Button variant="outline">
                                    <Search className="mr-2 h-4 w-4" />
                                    Search
                                </Button>
                            </div>
                            {tests.map((test: testType) => (
                                <Card key={test.id}>
                                    <CardHeader>
                                        <CardTitle className="text-lg font-medium text-blue-600">{test.title}</CardTitle>
                                        {test.isLocked ?
                                            <Badge variant="outline">Buy Now</Badge>
                                            :
                                            <Badge variant="outline">Available</Badge>
                                        }
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-gray-600">{test.created} We need section details here</p>
                                        <div className="flex gap-4 mt-2 text-sm text-gray-500">
                                            <span>{test.numberOfQuestions} Questions</span>
                                            <span>{test.testTime} Minutes</span>
                                            <span>{test.created}</span>
                                        </div>
                                        <Button
                                            onClick={() => {
                                                setTest(test)
                                                router.push(`/test/${test.id}`)
                                            }}
                                        >Attempt Now</Button >
                                    </CardContent>
                                </Card>
                            ))}
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    )
}