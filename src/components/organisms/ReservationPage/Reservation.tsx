import { useEffect,  useState } from 'react';
import './reservations.css';
import reserve1 from '../../../assets/images/reserve1.png';
import Carousell from '../Carousell';
import { GetPackages } from '../../../services/Package';
import { CheckAccomodationAvailability, CheckAvailability, GetBookedDates } from '../../../services/Reservation';
import Modal from '../../Modal';
import CloseIcon from "../../../assets/icons/close_icon.svg";
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Alert from '../../Alert';
import { ClipLoader } from 'react-spinners';
import Swimming from "../../../assets/new_images/Image_from_iOS_8.jpg"
import Culture from "../../../assets/new_images/PROGRESS UNISEX SALON_18.jpg"
import Attraction from "../../../assets/new_images/Image from iOS (10).jpg"
import EventAndMeeting from "../../../assets/images/eventAndMeeting.jpg"
import Bike from "../../../assets/images/bike_new.jpg"
import BookTypes from '../../../Constants/BookTypes';
import { GetRoomsType } from '../../../services/Accomodation';
import BookingNew1 from "../../../assets/images/booking_new_1.jpeg"
import BookingNew2 from "../../../assets/images/booking_new_2.jpeg"
import Calender from "../../../assets/images/calender.jpeg"
import Logger from '../../../utils/Logger';
import formDataToObject from '../../../utils/formDataToObject';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { createTheme, ThemeProvider } from '@mui/material';

const Reservations = () => {
  const [packages, setPackages]  = useState([])
  const [roomTypes, setRoomTypes] = useState([])
  const [isAvailable, setIsAvailable] = useState(false)
  const [isError, setIsError] = useState(false)
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const {type} = useParams()
  const [errMsg, setErrMsg] = useState("")
  const [searchParams, setSearchParams] = useSearchParams()
  const [bookedDates, setBookedDates] = useState([]);
  const [selectedRoomType, setSelectedRoomType] = useState<string|null>("")
  const [checkInDate, setCheckInDate] = useState<Date|null|undefined>()
  const [checkOutDate, setCheckOutDate] = useState<Date|null|undefined>()

  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedRoomType(searchParams.get("item_id"))
  }, [searchParams]);

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
      if (type===BookTypes.PACKAGE) {
      GetPackages().then(res=>{
          setPackages(res.data);
          console.log(res.data)
      })
    }

    else if (type===BookTypes.ACCOMODATION) {
        GetRoomsType().then(
          res=>{
            setRoomTypes(res.data.data)
          },
          err=>{
            console.log(err)
            
          }
        )
    }

    else {
      GetRoomsType().then(
        res=>{
          setRoomTypes(res.data.data)
        },
        err=>{
          console.log(err)
        }
      )
    }
  },[type])

  //const { register, handleSubmit } = useForm();

  const onSubmit = async (evt:any) =>  {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    formData.append("checkIn",(checkInDate?.toISOString() as string))
    formData.append("checkOut",(checkOutDate?.toISOString() as string))
    //formData.

    const data = formDataToObject(formData)
    setIsLoading(true);
    setErrMsg("")
    
    if (type===BookTypes.PACKAGE) {
      CheckAvailability(data).then(
        res=>
        {
          setIsLoading(false)
          setIsAvailable(true)
          setIsError(false)
        },
        err=>
        { 
          setIsLoading(false)
          setIsAvailable(false)
          setErrMsg(err.response.data?.msg)
          setIsError(true)
        })
    }

    else if (type===BookTypes.ACCOMODATION) {
      if (!data.roomType) {
        setIsError(true);
        (document.getElementById("roomType") as HTMLInputElement).value=""
        setErrMsg("Please select room type")
        setIsLoading(false)
        return
      }
      if (data.numberOfRooms<=0) {
        setIsError(true);
        (document.getElementById("numberOfRoom") as HTMLInputElement).value=""
        setErrMsg("Number of rooms can not be negative value or zero")
        setIsLoading(false)
        return
      }
      if (data.numberOfGuests<=0) {
        setIsError(true);
        (document.getElementById("numberOfPeople") as HTMLInputElement).value=""
        setErrMsg("Number of guests can not be negative value or zero")
        setIsLoading(false)
        return
      }
      CheckAccomodationAvailability(data).then(
        res=>
        {
          setIsLoading(false)
          setIsAvailable(true)
          Logger("Data:",res)
          setIsError(false)
        },
        err=>
        { 
          setIsLoading(false)
          setIsAvailable(false) 
          setIsError(true)
          setErrMsg(err.response.data?.msg)
        }) 
    }
    
    }
   


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBookClick  = ()=> {
    const checkIn = checkInDate?.toISOString()
    const checkout = checkOutDate?.toISOString()
    const  roomType = (document.getElementById("roomType") as HTMLInputElement)?.value
    const numberOfGuests = (document.getElementById("numberOfPeople") as HTMLInputElement)?.value
    const numberOfRoom = (document.getElementById("numberOfRoom") as HTMLInputElement)?.value

    navigate(`/booking/${type}?check_in_date=${checkIn}&check_out_date=${checkout}&item_id=${roomType}&number_of_people=${numberOfGuests}&number_of_room=${numberOfRoom}`)
  }

  const isDateDisabled = (date:Date) => {
   
     return bookedDates.some((disabledDate:Date) =>  {
       //return date.toISOString()?.split("T")[0] === disabledDate.toISOString().split("T")[0] || date < new Date()
       return new Date(date.toISOString() as string)?.getTime() === disabledDate?.getTime() || new Date(date.toISOString())?.getTime() < new Date().getTime()
     }
     );
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: '#000000', // Replace with your desired primary color
      },
      // You can customize other palette colors here as well.
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div id="reservations" className="page">
      <Carousell>
        <div
          className="hero"
          style={{ backgroundImage: `url(${BookingNew1})` }}
        >
          <p>RESERVATION</p>
        </div>
        <div
          className="hero"
          style={{ backgroundImage: `url(${BookingNew2})` }}
        >
          <p>Book a date with us</p>
        </div>
        <div
          className="hero"
          style={{ backgroundImage: `url(${Calender})` }}
        >
          <p>Pick a date</p>
        </div>
      </Carousell>
      <div className="available">
         {
          type===BookTypes.PACKAGE &&
              <form onSubmit={onSubmit} className="form">
              <h1>CHECK AVAILABILITY</h1>
              <div><Alert show={isError} setShow={setIsError} type='failure' timeout={7000} message={errMsg}/></div>
              <select placeholder="Select Package" name="packageId">
                <option value="" disabled>
                  Select Package 
                </option>
                {
                  packages?.map((pack:any,index:number)=>{
                    return (
                      <option  key={index} value={pack?._id}>{pack.name}</option>
                    )
                  })
                }
              </select>
              
              <input
                placeholder="Check-in Date"
                type="date"
                name="checkIn"
              />
              <input
                placeholder="Check-out Date"
                type="date"
                name="checkOut"
              />
              
              <input
                placeholder="Number of people"
                type="number"
                name="numberOfGuests"
              />
              <button className="submit cursor-pointer" value="" type="submit">
                {isLoading? <ClipLoader color="#ffffff"/>:"Check Availability"}
              </button>
            </form>
         }

        {
          type===BookTypes.ACCOMODATION &&
              <form onSubmit={onSubmit} className="form">
              <h1>CHECK AVAILABILITY</h1>
              <div><Alert show={isError} setShow={setIsError} type='failure' timeout={7000} message={errMsg}/></div>
              <select id="roomType"  defaultValue={searchParams.get("item_id") || ""} 
                required placeholder="Select room type" className='capitalize' name="roomType"  
                onChange={(evt)=>setSelectedRoomType(evt.target.value)}
              >
                <option value="" disabled>
                  Select room type/category
                </option>
                {
                  roomTypes?.map((type:any,index:number)=>{
                    return (
                      <option  selected={searchParams.get("item_id")===type?.name} key={index} value={type?.name}>{type.name}</option>
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
              <input
                required
                placeholder="Number of people"
                type="number"
                id="numberOfPeople"
                name="numberOfGuests" 
                min="0"
              />
              <input
                required
                placeholder="Number of rooms"
                type="number"
                id="numberOfRoom"
                name="numberOfRooms"
                min="0"
              />
              <button className="submit cursor-pointer" value="" type="submit">
                {isLoading? <ClipLoader color="#ffffff"/>:"Check Availability"}
              </button>
            </form>
         }
        <div className="reserve-imgs">
          <img className='rounded-[10px]' src={Swimming} alt="" />
          <img className='rounded-[10px]' src={Culture} alt="" />
          <img  className='rounded-[10px]' src={Attraction} alt="" />
          <img  className='rounded-[10px]' src={EventAndMeeting} alt="" />
          <img className='rounded-[10px]' src={Bike} alt="" />
          <img className='rounded-[10px]' src={reserve1} alt="" />
        </div>
      </div>
      <Modal open={isAvailable}>
        <div className='bg-white w-[80%] minMd:w-[700px] h-auto rounded-[10px] px-4 py-8'>
          <div className='flex justify-between items-center'>
            <h3 className='text-[24px] leading-[34px] font-bold'>Proceed to booking?</h3>
            <button onClick={()=>setIsAvailable(false)}><img src={CloseIcon} alt=""/></button>
          </div>

          <p className='font-semibold text-[18px] leading-[24px] mt-5 text-[#000]'>Cheers! <p className='font-normal'>{type===BookTypes.PACKAGE?"This package is available for booking.":"Delighted to inform you that we currently have availability for accommodation at our esteemed hotel."}</p></p>
          <p className='mt-3'>Would you like to proceed to booking?</p>
          <div className='flex flex-col minMd:flex-row  mt-10  minMd:mt-0 minMd:justify-end'>
            <button onClick={handleBookClick} className='bg-black text-white rounded-[4px] px-4 py-3 order-2 minMd:ml-4 mt-4 minMd:mt-0'>Book</button>
            <button onClick={()=>setIsAvailable(false)} className='bg-transparent border border-solid border-[#000]  text-black rounded-[4px] px-4 py-3 order-1'>Cancel</button>
          </div>
        </div>
      </Modal>
    </div>
    </ThemeProvider>
  );
};

export default Reservations;
