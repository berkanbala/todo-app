import axios from "axios";

const createApiClient = (options: { baseUrl: string }) => {
  if (!options?.baseUrl) {
    console.warn("cannot find appConfig baseUrl");
  }

  const accessToken = window.localStorage.getItem("accessToken") ?? undefined;

  const apiClient = axios.create({
    baseURL: options.baseUrl,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS,DELETE,PUT",
      "Access-Control-Allow-Credentials": true,
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return apiClient;
};

const createWireFrameClient = () => {
  return createApiClient({ baseUrl: `${process.env.REACT_APP_API_URL}` });
};

export const todoApiClient = createWireFrameClient();
