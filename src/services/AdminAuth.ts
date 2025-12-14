import { SERVER_URL } from "../config";
import axios from "axios";

const instance = axios.create({
    baseURL:SERVER_URL.API_URL,
    //timeout:1000
})


type loginPayload =  {
    email:string | null | FormDataEntryValue,
    password:string | null | FormDataEntryValue
}


type registerPayload =  {
    email:string | null | FormDataEntryValue,
    password:string | null | FormDataEntryValue,
    name:string | null | FormDataEntryValue,
    access_code:string | null | FormDataEntryValue
}

export const Register = async (payload:registerPayload)=>{
    const response = await instance.post("/admin/register" , {
        ...payload
    });
    return response;
}

type registerLimitedPayload =  {
    email:string | null | FormDataEntryValue,
    password:string | null | FormDataEntryValue,
    name:string | null | FormDataEntryValue,
}

export const RegisterLimited = async (payload:registerLimitedPayload)=>{
    const response = await instance.post("/admin/register/limited" , {
        ...payload
    },{
        headers: {
            authorization:`BEARER ${localStorage.getItem("token")}`
        }
    }
    );
    return response;
}

export const Login = async (payload:loginPayload)=>{
    const response = await instance.post("/admin/login", {
        ...payload
    });
    return response;
}