// an atom to store all the attempts fetched from backend
import { attemptType } from "@/types/attempt";
import axios from "axios";
import { atom, selector } from "recoil";

export const allAttemptsAtom = atom<attemptType[]>({
    key: "allAttempts",
    default: selector({
        key: "allAttemptsSelector",
        get: async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/attempts`)
                const attempts = res.data
                return attempts;
            } catch (error) {
                console.log(error);
            }
        }
    })
})