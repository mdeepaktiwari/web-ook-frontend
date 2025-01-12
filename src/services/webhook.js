import axiosInstance from "../../axiosConfig";

export const subscribeWebhook = async (data) =>
  axiosInstance.post("/webhook", data);

export const fetchWebhook = async () => axiosInstance.get("/webhook");

export const updateWebhook = async (data) => {
  return axiosInstance.patch("/webhook", data);
};
