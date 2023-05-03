import { atom } from "recoil";

export const snackbarState = atom({
    key: "snackBarState",
    default: {
      open: false as boolean,
      message: null as string,
      type: null as "success" | "error" | "warning" | "info",
    },
  });