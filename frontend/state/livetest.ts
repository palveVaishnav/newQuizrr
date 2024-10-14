import { atom, selector } from "recoil";
import { testType } from '../types/test';
import { sectionType } from "@/types/section";
import { questionType } from "@/types/question";
import axios from "axios";
import { currentTest } from "./test";

export enum Qstatus {
    notVisited,
    answered,
    notAnswered,
    marked,
    markedAnswered
}

export interface question extends questionType {
    userAnswer: number
    status: Qstatus
}

export interface section extends sectionType {
    questions: question[]
}

export interface test extends testType {
    sections: section[]
}

export const testSelector = selector<test>({
    key: "liveTest",
    get: async ({ get }) => {
        const testToFetch = get(currentTest)
        if (!testToFetch) {
            console.log('test id missing')
            return
        }
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/exam/${testToFetch?.id}`)
            if (!response) {
                throw new Error("Failed to fetch test")
            }
            const data = await response.data
            return data
        } catch (error) {
            console.log("some error occured :", error)
            throw error;
        }
    }
})


export const liveTest = atom<test>({
    key: "liveTest",
    default: testSelector,
})



/**
 * {
    "id": "cm25k64eu0001bf2utjdx9dnr",
    "title": "Test-1",
    "createdAt": "2024-10-12T02:49:43.639Z",
    "numberOfQuestions": 30,
    "maxMarks": 100,
    "testTime": 120,
    "isLocked": false,
    "packsId": "cm25k64bm0000bf2uu4psfzwd",
    "sections": [
        {
            "id": "cm25k64g40002bf2uoqxwt9ex",
            "title": "Section-1",
            "maxMarks": 40,
            "testId": "cm25k64eu0001bf2utjdx9dnr",
            "questions": [
                {
                    "id": "cm25k64gi0003bf2u6uorrnlo",
                    "question": "Question 1 for Section cm25k64g40002bf2uoqxwt9ex",
                    "options": "[\"Option 1\",\"Option 2\",\"Option 3\",\"Option 4\"]",
                    "answer": 1,
                    "marks": 4,
                    "sectionId": "cm25k64g40002bf2uoqxwt9ex"
                },
                {
                    "id": "cm25k64gw0004bf2ua8s2kglb",
                    "question": "Question 2 for Section cm25k64g40002bf2uoqxwt9ex",
                    "options": "[\"Option 1\",\"Option 2\",\"Option 3\",\"Option 4\"]",
                    "answer": 3,
                    "marks": 4,
                    "sectionId": "cm25k64g40002bf2uoqxwt9ex"
                },
                {
                    "id": "cm25k64h30005bf2urfkudbxh",
                    "question": "Question 3 for Section cm25k64g40002bf2uoqxwt9ex",
                    "options": "[\"Option 1\",\"Option 2\",\"Option 3\",\"Option 4\"]",
                    "answer": 0,
                    "marks": 4,
                    "sectionId": "cm25k64g40002bf2uoqxwt9ex"
                },
                {
                    "id": "cm25k64h80006bf2u3h6mfo2k",
                    "question": "Question 4 for Section cm25k64g40002bf2uoqxwt9ex",
                    "options": "[\"Option 1\",\"Option 2\",\"Option 3\",\"Option 4\"]",
                    "answer": 0,
                    "marks": 4,
                    "sectionId": "cm25k64g40002bf2uoqxwt9ex"
                },
                {
                    "id": "cm25k64hf0007bf2um1g8tlj0",
                    "question": "Question 5 for Section cm25k64g40002bf2uoqxwt9ex",
                    "options": "[\"Option 1\",\"Option 2\",\"Option 3\",\"Option 4\"]",
                    "answer": 1,
                    "marks": 4,
                    "sectionId": "cm25k64g40002bf2uoqxwt9ex"
                }
            ]
        },
        {
            "id": "cm25k64hn0008bf2u2kfq90ht",
            "title": "Section-2",
            "maxMarks": 40,
            "testId": "cm25k64eu0001bf2utjdx9dnr",
            "questions": [
                {
                    "id": "cm25k64hs0009bf2ur1o95xpu",
                    "question": "Question 1 for Section cm25k64hn0008bf2u2kfq90ht",
                    "options": "[\"Option 1\",\"Option 2\",\"Option 3\",\"Option 4\"]",
                    "answer": 0,
                    "marks": 4,
                    "sectionId": "cm25k64hn0008bf2u2kfq90ht"
                },
                {
                    "id": "cm25k64hz000abf2uvsewm8dh",
                    "question": "Question 2 for Section cm25k64hn0008bf2u2kfq90ht",
                    "options": "[\"Option 1\",\"Option 2\",\"Option 3\",\"Option 4\"]",
                    "answer": 0,
                    "marks": 4,
                    "sectionId": "cm25k64hn0008bf2u2kfq90ht"
                },
                {
                    "id": "cm25k64i5000bbf2uj4f3i0q3",
                    "question": "Question 3 for Section cm25k64hn0008bf2u2kfq90ht",
                    "options": "[\"Option 1\",\"Option 2\",\"Option 3\",\"Option 4\"]",
                    "answer": 1,
                    "marks": 4,
                    "sectionId": "cm25k64hn0008bf2u2kfq90ht"
                },
                {
                    "id": "cm25k64ia000cbf2u0spnftod",
                    "question": "Question 4 for Section cm25k64hn0008bf2u2kfq90ht",
                    "options": "[\"Option 1\",\"Option 2\",\"Option 3\",\"Option 4\"]",
                    "answer": 3,
                    "marks": 4,
                    "sectionId": "cm25k64hn0008bf2u2kfq90ht"
                }
            ]
        },
        {
            "id": "cm25k64ig000dbf2u44p56ag3",
            "title": "Section-3",
            "maxMarks": 40,
            "testId": "cm25k64eu0001bf2utjdx9dnr",
            "questions": [
                {
                    "id": "cm25k64il000ebf2u46xae1ea",
                    "question": "Question 1 for Section cm25k64ig000dbf2u44p56ag3",
                    "options": "[\"Option 1\",\"Option 2\",\"Option 3\",\"Option 4\"]",
                    "answer": 3,
                    "marks": 4,
                    "sectionId": "cm25k64ig000dbf2u44p56ag3"
                },
                {
                    "id": "cm25k64ir000fbf2uxq0qydog",
                    "question": "Question 2 for Section cm25k64ig000dbf2u44p56ag3",
                    "options": "[\"Option 1\",\"Option 2\",\"Option 3\",\"Option 4\"]",
                    "answer": 2,
                    "marks": 4,
                    "sectionId": "cm25k64ig000dbf2u44p56ag3"
                },
                {
                    "id": "cm25k64iw000gbf2uxzex1zdy",
                    "question": "Question 3 for Section cm25k64ig000dbf2u44p56ag3",
                    "options": "[\"Option 1\",\"Option 2\",\"Option 3\",\"Option 4\"]",
                    "answer": 1,
                    "marks": 4,
                    "sectionId": "cm25k64ig000dbf2u44p56ag3"
                },
                {
                    "id": "cm25k64j1000hbf2u4bpch2se",
                    "question": "Question 4 for Section cm25k64ig000dbf2u44p56ag3",
                    "options": "[\"Option 1\",\"Option 2\",\"Option 3\",\"Option 4\"]",
                    "answer": 0,
                    "marks": 4,
                    "sectionId": "cm25k64ig000dbf2u44p56ag3"
                }
            ]
        }
    ]
}
 */