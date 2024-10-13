// pack and it's tests
import { atom } from "recoil";
import { packType } from "@/types/pack";
import { testType } from "@/types/test";

export const currentPack = atom<packType | null>({
    key: "currentPack",
    default: null,
})

export const relatedTests = atom<testType[]>({
    key: "relatedTests",
    default: [],
})
