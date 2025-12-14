import { useEffect, useState } from 'react';
import './Booking.css';
import Book1 from '../../../assets/images/book1.svg';
import Book2 from "../../../assets/images/book2.svg";
import Book3 from "../../../assets/images/book32.svg";
import Book4 from "../../../assets/images/book4.svg";
import { useForm } from 'react-hook-form';
import Carousell from '../Carousell';
import { GetPackages } from '../../../services/Package';
import { BookAccomodation, BuyTicket, GetBookedDates } from '../../../services/Reservation';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Alert from '../../Alert';
import {ClipLoader} from "react-spinners";
import BookTypes from '../../../Constants/BookTypes';
import { GetRoomsType } from '../../../services/Accomodation';
import formDataToObject from '../../../utils/formDataToObject';
import { ThemeProvider, createTheme } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const Booking = () => {
  const [packages, setPackages]  = useState([])
  const [roomTypes, setRoomTypes] = useState([])
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const {type} = useParams();
  const [errMsg,setErrMsg] = useState("")
  const [searchParams, setSearchParams] = useSearchParams();
  const [bookedDates, setBookedDates] = useState([]);
  const [selectedRoomType, setSelectedRoomType] = useState<string|null>("")
  const [checkInDate, setCheckInDate] = useState<Date|null|undefined|any>()
  const [checkOutDate, setCheckOutDate] = useState<Date|null|undefined|any>()
  



  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(()=>{
    const checkInParam = searchParams.get("check_in_date");
    const checkOutParam = searchParams.get("check_out_date");
    setCheckInDate(checkInParam ? dayjs(checkInParam) : null)
    setCheckOutDate(checkOutParam ? dayjs(checkOutParam) : null)
  },[searchParams])

  useEffect(()=>{
    const fetchedBookedDate = ()=>{
      GetBookedDates(selectedRoomType).then(
        res=>{
          const disabledDates = res.data?.bookedDates?.map((bookedDate:string|any)=>new Date(bookedDate)) 
          //console.log(disabledDates)
          setBookedDates(disabledDates)
        },
        err=>{
          console.log(err)
        }
      )
    }

    if (type===BookTypes.ACCOMODATION) {
      fetchedBookedDate()
    }
  },[selectedRoomType, type])

  useEffect(()=>{
   const getPackages = ()=> {
    GetPackages().then(res=>{
        setPackages(res.data);
        console.log(res.data)
    })
   }

   const fetchRoomTypes = ()=> {
    GetRoomsType().then(
      res=>{
        setRoomTypes(res.data.data)
        console.log(res.data.data)
      },
      err=>{
        console.log(err)
      }
    )
  }

  if (type===BookTypes.ACCOMODATION) {
    fetchRoomTypes()
  }

  else if (type===BookTypes.PACKAGE) {
    getPackages()
  }
  },[type])

  //const { register, handleSubmit } = useForm();


  const onSubmit = async (evt:any) =>  {
    evt.preventDefault()
    const formData =  new FormData(evt.target)
    formData.append("checkIn",(checkInDate?.toISOString() as string))
    
    if (type===BookTypes.ACCOMODATION) {
      formData.append("checkOut",(checkOutDate?.toISOString() as string))
    }

    const data = formDataToObject(formData);
    setErrMsg("")
    setIsLoading(true)
    
    if (type===BookTypes.PACKAGE) {
        if (!data.packageId) {
          setIsError(true);
          (document.getElementById("buyTicketPackageId") as HTMLInputElement).value=""
          setErrMsg("Please select package")
          setIsLoading(false)
          return
        }
        if (!data.customerEmail) {
          setIsError(true);
          (document.getElementById("buyTicketCustomerEmail") as HTMLInputElement).value=""
          setErrMsg("Please provide your email")
          setIsLoading(false)
          return
        }
        if (!data.customerName) {
          setIsError(true);
          (document.getElementById("buyTicketCustomerName") as HTMLInputElement).value=""      
          setErrMsg("Please provide your name")
          setIsLoading(false)
          return
        }
        if (!data.customerPhoneNumber) {
          setIsError(true);
          (document.getElementById("buyTicketCustomerPhoneNumber") as HTMLInputElement).value=""
          setErrMsg("Please provide your phone number")
          setIsLoading(false)
          return
        }
        if (data.numberOfGuests<=0) {
          setIsError(true);
          (document.getElementById("buyTicketNumberOfPeople") as HTMLInputElement).value=""
          setErrMsg("Number of guests can not be negative value or zero")
          setIsLoading(false)
          return
        }
      BuyTicket(data,data.packageId).then(
        res=>
        {
          setIsLoading(false)
          window.location.href= res.data.paymentLink;
          setIsError(false)
        },
        err=>
        { 
          setIsLoading(false)
          setIsError(true)
          setErrMsg(err.response.data.msg)
          console.log(err)
        })
      
      }

      else if (type===BookTypes.ACCOMODATION) {
        
        if (!data.roomType) {
          setIsError(true);
          (document.getElementById("bookRoomType") as HTMLInputElement).value=""
          setErrMsg("Please select room type")
          setIsLoading(false)
          return
        }
        if (!data.customerEmail) {
          setIsError(true);
          (document.getElementById("bookCustomerEmail") as HTMLInputElement).value=""
          setErrMsg("Please provide your email")
          setIsLoading(false)
          return
        }
        if (!data.customerName) {
          setIsError(true);
          (document.getElementById("bookCustomerName") as HTMLInputElement).value=""      
          setErrMsg("Please provide your name")
          setIsLoading(false)
          return
        }
        if (!data.customerPhoneNumber) {
          setIsError(true);
          (document.getElementById("bookCustomerPhoneNumber") as HTMLInputElement).value=""
          setErrMsg("Please provide your phone number")
          setIsLoading(false)
          return
        }
        if (data.numberOfRooms<=0) {
          setIsError(true);
          (document.getElementById("bookNumberOfRooms") as HTMLInputElement).value=""
          setErrMsg("Number of rooms can not be negative value or zero")
          setIsLoading(false)
          return
        }
        if (data.numberOfGuests<=0) {
          setIsError(true);
          (document.getElementById("bookNumberOfPeople") as HTMLInputElement).value=""
          setErrMsg("Number of guests can not be negative value or zero")
          setIsLoading(false)
          return
        }
        BookAccomodation(data).then(
          res=>
          {
            setIsLoading(false)
            window.location.href= res.data.paymentLink;
            setIsError(false)
          },
          err=>
          { 
            setIsLoading(false)
            setIsError(true)
            setErrMsg(err.response.data.msg)
            console.log(err)
          })
      }
     
    }

  const theme = createTheme({
    palette: {
      primary: {
        main: '#000000', // Replace with your desired primary color
      },
      // You can customize other palette colors here as well.
    },
  });
  
  const isDateDisabled = (date:Date) => {
   
     //Check if the date is in the array of disabled dates
     return bookedDates.some((disabledDate:Date) =>  {
       //return date.toISOString()?.split("T")[0] === disabledDate.toISOString().split("T")[0] || date < new Date()
       return new Date(date.toISOString() as string)?.getTime() === disabledDate?.getTime() || new Date(date.toISOString())?.getTime() < new Date().getTime()
     }
     );
  };
  
  return (
    <ThemeProvider theme={theme}>
      <div id="reservations" className="page">
      <Carousell>
        <div
          className="hero !bg-center"
          style={{ backgroundImage: `url(${Book1})` }}
        >
          <p className='text-black'>BOOKING</p>
        </div>
        <div
          className="hero !bg-center"
          style={{ backgroundImage: `url(${Book2})` }}
        >
          <p className='text-black'>Book a date with us</p>
        </div>
        <div
          className="hero !bg-center"
          style={{ backgroundImage: `url(${Book3})` }}
        >
          <p className='text-black'>Make  payment and</p>  
        </div>
        <div
          className="hero !bg-center"
          style={{ backgroundImage: `url(${Book4})` }}
        >
          <p className='text-black'>tender your reciept on your check in day</p>
        </div>
      </Carousell>
      <div className="available">
        {
            type===BookTypes.ACCOMODATION && 
            <form onSubmit={onSubmit} className="form w-full">
            <h1 className='text-start'>BOOK A PACKAGE/ROOM</h1>
            <div><Alert show={isError} setShow={setIsError} type='failure' timeout={7000} message={errMsg}/></div>
          <div className='w-full grid grid-cols-1 gap-y-4 minMd:grid-cols-2 minMd:gap-x-4'>
            <div className='flex flex-col  space-y-3'>
              <select defaultValue={searchParams.get("item_id")||""} id="bookRoomType" 
                required placeholder="Select room type" 
                className='capitalize' name="roomType"
                onChange={(evt)=>setSelectedRoomType(evt.target.value)}
              >
                <option value="" disabled>
                  Select room type/category
                </option>
                {
                  roomTypes?.map((type:any,index:number)=>{
                    return (
                      <option selected={searchParams.get("item_id")===type?.name} key={index} value={type?.name}>{type.name}</option>
                    )
                  })
                }
              </select>
             
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Check-in Date"
                    value={checkInDate}
                    onChange={(newValue) => setCheckInDate(newValue)}
                    shouldDisableDate={isDateDisabled}
                  />
                </LocalizationProvider>
               <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Check-out Date"
                    value={checkOutDate}
                    onChange={(newValue) => setCheckOutDate(newValue)}
                    shouldDisableDate={isDateDisabled}
                  />
                </LocalizationProvider>
              {/* </label> */}
              <input
                placeholder="Number of people"
                type="number"
                id="bookNumberOfPeople"
                defaultValue =  {searchParams.get("number_of_people")||""}
                name="numberOfGuests"
                //{...register('numberOfGuests')}
                required
                min="0"
              />
              <input
                placeholder="Number of rooms"
                type="number"
                id="bookNumberOfRooms"
                defaultValue =  {searchParams.get("number_of_room")||""}
                name="numberOfRooms"
                //{...register('numberOfRooms')}
                required
                min="0"
              />
              <button  className="hidden minMd:block submit cursor-pointer"  type="submit">
                {isLoading? <ClipLoader color='#ffffff'/> : "Book"}
              </button>
            </div>
            <div className='flex flex-col space-y-3'>
              <input
                placeholder="Your full name"
                type="text"
                id="bookCustomerName"
                name="customerName"
                autoComplete='name'
                //{...register('customerName')}
                required
              />
              <input
                placeholder="Your email"
                type="email"
                id="bookCustomerEmail"
                name="customerEmail"
                autoComplete='email'
                //{...register('customerEmail')}
              />
              <input
                required
                placeholder="Your phone number"
                id="bookCustomerPhoneNumber"
                type="tel"
                name="customerPhoneNumber"
                //{...register('customerPhoneNumber')}
                autoComplete='tel'
              />
            </div>
            <button  className="minMd:hidden submit cursor-pointer"  type="submit">
                {isLoading? <ClipLoader color='#ffffff'/> : "Book"}
              </button>
          </div>
          </form>
        }
         {
            type===BookTypes.PACKAGE && 
            <form onSubmit={onSubmit} className="form w-full">
            <h1 className='text-start'>BOOK A PACKAGE/ROOM</h1>
            <div><Alert show={isError} setShow={setIsError} type='failure' timeout={7000} message={errMsg}/></div>
          <div className='w-full grid grd-cols-1 minMd:grid-cols-2 minMd:gap-x-4  gap-y-4'>
            <div className='flex flex-col space-y-3'>
              <select defaultValue={searchParams.get("item_id")|| ""} id="buyTicketPackageId" name="packageId"  required placeholder="Select Package">
                <option value="" disabled>
                  Select Package 
                </option>
                {
                  packages?.map((pack:any,index:number)=>{
                    return (
                      <option selected={searchParams.get("item_id")===pack?._id} key={index} value={pack?._id}>{pack.name}<br/> {pack?.numberOfGuest === 1 ? `${pack.numberOfGuest} Person`:`${pack.numberOfGuest} People`}</option>
                    )
                  })
                }
              </select>
             
               <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Check-in Date"
                    value={checkInDate}
                    onChange={(newValue) => setCheckInDate(newValue)}
                  />
                </LocalizationProvider>
              <input
                placeholder="Number of people"
                type="number"
                id="buyTicketNumberOfPeople"
                name="numberOfGuests"
                required
                min="0"
              />
              <button  className="hidden minMd:block submit cursor-pointer"  type="submit">
                {isLoading? <ClipLoader color='#ffffff'/> : "Buy ticket"}
              </button>
            </div>
            <div className='flex flex-col space-y-3'>
              <input
                placeholder="Your full name"
                type="text"
                id="buyTicketCustomerName"
                name="customerName"
                required
                autoComplete='name'
              />
              <input
                placeholder="Your email"
                type="email"
                id="buyTicketCustomerEmail"
                name="customerEmail"
                required
                autoComplete='email'
              />
              <input
                placeholder="Your phone number"
                type="tel"
                id="buyTicketPhoneNumber"
                name="customerPhoneNumber"
                required
                autoComplete='tel'
              />
            </div>
            <button  className="minMd:hidden submit cursor-pointer"  type="submit">
                {isLoading? <ClipLoader color='#ffffff'/> : "Buy ticket"}
              </button>
          </div>
          </form>
        }
       
      </div> 
    </div>
    </ThemeProvider>
  );
};

export default Booking;
