import { FlowParameter } from "@/domain/entity/flow-parameter";

export interface IGetFlowParameter {
  request(): Promise<Array<FlowParameter>>;
}
