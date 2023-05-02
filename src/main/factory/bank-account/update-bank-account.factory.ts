import { HttpMiddlewareStatusCode } from "@/helper/middleware/http-middleware-status-code";
import { makeHttpFactory } from "../http-client/http-client.factory";
import { makeApiParameterUrlFactory } from "../api-url/url.factory";
import { UpdateBankAccount } from "@/application/bank-account/update-bank-account.application";

export const makeCreateBankAccountFactory = () : UpdateBankAccount => 
new UpdateBankAccount(
    new HttpMiddlewareStatusCode(
      makeHttpFactory()
    ),
    makeApiParameterUrlFactory("/bank-account")
)