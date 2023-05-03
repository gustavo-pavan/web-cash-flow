import { CreateBankAccount } from "@/application/bank-account/create-bank-account.application";
import { HttpMiddlewareStatusCode } from "@/helper/middleware/http-middleware-status-code";
import { makeHttpFactory } from "../http-client/http-client.factory";
import { makeApiParameterUrlFactory } from "../api-url/url.factory";

export const makeCreateBankAccountFactory = () : CreateBankAccount => 
new CreateBankAccount(
    new HttpMiddlewareStatusCode(
      makeHttpFactory()
    ),
    makeApiParameterUrlFactory("/bank-account")
)