import { instance as axios } from "../AxiosInstance";

//Brands

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

//Thread Types

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

export async function addThreadTypes(threadyTypeArray) {
  const response = await axios.post(
    "/threadType/addThreadType/",
    threadyTypeArray
  );
  return response.data;
}

export async function updateThreadType(id, obj) {
  const response = await axios.put(`/threadType/updateThreadType/${id}/`, obj);
  return response.data;
}

export async function deleteThreadType(id) {
  const response = await axios.delete(`/threadType/deleteThreadType/${id}/`);
  return response.data;
}
