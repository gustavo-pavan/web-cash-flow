import { PaymentType } from "@/domain/entity/payment-type";
import { IUpdatePaymentType } from "@/domain/use-case/payment-type/update-payment-type.usecase";
import { IHttpClient } from "@/infra/http/adapters/http-client";

export class UpdatePaymentType implements IUpdatePaymentType{
    constructor(
        private readonly http: IHttpClient,
        private readonly url: string
    ){}
    
    async request(data: PaymentType): Promise<PaymentType> {
        var response = await this.http.request({
            url: this.url,
            method: "put",
            body: data
        });

        return response.body;
    }

}