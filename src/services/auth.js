import axiosInstance from "../../axiosConfig";

export const login = async (data) =>
  await axiosInstance.post("/auth/login", data);

export const signUp = async (data) =>
  await axiosInstance.post("/auth/signup", data);
