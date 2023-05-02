import { FlowParameter } from "@/domain/entity/flow-parameter";

export interface ICreateFlowParameter {
  request(data: FlowParameter): Promise<FlowParameter>;
}
