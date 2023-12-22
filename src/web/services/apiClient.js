import config from "@/web/config";
import axios from "axios"

const apiClient = axios.create({
    baseURL: config.api.baseUrl,
})

export default apiClient