import axios from "axios"
import { getCookie } from "cookies-next"
const serverEndpoint = process.env.NEXT_PUBLIC_SERVER_ENDPOINT
const serverBaseUrl = serverEndpoint + "/api/v1/"
export const axiosClient = axios.create({
  baseURL: serverBaseUrl,
  headers: {
    Authorization: `Bearer ${getCookie("authToken") ?? ""}`,
  },
  withCredentials: true,
})

axiosClient.interceptors.request.use(
  (config) => {
    const token = getCookie("authToken")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)
