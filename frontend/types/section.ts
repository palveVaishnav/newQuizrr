import { questionType } from "./question"

export interface sectionType {
  id: string
  title: string
  maxMark: number
  testId: string
}


export interface sectionWithQuestionType extends sectionType {
  questions: questionType[]
}


/**
 * {
    "id": "cm25hi072000295dgrs336kzy",
    "title": "Section-1",
    "maxMarks": 40,
    "testId": "cm25hi05e000195dgz83afi8c"
  },
 */
