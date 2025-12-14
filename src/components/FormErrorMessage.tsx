import { ErrorMessage } from "formik"

type  propType = {
    name:string
}

const FormErrorMessage = ({name}:propType)=> {
    return (
        <ErrorMessage name={name}>
            {
                (msg:string)=><div className="text-red-400 text-[14px] leading-[16px]">{msg}</div>
            }
        </ErrorMessage>
    )
}

export default FormErrorMessage;