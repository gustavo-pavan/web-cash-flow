import { BankAccount } from "@/domain/entity/bank-account";
import { atom } from "recoil";

export const bankAccountsStates = atom({
    key: "bankAccountsStates",
    default: {
      bankAccounts: null as Array<BankAccount>,
    },
  });