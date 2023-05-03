import { BankAccount } from "@/domain/entity/bank-account";
import { ICreateBankAccount } from "@/domain/use-case/bank-account/create-bank-account.usecase";
import {  IHttpClient } from "@/infra/http/adapters/http-client";

export class CreateBankAccount implements ICreateBankAccount{
    constructor(
        private readonly http: IHttpClient,
        private readonly url: string
    ){}
    
    async request(data: BankAccount): Promise<BankAccount> {
        var response = await this.http.request({
            url: this.url,
            method: "post",
            body: data
        });

        return response.body;
    }

}