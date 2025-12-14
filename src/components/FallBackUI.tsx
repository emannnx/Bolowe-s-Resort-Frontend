import { CircleLoader } from "react-spinners"

const FallBackUI = ()=>{
    return (
        <div className="h-[100vh] w-full bg-white flex items-center justify-center">
            <div>
                <CircleLoader color="#000"/>
            </div>
        </div>
    )
}


export default FallBackUI;
