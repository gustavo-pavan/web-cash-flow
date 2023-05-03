import { PaymentType } from "@/domain/entity/payment-type";
import { ICreatePaymentType } from "@/domain/use-case/payment-type/create-payment-type.usecase";
import {  IHttpClient } from "@/infra/http/adapters/http-client";

export class CreatePaymentType implements ICreatePaymentType{
    constructor(
        private readonly http: IHttpClient,
        private readonly url: string
    ){}
    
    async request(data: PaymentType): Promise<PaymentType> {
        var response = await this.http.request({
            url: this.url,
            method: "post",
            body: data
        });

        return response.body;
    }

}