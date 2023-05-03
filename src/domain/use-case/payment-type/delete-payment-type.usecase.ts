export interface IDeletePaymentType {
  request(id:string): Promise<boolean>;
}
