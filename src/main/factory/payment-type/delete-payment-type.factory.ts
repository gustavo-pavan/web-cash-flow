import { HttpMiddlewareStatusCode } from "@/helper/middleware/http-middleware-status-code";
import { makeHttpFactory } from "../http-client/http-client.factory";
import { makeApiParameterUrlFactory } from "../api-url/url.factory";
import { DeletePaymentType } from "@/application/payment-type/delete-payment-type.application";

export const makeDeletePaymentTypeFactory = () : DeletePaymentType => 
new DeletePaymentType(
    new HttpMiddlewareStatusCode(
      makeHttpFactory()
    ),
    makeApiParameterUrlFactory("/payment-type")
)