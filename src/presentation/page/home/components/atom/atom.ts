import { Flow } from "@/domain/entity/flow";
import { atom } from "recoil";

export const flowStates = atom({
    key: "flowStates",
    default: {
      flowStates: null as Array<Flow>,
    },
  });