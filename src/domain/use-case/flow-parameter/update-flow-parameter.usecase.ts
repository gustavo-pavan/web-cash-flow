import { FlowParameter } from "@/domain/entity/flow-parameter";

export interface IUpdateFlowParameter {
  request(data: FlowParameter): Promise<FlowParameter>;
}
