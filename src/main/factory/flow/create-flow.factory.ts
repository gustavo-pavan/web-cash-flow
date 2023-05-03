import { HttpMiddlewareStatusCode } from "@/helper/middleware/http-middleware-status-code";
import { makeHttpFactory } from "../http-client/http-client.factory";
import { makeApiFlowUrlFactory } from "../api-url/url.factory";
import { CreateFlow } from "@/application/flow/create-flow.application";
import { ICreateFlow } from "@/domain/use-case/flow/create-flow.usecase";


export const makeCreateFlowFactory = () : ICreateFlow => 
new CreateFlow(
    new HttpMiddlewareStatusCode(
      makeHttpFactory()
    ),
    makeApiFlowUrlFactory("/flow")
)