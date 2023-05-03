import { HttpMiddlewareStatusCode } from "@/helper/middleware/http-middleware-status-code";
import { makeHttpFactory } from "../http-client/http-client.factory";
import { makeApiFlowUrlFactory } from "../api-url/url.factory";
import { UpdateFlow } from "@/application/flow/update-flow.application";
import { IUpdateFlow } from "@/domain/use-case/flow/update-flow.usecase";

export const makeUpdateFlowFactory = () : IUpdateFlow => 
new UpdateFlow(
    new HttpMiddlewareStatusCode(
      makeHttpFactory()
    ),
    makeApiFlowUrlFactory("/flow")
)