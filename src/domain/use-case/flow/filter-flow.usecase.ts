import { Flow } from "@/domain/entity/flow";

export interface IFilterFlow {
  request(date: string): Promise<Array<Flow>>;
}
