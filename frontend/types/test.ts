import { sectionType, sectionWithQuestionType } from "./section"

export interface testType {
  id: string
  title: string
  created: string
  numberOfQuestions: number
  maxMarks: number
  testTime: number
  isLocked: boolean
  packsId: string
}

export interface testWithSectionType extends testType {
  sections: sectionType[]
}

export interface examType extends testType {
  sections: sectionWithQuestionType[]
}



/**
 * {
    "id": "cm25h9pi00001stheo8s3af2w",
    "title": "Test title",
    "createdAt": "2024-10-12T01:28:32.089Z",
    "numberOfQuestions": 30,
    "maxMarks": 100,
    "testTime": 120,
    "isLocked": false,
    "packsId": "cm25h9pg60000sthezhs3287l"
  },
 */