import Modal from "../../Modal"
import {Formik, Form, Field, FormikValues, FieldArray, useFormikContext} from "formik";
import { FormControl, Input, InputLabel, FormHelperText, Select, MenuItem, Button, FilledInput, OutlinedInput, TextField, IconButton, Alert } from "@mui/material";
import * as yup from "yup"
import Logger from "../../../utils/Logger";
import { useEffect, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Delete';
import InputAdornment from "@mui/material/InputAdornment";
import { CreateRoom } from "../../../services/Admin";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import FormErrorMessage from "../../FormErrorMessage";

const CreateRoomForm =  ({open,setOpen,roomTypes, createRoomTypeHandler}:any)=> {
        const [currenStep, setCurrentStep] = useState(1)
        const MAX_STEP=3;
        const [loading, setLoading] = useState(false)

        const initialFormValues:FormikValues = {
               roomType:"",
               description:"",
               content:[""],
               maxNoOfPeople:null,
               price:null,
               percentOff:0,
               image:null,
               currency:"NGN",
               quantity:1

        }

        const formValidation = yup.object({
                roomType:yup.string().required("Please select room type"),
                maxNoOfPeople :yup.number().required("Please enter the maximum of number of people for this room"),
                price:yup.number().required("Please input the price for this room"),
                image :yup.mixed().required("Please upload a high resolution image for this room")
        })

        const handleSumbit = (values:FormikValues)=>  {
                setLoading(true)
                //console.log("Form values:",values)
             
               CreateRoom(values).then(
                res=> {
                        setLoading(false)
                        setOpen(false)
                        toast.success("Room created successfully")  
                },
                err=> {
                        setLoading(false)
                        toast.error("Failed to create new room")
                        Logger("Error creating new room:",err)
                }
               )
                
        }

        const handleFileUpload = (evt:any,setFieldValue:any) => {
                const file = evt.target.files[0]
                setFieldValue("image",file)
        }

        return <Modal open={open}>
               <div className="flex justify-center w-full z-[999999]">
                        <div className="bg-white w-[90%] px-5 minMd:px-10 py-5 rounded-[10px] minMd:w-[500px] h-[650px] overflow-y-auto">
                                <div className="w-full flex justify-end"><IconButton  onClick={()=>setOpen(false)}><CloseIcon/></IconButton></div>
                                <h1 className="text-center font-bold text-[21px] leading-[25px]">Add new room</h1>
                                <p className="text-start">Step {currenStep} of {MAX_STEP}</p>
                                <Formik initialValues={initialFormValues} onSubmit={handleSumbit}
                                        validationSchema={formValidation}
                                        render={({ values, errors }) => (
                                                <Form className="w-full  mt-5">
                                                {
                                                        currenStep===1 &&
                                                         <>    
                                                          <FormControl className="" required>
                                                        <InputLabel htmlFor="roomTypeLabel">Select Room type</InputLabel>
                                                        <Field name="roomType">
                                                        {({
                                                        field, // { name, value, onChange, onBlur }
                                                        form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                                        meta,
                                                        }:any) => (
                                                                <Select
                                                                {...field}
                                                                label="Select room type"
                                                                id="roomType"
                                                                labelId="roomTypeLabel"
                                                                className="capitalize" 
                                                              >
                                                                {
                                                                        roomTypes?.length >0 ? roomTypes?.map((type:any)=>(
                                                                                <MenuItem className="capitalize"  value={type?.name}>{type?.name}</MenuItem>
                                                                        )):
                                                                        <div className="w-full flex flex-col items-center">
                                                                                <span className="text-sm text-black/40 mb-3">Empty room type</span>
                                                                                <Button onClick={createRoomTypeHandler} variant="contained" className="!mx-2">Add new type</Button>
                                                                                        </div>
                                                                                }
                                                                        </Select>
                                                                        )
                                                                }
                                                                </Field>
                                                                <FormHelperText>Can't find your choice room type? 
                                                                        <Button variant="text"  className="!text-blue-500 ml-1 !lowercase" 
                                                                                href=""
                                                                                onClick={createRoomTypeHandler}
                                                                        >
                                                                                Create one
                                                                        </Button>
                                                                </FormHelperText>
                                                                <FormErrorMessage name="roomType"/>
                                                        </FormControl>
                                                        <FormControl>
                                                                <InputLabel htmlFor="my-input"
                                                                >
                                                                        Description(Optional)
                                                                </InputLabel>
                                                                <Field name="description"
                                                                        placeholder="A well furnished room with WIFI connection"
                                                                >
                                                                        {
                                                                                ({
                                                                                field, // { name, value, onChange, onBlur }
                                                                                form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                                                                meta,
                                                                                }:any)=>(
                                                                                        <OutlinedInput {...field} id="my-input" aria-describedby="my-helper-text" 
                                                                                                label="Description(Optional)"
                                                                                        />
                                                                                )
                                                                        }
                                                                </Field>
                                                                <FormHelperText id="my-helper-text">Write one line description of this room</FormHelperText>
                                                        </FormControl>
                                                        <div className="flex flex-row space-x-3">
                                                                <Field name="currency">
                                                                {
                                                                        ({
                                                                                field, // { name, value, onChange, onBlur }
                                                                                form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                                                                meta,
                                                                                }:any)=>
                                                                        (
                                                                                <TextField
                                                                                        id="outlined-select-currency"
                                                                                        select
                                                                                        label="Currency"
                                                                                        defaultValue="NGN"
                                                                                        className="w-[100px]"
                                                                                        {...field}
                                                                                >
                                                                                <MenuItem value="NGN">
                                                                                                N
                                                                                </MenuItem>
                                                                                <MenuItem value="USD">
                                                                                                $
                                                                                </MenuItem>
                                                                                </TextField>
                                                                        )
                                                                }  
                                                                </Field>
                                                                <FormControl className="w-full" required>
                                                                <InputLabel htmlFor="price">Price</InputLabel>
                                                                        <Field name="price">
                                                                                {
                                                                                        ({
                                                                                        field, // { name, value, onChange, onBlur }
                                                                                        form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                                                                        meta,
                                                                                        }:any)=>(
                                                                                                <OutlinedInput {...field} type="number" id="price" 
                                                                                                        aria-describedby="my-helper-text" 
                                                                                                        label="price"
                                                                                                        placeholder="0.00"
                                                                                                />
                                                                                        )
                                                                                }
                                                                        </Field>
                                                                        <FormErrorMessage name="price"/>
                                                                </FormControl>
                                                        </div>
                                                      
                                                       <div className="">
                                                        <Field name="maxNoOfPeople">
                                                                {
                                                                        ({
                                                                                field, // { name, value, onChange, onBlur }
                                                                                form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                                                                meta,
                                                                                }:any)=>
                                                                        (
                                                                                <TextField
                                                                                        id="outlined-select-capacity"
                                                                                        label="Room capacity"
                                                                                        type="number"
                                                                                        className="w-full"
                                                                                        helperText="Maximum number of people in the room"
                                                                                        {...field}
                                                                                >
                                                                                
                                                                                </TextField>
                                                                        )
                                                                }  
                                                                </Field>
                                                                <FormErrorMessage name="maxNoOfPeople"/>
                                                       </div>
                                                        
                                                </>     
                                        }
                                        {
                                                currenStep === 2  &&
                                                <>
                                                <FormControl className="w-full">
                                                                <InputLabel htmlFor="percentOff">Percent off</InputLabel>
                                                                <Field name="percentOff">
                                                                        {
                                                                                ({
                                                                                field, // { name, value, onChange, onBlur }
                                                                                form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                                                                meta,
                                                                                }:any)=>(
                                                                                        <OutlinedInput {...field} type="number" id="percentOff" 
                                                                                                aria-describedby="my-helper-text" 
                                                                                                label="percentOff"
                                                                                                placeholder="0"
                                                                                        />
                                                                                )
                                                                        }
                                                                </Field>
                                                                <FormHelperText>Discount percent off on price(default to 0)</FormHelperText>
                                                        </FormControl>
                                                 <Field name="quantity">
                                                        {
                                                        ({
                                                                field, // { name, value, onChange, onBlur }
                                                                form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                                                meta,
                                                                }:any)=>
                                                        (
                                                                <TextField
                                                                        id="outlined-quantity"
                                                                        label="Number of rooms"
                                                                        type="number"
                                                                        className="w-full"
                                                                        helperText="How many of this room type is available (default to 1)"
                                                                        {...field}
                                                                >
                                                                
                                                                </TextField>
                                                        )
                                                        }  
                                                 </Field>
                                                <FieldArray
                                                        name="content"
                                                        render={(arrayHelpers:any) => (
                                                                <div>      
                                                                        <label className="">Room content</label>
                                                                         <div className="flex flex-row flex-wrap">
                                                                        {values.content  ? (
                                                                        values.content.map((cont:string, index:number) => (
                                                                        <>
                                                                        <div className="mt-2 w-full" key={index}>
                                                                                <FormControl className="w-full">
                                                                                        <InputLabel htmlFor="my-input"
                                                                                        >
                                                                                                content {index+1}
                                                                                        </InputLabel>
                                                                                        <Field name={`content.${index}`}
                                                                                                
                                                                                        >
                                                                                                {
                                                                                                        ({
                                                                                                        field, // { name, value, onChange, onBlur }
                                                                                                        form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                                                                                        meta,
                                                                                                        }:any)=>(
                                                                                                                <OutlinedInput className="w-full" {...field} id={`my-input ${index}`} aria-describedby="my-helper-text" 
                                                                                                                        label={`content ${index+1}`}
                                                                                                                        endAdornment={
                                                                                                                                values?.content.length>1 ?
                                                                                                                                <InputAdornment position="end">
                                                                                                                                <IconButton
                                                                                                                                aria-label="Room content"
                                                                                                                                onClick={() => arrayHelpers.remove(index)}
                                                                                                                                edge="end"
                                                                                                                                >
                                                                                                                                <RemoveIcon/>
                                                                                                                                </IconButton>
                                                                                                                                </InputAdornment>:null
                                                                                                                        }
                                                                                                                       
                                                                                                                />
                                                                                                        )
                                                                                                }
                                                                                        </Field>
                                                                                        { values?.content.length===index+1 && <FormHelperText id="my-helper-text">List room contents e.g AC, WIFI, TV, etc</FormHelperText> }
                                                                                </FormControl>

                                                                                </div>
                                                                                {
                                                                                        index+1 === values.content.length &&
                                                                                        <IconButton
                                                                                        onClick={() => arrayHelpers.insert(index, '')} // insert an empty string at a position
                                                                                        >
                                                                                                <AddIcon/>
                                                                                        </IconButton>
                                                                                }
                                                                        </>
                                                                        ))
                                                                        ) : (
                                                                        <IconButton
                                                                                onClick={() => arrayHelpers.push('')} 
                                                                                >
                                                                                <AddIcon/>
                                                                        </IconButton>
                                                                        )}
                                                                        
                                                                </div>
                                                                </div>
                                                        )}
                                                        />
                                                </>
                                        }
                                        {
                                                currenStep===3  && 
                                                <div className="">
                                                         {Object.keys(errors).length > 0 && (
                                                                <Alert severity="error">
                                                                          Please check through your input again to see of you
                                                                        have provided the required fields
                                                                </Alert>
                                                              
                                                        )}
                                                        {/* <FormControl className="w-full"> */}
                                                                <label className="mb-5">Upload room image</label>
                                                                <Field name="image">
                                                                        {
                                                                                ({
                                                                                field, // { name, value, onChange, onBlur }
                                                                                form: { touched, errors,setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                                                                meta,
                                                                                }:any)=>(
                                                                                        <input  type="file" id="image" 
                                                                                                aria-describedby="my-helper-text" 
                                                                                                // accept="image/*" 
                                                                                                onChange={(evt)=>handleFileUpload(evt,setFieldValue)}
                                                                                        />
                                                                                )
                                                                        }
                                                                </Field> 
                                                                <FormErrorMessage name="image"/>
                                                                {/* <FormHelperText>Upload a high resolution picture of this room</FormHelperText> */}
                                                        {/* </FormControl> */}
                                                </div>
                                        }
                                        <div>
                                                {
                                                currenStep !== 1 &&
                                                <Button onClick={()=>setCurrentStep(currenStep=>currenStep-1)}>Previous</Button>  
                                                }
                                                {
                                                currenStep !==MAX_STEP &&
                                                <Button onClick={()=>setCurrentStep(currenStep=>currenStep+1)}>Next</Button>  
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
               </div>
        
        </Modal>
}

export default CreateRoomForm;