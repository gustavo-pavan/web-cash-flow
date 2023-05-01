export interface IHttpClient<T = any> {
  request(data: HttpRequest): Promise<HttpResponse<T>>;
}

export type HttpRequest = {
  url: string;
  method: HttpMethod;
  body?: any;
  headers?: any;
};

export type HttpMethod = "post" | "get" | "put" | "delete";

export type HttpResponse<T = any> = {
  statusCode: HttpStatusCode;
  body?: HttpDataResult<T>;
};

export type HttpDataResult<T = any> = {
  payload?: T,
  isSuccess?: boolean,
  message?: Array<any>,
  page?: number,
  size?: number
}

export enum HttpStatusCode {
  ok = 200,
  noContent = 204,
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  internalServerError = 500,
  unprocessableEntity = 422
}
