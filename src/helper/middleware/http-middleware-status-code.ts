import {
  HttpRequest,
  HttpResponse,
  HttpStatusCode,
  IHttpClient,
} from "@/infra/http/adapters/http-client";
import {
  AccessDeniedError,
  EntityException,
  InternalServerErrorException,
  UnauthorizedException,
  UnexpectedException,
  ValidationException,
} from "../exceptions";

export class HttpMiddlewareStatusCode implements IHttpClient {
  constructor(private readonly httpClient: IHttpClient) {}

  async request(data: HttpRequest): Promise<HttpResponse> {
    const response = await this.httpClient.request(data);

    switch (response.statusCode) {
      case HttpStatusCode.ok:
        return response;
      case HttpStatusCode.badRequest:
        throw new EntityException();
      case HttpStatusCode.forbidden:
        throw new AccessDeniedError();
      case HttpStatusCode.unprocessableEntity:
        throw new ValidationException();
      case HttpStatusCode.internalServerError:
        throw new InternalServerErrorException();
      case HttpStatusCode.unauthorized:
        throw new UnauthorizedException();
      default:
        throw new UnexpectedException();
    }
  }
}
