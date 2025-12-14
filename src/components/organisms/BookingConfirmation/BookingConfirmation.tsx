import React, { useEffect, useState } from 'react';
import './BookingConfirmation.css';
import { useParams } from 'react-router';
import { GetReservation } from '../../../services/Reservation';
import { ClipLoader } from 'react-spinners';
import Status from '../../../Constants/Status';


const BookingConfirmation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [reservation, setReservation] = useState<any>(null);
  const {reservationId} = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log(reservationId)
  }, []);

  useEffect(()=>{
     GetReservation(reservationId?reservationId:"").then(
         res=>{
         setReservation(res.data.data)
         console.log(res.data.data)
         },
         err=> {
             console.log(err)
         }
     )
  },[])

  if (!reservation) {
        return  (
            <div id="bookingConfirmation" className='w-full bg-gray-100 min-h-[100vh] py-40 flex items-center justify-center'>
                <div className='flex flex-col items-center'>
                    <ClipLoader color="#000"/>
                    <p className='font-medium'>Please wait while we confirm your booking...</p>
                </div>
            </div>
        )
  }

  return (
    <div id="bookingConfirmation" className='w-full bg-gray-100 min-h-[100vh] py-40 flex flex-col justify-center'>
        <div className='self-center w-[95%] minMd:w-[700px] '>
            <h1 className='text-start text-black/60   font-bold'>Congrats! Your reservation is successful and has been recorded on our database. 
                <p className='mt-3'>We look forward to receiving you with all pleasure</p>
            </h1>
        </div>
        <div className='self-center mt-10 w-[95%] minMd:w-[700px] h-full bg-white '>
            <div className='grid grid-cols-12  bg-black px-6 md:px-10  py-4 justify-between items-center'>
                <h1 className='text-white col-span-8 font-bold text-[21px] leading-[29px]'>Booking Receipt #</h1>
                <p className='text-[#D3D3D3] col-span-4 minMd:col-start-11 break-words'>{reservation?._id}</p>
            </div>
            <div className='flex flex-col space-y-3 px-6 md:px-10  py-4'>
                <div className='grid grid-cols-12 w-full justify-between items-center '>
                    <p className='font-semibold col-span-8 capitalize'>Package/Item name</p>
                    <p className="col-span-4 minMd:col-start-11 text-start break-words">{reservation?.type}</p>
                </div>
                <div className='grid grid-cols-12 justify-between items-center '>
                    <p className='font-semibold col-span-8'>Quantity</p>
                    <p className="col-span-4 text-start minMd:col-start-11">1</p>
                </div>
                <div className='grid grid-cols-12 justify-between items-center '>
                    <p className='font-semibold col-span-8 capitalize'>Check in date</p>
                    <p className="col-span-4 text-start break-words minMd:col-start-11">{new Date(reservation?.checkIn).toDateString()}</p>
                </div>
                <div className='grid grid-cols-12 justify-between items-center '>
                    <p className='font-semibold col-span-8 capitalize'>Check out date</p>
                    <p className="col-span-4 text-start break-words minMd:col-start-11">{new Date(reservation?.checkOut).toDateString()}</p>
                </div>
                <div className='grid grid-cols-12 justify-between items-center '>
                    <p className='font-semibold col-span-8 capitalize'>Customer Phone Number</p>
                    <p className="col-span-4 text-start break-words minMd:col-start-11">{reservation?.customerPhoneNumber}</p>
                </div>
                <div className='grid grid-cols-12 justify-between items-center '>
                    <p className='font-semibold col-span-8 capitalize'>Customer Name</p>
                    <p className="col-span-4 text-start break-words minMd:col-start-11">{reservation.customerName}</p>
                </div>
                <div className='grid grid-cols-12 justify-between items-center'>
                    <p className='font-semibold col-span-8 capitalize'>Customer Email</p>
                    <p className="col-span-4 text-start break-all minMd:col-start-11">{reservation.customerEmail}</p>
                </div>
                
                <div className='grid grid-cols-12 justify-between items-center '>
                    <p className='font-semibold col-span-8 capitalize'>Transaction Id</p>
                    <p className="col-span-4 text-start break-words minMd:col-start-11">{reservation.transactionId}</p>
                </div>
                <div className='grid grid-cols-12 justify-between items-center '>
                    <p className='font-semibold col-span-8 capitalize'>Booking status</p>
                    {
                        reservation?.status===Status.BOOKED &&  <p className="col-span-4 text-start break-all minMd:col-start-11 bg-green-300 rounded-[2px] px-2 text-green-700">Successful</p>
                    }
                    {
                        reservation?.status===Status.PAID_BUT_FAILED &&  <p className="col-span-4 text-start break-all minMd:col-start-11">Paid but failed</p>
                    }
                    {
                        reservation?.status===Status.FAILURE &&  <p className="col-span-4 text-start break-all minMd:col-start-11 bg-red-300 rounded-[2px] px-2 text-red-700">Failed</p>
                    }
                     {
                        reservation?.status===Status.PENDING &&  <p className="col-span-4 text-start break-all minMd:col-start-11 bg-yellow-300 rounded-[2px] px-2 text-yellow-700">Pending</p>
                    }
                </div>
                <div className='grid grid-cols-12 justify-between items-center '>
                    <p className='font-semibold col-span-8 capitalize'>Booked on</p>
                    <p className="text-start col-span-4 minMd:col-start-11">{new Date(reservation?.dateCreated).toDateString()}</p>
                </div>
                <div className='grid grid-cols-12 justify-between items-center '>
                    <p className='font-semibold col-span-8 capitalize'>Number of Guest(s)</p>
                    <p className="text-start col-span-4 minMd:col-start-11">{reservation?.numberOfGuests}</p>
                </div>
                <div className='grid grid-cols-12 justify-between items-center '>
                    <p className='font-semibold col-span-8 capitalize'>Amount paid</p>
                    <p className="text-start col-span-4 minMd:col-start-11">N{reservation?.amountPaid}</p>
                </div>
                <div className='grid grid-cols-12 justify-between items-center '>
                    <p className='font-semibold col-span-8 capitalize'>Total price</p>
                    <p className="text-start col-span-4 font-medium minMd:col-start-11">N{reservation?.price}</p>
                </div>
                <div className='self-end'>
                    <button onClick={()=>window.print()} className='bg-black rounded-[10px] text-white px-3 py-2'>Print</button>
                </div>
            </div>
        </div>
        
    </div>
  );
};

export default BookingConfirmation;