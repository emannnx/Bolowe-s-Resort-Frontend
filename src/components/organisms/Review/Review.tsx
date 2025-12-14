import Reviews from "../../../Data/Review";
import { useEffect, useRef, useState } from "react";
import {motion} from "framer-motion";
import Slider from "react-slick";
import { Diversity1 } from "@mui/icons-material";
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const Review =  ()=> {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
      };
    return (
        <div  className='rounded-r-[10px] px-8 bg-white py-8 absolute left-0  w-[600px] minXl:w-[800px] h-[600px] top-[100px] flex flex-col justify-center'
        >
              
                <Slider 
                    {...settings}
                >
                    {
                        Reviews?.map((review:any)=>(
                            <>
                                <div
                                  
                                >
                                    <h3 className="text-[20px] leading-[33px]">{review.name}</h3>
                                    <p className="text-[20px] leading-[33px]">{review.profession}</p>
                                </div>
                                <div className="text-[20px] leading-[33px] italic text-[#000]/50 my-[50px] px-10"
                                   
                                >
                                    {
                                        review.comment
                                    }
                                </div>
                                {/* <div className="flex flex-row self-end">
                                    {
                                        Reviews?.map((review,index)=>(
                                            <span 
                                                className={index===count ? "transition-colors duration-1000 delay-200 rounded-full w-[18px] h-[18px] bg-black p-1 border border-solid border-black mr-[5px]" 
                                                        :
                                                    "rounded-full w-[18px] h-[18px]  p-1 border border-solid border-black mr-[5px] transition-colors duration-1000 delay-200"
                                                }
                                            />
                                        ))
                                    }
                                </div> */}
                        </>
                        ))
                    }
                </Slider>

        </div>
    )
}


export default Review;
