import { useEffect, useRef, useState } from 'react';
import './About.css';
import arrowright from '/src/assets/images/arrowright.svg';
import arrowleft from '/src/assets/images/arrowleft.svg';
import Slider from "react-slick";
//import "slick-carousel/slick/slick.css"; 
//import "slick-carousel/slick/slick-theme.css";
import NextIcon from "../../../assets/icons/next.svg";
import PrevIcon from "../../../assets/icons/previous.svg";
import "./AboutCarousel.scss"



const AboutCarousel = ({ imgs }: any) => {

  
  const CustomPaging = ({ slideCount, dotProps }:any) => {
    const dots = [];
  
    for (let i = 0; i < slideCount; i++) {
      const dotStyle = {
        backgroundColor: dotProps[i]?.props.className === "slick-active" ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.7)',
      };
  
      dots.push(
        <li key={i}>
         <div
          style={{
            width: "8px",
            height: "8px",
            borderRadius:"100%",
            color:"blue",
            transition:"ease-in-out",
            transitionDuration:"3000",
            transitionProperty:"background-color",
            ...dotStyle
          }}
          >   
        </div>
        </li>
      );
    }
  
    return <ul className="custom-paging absolute left-[45%] bottom-[20px] mintablet:bottom-[50px] flex  space-x-2">{dots}</ul>;
  };
  
  const CustomNextArrow = (props:any)=> {
    return (
      <div className={`absolute z-30 active:opacity-60 cursor-pointer right-[-35px] minMd:right-[-50px] top-[25%] bg-[#fff]/70  border border-black border-solid  h-[35px] minMd:h-[40px] w-[32px]  minMd:w-[40px] flex  items-center justify-center rounded-full`} onClick={props.onClick}>
        <img src={NextIcon}/>
      </div>
    )
  }
  
  const CustomPrevArrow = (props:any)=> {
    return (
      <div className="absolute active:opacity-60 cursor-pointer z-30 left-[-35px] minMd:left-[-50px] top-[25%] bg-[#fff]/70 border border-black border-solid h-[35px] minMd:h-[40px]  w-[32px] minMd:w-[40px] flex items-center justify-center rounded-full" onClick={props.onClick}>
        <img src={PrevIcon}/>
      </div>
    )
  }

  const settings = {
    //className: "center",
    //centerMode: true,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500,
    arrows: true,
    appendDots: (dots:any) => (
      <CustomPaging dotProps={dots} slideCount={dots.length} currentSlide={dots.currentIndex} />
    ),
    nextArrow: <CustomNextArrow />, // Custom Next Arrow component
    prevArrow: <CustomPrevArrow />,
  };

  const settingsMobile = {
    className: "center",
    centerMode: true,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    infinite: true,
    //centerPadding: "60px",
    slidesToShow: 1,
    speed: 500,
    arrows: true,
    appendDots: (dots:any) => (
      <CustomPaging dotProps={dots} slideCount={dots.length} currentSlide={dots.currentIndex} />
    ),
    nextArrow: <CustomNextArrow />, // Custom Next Arrow component
    prevArrow: <CustomPrevArrow />,
  };


  const settingsMidScreen = {
    className: "center",
    centerMode: true,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 2,
    speed: 500,
    arrows: true,
    appendDots: (dots:any) => (
      <CustomPaging dotProps={dots} slideCount={dots.length} currentSlide={dots.currentIndex} />
    ),
    nextArrow: <CustomNextArrow />, // Custom Next Arrow component
    prevArrow: <CustomPrevArrow />,
  };


  return (
    <div className="">
      
     <div className='hidden mintablet:block px-20 aboutCarousel'>
     <Slider   {...settings}>
        {imgs.map((image: any) => (
          <img
            key={image.id}
            src={image.link}
            className="it lg:w-1/3 lg:h-[26.03125rem] mintablet:h-[300px] mintablet:w-1/2  sm:h-auto rounded-[10px] !mx-4"
            alt={image.alt}
          />
        ))}
        </Slider> 
     </div>
     <div className=' mintablet:hidden px-5 aboutCarousel'>
     <Slider   {...settingsMobile}>
        {imgs.map((image: any) => (
          <img
            key={image.id}
            src={image.link}
            className="it  h-[200px] w-[150px] minMd:w-1/2 minMd:h-[26rem]  rounded-[10px]"
            alt={image.alt}
          />
        ))}
        </Slider> 
     </div>
    </div>
  );
};

export default AboutCarousel;
