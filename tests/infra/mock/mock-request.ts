import faker from "faker";
import { HttpRequest } from "@/infra/http/adapters/http-client";

export const mockRequest = (): HttpRequest => ({
  url: faker.internet.url(),
  method: faker.random.arrayElement(["get", "post", "put", "delete"]),
  body: faker.random.objectElement(),
  headers: faker.random.objectElement(),
});
