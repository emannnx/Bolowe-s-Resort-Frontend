import { SERVER_URL } from "../config";
import axios from "axios";

const instance = axios.create({
    baseURL:SERVER_URL.API_URL,
    //timeout:1000
})

interface contactUsPayloadType  {
    email:string,
    message:string,
    name:string
}

export const ContactUs = async (payload:contactUsPayloadType) => {
    const response = await instance.post("/contact",{
        ...payload
    })

    return response;

}
