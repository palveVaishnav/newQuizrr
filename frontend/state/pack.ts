// pack and it's tests
import { atom, selector } from "recoil";
import { packType, packWithTestType } from "@/types/pack";
import { testType } from "@/types/test";
import axios from "axios";

// this will be an array of all packs along with tests. 
export const packWithTest = selector<packWithTestType[]>({
    key: "packWithTest",
    get: async ({ get }) => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/packs`);

        } catch (error) {
            console.error("Failed to fetch tests:", error);
        }
    }
})


export const currentPack = atom<packType | null>({
    key: "currentPack",
    default: null,
})

export const relatedTests = atom<testType[]>({
    key: "relatedTests",
    default: [],
})
