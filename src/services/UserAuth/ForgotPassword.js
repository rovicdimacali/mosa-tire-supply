import { instance as axios } from "../AxiosInstance";

export async function forgotPasswordUser(obj) {
  const response = await axios.post("/account/forgotPassword/", obj);
  return response.data;
}

export async function OTPUser(obj) {
  const response = await axios.post(
    `/account/changePasswordOtp/${obj.userID}`,
    {
      otp: obj.otp,
    }
  );
  return response.data;
}
