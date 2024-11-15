import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3006/",
});

export const getTodo = async () => {
    return await api.get("/todos");
};

export const addTodo = async (task) => {
    return await api.post("/todos", task);
};

export const updateTodo = async (id, updatedTask) => {
    return await api.patch(`/todos/${id}`, updatedTask);
};

export const deleteTodo = async (id) => {
    return await api.delete(`/todos/${id}`);
};

export default api;
