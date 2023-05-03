import { HttpMiddlewareStatusCode } from "@/helper/middleware/http-middleware-status-code";
import { makeHttpFactory } from "../http-client/http-client.factory";
import { makeApiParameterUrlFactory } from "../api-url/url.factory";
import { CreateFlowParameter } from "@/application/flow-parameter/create-flow-parameter.application";


export const makeCreateFlowParameterFactory = () : CreateFlowParameter => 
new CreateFlowParameter(
    new HttpMiddlewareStatusCode(
      makeHttpFactory()
    ),
    makeApiParameterUrlFactory("/flow-parameter")
)