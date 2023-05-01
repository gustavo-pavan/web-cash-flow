import { HttpRequest, HttpResponse, HttpStatusCode, IHttpClient } from "@/infra/http/adapters/http-client";

export class HttpSpyOn<T = any> implements IHttpClient<T> {
  url?: string;
  method?: string;
  body?: any;
  headers?: any;
  response: HttpResponse<T> = {
    statusCode: HttpStatusCode.ok,
  };
  async request(data: HttpRequest): Promise<HttpResponse<T>> {
    this.url = data.url;
    this.method = data.method;
    this.body = data.body;
    this.headers = data.headers;
    return this.response;
  }
}
