export interface IDeleteBankAccount {
  request(id:string): Promise<boolean>;
}
