import { HttpMiddlewareStatusCode } from "@/helper/middleware/http-middleware-status-code";
import { makeHttpFactory } from "../http-client/http-client.factory";
import { makeApiFlowUrlFactory } from "../api-url/url.factory";
import { IFileFlow } from "@/domain/use-case/flow/file-flow.usecase";
import { FileFlow } from "@/application/flow/file-flow.application";

export const makeFileFlowFactory = (): IFileFlow =>
  new FileFlow(
    new HttpMiddlewareStatusCode(makeHttpFactory()),
    makeApiFlowUrlFactory("/flow/file")
  );
