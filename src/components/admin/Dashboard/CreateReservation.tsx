import Modal from "../../Modal"
import {Formik, Form, Field, FormikValues, FieldArray, useFormikContext} from "formik";
import { FormControl, Input, InputLabel, FormHelperText, Select, MenuItem, Button, 
        FilledInput, OutlinedInput, TextField, IconButton, Alert, FormLabel, RadioGroup, 
        FormControlLabel, Radio, ToggleButton, ToggleButtonGroup

 } from "@mui/material";
import * as yup from "yup"
import Logger from "../../../utils/Logger";
import { useEffect, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Delete';
import InputAdornment from "@mui/material/InputAdornment";
import { CreatePackage, CreateRoom } from "../../../services/Admin";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import FormErrorMessage from "../../FormErrorMessage";
import BookTypes from "../../../Constants/BookTypes";
import { GetRoomsType } from "../../../services/Accomodation";
import { GetPackages } from "../../../services/Package";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from "dayjs";
import React from "react";
import { BookAccomodationByAdmin, ButTicketByAdmin, GetPrice } from "../../../services/Reservation";
import { GetBookedDates } from "../../../services/Reservation";

const CreateReservationForm =  ({open,setOpen}:any)=> {
        const [currenStep, setCurrentStep] = useState(1)
        const MAX_STEP=3;
        const [loading, setLoading] = useState(false)
        const  [type, setType] = useState<string>()
        const [packages, setPackages] = useState([])
        const [roomTypes, setRoomTypes] = useState([])
        const [checkIn, setCheckIn] = React.useState<Date|null|undefined|any>(dayjs(''));
        const [checkOut, setCheckOut] = React.useState<Date|null|undefined|any>(dayjs(''));
        const [error, setError ] = useState("")
        const [bookedDates, setBookedDates] = useState([]);
        const [selectedRoomType, setSelectedRoomType] = useState<any>("");
        const [estimating, setEstimating] = useState(false);
        const [peopleNo, setPeopleNo] = useState<number|any>();
        const [selectedPackage, setSelectedPackage] = useState("");
        const [estimatedPrice, setEstimatedPrice] = useState({price: Number, currency: ""});
        const [roomNo, setRoomNo ] = useState<number|any>()
        const [showOther, setShowOther] = useState(false);

        useEffect(()=>{
                const getPackages = ()=> {
                 GetPackages().then(res=>{
                     setPackages(res.data);
                     
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
        },[selectedRoomType])
        
        useEffect(()=>{
               
                
                // if (type===BookTypes.ACCOMODATION && !(checkIn?.toDate()?.toISOString()?.length()<=0 ) && !(checkOut?.toDate()?.toISOString()?.length()<=0) && peopleNo && !(selectedRoomType?.length() <=0 )) {
                        if (type===BookTypes.ACCOMODATION && (checkIn !==undefined ) && (checkOut !==undefined) && roomNo && !(selectedRoomType?.length <=0 )) {
                        setEstimating(true)
                        const query  = `?checkIn=${checkIn.toDate()?.toISOString()}&checkOut=${checkOut.toDate()?.toISOString()}&numberOfRooms=${roomNo}&roomType=${selectedRoomType}`
                        GetPrice(BookTypes.ACCOMODATION,query).then(
                                res=> {
                                        setEstimating(false)
                                        setEstimatedPrice({
                                                price:res.data?.price,
                                                currency:res.data?.currency
                                        })
                                        
                                },
                                err=>{
                                        toast.error("Failed to estimate room price. Please check your internet connection or try again")
                                        setEstimating(false)
                                }
                        )
                }
                else  if (type===BookTypes.PACKAGE &&  (checkIn !==undefined ) && peopleNo && selectedPackage) {
                        setEstimating(true)
                        const query  = `?checkIn=${checkIn.toDate()?.toISOString()}&numberOfGuests=${peopleNo}&packageId=${selectedPackage}`
                        GetPrice(BookTypes.PACKAGE+"s",query).then(
                                res=> {
                                        setEstimating(false)
                                        setEstimatedPrice({
                                                price:res.data?.price,
                                                currency:res.data?.currency
                                        })
                                        
                                },
                                err=>{
                                        toast.error("Failed to estimate package price.Please check your internet connection or try again")
                                        setEstimating(false)
                                }
                        )
                }
        },[checkIn, checkOut, peopleNo ,selectedRoomType, type, selectedPackage, roomNo])

        const initialFormValues:FormikValues = type === "accomodation" ? 
                {
                        customerName:"",
                        customerEmail:"",
                        customerPhoneNumber:"",
                        numberOfGuests:null,
                        roomType:"",
                        numberOfRooms:null,
                        checkIn:"",
                        checkOut:"",
                        amountPaid:null  ,
                        paymentType:""   
        
                }:
                {
                        customerName:"",
                        customerEmail:"",
                        customerPhoneNumber:"",
                        numberOfGuests:null,
                        checkIn:"",
                        amountPaid:null ,
                        package:"",
                        paymentType:""  
        
                }

        const formValidation = type === BookTypes.ACCOMODATION ? 
                yup.object({
                        customerName:yup.string().required("Customer name is required"),
                        customerPhoneNumber:yup.string().required("Customer phone number is required"),
                        numberOfGuests:yup.number().required("Please input number of guests"),
                        roomType:yup.string().required("Please select room type"),
                        numberOfRooms:yup.number().required("Input number of rooms"),
                        paymentType:yup.string().required("Payment type is required") 
                        //amountPaid:yup.string().required("Please input amount paid by customer either in cash or other means") 
                }):
                yup.object({
                        customerName:yup.string().required("Customer name is required"),
                        customerPhoneNumber:yup.string().required("Customer phone number is required"),
                        numberOfGuests:yup.number().required("Please input number of guests"),
                        package:yup.string().required("Please select package"),  
                        paymentType:yup.string().required("Payment type is required")                       
                                            
                        //amountPaid:yup.string().required("Please input amount paid by customer either in cash or other means") 
                })


        const handleSumbit = (values:FormikValues)=>  {
                
                const checkInIso = checkIn.toDate().toISOString()
                let checkOutIso; 

                if (type === BookTypes.ACCOMODATION) {
                        checkOutIso = checkOut?.toDate()?.toISOString() 
                }
                //const formattedCheckOutDate =   Date(checkOutIso)
                
               
                 if (type === BookTypes.PACKAGE && !checkInIso)   {
                         setError("Please select check in date")
                         return
                 }
                 if (type === BookTypes.ACCOMODATION && !checkInIso )   {
                         setError("Please select check in date")
                         return
                 }
                 if (type === BookTypes.ACCOMODATION &&  !checkOutIso) {
                         setError("Please select check out date")
                         return  
                 }

                let updatedValues:any = {} ;
                setLoading(true)
                if (type === BookTypes.PACKAGE) {
                        updatedValues  = {
                                ...values, checkIn:checkInIso,amountPaid:estimatedPrice.price
                        }
                        ButTicketByAdmin(updatedValues,updatedValues?.package).then(
                                res=>{
                                        Logger("Successful!")
                                        toast.success("Booking successful")
                                        setLoading(false)
                                        setOpen(false)
                                },
                                err=>{
                                        toast.error(err.response?.data?.msg)
                                        setLoading(false)
                                        Logger("Error buying ticket",err)
                                }
                        )
                }

                if (type === BookTypes.ACCOMODATION) {
                        updatedValues  = {
                                ...values, checkIn:checkInIso,
                                checkOut:checkOutIso, amountPaid:estimatedPrice.price
                        }
                        BookAccomodationByAdmin(updatedValues).then(
                                res=>{
                                        Logger("Successful!")
                                        toast.success("Booking successful")
                                        setLoading(false)
                                        setOpen(false)
                                },
                                err=>{
                                        toast.error(err.response?.data?.msg)
                                        setLoading(false)
                                        Logger("Error booking room",err)
                                        
                                }
                        )
                }
                
                
                 
        }

        const handleTypeChange = (event:React.MouseEvent<HTMLElement>, newType:string) => {
                setType(newType)
        };

        const isDateDisabled = (date:Date) => {
   
                //Check if the date is in the array of disabled dates
                return bookedDates.some((disabledDate:Date) =>  {
                  //return date.toISOString()?.split("T")[0] === disabledDate.toISOString().split("T")[0] || date < new Date()
                  return new Date(date.toISOString() as string)?.getTime() === disabledDate?.getTime() || new Date(date.toISOString())?.getTime() < new Date().getTime()
                }
                );
        };
        return <Modal open={open}>
               <div className="flex justify-center w-full z-[999999]">
                        <div className="bg-white w-[90%] px-5 minMd:px-10 py-5 rounded-[10px] minMd:w-[500px] h-[650px] overflow-y-auto">
                                <div className="w-full flex justify-end"><IconButton  onClick={()=>setOpen(false)}><CloseIcon/></IconButton></div>
                                <h1 className="text-center font-bold text-[21px] leading-[25px]">New reservation</h1>
                                <p className="text-start">Step {currenStep} of {MAX_STEP}</p>
                                <Formik initialValues={initialFormValues}  onSubmit={handleSumbit}
                                        validationSchema={formValidation}
                                        enableReinitialize={true}
                                        render={({ values, errors, handleChange, setFieldValue }) => (
                                                <Form className="w-full mt-5">
                                                {
                                                        currenStep===1 &&
                                                         <div className="flex mt-10 flex-col items-center justify-center">  
                                                                <h3>Select reservation type</h3>
                                                                <ToggleButtonGroup
                                                                        color="primary"
                                                                        value={type}
                                                                        exclusive
                                                                        onChange={handleTypeChange}
                                                                        aria-label="reservation-type"
                                                                        sx={{mt:3}}
                                                                        >
                                                                        <ToggleButton value={BookTypes.ACCOMODATION}>Accomodation</ToggleButton>
                                                                        <ToggleButton value={BookTypes.PACKAGE}>Package</ToggleButton>
                                                                </ToggleButtonGroup>
                                                        
                                                </div>     
                                        }
                                        {
                                                currenStep === 2  &&
                                                <>
                                                        {
                                                                type === BookTypes.ACCOMODATION &&
                                                                <FormControl className="" required>
                                                         
                                                         <Field name="roomType"
                                                          placeholder="Select room type"
                                                          
                                                        >
                                                          {({
                                                          field, // { name, value, onChange, onBlur }
                                                          form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                                          meta,
                                                          }:any)=>(
                                                                <TextField {...field} id="name" aria-describedby="my-helper-text" 
                                                                 label="Room type" select className="capitalize"  
                                                                 onChange={(evt)=>{
                                                                        setSelectedRoomType(evt.target.value)
                                                                        handleChange(evt)
                                                                 }}
                                                                >
                                                                       {
                                                                         roomTypes?.map((type:any,index:number)=>{
                                                                         return (
                                                                         <MenuItem className="capitalize"   key={index} value={type?.name}>{type.name}</MenuItem>
                                                                         )
                                                                         })
                                                                        }  
                                                                </TextField>
                                                          )}
                                                        </Field>
                                                        <FormErrorMessage name="roomType"/>
                                                        </FormControl>
                                                        }

                                                        {
                                                                type === BookTypes.PACKAGE &&
                                                                <FormControl className="" required>
                                                                
                                                                <Field name="package"
                                                                placeholder="Select package"
                                                                >
                                                                {({
                                                                field, // { name, value, onChange, onBlur }
                                                                form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                                                meta,
                                                                }:any)=>(
                                                                        <TextField {...field} id="package" aria-describedby="my-helper-text" 
                                                                        label="Select Package" select className="capitalize"
                                                                        onChange={(evt)=>{
                                                                                handleChange(evt)
                                                                                setSelectedPackage(evt.target.value)
                                                                        }}
                                                                        >
                                                                       {
                                                                        packages?.map((pack:any,index:number)=>{
                                                                        return (
                                                                        <MenuItem  key={index} value={pack?._id}>{pack.name}<br/> {pack?.numberOfGuest === 1 ? `${pack.numberOfGuest} Person`:`${pack.numberOfGuest} People`}</MenuItem>
                                                                        )
                                                                        })
                                                                        }
                                                                </TextField>
                                                          )}
                                                        </Field>
                                                        <FormErrorMessage name="package"/>
                                                        </FormControl>
                                                        }

                                                        <FormControl className="" >                                                        
                                                        
                                                                <LocalizationProvider dateAdapter={AdapterDayjs}>                                                                
                                                                  <DatePicker value={checkIn} 
                                                                        onChange={(newValue)=>setCheckIn(newValue)} 
                                                                        label="Check In" 
                                                                        shouldDisableDate={type===BookTypes?.ACCOMODATION ? isDateDisabled : null as any}
                                                                  />                                                              
                                                                </LocalizationProvider>
                                                        </FormControl>

                                                       {
                                                        type === BookTypes.ACCOMODATION &&
                                                        <FormControl className="" >                                        
                                                               <LocalizationProvider dateAdapter={AdapterDayjs}>                                                                
                                                                 <DatePicker  label="Check out"
                                                                        value={checkOut} 
                                                                        onChange={(newValue)=>setCheckOut(newValue)} 
                                                                        shouldDisableDate={isDateDisabled}
                                                                 />                                                              
                                                               </LocalizationProvider>
                                                       </FormControl>
                                                       }

                                                        <FormControl className="" required>                                                        
                                                         <Field name="numberOfGuests"
                                                          placeholder="Number of people"
                                                        >
                                                          {({
                                                          field, // { name, value, onChange, onBlur }
                                                          form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                                          meta,
                                                          }:any)=>(
                                                                <TextField {...field} id="numberOfGuests" aria-describedby="my-helper-text" 
                                                                label="Number of people" type="number"
                                                                onChange={(evt)=>{
                                                                        handleChange(evt)
                                                                        setPeopleNo(evt.target.value)
                                                                }}
                                                               >
                                                               </TextField>
                                                          )}
                                                        </Field>
                                                        <FormErrorMessage name="numberOfGuests"/>
                                                        </FormControl>
                                                        {
                                                                type === BookTypes.ACCOMODATION &&
                                                                <FormControl className="" required>
                                                        
                                                         <Field name="numberOfRooms"
                                                          placeholder="Number of rooms"
                                                        >
                                                          {({
                                                          field, // { name, value, onChange, onBlur }
                                                          form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                                          meta,
                                                          }:any)=>(
                                                                <TextField {...field} id="numberOfRooms" aria-describedby="my-helper-text" 
                                                                label="Number of rooms" type="number" 
                                                                onChange={(evt)=>{
                                                                        handleChange(evt)
                                                                        setRoomNo(evt.target.value)
                                                                }}
                                                               >
                                                               </TextField>
                                                          )}
                                                        </Field>
                                                        <FormErrorMessage name="numberOfRooms"/>
                                                        </FormControl>
                                                        }

                                                        <FormControl className="" required>
                                                        
                                                               <TextField id="amountPaid" aria-describedby="my-helper-text" 
                                                                label={`Amount${estimatedPrice.currency ? "(" +estimatedPrice.currency + ")" : ""}`} type="number"  
                                                                InputProps={{
                                                                        readOnly: true, // Set the readOnly attribute
                                                                }}
                                                                //onChange={(evt)=>setAmountPaid(evt.target.value)}
                                                                value={estimatedPrice?.price}
                                                              >
                                                              </TextField>
                                                       </FormControl>
                                                       <FormControl>
                                                                <label>Payment Type</label>
                                                                <ToggleButtonGroup
                                                                color="primary"
                                                                value={values.paymentType}
                                                                exclusive
                                                                onChange={(event:React.MouseEvent<HTMLElement>, newType:string) => {
                                                                        if (newType) {
                                                                                setShowOther(false)
                                                                        }
                                                                        setFieldValue("paymentType",newType)
                                                                }}
                                                                aria-label=""
                                                                sx={{mt:3}}
                                                                >
                                                                <ToggleButton value={"cash"}>Cash</ToggleButton>
                                                                <ToggleButton value={"card"}>Card</ToggleButton>
                                                                <ToggleButton value={"bank transfer"}>Bank transfer</ToggleButton>
                                                                <ToggleButton value="" onClick={()=>setShowOther(true)}>Others</ToggleButton>
                                                                </ToggleButtonGroup>
                                                        <FormErrorMessage name="paymentType"/>
                                                       </FormControl>
                                                       {
                                                        showOther ? 
                                                        <FormControl className="" required>
                                                        
                                                                <Field name="paymentType"
                        
                                                                >
                                                                {({
                                                                field, // { name, value, onChange, onBlur }
                                                                form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                                                meta,
                                                                }:any)=>(
                                                                        <TextField {...field} id="paymentType" aria-describedby="my-helper-text" 
                                                                        label="Payment Type" type="text" 
                                                                        
                                                                >
                                                                </TextField>
                                                                )}
                                                                </Field>
                                                              <FormHelperText>Kindly input the payment type if your option is not listed above</FormHelperText>
                                                       </FormControl>:null
                                                       }
                                                        
                                                </>
                                        }
                                        {
                                                currenStep===3  && 
                                                <div className="w-full">
                                                         {Object.keys(errors).length > 0  && (
                                                                <Alert severity="error">
                                                                          Please check through your input again to see of you
                                                                        have provided the required fields
                                                                </Alert>
                                                              
                                                        )}
                                                        {
                                                                error &&
                                                                <Alert severity="error">
                                                                         {error}
                                                                </Alert>
                                                        }
                                                        <div className="w-full">
                                                                <FormControl className="!mt-3 w-full" required>                                                                
                                                                <Field name="customerName"
                                                                placeholder="Customer name"
                                                                >
                                                                {({
                                                                field, // { name, value, onChange, onBlur }
                                                                form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                                                meta,
                                                                }:any)=>(
                                                                        <TextField {...field} id="customerName" aria-describedby="my-helper-text" 
                                                                        label="Customer name" type="text"
                                                                >
                                                                </TextField>
                                                                )}
                                                                </Field>
                                                                <FormErrorMessage name="customerName"/>
                                                                </FormControl>  

                                                                <FormControl className="!mt-3 w-full">                                                                
                                                                <Field name="customerEmail"
                                                                placeholder="Customer email"
                                                                >
                                                                {({
                                                                field, // { name, value, onChange, onBlur }
                                                                form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                                                meta,
                                                                }:any)=>(
                                                                        <TextField {...field} id="customerEmail" aria-describedby="my-helper-text" 
                                                                        label="Customer email" type="text"
                                                                >
                                                                </TextField>
                                                                )}
                                                                </Field>
                                                                <FormErrorMessage name="customerEmail"/>

                                                                </FormControl> 
                                                                <FormControl className="!mt-3 w-full" required>                                                                
                                                                <Field name="customerPhoneNumber"
                                                                placeholder="Customer phone number"
                                                                >
                                                                {({
                                                                field, // { name, value, onChange, onBlur }
                                                                form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                                                meta,
                                                                }:any)=>(
                                                                        <TextField {...field} id="customerPhoneNumber" aria-describedby="my-helper-text" 
                                                                        label="Customer phone number" type="text"
                                                                >
                                                                </TextField>
                                                                )}
                                                                </Field>
                                                                <FormErrorMessage name="customerPhoneNumber"/>
                                                                </FormControl>   
                                                        </div>
                                                               
                                                            
                                                </div>
                                        }
                                        <div>
                                                {
                                                currenStep !== 1 &&
                                                <Button onClick={()=>setCurrentStep(currenStep=>currenStep-1)}>Previous</Button>  
                                                }
                                                {
                                                currenStep !==MAX_STEP &&
                                                <Button disabled={currenStep===1 && !type}  onClick={()=>setCurrentStep(currenStep=>currenStep+1)}>Next</Button>  
                                                }
                                                {
                                                        currenStep===MAX_STEP && 
                                                        <Button variant="contained" type="submit">
                                                                {loading?<CircularProgress size="30px" sx={{color:"#fff"}}/>:"Create"}
                                                        </Button> 
                                                }
                                                        
                                        </div>
                                   </Form>
                                        )}
                                />
                        </div>
                        {
                                estimating &&
                                <div className="bg-[#000]/30 absolute top-0 w-full h-full flex flex-col items-center justify-center space-y-3">
                                <CircularProgress
                                        sx={{
                                                color:"#fff"
                                        }}
                                        size={"2rem"}
                                />
                                <p className="text-white w-[300px] text-center">Please wait while the system estimates the resulting total price...</p>
                        </div>
                        }
               </div>
        
        </Modal>
}

export default CreateReservationForm;