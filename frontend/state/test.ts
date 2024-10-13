import { atom } from 'recoil';
import { testType } from '../types/test';
import { sectionType } from '@/types/section';

export const currentTest = atom<testType | null>({
    key: "currentTest",
    default: null,
})

export const relatedSections = atom<sectionType[]>({
    key: "relatedSections",
    default: [],
})






