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

interface avalailabilityCheckPayloadType {
    packageId:string,
    checkIn:string,
    checkOut:string,
    numberOfGuests:number
}

interface accomodationAvalailabilityCheckPayloadType {
    roomType:string,
    checkIn:string,
    checkOut:string,
    numberOfGuests:number,
    numberOfRooms: number
}

export const CheckAvailability  =   async (payload:avalailabilityCheckPayloadType)=> {
    const response = await  instance.post("/bookings/availability/package",{
        ...payload
    })
    return response;
} 

export const CheckAccomodationAvailability  =   async (payload:accomodationAvalailabilityCheckPayloadType)=> {
    const response = await  instance.post("/bookings/availability/room",{
        ...payload
    })
    return response;
} 


export const GetReservation  =   async (reservationId:string)=> {
    const response = await  instance.get(`/bookings/reservation/${reservationId}`)
    return response;
} 

//?searchTerm=${searchTerm}&sortBy=${sortBy}&limit=${limit}
export const GetReservations  =   async (searchTerm?:string, sortBy?:string ,limit?:number)=> {
    const response = await  instance.get(`/bookings/reservations/all?searchTerm=${searchTerm}&sortBy=${sortBy}&limit=${limit}`, {
        headers: {
            authorization:`BEARER ${localStorage.getItem("token")}`
        }
    })
    return response;
}

export const GetTodayReservations  =   async ()=> {
    const response = await  instance.get(`/bookings/reservations/today`, {
        headers: {
            authorization:`BEARER ${localStorage.getItem("token")}`
        }
    })
    return response;
}

export const GetBookedDates = async (roomType:string|null)=>{
    const response = await  instance.get(`/bookings/availability/booked-dates/${roomType}`, {
        headers: {
            authorization:`BEARER ${localStorage.getItem("token")}`
        }
    })
    return response;
}

export const CancelReservation = async (reservationId:string)=>{
    const response = await  instance.put(`/bookings/reservation/${reservationId}/cancel`, {
        headers: {
            authorization:`BEARER ${localStorage.getItem("token")}`
        }
    })
    return response;
}


interface buyTicketPayloadType {
    packageId:string,
    checkIn:string,
    numberOfGuests:number,
    customerName:string,
    customerPhoneNumber:string,
    customerEmail:string
    

}

interface bookAccomodationPayloadType {
    roomType:string,
    checkIn:string,
    checkOut:string,
    numberOfGuests:number,
    customerName:string,
    customerPhoneNumber:string,
    customerEmail:string,
    numberOfRooms:number
    

}

export const BuyTicket = async (payload:buyTicketPayloadType, packageId:string)=> {
    const response = await  instance.post(`/bookings/package/${packageId}`,{
        ...payload
    })

    return response;

} 

export const BookAccomodation = async (payload:bookAccomodationPayloadType)=> {
    const response = await  instance.post(`/bookings/accomodation`,{
        ...payload
    })

    return response;
}

export const BookAccomodationByAdmin  = async (payload:any)=> {
    const response = await instance.post(`/bookings/accomodation/admin/`,{
        ...payload
    },
    {
        headers: {
            authorization:`BEARER ${localStorage.getItem("token")}`
        }
    }
    )

    return response;

}

export const ButTicketByAdmin  = async (payload:any, packageId:string)=> {
    const response = await instance.post(`/bookings/package/admin/${packageId}`,{
        ...payload
    },
    {
        headers: {
            authorization:`BEARER ${localStorage.getItem("token")}`
        }
    }
    )

    return response;

}


export const GetPrice = async (type:string,query:string)=>{
    const response = await  instance.get(`/bookings/item/details/${type}${query}`, {
        headers: {
            authorization:`BEARER ${localStorage.getItem("token")}`
        }
    })
    return response;
}



