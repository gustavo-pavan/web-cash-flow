import axios from "axios";
import { mockResponse } from "./mock-response";

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  mockedAxios.request.mockClear().mockResolvedValue(mockResponse());
  return mockedAxios;
};
