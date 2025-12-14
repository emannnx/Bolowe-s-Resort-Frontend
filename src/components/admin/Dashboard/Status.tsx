import statusTypes  from "../../../Constants/Status";

const  Status = ({status}:{status:string})=> {
    return (
        <>
            {
                status===statusTypes.BOOKED &&
                <span className="bg-green-200 text-green-500 px-2 py-1 rounded-[10px]  text-bold font-serif text-[12px] leading-[15px]">{status}</span>
            }
            {
                status===statusTypes.PENDING &&
                <span className="bg-yellow-200 text-yellow-500 px-2 py-1 rounded-[10px]  text-bold font-serif text-[15px] leading-[18px]">{status}</span>
            }
            {
                status===statusTypes.FAILURE || status===statusTypes.PAID_BUT_FAILED &&
                <span className="bg-red-200 text-red-500 px-2 py-1 rounded-[10px]  text-bold font-serif text-[15px] leading-[18px]">{status}</span>
            }
            {
                status===statusTypes.CANCELLED &&
                <span className="bg-red-200 text-red-500 px-2 py-1 rounded-[10px]  text-bold font-serif text-[15px] leading-[18px] line-through">{status}</span>
            }
        </>
    )
}

export default Status;