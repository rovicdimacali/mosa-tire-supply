import { instance as axios } from "../AxiosInstance";

export async function getBrands() {
  const response = await axios.get("/brand/getAllBrands/");
  return response.data;
}

export async function addBrand(brandArray) {
  const response = await axios.post("/brand/addBrand/", brandArray);
  return response.data;
}
