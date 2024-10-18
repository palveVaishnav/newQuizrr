import { examType } from "@/types/test";
import { atom, selector } from "recoil";
import { currentTest } from "./test";
import axios from "axios";

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




