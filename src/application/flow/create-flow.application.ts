import { Flow } from "@/domain/entity/flow";
import { ICreateFlow } from "@/domain/use-case/flow/create-flow.usecase";
import {  IHttpClient } from "@/infra/http/adapters/http-client";

export class CreateFlow implements ICreateFlow{
    constructor(
        private readonly http: IHttpClient,
        private readonly url: string
    ){}
    
    async request(data: Flow): Promise<Flow> {
        var response = await this.http.request({
            url: this.url,
            method: "post",
            body: data
        });

        return response.body;
    }

}