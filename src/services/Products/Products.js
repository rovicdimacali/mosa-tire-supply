import { instance as axios } from "../AxiosInstance";

export async function addItemToCart(obj) {
  const response = await axios.post("/cart/addOrder/", obj);
  return response.data;
}

export async function getCartItems() {
  const response = await axios.get("/cart/getUserCurrentOrders/");
  return response.data;
}

export async function removeCartItem(id) {
  const response = await axios.delete(`cart/removeOrder/${id}`);
  return response.data;
}

export async function checkoutCartItems(obj) {
  const response = await axios.post("/cart/checkout/", obj);
  return response.data;
}

export async function orderNowItems(obj) {
  const response = await axios.post("/cart/orderNow/", obj);
  return response.data;
}

export async function cancelCheckout(obj) {
  const response = await axios.post("/cart/cancelCheckout/", obj);
  return response.data;
}

export async function payCheckout(obj) {
  const response = await axios.post("/cart/pay/", obj);
  return response.data;
}

export async function getUserOrders() {
  const response = await axios.get("/cart/getAllUserOrders/");
  return response.data;
}

export async function startKioskOrder() {
  const response = await axios.get("/kiosk/startOrder/");
  return response.data;
}

export async function getKioskCart() {
  const kioskToken = localStorage.getItem("kioskToken");
  const response = await axios.get(`/kiosk/getAllCurrentOrders/${kioskToken}`);
  return response.data;
}

export async function addKioskOrder(obj) {
  const kioskToken = localStorage.getItem("kioskToken");
  const response = await axios.post(`/kiosk/addOrder/${kioskToken}`, obj);
  return response.data;
}

export async function deleteKioskOrder(id) {
  const kioskToken = localStorage.getItem("kioskToken");
  const response = await axios.delete(
    `/kiosk/removeOrder/?orderId=${id}&kioskToken=${kioskToken}`
  );
  return response.data;
}

export async function checkoutKioskOrder(obj) {
  const kioskToken = localStorage.getItem("kioskToken");
  const response = await axios.post(`/kiosk/checkout/${kioskToken}`, obj);
  return response.data;
}

export async function orderNowKiosk(obj) {
  const kioskToken = localStorage.getItem("kioskToken");
  const response = await axios.post(`/kiosk/orderNow/${kioskToken}`, obj);
  return response.data;
}

export async function cancelKioskOrder() {
  const kioskToken = localStorage.getItem("kioskToken");
  const response = await axios.get(`/kiosk/cancelCheckout/${kioskToken}`);
  return response.data;
}

export async function getKioskOrderStatus() {
  const kioskToken = localStorage.getItem("kioskToken");
  const response = await axios.get(`/kiosk/getOrderStatus/${kioskToken}`);
  return response.data;
}

export async function getCriticalStocks() {
  const response = await axios.get("/threadTypeDetails/getCriticalStocks");
  return response.data;
}
