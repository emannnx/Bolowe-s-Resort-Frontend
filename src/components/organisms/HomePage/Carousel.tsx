import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import NextIcon from "../../../assets/icons/next.svg";
import PrevIcon from "../../../assets/icons/previous.svg";

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
  console.log("next prop:", props)
  return (
    <div className={`absolute z-30 active:opacity-60 cursor-pointer right-[24px] top-[45%] bg-[#fff]/70 h-[40px] w-[40px] flex  items-center justify-center rounded-full`} onClick={props.onClick}>
      <img src={NextIcon}/>
    </div>
  )
}

const CustomPrevArrow = (props:any)=> {
  return (
    <div className="absolute active:opacity-60 cursor-pointer z-30 left-[24px] top-[45%] bg-[#fff]/70 h-[40px] w-[40px] flex items-center justify-center rounded-full" onClick={props.onClick}>
      <img src={PrevIcon}/>
    </div>
  )
}

interface propType {
    items:any[]
}
const FadeCarousel = ({items}:propType)=>{

  type screenTypes = "DESKTOP" | "MOBILE" | "MEDIUM"
  const [screenType, setScreenType] = useState<screenTypes>();
  useEffect(()=>{
    const handleScreenChange = (evt:any)=>{
      const screenWidth = window.innerWidth;
      if (screenWidth<768) {
        setScreenType("MOBILE")
      }

      else if (screenWidth>=768 && screenWidth<992) (
        setScreenType("MEDIUM")
      )

      else {
        setScreenType("DESKTOP")
      }
    }
    window.addEventListener("resize", handleScreenChange);

    return ()=> {
      window.removeEventListener("resize",handleScreenChange);
    }
  })

  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    cssEase: "linear",
   
    initialSlide: 0,
    arrows: true,
    appendDots: (dots:any) => (
      <CustomPaging dotProps={dots} slideCount={dots.length} currentSlide={dots.currentIndex} />
    ),
    nextArrow: <CustomNextArrow />, // Custom Next Arrow component
    prevArrow: <CustomPrevArrow />,
   
  };
     
  return (
        <Slider {...settings}>
          {
            items.map((item, index)=>(
              <section key={item?.key} className={`home relative  grid grid-cols-12   bg-center bg-no-repeat bg-cover`} 
               
              >
                <img className="hidden minMd:block w-full h-full object-cover  absolute z-10" src={item.src}/>
                <img className="minMd:!hidden w-full h-full object-cover absolute z-10" src={item.mobileSrc}/>
              <div className={`hero-div w-full px-6 absolute z-30  h-full flex flex-col justify-end col-span-12 minMd:col-span-5  ${item?.key===5 ? " hidden":""}`}>
                  <h1 className="heading">{item.heading1} <br/> {item?.heading2 ? item.heading2 :""}</h1>            
                  <NavLink className={`btn-custom no-underline font-sans block`} to="/packages">Book Now</NavLink>              
              </div>
          </section>
            ))
          }
        </Slider> 
    )
}

export default FadeCarousel;