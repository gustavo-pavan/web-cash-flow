import { IDeletePaymentType } from "@/domain/use-case/payment-type/delete-payment-type.usecase";
import { IHttpClient } from "@/infra/http/adapters/http-client";

export class DeletePaymentType implements IDeletePaymentType{
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