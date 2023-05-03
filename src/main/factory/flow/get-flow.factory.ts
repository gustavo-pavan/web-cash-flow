import { HttpMiddlewareStatusCode } from "@/helper/middleware/http-middleware-status-code";
import { makeHttpFactory } from "../http-client/http-client.factory";
import { makeApiFlowUrlFactory } from "../api-url/url.factory";
import { IFilterFlow } from "@/domain/use-case/flow/filter-flow.usecase";
import { FilterFlow } from "@/application/flow/filter-flow.application";

export const makeGetFlowFactory = (): IFilterFlow =>
  new FilterFlow(
    new HttpMiddlewareStatusCode(makeHttpFactory()),
    makeApiFlowUrlFactory("/flow/filter")
  );
