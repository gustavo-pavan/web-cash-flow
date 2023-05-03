import { Flow } from "@/domain/entity/flow";
import { IFileFlow } from "@/domain/use-case/flow/file-flow.usecase";
import {  IHttpClient } from "@/infra/http/adapters/http-client";

export class FileFlow implements IFileFlow{
    constructor(
        private readonly http: IHttpClient,
        private readonly url: string
    ){}
    
    async request(date: string): Promise<any> {
        var response = await this.http.request({
            url: this.url,
            method: "post",
            body:{
                dateTime: date
            }
        });

        return response.body;
    }

}