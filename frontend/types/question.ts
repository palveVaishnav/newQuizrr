export interface questionType {
  id: string,
  question: string,
  answer: number,
  marks: number,
  options: string,   //JSON.parse(data.options),
  userAnswer: number,
  status: questionStatus,
}

export enum questionStatus {
  notVisited,
  answered,
  notAnswered,
  marked,
  markedAnswered
}



/**
 * {
    "id": "cm25k64my001abf2ujh2hp6pe",
    "question": "Question 5 for Section cm25k64mb0015bf2ucpu43mgc",
    "options": "[\"Option 1\",\"Option 2\",\"Option 3\",\"Option 4\"]",
    "answer": 1,
    "marks": 4,
    "sectionId": "cm25k64mb0015bf2ucpu43mgc"
  },
 */