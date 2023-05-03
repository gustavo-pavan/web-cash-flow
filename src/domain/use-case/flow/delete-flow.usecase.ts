export interface IDeleteFlow {
  request(id:string): Promise<boolean>;
}
