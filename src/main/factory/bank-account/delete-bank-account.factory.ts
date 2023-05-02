import { HttpMiddlewareStatusCode } from "@/helper/middleware/http-middleware-status-code";
import { makeHttpFactory } from "../http-client/http-client.factory";
import { makeApiParameterUrlFactory } from "../api-url/url.factory";
import { DeleteBankAccount } from "@/application/bank-account/delete-bank-account.application";

export const makeDeleteBankAccountFactory = () : DeleteBankAccount => 
new DeleteBankAccount(
    new HttpMiddlewareStatusCode(
      makeHttpFactory()
    ),
    makeApiParameterUrlFactory("/bank-account")
)