import { Flow } from "@/domain/entity/flow";

export interface IFileFlow {
  request(date: string): Promise<any>;
}
