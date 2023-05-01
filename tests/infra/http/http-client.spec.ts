import axios from "axios";
import { AxiosHttpClient } from "@/infra/http/axios-http-client"
import { mockAxios } from "../mock/mock-axios";
import { mockRequest } from "../mock/mock-request";
import { mockResponse } from "../mock/mock-response";

jest.mock("axios");

type SutTypes = {
  sut: AxiosHttpClient;
  mockedAxios: jest.Mocked<typeof axios>;
};

const makeSut = (): SutTypes => {
  return {
    sut: new AxiosHttpClient(),
    mockedAxios: mockAxios(),
  };
};

describe("Tests for http request adapter", () => {
  it("Should call with corret params", async () => {
    const request = mockRequest();
    const { sut, mockedAxios } = makeSut();

    await sut.request(request);

    expect(mockedAxios.request).toHaveBeenCalledWith({
      url: request.url,
      data: request.body,
      headers: request.headers,
      method: request.method,
    });
  });

  it("Should return correct response", async () => {
    const { sut, mockedAxios } = makeSut();

    const httpResponse = await sut.request(mockRequest());
    const axiosResponse = await mockedAxios.request.mock.results[0].value;

    expect(httpResponse).toEqual({
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
    });
  });

  it("Should return correct error", () => {
    const { sut, mockedAxios } = makeSut();
    mockedAxios.request.mockRejectedValueOnce({
      response: mockResponse(),
    });

    const promise = sut.request(mockRequest());

    expect(promise).toEqual(mockedAxios.request.mock.results[0].value);
  });
});
