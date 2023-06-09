import { BankAccount } from "@/domain/entity/bank-account";
import { FlowParameter } from "@/domain/entity/flow-parameter";
import { PaymentType } from "@/domain/entity/payment-type";
import { atom } from "recoil";

export const bankAccountsStates = atom({
  key: "bankAccountsStates",
  default: {
    bankAccounts: null as Array<BankAccount>,
  },
});

export const bankAccountState = atom({
  key: "bankAccountState",
  default: {
    bankAccount: null as BankAccount,
  },
});

export const paymentTypesStates = atom({
  key: "paymentTypesStates",
  default: {
    paymentTypes: null as Array<PaymentType>,
  },
});

export const paymentTypeState = atom({
  key: "paymentTypeState",
  default: {
    paymentType: null as PaymentType,
  },
});

export const flowParametersStates = atom({
  key: "flowParametersStates",
  default: {
    flowParameters: null as Array<FlowParameter>,
  },
});

export const flowParameterState = atom({
  key: "flowParameterState",
  default: {
    flowParameter: null as FlowParameter,
  },
});
