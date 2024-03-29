import { instance as axios } from "../AxiosInstance";

export async function loginUser(obj) {
  const response = await axios.post("/account/login/", obj);
  return response.data;
}
