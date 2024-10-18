import { attemptType } from "@/types/attempt";
import { atom } from "recoil";

export const attemptAtom = atom<attemptType | null>({
    key: "AttemptAtom",
    default: null,
})