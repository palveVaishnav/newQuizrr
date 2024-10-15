// pack and it's tests
import { atomFamily, selector, selectorFamily } from "recoil";
import axios from "axios";
import { packType, packWithTests } from "@/types/pack";

// Selector to fetch all packs with their tests
export const allPacksSelector = selector<packWithTests[]>({
  key: "allPacksSelector",
  get: async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/packs`);
      const packs = res.data;

      const packTestPromises = packs.map(async (pack: packType) => {
        const newRes = await axios.get(`${process.env.NEXT_PUBLIC_API}/pack/tests/${pack.id}`);
        return {
          ...pack,
          tests: newRes.data,
        };
      });

      return await Promise.all(packTestPromises);
    } catch (error) {
      console.error('Error fetching packs:', error);
      return [];
    }
  },
});

export const packToView = atomFamily({
  key: "packToView",
  default: selectorFamily({
    key: "packToViewSelector",
    get: (id) => ({ get }) => {
      const pack = get(allPacksSelector)
      return pack.find(x => x.id == id)
    }
  })
});





// I will have to create an array of packWithTests


// need to store all available packs with tests ,
// /packs -> fetch all packs
//  /pack/test/:id -> fetch tests related to that pack
/**
 * First Request will return : array of PackType
 * [
  {
    "id": "cm25guz8h000010jo31hxuitb",
    "prize": 4000,
    "title": "Pack - 01",
    "subtitle": "Subtitle of the pack",
    "description": "Descriptions of the pack",
    "batch": "October Batch",
    "schedule": "https://vaishnav.info"
  },...... and so on 
]
 * second request will return : array of testType 
 [
  {
    "id": "cm25iaah40001m23xw2v6s5kx",
    "title": "Test title",
    "createdAt": "2024-10-12T01:56:58.889Z",
    "numberOfQuestions": 30,
    "maxMarks": 100,
    "testTime": 120,
    "isLocked": false,
    "packsId": "cm25iaagu0000m23xc4nzzxhh"
  }
]
 */