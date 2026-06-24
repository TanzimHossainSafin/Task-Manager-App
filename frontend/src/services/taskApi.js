import axios from "axios";

const api = axios.create({
  baseURL: "/api/tasks"
});

const getErrorMessage = (error, fallbackMessage) => {
  return error.response?.data?.message || fallbackMessage;
};

export const getTasks = async () => {
  try {
    const response = await api.get("/");
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error, "Could not load tasks"));
  }
};

export const createTask = async (taskData) => {
  try {
    const response = await api.post("/", taskData);
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error, "Could not add task"));
  }
};

export const updateTaskStatus = async (taskId, status) => {
  try {
    const response = await api.patch(`/${taskId}/status`, { status });
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error, "Could not update task"));
  }
};

export const deleteTask = async (taskId) => {
  try {
    const response = await api.delete(`/${taskId}`);
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error, "Could not delete task"));
  }
};
