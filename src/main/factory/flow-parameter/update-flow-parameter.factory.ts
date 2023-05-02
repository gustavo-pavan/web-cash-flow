import { HttpMiddlewareStatusCode } from "@/helper/middleware/http-middleware-status-code";
import { makeHttpFactory } from "../http-client/http-client.factory";
import { makeApiParameterUrlFactory } from "../api-url/url.factory";
import { UpdateFlowParameter } from "@/application/flow-parameter/update-flow-parameter.application";

export const makeUpdateFlowParameterFactory = () : UpdateFlowParameter => 
new UpdateFlowParameter(
    new HttpMiddlewareStatusCode(
      makeHttpFactory()
    ),
    makeApiParameterUrlFactory("/flow-parameter")
)