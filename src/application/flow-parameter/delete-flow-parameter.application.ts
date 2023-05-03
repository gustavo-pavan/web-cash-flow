import { IDeleteFlowParameter } from "@/domain/use-case/flow-parameter/delete-flow-parameter.usecase";
import { IHttpClient } from "@/infra/http/adapters/http-client";

export class DeleteFlowParameter implements IDeleteFlowParameter{
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