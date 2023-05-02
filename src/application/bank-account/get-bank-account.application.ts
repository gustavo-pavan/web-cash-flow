import { BankAccount } from "@/domain/entity/bank-account";
import { IGetBankAccount } from "@/domain/use-case/bank-account/get-bank-account.usecase";
import {  IHttpClient } from "@/infra/http/adapters/http-client";

export class GetBankAccount implements IGetBankAccount{
    constructor(
        private readonly http: IHttpClient,
        private readonly url: string
    ){}
    
    async request(): Promise<Array<BankAccount>> {
        var response = await this.http.request({
            url: this.url,
            method: "get",
        });

        return response.body;
    }

}