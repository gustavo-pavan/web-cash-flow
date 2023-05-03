import { Flow } from "@/domain/entity/flow";

export interface ICreateFlow {
  request(data: Flow): Promise<Flow>;
}
