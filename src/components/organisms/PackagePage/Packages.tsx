import React, { useEffect, useState } from 'react';
import './Packages.css';
import Carousell from '../Carousell';
import { GetPackages } from '../../../services/Package';
import Logger from '../../../utils/Logger';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import BookTypes from '../../../Constants/BookTypes';
//import Package2 from "../../../assets/images/package_2.jpg";
import Fade from "react-reveal/Fade"
import Package1 from "../../../assets/images/packages/Screenshot_20230315_231549_Gallery.jpg"
import Package2 from "../../../assets/new_images/PROGRESS_UNISEX_SALON_4_b&n.jpg"
import Package3 from "../../../assets/new_images/PROGRESS_UNISEX_SALON_321-1.jpg"
import Package4 from "../../../assets/new_images/PROGRESS_UNISEX_SALON_47.jpg"
import HighlightedText from '../HighlightedText';
import { toast } from 'react-toastify';

const Packages = () => {
  //const [roomTypes, setRoomTypes] =  useState([])
  const [packages, setPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  let [searchParams, setSearchParams] = useSearchParams();
  const [matchText, setMatchText]  = useState("")


  useEffect (()=>{
    const fetchPackages = ()=> {
        setIsLoading(true)
        GetPackages().then(
          res=>{
            setIsLoading(false)
            Logger("Packages", res.data)
            setPackages(res.data)
          },
          err=>{
            //setIsLoading(false)
            console.log(err)
          }
        )
    
    }
    
   fetchPackages()
  },[])
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Get the hash from the URL
    //const { hash } = location;

      const sectionElement:any = document.getElementById(searchParams.get("to") as any);
      if (sectionElement) {
       
        sectionElement.scrollIntoView({ behavior: 'smooth' });
        setMatchText(searchParams.get("name")?.replace(/ /g,' ') as any)
        console.log(searchParams.get("name")?.replace(/ /g,' '))
      }
  });

  useEffect(()=>{
    const message = searchParams.get("message")
    if (message && !(message?.length<=0)) {
      toast.error(message, {autoClose:false})
      searchParams.set("message","")
    }
  },[])


  const handleClick = (id:string)=> {
    navigate(`/booking/${BookTypes.PACKAGE}?item_id=${id}`)
  }

  return (
    <div id="packages">
      <Carousell>
        {/* Carousel */}
        <div className="hero bg-center bg-cover bg-no-repeat" style={{ backgroundImage: `url(${Package1})` }}>
          <p>Regular Gate Fee</p>
        </div>
        <div className="hero bg-center bg-cover bg-no-repeat" style={{ backgroundImage: `url(${Package2})` }}>
         <p>Silver Ticket (8am - 6pm)</p>
        </div>
        <div className="hero bg-center bg-cover bg-no-repeat" style={{ backgroundImage: `url(${Package3})` }}>
          <p>Gold Ticket (8am - 6pm)</p>
        </div>
        <div className="hero bg-center bg-cover bg-no-repeat" style={{ backgroundImage: `url(${Package4})` }}>
          <p>Diamond Ticket (8am - 6pm)</p>
        </div>
      </Carousell>
      {/* End of Carousel */}
      {/* Package Section */}
      <section className="px-16 py-12 sm:px-5">
        <h2 className="text-4xl font-extralight text-center my-4 font-playfair">
          Packages
        </h2>
        <div className="mt-6 flex justify-center">
          <p className="text-black/50 font-normal mintablet:w-[70%] text-center">
            At Bolowei’s World Resort, We believe in tailor-made experiences that suit your every vacation desire. We've curated a range of exciting packages designed to cater to your unique preferences and create memories that will leave you longing for more. Whether you're seeking a tranquil escape, an action-packed adventure, or a romantic rendezvous, we have the perfect package just for you.
            No matter which package you choose, rest assured that our attentive staff will go above and beyond to ensure that every detail of your stay is flawless. So, pick your package, pack your bags, and get ready for an extraordinary experience. Your dream vacation awaits!
          </p>
        </div>
        <div className="flex flex-wrap  gap-x-6 gap-y-6 my-16  flex-col minMd:flex-row minMd:justify-center">
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
              {packages?.map((pack:any,index:number) => (
             <Fade duration={3000} delay={100*index}>
             <div key={index} id={pack?._id} 
              className="cursor-pointer group z-20 relative flex-col  shadow-lg mintablet:w-[350px] minMd:w-[45%] w-full rounded-md"
              onClick={()=>handleClick(pack?._id)} 
             >
             <img
               src={pack.image}
               alt={""}
              //  className=" h-[16.25rem] w-full"
                className='h-[500px] w-full z-10 rounded-md'
             />
             {/* <aside className=" flex flex-col px-4 py-6 items-center">
              <HighlightedText className='text-xl font-semibold text-center capitalize' 
                  text={pack.name} 
                  searchText={matchText}
              />
               
               <h2 className="text-2xl my-6 text-center font-normal">
                 {pack?.currency==="NGN"?"N":"$"}{pack?.discountedPrice}/
                 <span className="text-lg font-light"> {pack?.description}</span>
                 <p className="text-sm text-[#000]/40 font-light">{pack?.percentOff ?`${pack?.percentOff}% off` : ""}</p>
               </h2>
               <div className="flex mx-auto  justify-center">
                  {pack?.content?.map((cont:string,index:number)=>(
                            <span key={index} className="mr-1"
                            >
                                {cont} 
                                {pack.content.length !== index+1 ? "," : "" }
                            </span>
                        ))}
                </div>  
               {/* pack Button 
               <button onClick={()=>handleClick(pack?._id)}  className="px-20 my-6 rounded-lg py-4 border-solid border-[1px] border-black">
                 Buy ticket
               </button>
             </aside> */}
              <div className='absolute  bg-transparent group-hover:bg-black/20 rounded-sm hidden z-30 group-hover:flex transition-colors duration-1000  items-end justify-center w-full top-0 h-full'>
                <button onClick={()=>handleClick(pack?._id)}  
                  className="bg-[#1AACAC] border-[#1AACAC] text-white px-20 my-6 rounded-lg py-4 border-solid border-[1px]  font-bold"
                >
                  Buy ticket
                </button>
              </div>
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

export default Packages;
