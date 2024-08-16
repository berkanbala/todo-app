import { todoApiClient } from "../../clients/todoClient";

export const createTodo = async (todo: { text: string; time: string }) => {
  const response = await todoApiClient.post("/todo/create", todo);

  return response.data;
};

export const deleteTodo = async (id: string) => {
  const response = await todoApiClient.delete(`/todo/delete/${id}`);

  return response.data;
};

export const getAllTodos = async () => {
  const response = await todoApiClient.get("/todo/getAll");

  return response.data;
};

export const updateTodo = async (
  id: string,
  todo: { title: string; completed: boolean }
) => {
  const response = await todoApiClient.put(`/todo/update/${id}`, todo);

  return response.data;
};

export const getOneTodo = async (id: string) => {
  const response = await todoApiClient.get(`/todo/getOne/${id}`);

  return response.data;
};
