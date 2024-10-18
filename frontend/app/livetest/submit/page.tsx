"use client"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { examAtom } from "@/state/exam"
import { attemptType } from "@/types/attempt"
import { questionStatus, questionType } from "@/types/question"
import axios from "axios"
import { Info } from "lucide-react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useRecoilValue } from "recoil"


export default function Submit() {
    const exam = useRecoilValue(examAtom)
    const router = useRouter()
    const { data: session } = useSession();
    if (!session) {
        console.log("Session nahi hai")
    }
    console.log(session?.user?.email);

    let score = 0;
    const mistakes: string[] = [];

    exam.sections.forEach((section) => {
        section.questions.forEach((question: questionType) => {
            if (question.answer === question.userAnswer) {
                score += question.marks;
            } else {
                mistakes.push(question.id);
            }
        });
    });
    const newSubmitHandler = async () => {
        const newAttempt: attemptType = {
            testId: exam.id,
            userId: session?.user?.email || "",
            timeTaken: 0,
            score: score,
            mistakes: mistakes,
        }
        console.log(newAttempt)
        // send a post request and redirect user if it is successful.
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API}/attempt`, newAttempt, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            console.log("Sent Successfully : ", res.data)
            router.push('/livetest/submit/success')
        } catch (error) {
            console.log("Error aa gaya : ", error)
        }
    }



    return (
        <div className="w-full min-h-screen">
            <header className="bg-blue-500 text-white p-2 text-lg font-bold">
                {exam.title}
            </header>

            {/* Navigation bar */}
            <nav className="bg-[#404040] text-white flex items-center justify-between p-2">
                <div className="flex items-center space-x-2">
                    <button className="flex items-center space-x-1 bg-[#000] px-2 py-1 rounded-xl">
                        <span>All Sections</span>
                        <Info size={16} className="bg-blue-400 rounded-full" />
                    </button>
                </div>
                <p>Time Left:
                    <span className='bg-black py-1 px-2 rounded-xl'>
                        {exam.testTime}
                    </span>
                </p>
                <div className="flex items-center space-x-4">
                    <button className="px-2 py-1 rounded flex items-center space-x-1">
                        <Info size={16} className='bg-green-500 rounded-xl' />
                        <span>Question Paper</span>
                    </button>
                    <button className="px-2 py-1 rounded flex items-center space-x-1">
                        <Info size={16} className='bg-blue-400 rounded-xl' />
                        <span>Instructions</span>
                    </button>
                </div>
            </nav>
            <div className='p-4 mt-5'>
                <Table className='border border-black px-4 py-2'>
                    <TableHeader>
                        <TableRow className="">
                            <TableHead className="text-black font-semibold border border-black px-4 py-2">Section Name</TableHead>
                            <TableHead className="text-black font-semibold border border-black px-4 py-2">No OF QUESTION</TableHead>
                            <TableHead className="text-black font-semibold border border-black px-4 py-2">Answered</TableHead>
                            <TableHead className="text-black font-semibold border border-black px-4 py-2">Not Answered</TableHead>
                            <TableHead className="text-black font-semibold border border-black px-4 py-2">MARKED FOR REVIEW</TableHead>
                            <TableHead className="text-black font-semibold border border-black px-4 py-2">ANSWERED AND MARKED FOR REVIEW</TableHead>
                            <TableHead className="text-black font-semibold border border-black px-4 py-2">NOT VISITED</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {exam.sections.map((section, index) => {
                            // Calculate counts based on the question statuses
                            const answeredCount = section.questions.filter(q => q.status === questionStatus.answered).length;
                            const notAnsweredCount = section.questions.filter(q => q.status === questionStatus.notAnswered).length;
                            const markedCount = section.questions.filter(q => q.status === questionStatus.marked).length;
                            const markedAnsweredCount = section.questions.filter(q => q.status === questionStatus.markedAnswered).length;
                            const notVisitedCount = section.questions.filter(q => q.status === questionStatus.notVisited).length;

                            return (
                                <TableRow key={section.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                    <TableCell className='border border-black px-4 py-2'>{section.title}</TableCell>
                                    <TableCell className='border border-black px-4 py-2'>{section.questions.length}</TableCell>
                                    <TableCell className='border border-black px-4 py-2'>{answeredCount}</TableCell>
                                    <TableCell className='border border-black px-4 py-2'>{notAnsweredCount}</TableCell>
                                    <TableCell className='border border-black px-4 py-2'>{markedCount}</TableCell>
                                    <TableCell className='border border-black px-4 py-2'>{markedAnsweredCount}</TableCell>
                                    <TableCell className='border border-black px-4 py-2'>{notVisitedCount}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
            <div className="p-4 grid place-content-center grid-cols-2 text-center gap-2 mt-20">
                <p className='col-span-2'>
                    Are you sure about submitting this group of questions for marking
                </p>
                <Button className=" bg-gray-500 text-white w-fit place-self-end py-6"
                    onClick={() => router.back()}
                >
                    No Go Back To Paper
                </Button>
                <Button className="bg-red-500 text-white hover:bg-red-600 w-fit place-self-start py-6"
                    onClick={newSubmitHandler}
                >
                    Yes ! Submit the exam.
                </Button>
            </div>
        </div>
    )
}
/*
<div>
    <button onClick={newSubmitHandler}>Submit Attempt</button>
</div>

*/