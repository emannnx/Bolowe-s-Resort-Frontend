import Modal from "../../Modal"
import {Formik, Form, Field, FormikValues} from "formik";
import { FormControl,  InputLabel, FormHelperText,  Button,  OutlinedInput,  IconButton } from "@mui/material";
import * as yup from "yup"
import Logger from "../../../utils/Logger";
import CloseIcon from '@mui/icons-material/Close';
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import FormErrorMessage from "../../FormErrorMessage";
import { useState } from "react";
import { CancelReservation as cr } from "../../../services/Reservation";

const CancelReservation =  ({open,setOpen}:any)=> {
       
       const [loading, setLoading] = useState(false)

        const initialFormValues:FormikValues = {
               reservationId:""
        }

        const formValidation = yup.object({
                reservationId:yup.string().required("Reservation ID is required"),
        })

        const handleSumbit = (values:FormikValues)=>  {
                setLoading(true)
               cr(values?.reservationId).then(
                res=> {
                        setLoading(false)
                        setOpen(false)
                        toast.success("Reservation cancelled successfully")  
                },
                err=> {
                        setLoading(false)
                        toast.error(err.response.data?.msg)
                        Logger("Error cancelling reservation:",err)
                }
               )
                
        }

        return <Modal open={open}>
               <div className="flex justify-center w-full z-[999999]">
                        <div className="bg-white w-[90%] px-5 minMd:px-10 py-5 rounded-[10px] minMd:w-[400px] h-[300px] overflow-y-auto">
                                <div className="w-full flex justify-end"><IconButton  onClick={()=>setOpen(false)}><CloseIcon/></IconButton></div>
                                <h1 className="text-center font-bold text-[21px] leading-[25px]">Cancel reservation</h1>
                                <Formik initialValues={initialFormValues} onSubmit={handleSumbit}
                                        validationSchema={formValidation}
                                        render={({ values, errors }) => (
                                                <Form className="w-full  mt-5">
                                               
                                                        <FormControl>
                                                                <InputLabel htmlFor="my-input"
                                                                >
                                                                      Reservation ID
                                                                </InputLabel>
                                                                <Field name="reservationId"
                                                                        placeholder="Standard"
                                                                >
                                                                        {
                                                                                ({
                                                                                field, // { name, value, onChange, onBlur }
                                                                                form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                                                                meta,
                                                                                }:any)=>(
                                                                                        <OutlinedInput {...field} id="my-input" aria-describedby="my-helper-text" 
                                                                                                label="Reservation ID"
                                                                                        />
                                                                                )
                                                                        }
                                                                </Field>
                                                                <FormHelperText id="my-helper-text">Input the ID of the reservation you wish to cancel</FormHelperText>
                                                                <FormErrorMessage name="reservationId"/>
                                                        </FormControl>
                                                        <Button variant="contained" type="submit">
                                                                {loading?<CircularProgress size="30px" sx={{color:"#fff"}}/>:"Submit"}
                                                        </Button>
                                   </Form>
                                        )}
                                />
                        </div>
               </div>
        
        </Modal>
}

export default CancelReservation;