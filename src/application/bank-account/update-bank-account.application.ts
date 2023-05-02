import { BankAccount } from "@/domain/entity/bank-account";
import { IUpdateBankAccount } from "@/domain/use-case/bank-account/update-bank-account.usecase";
import { IHttpClient } from "@/infra/http/adapters/http-client";

export class UpdateBankAccount implements IUpdateBankAccount{
    constructor(
        private readonly http: IHttpClient,
        private readonly url: string
    ){}
    
    async request(data: BankAccount): Promise<BankAccount> {
        var response = await this.http.request({
            url: this.url,
            method: "put",
            body: data
        });

        return response.body;
    }

}