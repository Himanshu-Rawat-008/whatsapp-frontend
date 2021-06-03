import axios from "axios";

// created a base URL

const api = axios.create({
  baseURL: "http://localhost:9000",
});

export default api;
