import { Flow } from "@/domain/entity/flow";
import { IGetFlow } from "@/domain/use-case/flow/get-flow.usecase";
import {  IHttpClient } from "@/infra/http/adapters/http-client";

export class GetFlow implements IGetFlow{
    constructor(
        private readonly http: IHttpClient,
        private readonly url: string
    ){}
    
    async request(): Promise<Array<Flow>> {
        var response = await this.http.request({
            url: this.url,
            method: "get",
        });

        return response.body;
    }

}