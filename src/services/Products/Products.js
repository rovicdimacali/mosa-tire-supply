import { instance as axios } from "../AxiosInstance";

export async function addItemToCart(obj) {
  const response = await axios.post("/cart/addOrder/", obj);
  return response.data;
}

export async function getCartItems() {
  const response = await axios.get("/cart/getUserCurrentOrders/");
  return response.data;
}

export async function checkoutCartItems(obj) {
  const response = await axios.post("/cart/checkout/", obj);
  return response.data;
}

export async function cancelCheckout(obj) {
  const response = await axios.post("/cart/cancelCheckout/", obj);
  return response.data;
}

export async function startKioskOrder() {
  const response = await axios.get("/kiosk/startOrder/");
  return response.data;
}

export async function addKioskItemToCart(obj) {
  const kioskToken = localStorage.getItem("kioskToken");
  const response = await axios.post(`/kiosk/addItem/${kioskToken}`, obj);
  return response.data;
}
