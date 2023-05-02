import { HttpMiddlewareStatusCode } from "@/helper/middleware/http-middleware-status-code";
import { makeHttpFactory } from "../http-client/http-client.factory";
import { makeApiParameterUrlFactory } from "../api-url/url.factory";
import { UpdatePaymentType } from "@/application/payment-type/update-payment-type.application";

export const makeUpdatePaymentTypeFactory = () : UpdatePaymentType => 
new UpdatePaymentType(
    new HttpMiddlewareStatusCode(
      makeHttpFactory()
    ),
    makeApiParameterUrlFactory("/payment-type")
)