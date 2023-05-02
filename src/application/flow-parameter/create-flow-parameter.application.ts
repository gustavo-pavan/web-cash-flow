import { FlowParameter } from "@/domain/entity/flow-parameter";
import { ICreateFlowParameter } from "@/domain/use-case/flow-parameter/create-flow-parameter.usecase";
import {  IHttpClient } from "@/infra/http/adapters/http-client";

export class CreateFlowParameter implements ICreateFlowParameter{
    constructor(
        private readonly http: IHttpClient,
        private readonly url: string
    ){}
    
    async request(data: FlowParameter): Promise<FlowParameter> {
        var response = await this.http.request({
            url: this.url,
            method: "post",
            body: data
        });

        return response.body;
    }

}