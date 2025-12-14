import Modal from "../../Modal"
import {Formik, Form, Field, FormikValues, FieldArray, useFormikContext} from "formik";
import { FormControl, Input, InputLabel, FormHelperText, Select, MenuItem, 
        Button, FilledInput, OutlinedInput, TextField, IconButton, Alert,
        FormLabel, RadioGroup, Radio, FormControlLabel
} from "@mui/material";
import * as yup from "yup"
import Logger from "../../../utils/Logger";
import { useEffect, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Delete';
import InputAdornment from "@mui/material/InputAdornment";
import { UpdatePackage } from "../../../services/Admin";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import FormErrorMessage from "../../FormErrorMessage";
import { GetPackageCategories } from "../../../services/Package";

const UpdatePackageForm =  ({open,setOpen, packageInitialValues, createPackageCategoryHandler}:any)=> {
        const [currenStep, setCurrentStep] = useState(1)
        const MAX_STEP=3;
        const [loading, setLoading] = useState(false)
        const [initialValues, setInitialValues] = useState<any>({})
        const [packageCategories, setPackageCategories] = useState([])

        useEffect(()=>{
                const allPackageCategories =  ()=>{
                        GetPackageCategories().then(
                                (res:any)=>setPackageCategories(res.data),
                                (err:any)=>console.log("category error:",err)
                        )
                }

                allPackageCategories()
        },[open])
        
        useEffect(()=>{
                if (packageInitialValues) {
                    setInitialValues( {
                        name:packageInitialValues.name,
                        description:packageInitialValues?.description,
                        content:packageInitialValues?.content?.length>0 ? packageInitialValues?.content : [""],
                        numberOfGuest:packageInitialValues?.numberOfGuest,
                        price:packageInitialValues?.price,
                        percentOff:packageInitialValues?.percentOff,
                        image:packageInitialValues?.image,
                        currency:packageInitialValues?.currency,
                        available:packageInitialValues?.available,
                        isBaseGateFee : packageInitialValues?.isBaseGateFee,
                        category:packageInitialValues?.category
                    })
                }
                else {
                    setInitialValues( {
                        name:"",
                        description:"",
                        content:[""],
                        numberOfGuest:null,
                        price:null,
                        image:null,
                        currency:"NGN",
                        available:true,
                        percentOff:"",
                        isBaseGateFee:false,
                        category:""
    
                    }) 
                }
               
            },[packageInitialValues])

        const formValidation = yup.object({
                name:yup.string().required("Please input package name"),
                numberOfGuest :yup.number().required("Please provide the  number of guests for this package"),
                price:yup.number().required("Please input package price"),
                image :yup.mixed().required("Please upload a high resolution image for this package")
        })

        const handleSumbit = (values:FormikValues)=>  {
                setLoading(true)
                //console.log("Form values:",values)
             
               UpdatePackage(values, packageInitialValues?._id).then(
                res=> {
                        setLoading(false)
                        setOpen(false)
                        toast.success("Package Updated successfully")  
                },
                err=> {
                        setLoading(false)
                        toast.error("Failed to update package")
                        Logger("Error updating package:",err)
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
                                <h1 className="text-center font-bold text-[21px] leading-[25px]">Update package</h1>
                                <p className="text-start">Step {currenStep} of {MAX_STEP}</p>
                                <Formik initialValues={initialValues} onSubmit={handleSumbit}
                                        validationSchema={formValidation}
                                        enableReinitialize={true}
                                        render={({ values, errors }) => (
                                                <Form className="w-full  mt-5">
                                                {
                                                        currenStep===1 &&
                                                         <>    
                                                          <FormControl className="" required>
                                                                <InputLabel htmlFor="name">Package name</InputLabel>
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
                                                                                        label="Package name"
                                                                                />
                                                                        )
                                                                }
                                                                </Field>
                                                                <FormHelperText>Give package a descriptive name</FormHelperText>
                                                                <FormErrorMessage name="name"/>
                                                        </FormControl>
                                                        <FormControl className="" required>
                                                        <InputLabel htmlFor="packageCatLabel">Select category</InputLabel>
                                                        <Field name="category">
                                                        {({
                                                        field, // { name, value, onChange, onBlur }
                                                        form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                                        meta,
                                                        }:any) => (
                                                                <Select
                                                                {...field}
                                                                label="Select category"
                                                                id="packageCat"
                                                                labelId="packageCatLabel"
                                                                className="capitalize"
                                                                defaultValue={field.value}
                                                              >
                                                                {
                                                                        packageCategories?.length >0 ? packageCategories?.map((category:any)=>(
                                                                                <MenuItem className="capitalize"  
                                                                                        value={category?._id}
                                                                                        selected={field.value === category._id? true : false} 
                                                                                >
                                                                                        {category?.name}
                                                                                </MenuItem>
                                                                        )):
                                                                        <div className="w-full flex flex-col items-center">
                                                                                <span className="text-sm text-black/40 mb-3">Empty package category</span>
                                                                                <Button onClick={createPackageCategoryHandler} variant="contained" className="!mx-2">Add new category</Button>
                                                                                        </div>
                                                                                }
                                                                        </Select>
                                                                        )
                                                                }
                                                                </Field>
                                                                <FormHelperText>Can't find your choice category? 
                                                                        <Button variant="text"  className="!text-blue-500 ml-1 !lowercase" 
                                                                                href=""
                                                                                onClick={createPackageCategoryHandler}
                                                                        >
                                                                                Create one
                                                                        </Button>
                                                                </FormHelperText>
                                                                <FormErrorMessage name="category"/>
                                                        </FormControl>
                                                        <FormControl>
                                                                <InputLabel htmlFor="description"
                                                                >
                                                                        Description(Optional)
                                                                </InputLabel>
                                                                <Field name="description"
                                                                        placeholder="Enjoy swimming, boat riding and more"
                                                                >
                                                                        {
                                                                                ({
                                                                                field, // { name, value, onChange, onBlur }
                                                                                form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                                                                meta,
                                                                                }:any)=>(
                                                                                        <OutlinedInput {...field} id="description" aria-describedby="my-helper-text" 
                                                                                                label="Description(Optional)"
                                                                                        />
                                                                                )
                                                                        }
                                                                </Field>
                                                                <FormHelperText id="my-helper-text">Description this package in few words e.g single, group of 2, etc</FormHelperText>
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
                                                        <Field name="numberOfGuest">
                                                                {
                                                                        ({
                                                                                field, // { name, value, onChange, onBlur }
                                                                                form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                                                                meta,
                                                                                }:any)=>
                                                                        (
                                                                                <TextField
                                                                                        id="outlined-select-capacity"
                                                                                        label="Number of guests"
                                                                                        type="number"
                                                                                        className="w-full"
                                                                                        {...field}
                                                                                >
                                                                                
                                                                                </TextField>
                                                                        )
                                                                }  
                                                                </Field>
                                                                <FormErrorMessage name="numberOfGuest"/>
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
                                                <FieldArray
                                                        name="content"
                                                        render={(arrayHelpers:any) => (
                                                                <div>      
                                                                        <label className="">Package content</label>
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
                                                               <div>
                                                                        <label className="mb-5">Upload package image</label>
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
                                                               </div>
                                                               <Field name="available">
                                                                        {
                                                                         ({field, form:{touched,errors}, meta}:any)=>(
                                                                                <FormControl sx={{mt:2}}>
                                                                                <FormLabel id="demo-row-radio-buttons-group-label">Package availability?</FormLabel>
                                                                                <RadioGroup
                                                                                        row
                                                                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                                                                        {...field}
                                                                                >
                                                                                        <FormControlLabel defaultChecked ={field.value===true}  value={true} control={<Radio />} label="Available" />
                                                                                        <FormControlLabel defaultChecked ={field.value===false}  value={false} control={<Radio />} label="Not available"/>
                                                                                </RadioGroup>
                                                                                </FormControl>
                                                                         )       
                                                                        }
                                                                </Field>
                                                                {/* <FormHelperText>Upload a high resolution picture of this room</FormHelperText> */}
                                                        {/* </FormControl> */}
                                                                <Field name="isBaseGateFee">
                                                                                {
                                                                                ({field, form:{touched,errors}, meta}:any)=>(
                                                                                        <FormControl sx={{mt:2}}>
                                                                                        <FormLabel id="demo-row-radio-buttons-group-label">Is package the price for single of the selected category?</FormLabel>
                                                                                        <RadioGroup
                                                                                                row
                                                                                                aria-labelledby="demo-row-radio-buttons-group-label"
                                                                                                {...field}
                                                                                        >
                                                                                                <FormControlLabel defaultChecked ={true} value={true} control={<Radio />} label="Yes" />
                                                                                                <FormControlLabel value={false} control={<Radio />} label="No"/>
                                                                                        </RadioGroup>
                                                                                        <FormHelperText>
                                                                                        Select yes if this package is the single price for the package category selected <br/>
                                                                                        Please ensure that only one  package is made a single price for a package category 
                                                                                        </FormHelperText>
                                                                                        </FormControl>
                                                                                )       
                                                                                }
                                                                </Field>
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
                                                                {loading?<CircularProgress size="30px" sx={{color:"#fff"}}/>:"Update"}
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

export default UpdatePackageForm;