import { FlowParameter } from "@/domain/entity/flow-parameter";
import { IUpdateFlowParameter } from "@/domain/use-case/flow-parameter/update-flow-parameter.usecase";
import { IHttpClient } from "@/infra/http/adapters/http-client";

export class UpdateFlowParameter implements IUpdateFlowParameter{
    constructor(
        private readonly http: IHttpClient,
        private readonly url: string
    ){}
    
    async request(data: FlowParameter): Promise<FlowParameter> {
        var response = await this.http.request({
            url: this.url,
            method: "put",
            body: data
        });

        return response.body;
    }

}