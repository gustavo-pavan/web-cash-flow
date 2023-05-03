import { PaymentType } from "@/domain/entity/payment-type";
import { IGetPaymentType } from "@/domain/use-case/payment-type/get-payment-type.usecase";
import {  IHttpClient } from "@/infra/http/adapters/http-client";

export class GetPaymentType implements IGetPaymentType{
    constructor(
        private readonly http: IHttpClient,
        private readonly url: string
    ){}
    
    async request(): Promise<Array<PaymentType>> {
        var response = await this.http.request({
            url: this.url,
            method: "get",
        });

        return response.body;
    }

}