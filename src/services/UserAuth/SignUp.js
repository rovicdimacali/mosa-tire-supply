import { instance as axios } from "../AxiosInstance";

export async function signUpUser(obj) {
  const response = await axios.post("/account/register/", obj);
  return response.data;
}

export async function signUpOTPUser(obj) {
  const response = await axios.post(`/account/registerOtp/${obj.userID}`, {
    otp: obj.otp,
  });
  return response.data;
}
