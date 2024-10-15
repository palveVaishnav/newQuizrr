// we need a particular test with all it's sections
import { sectionType } from "@/types/section";
import { examType, testType } from "@/types/test";
import axios from "axios";
import { atom, atomFamily, selector, selectorFamily } from "recoil";

export const currentTest = atom<testType | null>({
    key: "currentTestAtom",
    default: null,
})

export const testWithSections = atomFamily({
    key: "testWithSectionsAtom",
    default: selectorFamily({
        key: "testWithSectionsSelectorFamily",
        get: () => async ({ get }) => {
            try {
                const test = get(currentTest)
                if (!test) {
                    throw new Error("No test Selected ")
                }
                const SectionRes = await axios.get(`${process.env.NEXT_PUBLIC_API}/test/sections/${test.id}`)
                const sections: sectionType[] = SectionRes.data
                return {
                    ...test,
                    sections: sections,
                };
            } catch (error) {
                console.log("Error While fetching tests and sections", error)
            }
        }
    })
})

export const examAtom = atom<examType>({
    key: "examAtom",
    default: selector({
        key: "examAtomSelector",
        get: async ({ get }) => {
            try {
                const testToFetch = get(currentTest)
                if (!testToFetch) {
                    throw new Error("Current test hi set nahi hai")
                }
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/exam/${testToFetch?.id}`)
                const test = res.data;
                return test;
            } catch (error) {
                console.log("The Error : ", error)
            }
        }
    })

})