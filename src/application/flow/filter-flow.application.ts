import { Flow } from "@/domain/entity/flow";
import { IFilterFlow } from "@/domain/use-case/flow/filter-flow.usecase";
import {  IHttpClient } from "@/infra/http/adapters/http-client";
import { formatDate } from "@/presentation/components/format/date";

export class FilterFlow implements IFilterFlow{
    constructor(
        private readonly http: IHttpClient,
        private readonly url: string
    ){}
    
    async request(date: string): Promise<Array<Flow>> {
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