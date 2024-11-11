import axios from "axios";
import { parseCookies } from "nookies";

const { AMAZONDEX_TOKEN: token } = parseCookies();

export const axiosRequest = axios.create({
  baseURL: "http://145.223.26.191:8080/",
});

if (token) {
  axiosRequest.defaults.headers["Authorization"] = `Bearer ${token}`;
}
