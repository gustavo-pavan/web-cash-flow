import { Flow } from "@/domain/entity/flow";
import { IUpdateFlow } from "@/domain/use-case/flow/update-flow.usecase";
import { IHttpClient } from "@/infra/http/adapters/http-client";

export class UpdateFlow implements IUpdateFlow{
    constructor(
        private readonly http: IHttpClient,
        private readonly url: string
    ){}
    
    async request(data: Flow): Promise<Flow> {
        var response = await this.http.request({
            url: this.url,
            method: "put",
            body: data
        });

        return response.body;
    }

}