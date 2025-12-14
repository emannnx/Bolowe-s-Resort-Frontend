import React, { useEffect, useState } from 'react';
import './Accomodation.css';
import Carousell from '../Carousell';
import { GetRoom, GetRoomsType } from '../../../services/Accomodation';
import Logger from '../../../utils/Logger';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useNavigate, useSearchParams , useLocation} from 'react-router-dom';
import BookTypes from '../../../Constants/BookTypes';
import Room1 from "../../../assets/images/room1.jpg";
import Room2 from "../../../assets/images/room2.jpg";
import Fade from "react-reveal/Fade";
import BoaHouse from "../../../assets/images/boat_house.jpeg"
import HighlightedText from '../HighlightedText';
import { toast } from 'react-toastify';


const Accomodation = () => {
  const [roomTypes, setRoomTypes] =  useState([])
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  let [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const [matchText, setMatchText]  = useState("")

  useEffect (()=>{
    const fetchRoomTypes = ()=> {
        GetRoomsType().then(
          res=>{
            Logger("Room types", res)
            setRoomTypes(res.data.data)
          },
          err=>{
            console.log(err)
          }
        )
    }
  const fetchRooms = ()=> {
      setIsLoading(true)
      GetRoom().then(
        res=>{
          setIsLoading(false)
          Logger("Rooms", res)
          const processesArray:any =removeDuplicateRoom(res.data.data)
          setRooms(processesArray)
        },
        err=>{
          //setIsLoading(false)
          console.log(err)
        }
      )
  }
    fetchRoomTypes()
    fetchRooms()
  },[])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Get the hash from the URL
    //const { hash } = location;

      const sectionElement:any = document.getElementById(searchParams.get("to") as any);
      if (sectionElement) {
        console.log(sectionElement)
        sectionElement.scrollIntoView({ behavior: 'smooth' });
        setMatchText(searchParams.get("to") as any)
      }
  });

  useEffect(()=>{
    const message = searchParams.get("message")
    if (message && !(message?.length<=0)) {
      toast.error(message, {autoClose:false})
      searchParams.set("message","")
    }
  },[])

  const handleClick = (roomType:string)=> {
    navigate(`/reservation/${BookTypes.ACCOMODATION}?item_id=${roomType}`)
  }
  
  const removeDuplicateRoom = (array:any)=> {
    const uniqueArray = [];
    const ids:any = [];
  
    for (const obj of array) {
      if (!ids.includes(obj.roomType)) {
        uniqueArray.push(obj);
        ids.push(obj.roomType);
      }
    }
    return  uniqueArray;
  }

  return (
    <div id="packages">
      <Carousell>
        {/* Carousel */}
        <div className="hero" style={{ backgroundImage: `url(${Room1})` }}>
          <p>Suite</p>
        </div>
        <div className="hero" style={{ backgroundImage: `url(${Room2})` }}>
          <p>Deluxe</p>
        </div>
        <div className="hero" style={{ backgroundImage: `url(${Room1})` }}>
          <p>Suite</p>
        </div>
        <div className="hero" style={{ backgroundImage: `url(${BoaHouse})` }}>
          <p>Deluxe</p>
        </div>
      </Carousell>
      {/* End of Carousel */}
      {/* Package Section */}
      <section className="px-16 py-12 sm:px-5">
        <h2 className="text-4xl font-extralight text-center my-4 font-playfair">
          Accomodation
        </h2>
        <div className="mt-6 flex justify-center">
          <p className="text-black/50 font-normal mintablet:w-[70%] text-center">
            Experience ultimate luxury and comfort at our resort's accommodations. From elegant rooms and suites to charming cottages and villas, we offer a variety of options to suit every traveler's preference. Indulge in breathtaking views, modern amenities, and personalized service, creating memories that will last a lifetime. Discover your perfect retreat at our resort and make your stay truly unforgettable.
          </p>
        </div>
        <div className="flex flex-wrap  gap-x-6 gap-y-6 my-16 flex-col minMd:flex-row minMd:justify-center">
          {
            isLoading ? < >
                <div className="flex-col  shadow-lg mintablet:w-[25rem] minMd:w-[45%] w-full">
                  <Skeleton height="16.25rem" width="100%"/>
                  <aside className=" flex flex-col px-4 py-6 items-center">
                      <Skeleton  height="30px" width="6rem"  />
                      <Skeleton  height="30px" width="6rem"  />
                      
                      {/* Package Button */}
                      <Skeleton width="200px" height="50px" className='mx-auto'/>
                    
                    </aside>
                </div>
                <div className="flex-col  shadow-lg mintablet:w-[25rem] minMd:w-[45%] w-full">
                  <Skeleton height="16.25rem" width="100%"/>
                  <aside className=" flex flex-col px-4 py-6 items-center">
                      <Skeleton  height="30px" width="6rem"  />
                      <Skeleton  height="30px" width="6rem"  />
                      
                      {/* Package Button */}
                      <Skeleton width="200px" height="50px" className='mx-auto'/>
                    
                    </aside>
                </div>
                
                <div className="flex-col  shadow-lg mintablet:w-[25rem] minMd:w-[45%] w-full">
                  <Skeleton height="16.25rem" width="100%"/>
                  <aside className=" flex flex-col px-4 py-6 items-center">
                      <Skeleton  height="30px" width="6rem"  />
                      <Skeleton  height="30px" width="6rem"  />
                      
                      {/* Package Button */}
                      <Skeleton width="200px" height="50px" className='mx-auto'/>
                    
                    </aside>
                </div>
                <div className="flex-col  shadow-lg mintablet:w-[25rem] minMd:w-[45%] w-full">
                  <Skeleton height="16.25rem" width="100%"/>
                  <aside className=" flex flex-col px-4 py-6 items-center">
                      <Skeleton  height="30px" width="6rem"  />
                      <Skeleton  height="30px" width="6rem"  />
                      
                      {/* Package Button */}
                      <Skeleton width="200px" height="50px" className='mx-auto'/>
                    
                    </aside>
                </div>
                <div className="flex-col  shadow-lg mintablet:w-[25rem] minMd:w-[45%] w-full">
                  <Skeleton height="16.25rem" width="100%"/>
                  <aside className=" flex flex-col px-4 py-6 items-center">
                      <Skeleton  height="30px" width="6rem"  />
                      <Skeleton  height="30px" width="6rem"  />
                      
                      {/* Package Button */}
                      <Skeleton width="200px" height="50px" className='mx-auto'/>
                    
                    </aside>
                </div>
              </> :
            <>
              {rooms.map((room:any,index:number) => (
              <Fade duration={3000} delay={100*index}>
                  <div key={index} id={room?.roomType} className="flex-col  shadow-lg mintablet:w-[25rem] minMd:w-[45%] w-full">
                  <img
                    src={room.image}
                    alt={""}
                    className="h-[16.25rem] w-full"
                  />
                  <aside className=" flex flex-col px-4 py-6 items-center">
                    {/* <p className="text-xl font-semibold text-center capitalize">
                      {room?.roomType}
                    </p> */}
                    <HighlightedText className='text-xl font-semibold text-center capitalize' 
                      text={room?.roomType} 
                      searchText={matchText}
                    />
                    
                    <h2 className="text-2xl my-6 text-center font-normal">
                      {room?.currency==="NGN"?"N":"$"}{room?.discountedPrice}/
                      <span className="text-lg font-light"> PER NIGHT</span>
                      <p className="text-sm text-[#000]/40 font-light">{room?.percentOff ?`${room?.percentOff}% off` : ""}</p>
                    </h2>
                    <div className="flex-col items-center space-y-6 ">                    
                        <div className="flex mx-auto  justify-center">
                            {room?.content?.map((cont:string,index:number)=>(
                                      <span key={index} className="mr-1"
                                      >
                                          {cont} 
                                          {room.content.length !== index+1 ? "," : "" }
                                      </span>
                                  ))}
                        </div>                      
                    </div>
                    {/* Package Button */}
                    <button onClick={()=>handleClick(room?.roomType)}  className="px-20 my-6 rounded-lg py-4 border-solid border-[1px] border-black">
                      Book room
                    </button>
                  </aside>
                </div>
              </Fade>
            ))}
            </>
          }
        </div>
      </section>
    </div>
  );
};

export default Accomodation;
