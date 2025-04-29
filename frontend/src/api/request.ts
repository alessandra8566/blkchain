import axios from "axios";
import { API_URL } from "@/config/env"

const requests = [API_URL]
  .filter((url) => url)
  .map((url) => {
    const request = axios.create({ baseURL: url });

    request.interceptors.response.use((response) => response);
    return request;
  });

export const request = requests[0]
