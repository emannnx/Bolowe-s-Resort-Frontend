import "./Sort.scss";
import DropDownIcon from "../../assets/icons/dropdown.svg";
import { useState, FC, useEffect } from "react";

interface propTypes {
    setSortValue:any;
    options:any
}

const Sort:FC<propTypes> = ({setSortValue,options})=> {
    const [value, setValue]= useState("Sort by");
    const [showDropDown, setShowDropdown ] = useState(false)

    const menuClickHandler = (evt:any, value:string)=> {
        setSortValue(value);
        setValue(value)
    }

    const dropdownHandler = (evt:any)=> {
        evt.stopPropagation()
        if (showDropDown)  {
            setShowDropdown(false)
            return
        }
        else {
            setShowDropdown(true)
        }
    }

    useEffect(() => {
        const handleClick = (event:any) => {
         setShowDropdown(false)
        };
    
        window.addEventListener('click', handleClick);
    
        return () => {
            window.removeEventListener('click', handleClick);
        };
      }, []);

    return ( 
        <div onClick={dropdownHandler} className="relative sort">
            <button className="flex capitalize flex-row items-center bg-[#ECECEC] text-[#4D4D4D] text-[18px] leading-[21px] font-bold sort-btn rounded-[10px] px-6 py-4">
                {value}
                {
                    showDropDown ? <img src={DropDownIcon} className="ml-5 dropdown-icon-down " alt=""/> :
                    <img src={DropDownIcon} className="ml-5 dropdown-icon-up" alt=""/>
                }
            </button>
            {
                showDropDown && 
                <div className="z-[666] flex flex-col list-none px-[26px] py-[30px] dropdown font-bold text-[17px] leading-[23px] text-[#333333] border border-solid border-[#CCCCCC] rounded-[2px] bg-white">
                    {
                        options?.map((option:any,index:number)=>(
                            <li key={index} className="" onClick={(evt)=>menuClickHandler(evt,option.value)}>{option.name}</li>
                        ))
                    }
               
            </div>
            }
        </div>
    )
}


export default Sort;