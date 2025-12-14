import Modal from "../../Modal"
import {Formik, Form, Field, FormikValues} from "formik";
import { FormControl,  InputLabel, FormHelperText,  Button,  OutlinedInput,  IconButton } from "@mui/material";
import * as yup from "yup"
import Logger from "../../../utils/Logger";
import CloseIcon from '@mui/icons-material/Close';
import {  CreatePackageCategory as CreatePackageCatService} from "../../../services/Admin";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import FormErrorMessage from "../../FormErrorMessage";
import { useState } from "react";

const CreatePackageCategory =  ({open,setOpen,roomTypes}:any)=> {
       
       const [loading, setLoading] = useState(false)

        const initialFormValues:FormikValues = {
               name:""
        }

        const formValidation = yup.object({
                name:yup.string().required("Please provide category name"),
        })

        const handleSumbit = (values:FormikValues)=>  {
                setLoading(true)
                //console.log("Form values:",values)
              const updatedValues = {name:values.name.toLowerCase()}
              CreatePackageCatService(updatedValues).then(
                res=> {
                        setLoading(false)
                        setOpen(false)
                        toast.success("Package category created successfully")  
                },
                err=> {
                        setLoading(false)
                        toast.error("Failed to create new package category")
                        Logger("Error creating package category:",err)
                }
               )
                
        }

        return <Modal open={open}>
               <div className="flex justify-center w-full z-[999999]">
                        <div className="bg-white w-[90%] px-5 minMd:px-10 py-5 rounded-[10px] minMd:w-[400px] h-[300px] overflow-y-auto">
                                <div className="w-full flex justify-end"><IconButton  onClick={()=>setOpen(false)}><CloseIcon/></IconButton></div>
                                <h1 className="text-center font-bold text-[21px] leading-[25px]">Add new package category</h1>
                                <Formik initialValues={initialFormValues} onSubmit={handleSumbit}
                                        validationSchema={formValidation}
                                        render={({ values, errors }) => (
                                                <Form className="w-full  mt-5">
                                               
                                                        <FormControl>
                                                                <InputLabel htmlFor="my-input"
                                                                >
                                                                        Name
                                                                </InputLabel>
                                                                <Field name="name"
                                                                        placeholder="Silver"
                                                                >
                                                                        {
                                                                                ({
                                                                                field, // { name, value, onChange, onBlur }
                                                                                form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                                                                meta,
                                                                                }:any)=>(
                                                                                        <OutlinedInput {...field} id="my-input" aria-describedby="my-helper-text" 
                                                                                                label="Name"
                                                                                        />
                                                                                )
                                                                        }
                                                                </Field>
                                                                <FormHelperText id="my-helper-text">Input a unique name for this package category e.g Silver</FormHelperText>
                                                                <FormErrorMessage name="name"/>
                                                        </FormControl>
                                                        <Button variant="contained" type="submit">
                                                                {loading?<CircularProgress size="30px" sx={{color:"#fff"}}/>:"Create"}
                                                        </Button>
                                   </Form>
                                        )}
                                />
                        </div>
               </div>
        
        </Modal>
}

export default  CreatePackageCategory;