import { SERVER_URL } from "../config";
import axios from "axios";

const instance = axios.create({
    baseURL:SERVER_URL.API_URL,
    headers: {
        authorization:`Bearer ${localStorage.getItem("token")}`
    }
})


export  const CreateRoom = async (payload:any)=>{
    const response =  await instance.post("/room/new", {
        ...payload 
    },
    {
        headers: {
            'Content-Type': 'multipart/form-data', 
            'authorization':`Bearer ${localStorage.getItem("token")}`
          },
    })
    return response;
}

export const DeleteRoom = async (roomId:string)=>{
    const response = await instance.delete(`/room/${roomId}`, {
        headers: {            
            'authorization':`Bearer ${localStorage.getItem("token")}`,
          },
    });
    return response;
}

export  const CreateRoomType = async (payload:any)=>{
    const response =  await instance.post("/room/type/new", {
        ...payload 
    },{
        headers: {            
            'authorization':`Bearer ${localStorage.getItem("token")}`,
          },
    }
   )
    return response;
}

export  const UpdateRoom = async (roomType:string,payload:any)=>{
    const response =  await instance.put(`/room/${roomType}`, {
        ...payload 
    },
    {
        headers: {
            'Content-Type': 'multipart/form-data', 
            'authorization':`Bearer ${localStorage.getItem("token")}`
          },
    }
   )
    return response;
}

export const GetSingleRoom =  async (roomId:string)=> {
    const response =  await instance.get(`/room/${roomId}`,{
        headers: {
            'Content-Type': 'multipart/form-data', 
            'authorization':`Bearer ${localStorage.getItem("token")}`
          },
    })
    return response;
}

export const CreatePackage =  async (payload:any)=> {
    const response =  await instance.post('/package/new', {
        ...payload
    },{
        headers: {
            'Content-Type': 'multipart/form-data', 
            'authorization':`Bearer ${localStorage.getItem("token")}`,
            'Accept': 'application/json',
          },
    })
    return response;
}

export const UpdatePackage =  async (payload:any,packageId:string)=> {
    const response =  await instance.put(`/package/${packageId}`, {
        ...payload
    },
    {
        headers: {
            'Content-Type': 'multipart/form-data', 
            'authorization':`Bearer ${localStorage.getItem("token")}`
          },
    })
    return response;
}

export const GetSinglePackage =  async (packageId:string)=> {
    const response =  await instance.get(`/package/${packageId}`,{
        headers: {
            'Content-Type': 'multipart/form-data', 
            'authorization':`Bearer ${localStorage.getItem("token")}`
          },
    })
    
    return response;
}


export const deletePackage =  async (packageId:string)=> {
    const response =  await instance.delete(`/package/${packageId}`,{
        headers: {
            'authorization':`Bearer ${localStorage.getItem("token")}`
          },
    })
    return response;
}


export const GetStaff = async ()=> {
    const respose = await instance.get("/admin/all",{
        headers: {
            'authorization':`Bearer ${localStorage.getItem("token")}`
          },
    });
    return respose;  
}

export const deleteStaff =  async (staffId:string)=> {
    const response =  await instance.delete(`/admin/${staffId}`,{
        headers: {
            'authorization':`Bearer ${localStorage.getItem("token")}`
          },
    })
    return response;
}


export const CreatePackageCategory =  async (payload:any)=> {
    const response =  await instance.post('/package/category', {
        ...payload
    },{
        headers: {
            'authorization':`Bearer ${localStorage.getItem("token")}`,
            'Accept': 'application/json',
          },
    })
    return response;
}
