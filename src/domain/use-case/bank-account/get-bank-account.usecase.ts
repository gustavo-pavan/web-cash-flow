import { BankAccount } from "@/domain/entity/bank-account";

export interface IGetBankAccount {
  request(): Promise<Array<BankAccount>>;
}
