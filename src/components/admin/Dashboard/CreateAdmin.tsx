import Modal from "../../Modal"
import {Formik, Form, Field, FormikValues, FieldArray, useFormikContext} from "formik";
import { FormControl, Input, InputLabel, FormHelperText, Select, MenuItem, Button, 
        FilledInput, OutlinedInput, TextField, IconButton, Alert, FormLabel, RadioGroup, 
        FormControlLabel, Radio

 } from "@mui/material";
import * as yup from "yup"
import Logger from "../../../utils/Logger";
import { useEffect, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Delete';
import InputAdornment from "@mui/material/InputAdornment";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import FormErrorMessage from "../../FormErrorMessage";
import {RegisterLimited} from "../../../services/AdminAuth"

const CreateAdmin =  ({open,setOpen}:any)=> {
        const [loading, setLoading] = useState(false)

        const initialFormValues:FormikValues = {
               name:"",
               password:"",
               email:"" 

        }

        const formValidation = yup.object({
                name:yup.string().required("Name is required"),
                password:yup.string().required("Please input password for this staff account"),
                email:yup.string().email("Invalid email format").required("Staff email is required")
        })

        const handleSumbit = (values:any)=>  {
                setLoading(true)
                //console.log("Form values:",values)
             
               RegisterLimited(values).then(
                res=> {
                        setLoading(false)
                        setOpen(false)
                        toast.success("Account created successfully")  
                },
                err=> {
                        setLoading(false)
                        toast.error(err.response.data.msg)
                        Logger("Error creating new account:",err)
                }
               )
                
        }

        // const handleFileUpload = (evt:any,setFieldValue:any) => {
        //         const file = evt.target.files[0]
        //         setFieldValue("image",file)
        // }

        return <Modal open={open}>
               <div className="flex justify-center w-full z-[999999]">
                        <div className="bg-white w-[90%] px-5 minMd:px-10 py-5 rounded-[10px] minMd:w-[500px] h-[500px] overflow-y-auto">
                                <div className="w-full flex justify-end"><IconButton  onClick={()=>setOpen(false)}><CloseIcon/></IconButton></div>
                                <h1 className="text-center font-bold text-[21px] leading-[25px]">Add new staff</h1>
                                <Formik initialValues={initialFormValues} onSubmit={handleSumbit}
                                        validationSchema={formValidation}
                                        render={({ values, errors }) => (
                                                <Form className="w-full  mt-5">
                                                
                                                                
                                                        <FormControl className="" required>
                                                        <InputLabel htmlFor="name">Staff name</InputLabel>
                                                        <Field name="name"
                                                                placeholder=""
                                                        >
                                                        {
                                                                ({
                                                                field, // { name, value, onChange, onBlur }
                                                                form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                                                meta,
                                                                }:any)=>(
                                                                        <OutlinedInput {...field} id="name" aria-describedby="my-helper-text" 
                                                                                label="Staff name"
                                                                        />
                                                                )
                                                        }
                                                        </Field>
                                                                <FormErrorMessage name="name"/>
                                                        </FormControl>
                                                        <FormControl>
                                                                <InputLabel htmlFor="email"
                                                        >
                                                                Email
                                                        </InputLabel>
                                                        <Field name="email"
                                                                placeholder="johnDoe@gmail.com"
                                                        >
                                                                {
                                                                        ({
                                                                        field, // { name, value, onChange, onBlur }
                                                                        form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                                                        meta,
                                                                        }:any)=>(
                                                                                <OutlinedInput {...field} id="email" aria-describedby="my-helper-text" 
                                                                                        label="Email"
                                                                                />
                                                                        )
                                                                }
                                                        </Field>
                                                        <FormErrorMessage name="email"/>
                                                        </FormControl>   
                                                        <div className="">
                                                        <Field name="password">
                                                        {
                                                                ({
                                                                        field, // { name, value, onChange, onBlur }
                                                                        form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                                                        meta,
                                                                        }:any)=>
                                                                (
                                                                        <TextField
                                                                                id="outlined-select-capacity"
                                                                                label="Password"
                                                                                type="password"
                                                                                className="w-full"
                                                                                {...field}
                                                                        >
                                                                        
                                                                        </TextField>
                                                                )
                                                        }  
                                                        </Field>
                                                        <FormErrorMessage name="password"/>
                                                </div>     
        
                                                <div>
                                                        <Button variant="contained" type="submit">
                                                        {loading?<CircularProgress size="30px" sx={{color:"#fff"}}/>:"Create"}
                                                        </Button> 
                                                        
                                                                
                                                </div>
                                </Form>
                                )}
                        />
                        </div>
               </div>
        
        </Modal>
}

export default CreateAdmin;