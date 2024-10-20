import { testType } from "./test"

export interface packType {
    id: number
    title: string
    subtitle: string
    description: string
    batch: string
    prize: number
    schedule: string
}

export interface packWithTests extends packType {
    tests: testType[]
}