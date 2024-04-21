import { instance as axios } from "../AxiosInstance";

export async function getOrders() {
  const response = await axios.get("/orders/getAllOrders/");
  return response.data;
}

export async function verifyOrder(id) {
  const response = await axios.get(`/orders/verify/${id}`);
  return response.data;
}

export async function pickupOrder(id) {
  const response = await axios.get(`/orders/forPickup/${id}`);
  return response.data;
}

export async function completeOrder(id) {
  const response = await axios.get(`/orders/completeOrder/${id}`);
  return response.data;
}

export async function invalidOrder(id) {
  const response = await axios.get(`/orders/invalidOrder/${id}`);
  return response.data;
}

export async function kioskCompleteOrder(token) {
  const response = await axios.get(`/kiosk/setAsCompleted/${token}`);
  return response.data;
}

export async function orderStatistics() {
  const response = await axios.get("/orders/getFinishedOrders");
  return response.data;
}
