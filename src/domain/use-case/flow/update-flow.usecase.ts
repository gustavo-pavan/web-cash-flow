import { Flow } from "@/domain/entity/flow";

export interface IUpdateFlow {
  request(data: Flow): Promise<Flow>;
}
