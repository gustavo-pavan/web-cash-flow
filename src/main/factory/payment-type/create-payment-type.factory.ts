import { HttpMiddlewareStatusCode } from "@/helper/middleware/http-middleware-status-code";
import { makeHttpFactory } from "../http-client/http-client.factory";
import { makeApiParameterUrlFactory } from "../api-url/url.factory";
import { CreatePaymentType } from "@/application/payment-type/create-payment-type.application";

export const makeCreatePaymentTypeFactory = () : CreatePaymentType => 
new CreatePaymentType(
    new HttpMiddlewareStatusCode(
      makeHttpFactory()
    ),
    makeApiParameterUrlFactory("/payment-type")
)