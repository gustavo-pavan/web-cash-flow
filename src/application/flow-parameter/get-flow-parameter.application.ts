import { FlowParameter } from "@/domain/entity/flow-parameter";
import { IGetFlowParameter } from "@/domain/use-case/flow-parameter/get-flow-parameter.usecase";
import {  IHttpClient } from "@/infra/http/adapters/http-client";

export class GetFlowParameter implements IGetFlowParameter{
    constructor(
        private readonly http: IHttpClient,
        private readonly url: string
    ){}
    
    async request(): Promise<Array<FlowParameter>> {
        var response = await this.http.request({
            url: this.url,
            method: "get",
        });

        return response.body;
    }

}