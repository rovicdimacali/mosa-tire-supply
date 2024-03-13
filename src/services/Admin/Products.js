import { instance as axios } from "../AxiosInstance";

export async function getBrands() {
  const response = await axios.get("/brand/getAllBrands/");
  return response.data;
}

export async function addBrand(brandArray) {
  const response = await axios.post("/brand/addBrand/", brandArray);
  return response.data;
}

export async function updateBrand(id, obj) {
  const response = await axios.put(`/brand/updateBrand/${id}`, obj);
  return response.data;
}

export async function deleteBrand(id) {
  const response = await axios.delete(`/brand/deleteBrand/${id}`);
  return response.data;
}

export async function getThreadTypes(brand) {
  let endpoint;
  if (brand) endpoint = `/threadType/getAllThreadTypes/${brand}`;
  else endpoint = `/threadType/getAllThreadTypes/""`;
  const response = await axios.get(endpoint);
  return response.data;
}

export async function searchThreadTypes(searchValue) {
  const response = await axios.get(
    `/threadType/searchThreadType/${searchValue}`
  );
  return response.data;
}

export async function addThreadTypes(brandArray) {
  const response = await axios.post("/threadType/addThreadType/", brandArray);
  return response.data;
}
