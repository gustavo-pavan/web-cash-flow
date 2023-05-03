import { HttpMiddlewareStatusCode } from "@/helper/middleware/http-middleware-status-code";
import { makeHttpFactory } from "../http-client/http-client.factory";
import { makeApiParameterUrlFactory } from "../api-url/url.factory";
import { GetBankAccount } from "@/application/bank-account/get-bank-account.application";

export const makeGetBankAccountFactory = (): GetBankAccount =>
  new GetBankAccount(
    new HttpMiddlewareStatusCode(makeHttpFactory()),
    makeApiParameterUrlFactory("/bank-account")
  );
