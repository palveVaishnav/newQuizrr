"use client"
import { examAtom } from "@/state/exam"
import { questionType } from "@/types/question"
import { useSession } from "next-auth/react"
import { atom, useRecoilValue } from "recoil"

export interface attemptType {
    testId: string,
    userId: string,
    timeTaken: number,
    score: number,
    mistakes: string[],
}

export const attemptAtom = atom<attemptType | null>({
    key: "AttemptAtom",
    default: null,
})

export default function Submit() {
    const exam = useRecoilValue(examAtom)
    // Define the new attempt object
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
    const newSubmitHandler = () => {
        const newAttempt: attemptType = {
            testId: exam.id,
            userId: session?.user?.email || "",
            timeTaken: 0,
            score: score,
            mistakes: mistakes,
        }
        console.log(newAttempt)
        // send a post request and redirect user if it is successful.
    }


    return (
        <div>
            <button onClick={newSubmitHandler}>Submit Attempt</button>
        </div>
    )
}