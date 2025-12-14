import { SERVER_URL } from "../config";
import axios from "axios";
import Logger from "../utils/Logger";

const instance = axios.create({
    baseURL:SERVER_URL.API_URL+"/room",
    //timeout:1000
})


export const GetRoomsType = async ()=>{
    const response = await instance.get("/types");
    return response;
}

export const GetRoom  = async ()=> {
    const response = await instance.get("/all")
    return  response;
}