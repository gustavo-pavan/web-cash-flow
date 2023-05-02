import { BankAccount } from "@/domain/entity/bank-account";

export interface IUpdateBankAccount {
  request(data: BankAccount): Promise<BankAccount>;
}
