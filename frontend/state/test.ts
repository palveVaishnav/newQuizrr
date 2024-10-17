// we need a particular test with all it's sections
import { sectionType } from "@/types/section";
import { testType } from "@/types/test";
import axios from "axios";
import { atom, atomFamily, selectorFamily } from "recoil";

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

