import { SERVER_URL } from "../config";
import axios from "axios";

const instance = axios.create({
    baseURL:SERVER_URL.API_URL,
    //timeout:1000
})


export const GetPackages = async ()=>{
    const response = await instance.get("/package/all");
    return response;
}

export const GetPackageCategories = async ()=>{
    const response = await instance.get("/package/category/all");
    return response;
}

