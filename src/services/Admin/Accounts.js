import { instance as axios } from "../AxiosInstance";

export async function getStaffAccounts() {
  const response = await axios.get("/account/getStaffAccounts/");
  return response.data;
}

export async function getCustomerAccounts() {
  const response = await axios.get("/account/getCustomerAccounts/");
  return response.data;
}

export async function createStaffAccount(obj) {
  const response = await axios.post("/account/addAccount/", obj);
  return response.data;
}
