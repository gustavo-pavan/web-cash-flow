import { HttpMiddlewareStatusCode } from "@/helper/middleware/http-middleware-status-code";
import { makeHttpFactory } from "../http-client/http-client.factory";
import { makeApiFlowUrlFactory } from "../api-url/url.factory";
import { IGetFlow } from "@/domain/use-case/flow/get-flow.usecase";
import { GetFlow } from "@/application/flow/get-flow.application";

export const makeGetFlowFactory = (): IGetFlow =>
  new GetFlow(
    new HttpMiddlewareStatusCode(makeHttpFactory()),
    makeApiFlowUrlFactory("/flow")
  );
