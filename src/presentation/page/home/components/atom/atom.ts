import { Flow } from "@/domain/entity/flow";
import { atom } from "recoil";

export const flowStates = atom({
    key: "flowStates",
    default: {
      flowStates: null as Array<Flow>,
    },
  });

  export const flowState = atom({
    key: "flowState",
    default: {
      flowState: null as Flow,
    },
  });

  export const dateFilterState = atom({
    key: "dateFilterState",
    default:{
      dateFilterState: null as string
    }
  })