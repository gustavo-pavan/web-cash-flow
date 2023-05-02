import { HttpMiddlewareStatusCode } from "@/helper/middleware/http-middleware-status-code";
import { makeHttpFactory } from "../http-client/http-client.factory";
import { makeApiParameterUrlFactory } from "../api-url/url.factory";
import { GetPaymentType } from "@/application/payment-type/get-payment-type.application";

export const makeGetPaymentTypeFactory = (): GetPaymentType =>
  new GetPaymentType(
    new HttpMiddlewareStatusCode(makeHttpFactory()),
    makeApiParameterUrlFactory("/payment-type")
  );
