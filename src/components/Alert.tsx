import { FC, useEffect } from "react";
import CloseIcon from "../assets/icons/close_icon.svg";

interface propTypes  {
    timeout?:number,
    message:string,
    type:"success" | "failure",
    show:Boolean,
    setShow:any
}


const Alert:FC<propTypes> =  ({timeout, message, type,show,setShow})=> {
    useEffect(()=>{
        setTimeout(()=>{
            setShow(false)
        },timeout)
    })
    return (
       <>
        {
            type==="success" && show &&
            <div className="bg-green-500/100 text-white flex justify-between items-center rounded-[4px] px-4 py-3">
                {message}
                <button className="bg-transparent w-[30px]" onClick={()=>setShow (false)}><img width="20px" height="20px" src={CloseIcon} alt=""/></button>
            </div>
        }

{
            type==="failure" && show &&
            <div className="bg-red-500/100 transition-all duration-1000 text-white px-4 py-3 flex justify-between items-center rounded-[4px]">
                {message}
                <button className="bg-transparent w-[30px]" onClick={()=>setShow (false)}><img width="20px" height="20px" src={CloseIcon} alt=""/></button>
            </div>
        }
       </>
    )
}

export default Alert