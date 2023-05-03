import { HttpMiddlewareStatusCode } from "@/helper/middleware/http-middleware-status-code";
import { makeHttpFactory } from "../http-client/http-client.factory";
import { makeApiParameterUrlFactory } from "../api-url/url.factory";
import { GetFlowParameter } from "@/application/flow-parameter/get-flow-parameter.application";

export const makeGetFlowParameterFactory = (): GetFlowParameter =>
  new GetFlowParameter(
    new HttpMiddlewareStatusCode(makeHttpFactory()),
    makeApiParameterUrlFactory("/flow-parameter")
  );
