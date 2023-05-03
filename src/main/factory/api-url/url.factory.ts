export const makeApiParameterUrlFactory = (path: string) => `${process.env.API_URL_PARAMETER}${path}`;
export const makeApiFlowUrlFactory = (path: string) => `${process.env.API_URL_FLOW}${path}`;
