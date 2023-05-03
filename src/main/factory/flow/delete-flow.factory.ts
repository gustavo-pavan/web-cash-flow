import { HttpMiddlewareStatusCode } from "@/helper/middleware/http-middleware-status-code";
import { makeHttpFactory } from "../http-client/http-client.factory";
import { makeApiFlowUrlFactory } from "../api-url/url.factory";
import { DeleteFlow } from "@/application/flow/delete-flow.application";
import { IDeleteFlow } from "@/domain/use-case/flow/delete-flow.usecase";

export const makeDeleteFlowFactory = () : IDeleteFlow => 
new DeleteFlow(
    new HttpMiddlewareStatusCode(
      makeHttpFactory()
    ),
    makeApiFlowUrlFactory("/flow")
)