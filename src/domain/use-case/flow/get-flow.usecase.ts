import { Flow } from "@/domain/entity/flow";

export interface IGetFlow {
  request(): Promise<Array<Flow>>;
}
