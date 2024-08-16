import { todoApiClient } from "../../clients/todoClient";

export const login = async (user: IUserValues) => {
  const response = await todoApiClient.post("/user/login", user);

  return response.data;
};

export const register = async (user: IUserValues) => {
  const response = await todoApiClient.post("/user/register", user);

  return response.data;
};

interface IUserValues {
  username: string;
  password: string;
}
