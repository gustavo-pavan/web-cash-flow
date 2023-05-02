import { IDeleteBankAccount } from "@/domain/use-case/bank-account/delete-bank-account.usecase";
import { IHttpClient } from "@/infra/http/adapters/http-client";

export class DeleteBankAccount implements IDeleteBankAccount{
    constructor(
        private readonly http: IHttpClient,
        private readonly url: string
    ){}
    
    async request(id: string): Promise<boolean> {
        var response = await this.http.request({
            url: `${this.url}/${id}`,
            method: "delete",
        });

        return response.body;
    }

}