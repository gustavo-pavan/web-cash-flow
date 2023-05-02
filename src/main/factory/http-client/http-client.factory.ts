import { AxiosHttpClient } from "@/infra/http/axios-http-client";

export const makeHttpFactory = (): AxiosHttpClient => new AxiosHttpClient();
