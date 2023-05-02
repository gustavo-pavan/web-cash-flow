import { HttpMiddlewareStatusCode } from "@/helper/middleware/http-middleware-status-code";
import { makeHttpFactory } from "../http-client/http-client.factory";
import { makeApiParameterUrlFactory } from "../api-url/url.factory";
import { DeleteFlowParameter } from "@/application/flow-parameter/delete-flow-parameter.application";

export const makeDeleteFlowParameterFactory = () : DeleteFlowParameter => 
new DeleteFlowParameter(
    new HttpMiddlewareStatusCode(
      makeHttpFactory()
    ),
    makeApiParameterUrlFactory("/flow-parameter")
)