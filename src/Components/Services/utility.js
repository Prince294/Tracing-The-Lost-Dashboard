import axios from "axios";

const http = axios.create({
  baseURL: "http://52.87.208.94:8000/",
});

export default http;
