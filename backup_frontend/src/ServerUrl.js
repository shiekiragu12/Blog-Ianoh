import axios from "axios";

export const serverUrl = axios.create({
  baseURL: "http://localhost:5000/api",
});
