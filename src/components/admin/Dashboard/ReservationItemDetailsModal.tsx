import { useEffect, useState } from "react"
import { GetReservation } from "../../../services/Reservation";
import Logger from "../../../utils/Logger";
import { Modal, IconButton, Skeleton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import RefreshIcon from '@mui/icons-material/Refresh';
import { convertDbTimeToReadable } from "../../../utils/Convert_db_time_to_user_readable";
import Status from "./Status";
import BookingStatus from "../../../Constants/Status"
import { GetSingleRoom } from "../../../services/Admin";

interface propTypes {
    open:boolean;
    setOpen:any;
    reservationId:string;
}
const ReservationItemDetailsModal = ({open, setOpen, reservationId}:propTypes)=>{
    const [loading, setLoading] = useState<boolean>(false);
    const [reservation, setReservation] = useState<any>({});
    const [error, setError] = useState(false)
    const [refresh, setRefresh]  = useState(false)
    const [room, setRoom] = useState<any>({})
    console.log(reservationId)
    useEffect(()=>{
        const FetchReservation = ()=> {
            setLoading(true)
            setError(false)
            GetReservation(reservationId).then(
                res=>{
                    setLoading(false);
                    setReservation(res.data.data)
                    if (res.data.data?.roomBookings && res.data.data?.roomBookings.length>0) {
                        getRoomDetail(res.data.data?.roomBookings[0].room)
                    }
                },
                err=>{
                    setError(true)
                    setLoading(false)
                    Logger("Reservation detail Error:", err)
                }
            )
        }

        FetchReservation();
    },[refresh,reservationId])

    const getRoomDetail = (roomId:string)=> {
        GetSingleRoom(roomId).then(
            res=> setRoom(res.data?.data),
            err=>Logger("Error fetching room",err)
        )
    }

    return (
        <Modal open={open}>
            <div className="flex justify-center w-full z-[999999] pt-20 focus:outline-none ">
                <div className="bg-white w-[90%] px-5 minMd:px-10 py-5 rounded-[10px] minMd:w-[500px] mintablet:w-[700px] h-[650px] overflow-y-auto">
                    <div className="w-full flex justify-end"><IconButton  onClick={()=>setOpen(false)}><CloseIcon/></IconButton></div>
                    <h1 className="text-center font-bold text-[21px] leading-[25px]">Reservation details</h1>
                    {
                        error && !loading && 
                        <div className="w-full h-full flex flex-col items-center justify-center">
                            <p className="">Ooops, an error has occured.</p>
                            {/* <p> Refresh</p> */}
                            <IconButton title="refresh" className="!bg-gray-400" onClick={()=>setRefresh(refresh=>!refresh)}>
                                <RefreshIcon/>
                            </IconButton>
                        </div>
                           
                    }

                    {
                        !error && !loading &&
                        <div>
                            <h1 className="text-center mt-5 font-semibold font-playfair">Customer details</h1>
                            <div className="grid grid-cols-12  mt-3">
                                <p className="col-span-8 text-[14px] leading-[16px] font-semibold">Name</p>
                                <p className="col-span-4 text-[14px] leading-[16px]  text-start break-words">{reservation?.customerName}</p>
                            </div>  
                            <div className="grid grid-cols-12 mt-3">
                                <p className="col-span-8 text-[14px] leading-[16px]  font-semibold">Customer phone No.</p>
                                <p className="col-span-4 text-start text-[14px] leading-[16px]  break-words">{reservation?.customerPhoneNumber}</p>
                            </div>
                            <div className="grid grid-cols-12  mt-3">
                                <p className="col-span-8 text-[14px] leading-[16px]  font-semibold">CustomerEmail</p>
                                <p className="col-span-4  text-start text-[14px] leading-[16px]  break-words">{reservation?.customerEmail}</p>
                            </div>

                            <>
                                    <h1 className="text-center mt-5 font-semibold font-playfair">Booking and payment details</h1>
                                    <div className="grid grid-cols-12  mt-3">
                                        <p className="col-span-8 text-[14px] leading-[16px] font-semibold">Amount paid</p>
                                        <p className="col-span-4 text-[14px] leading-[16px]  text-start break-words">
                                            {reservation?.currency}{reservation?.amountPaid?reservation?.amountPaid:"0.00"}
                                        </p>
                                    </div>  
                                    <div className="grid grid-cols-12 mt-3">
                                        <p className="col-span-8 text-[14px] leading-[16px]  font-semibold">Quantity</p>
                                        <p className="col-span-4 text-start text-[14px] leading-[16px]  break-words">{reservation?.quantity}</p>
                                    </div>
                                    <div className="grid grid-cols-12 mt-3">
                                        <p className="col-span-8 text-[14px] leading-[16px]  font-semibold">Number of Guests</p>
                                        <p className="col-span-4 text-start text-[14px] leading-[16px]  break-words">{reservation?.numberOfGuests}</p>
                                    </div>
                                    <div className="grid grid-cols-12  mt-3">
                                        <p className="col-span-8 text-[14px] leading-[16px]  font-semibold">Check in date</p>
                                        <p className="col-span-4  text-start text-[14px] leading-[16px]  break-words">{convertDbTimeToReadable(reservation?.checkIn)[0]}</p>
                                    </div>
                                    <div className="grid grid-cols-12  mt-3">
                                        <p className="col-span-8 text-[14px] leading-[16px]  font-semibold">Check out date</p>
                                        <p className="col-span-4  text-start text-[14px] leading-[16px]  break-words">
                                            {reservation?.checkOut?convertDbTimeToReadable(reservation?.checkOut)[0]:"N/A"}
                                        </p>
                                    </div>
                                    <div className="grid grid-cols-12  mt-3">
                                        <p className="col-span-8 text-[14px] leading-[16px] font-semibold">Transaction ID</p>
                                        <p className="col-span-4 text-[14px] leading-[16px]  text-start break-words">{reservation?.transactionId}</p>
                                    </div> 
                                    <div className="grid grid-cols-12  mt-3">
                                        <p className="col-span-8 text-[14px] leading-[16px] font-semibold">Reservation ID</p>
                                        <p className="col-span-4 text-[14px] leading-[16px]  text-start break-words">{reservation?._id}</p>
                                    </div> 
                                    <div className="grid grid-cols-12  mt-3">
                                        <p className="col-span-8 text-[14px] leading-[16px] font-semibold">Payment type/method</p>
                                        <p className="col-span-4 text-[14px] leading-[16px]  text-start break-words capitalize">{reservation?.paymentMethod}</p>
                                    </div> 
                                    <div className="grid grid-cols-12  mt-3">
                                        <p className="col-span-8 text-[14px] leading-[16px] font-semibold">Booking status</p>
                                        <p className="col-span-4 text-[14px] leading-[16px]  text-start break-words">
                                            <Status status={reservation?.status}/>
                                        </p>
                                    </div> 
                                    <div className="grid grid-cols-12  mt-3">
                                        <p className="col-span-8 text-[14px] leading-[16px] font-semibold">Payment status</p>
                                        <p className="col-span-4 text-[14px] leading-[16px]  text-start break-words">
                                            {
                                                reservation?.status === BookingStatus.BOOKED &&
                                                <p className="text-green-700">Successful</p>
                                            }
                                            {
                                                reservation?.status === BookingStatus.PAID_BUT_FAILED &&
                                                <p className="text-yellow-700">Pending</p>
                                            }
                                            {
                                                reservation?.status === BookingStatus.PENDING &&
                                                <p className="text-red-700">No payment</p>
                                            }
                                        </p>
                                        
                                    </div> 
                                    <div className="grid grid-cols-12  mt-3">
                                        <p className="col-span-8 text-[14px] leading-[16px] font-semibold">Booked by</p>
                                        <p className="col-span-4 text-[14px] leading-[16px]  text-start break-words">
                                            {reservation?.bookedBy}
                                        </p>
                                    </div> 
                                </> 
                               
                                {
                                reservation?.package &&
                                <>
                                    <h1 className="text-center mt-5 font-semibold font-playfair">Package details</h1>
                                    <div className="grid grid-cols-12  mt-3">
                                        <p className="col-span-8 text-[14px] leading-[16px] font-semibold">Name</p>
                                        <p className="col-span-4 text-[14px] leading-[16px]  text-start break-words">{reservation?.package?.name}</p>
                                    </div>  
                                    <div className="grid grid-cols-12 mt-3">
                                        <p className="col-span-8 text-[14px] leading-[16px]  font-semibold">Price</p>
                                        <p className="col-span-4 text-start text-[14px] leading-[16px]  break-words">{reservation?.package?.currency}{reservation?.package?.price}</p>
                                    </div>
                                    <div className="grid grid-cols-12  mt-3">
                                        <p className="col-span-8 text-[14px] leading-[16px]  font-semibold">Discounted price</p>
                                        <p className="col-span-4  text-start text-[14px] leading-[16px]  break-words">{reservation?.package?.currency}{reservation?.package?.discountedPrice}</p>
                                    </div>
                                    <div className="grid grid-cols-12  mt-3">
                                        <p className="col-span-8 text-[14px] leading-[16px] font-semibold">Package ID</p>
                                        <p className="col-span-4 text-[14px] leading-[16px]  text-start break-words">{reservation?.package?._id}</p>
                                    </div> 
                                    <div className="grid grid-cols-12  mt-3">
                                        <p className="col-span-8 text-[14px] leading-[16px] font-semibold">Max. number of person(s)</p>
                                        <p className="col-span-4 text-[14px] leading-[16px]  text-start break-words">{reservation?.package?.numberOfGuest}</p>
                                    </div> 
                                </>
                            }
                            {
                                reservation?.roomBookings && room &&
                                <>
                                    <h1 className="text-center mt-5 font-semibold font-playfair">Room details</h1>
                                    <div className="grid grid-cols-12  mt-3">
                                        <p className="col-span-8 text-[14px] leading-[16px] font-semibold">Room type</p>
                                        <p className="col-span-4 text-[14px] leading-[16px]  text-start break-words">{room?.roomType}</p>
                                    </div>  
                                    <div className="grid grid-cols-12 mt-3">
                                        <p className="col-span-8 text-[14px] leading-[16px]  font-semibold">Price</p>
                                        <p className="col-span-4 text-start text-[14px] leading-[16px]  break-words">{room?.currency}{room?.price}</p>
                                    </div>
                                    <div className="grid grid-cols-12  mt-3">
                                        <p className="col-span-8 text-[14px] leading-[16px]  font-semibold">Discounted price</p>
                                        <p className="col-span-4  text-start text-[14px] leading-[16px]  break-words">{room?.currency}{room?.discountedPrice}</p>
                                    </div>
                                    <div className="grid grid-cols-12  mt-3">
                                        <p className="col-span-8 text-[14px] leading-[16px] font-semibold">Room ID</p>
                                        <p className="col-span-4 text-[14px] leading-[16px]  text-start break-words">{room?._id}</p>
                                    </div> 
                                    <div className="grid grid-cols-12  mt-3">
                                        <p className="col-span-8 text-[14px] leading-[16px] font-semibold">Max. number of person(s)</p>
                                        <p className="col-span-4 text-[14px] leading-[16px]  text-start break-words">{room?.maxNoOfPeople}</p>
                                    </div> 
                                </>
                            }
                        </div>
                    }

                    {
                        !error && loading &&
                        <div>
                        <h1 className="flex justify-center">
                            <Skeleton variant="text" width="300px"/>
                        </h1>
                        <div className="grid grid-cols-12  mt-3">
                            <p className="col-span-8 text-[14px] leading-[16px] font-semibold">
                                <Skeleton variant="text" width="200px"/>
                            </p>
                            <p className="col-span-4 text-[14px] leading-[16px]  text-start break-words">
                            <Skeleton variant="text" width="200px"/>
                            </p>
                        </div>  
                        <div className="grid grid-cols-12 mt-3">
                            <p className="col-span-8 text-[14px] leading-[16px]  font-semibold">
                                <Skeleton variant="text" width="200px"/>
                            </p>
                            <p className="col-span-4 text-start text-[14px] leading-[16px]  break-words">
                                <Skeleton variant="text" width="200px"/>
                            </p>
                        </div>
                        <div className="grid grid-cols-12  mt-3">
                            <p className="col-span-8 text-[14px] leading-[16px]  font-semibold">
                                <Skeleton variant="text" width="200px"/>
                            </p>
                            <p className="col-span-4  text-start text-[14px] leading-[16px]  break-words">
                                <Skeleton variant="text" width="200px"/>
                            </p>
                        </div>

                        <>
                                <h1 className="flex justify-center">
                                    <Skeleton variant="text" width="300px"/>
                                </h1>
                                <div className="grid grid-cols-12  mt-3">
                                    <p className="col-span-8 text-[14px] leading-[16px] font-semibold">
                                        <Skeleton variant="text" width="200px"/>
                                    </p>
                                    <p className="col-span-4 text-[14px] leading-[16px]  text-start break-words">
                                        <Skeleton variant="text" width="200px"/>
                                    </p>
                                </div>  
                                <div className="grid grid-cols-12 mt-3">
                                    <p className="col-span-8 text-[14px] leading-[16px]  font-semibold">
                                        <Skeleton variant="text" width="200px"/>
                                    </p>
                                    <p className="col-span-4 text-start text-[14px] leading-[16px]  break-words">
                                        <Skeleton variant="text" width="200px"/>
                                    </p>
                                </div>
                                <div className="grid grid-cols-12  mt-3">
                                    <p className="col-span-8 text-[14px] leading-[16px]  font-semibold">
                                        <Skeleton variant="text" width="200px"/>
                                    </p>
                                    <p className="col-span-4  text-start text-[14px] leading-[16px]  break-words">
                                        <Skeleton variant="text" width="200px"/>
                                    </p>
                                </div>
                                <div className="grid grid-cols-12  mt-3">
                                    <p className="col-span-8 text-[14px] leading-[16px]  font-semibold">
                                        <Skeleton variant="text" width="200px"/>
                                    </p>
                                    <p className="col-span-4  text-start text-[14px] leading-[16px]  break-words">
                                        <Skeleton variant="text" width="200px"/>
                                    </p>
                                </div>
                                <div className="grid grid-cols-12  mt-3">
                                    <p className="col-span-8 text-[14px] leading-[16px] font-semibold">
                                        <Skeleton variant="text" width="200px"/>
                                    </p>
                                    <p className="col-span-4 text-[14px] leading-[16px]  text-start break-words">
                                        <Skeleton variant="text" width="200px"/>
                                    </p>
                                </div> 
                                <div className="grid grid-cols-12  mt-3">
                                    <p className="col-span-8 text-[14px] leading-[16px] font-semibold">
                                        <Skeleton variant="text" width="200px"/>
                                    </p>
                                    <p className="col-span-4 text-[14px] leading-[16px]  text-start break-words">
                                         <Skeleton variant="text" width="200px"/>
                                    </p>
                                </div> 
                                <div className="grid grid-cols-12  mt-3">
                                    <p className="col-span-8 text-[14px] leading-[16px] font-semibold">
                                    <Skeleton variant="text" width="200px"/>
                                    </p>
                                    <p className="col-span-4 text-[14px] leading-[16px]  text-start break-words">
                                    <Skeleton variant="text" width="200px"/>
                                    </p>
                                    
                                </div> 
                               
                            </> 
                           
                            
                    </div>
                    }
                            
                </div>
            </div>
 
        </Modal>
    )
}


export default ReservationItemDetailsModal;
