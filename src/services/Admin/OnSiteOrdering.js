import { instance as axios } from "../AxiosInstance";

export async function startOrder() {
  const response = await axios.get("onsiteOrder/startOrder");
  return response.data;
}

export async function addOrder(obj) {
  const response = await axios.post("onsiteOrder/addOrder", obj);
  return response.data;
}

export async function deleteOrder(id) {
  const response = await axios.delete(`onsiteOrder/removeOrder/${id}`);
  return response.data;
}

export async function getCurrentOrders() {
  const response = await axios.get("onsiteOrder/getAllCurrentOrders");
  return response.data;
}

export async function checkoutOrders(obj) {
  const response = await axios.post("onsiteOrder/checkout", obj);
  return response.data;
}

export async function cancelOrders(obj) {
  const response = await axios.post("onsiteOrder/cancelCheckout", obj);
  return response.data;
}
