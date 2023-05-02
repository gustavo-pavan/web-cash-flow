import { BankAccount } from "@/domain/entity/bank-account";

export interface ICreateBankAccount {
  request(data: BankAccount): Promise<BankAccount>;
}
