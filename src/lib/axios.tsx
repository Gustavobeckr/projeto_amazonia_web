import axios from "axios";
import { parseCookies } from "nookies";

const { AMAZONDEX_TOKEN: token } = parseCookies();

export const axiosRequest = axios.create({
  baseURL: "http://191.96.251.229:8080/",
});

if (token) {
  axiosRequest.defaults.headers["Authorization"] = `Bearer ${token}`;
}
