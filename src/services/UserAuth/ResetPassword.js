import { instance as axios } from "../AxiosInstance";

export async function resetPasswordUser(token, obj) {
  const response = await axios.post(`/account/resetPassword/${token}/`, obj);
  return response.data;
}

export async function changePasswordUser(obj) {
  const response = await axios.post(`/account/changePassword/${obj.id}`, obj);
  return response.data;
}
