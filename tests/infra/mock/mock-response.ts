import faker from "faker";

export const mockResponse = (): any => ({
  data: faker.random.objectElement(),
  status: faker.datatype.number(),
});
