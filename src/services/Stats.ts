import { SERVER_URL } from "../config";
import axios from "axios";

const instance = axios.create({
    baseURL:SERVER_URL.API_URL,
    //timeout:1000
})

instance.interceptors.request.use(async (config) => {
    config.headers.ContentType = 'application/json';
    return config;
});


export const GetTotalEarnings = async ()=>  {
    const response = await instance.get("/stats/total_earnings",{
        headers: {
            authorization:`BEARER ${localStorage.getItem("token")}`
        }
    });
    return response;
}
