import { instance as axios } from "../AxiosInstance";

export async function getActivityLogs(page) {
  let endpoint;
  if (!page) {
    endpoint = `/logs/allLogs/?page=0`;
  } else {
    endpoint = `/logs/allLogs/?page=${page}`;
  }
  const response = await axios.get(endpoint);
  return response.data;
}
