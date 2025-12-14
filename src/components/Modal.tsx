import { FC } from "react"

type propTypes = {
    open:Boolean,
    children:React.ReactNode
} 

const Modal:FC<propTypes> = ({open,children})=> {
    return (
        <>
            {
                open?
                <div className="z-[999] fixed flex items-center justify-center  top-0 bottom-0 left-0 right-0 bg-[#000]/70 overscroll-contain overflow-y-hidden">
                    {
                        children
                    }
                </div>:null
            }
        </>
    )
}

export default Modal;