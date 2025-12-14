import { useEffect, useState, useRef } from 'react';
// import './Attractions.css';
import Carousell from '../Carousell';
import AttractionsList from '../../../Data/Attractions';
import FoodCourts from '../../../Data/FoodCourts';
import { useLocation, useSearchParams } from 'react-router-dom';
import Fade from "react-reveal/Fade";
import FoodMenu from "../../../assets/new_images/PROGRESS UNISEX SALON_18.jpg";
import Attraction1 from "../../../assets/new_images/Image_from_iOS_11.jpg"
import Attraction2 from "../../../assets/new_images/Image_from_iOS_8.jpg"
import Attraction3 from "../../../assets/new_images/PROGRESS_UNISEX_SALON_239.jpg"

const Attractions = () => {
  const [currentAttr,setCurrentAttr] = useState(0)
  const location = useLocation();
  const foodRef = useRef(null);
  let [searchParams, setSearchParams] = useSearchParams();
  const attrRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Get the hash from the URL
    //const { hash } = location;
    if (searchParams?.get("to")==="food") {
     
      // Scroll to the section when the component mounts
      const sectionElement:any = foodRef.current;
      if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: 'smooth' });
      }
    }

    else if (searchParams.get("to")==="attr") {
      const sectionElement:any = attrRef.current;
      if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: 'smooth' });
        setCurrentAttr(Number(searchParams.get("pos")))
      }
    }
  }, [location]);

  const handleClick = (index:number)=> {
    setCurrentAttr(index)
  }

  return (
    <div id="attractions" className="page">
      <Carousell>
        {/* Carousel Content */}
        <div className="hero bg-center bg-no-repeat bg-cover" style={{ backgroundImage: `url(${Attraction3})` }}>
          <p>Quad Bikes</p>
        </div>
        <div className="hero bg-left-top" style={{ backgroundImage: `url(${Attraction2})` }}>
         <p> Swimming Pool</p>
        </div>
        <div className="hero bg-center bg-no-repeat bg-cover" style={{ backgroundImage: `url(${Attraction1})` }}>
         <p> Paintball</p>
        </div>
      </Carousell>
      <section ref={attrRef} className="px-16 py-12 sm:px-5">
        <h2 className="text-4xl font-extralight text-center my-4 sm:text-2xl font-playfair">
          Attractions
        </h2>
        <div className="text-black/50 font-normal sm:text-base sm:px-3">
          <p>
          We are thrilled to introduce you to the incredible attractions that will make your stay truly unforgettable. Prepare to be captivated by the beauty of our resort and the endless possibilities for excitement and rejuvenation.
          </p>
          <p className="mt-6">
          We have a wide range of attractions and activities to ensure that every guest experiences the ultimate adventure and relaxation. Get ready to immerse yourself in a world of excitement with our diverse selection of attractions:
          </p>
        </div>
        <section className='mt-6 px-16 sm:px-4'>
          <div className='flex flex-row gap-x-4 gap-y-3 flex-wrap'>
            {
              AttractionsList.map((attr:any,index:number)=>{
                return (
                  <button onClick={()=>handleClick(index)} className={currentAttr===index?"bg-black hover:scale-105 text-white px-3 py-2 h-[40px]":"bg-black/10 text-black px-3 py-2 h-[40px] hover:bg-black hover:!text-white"} 
                    key={index}>
                      {attr.name}
                  </button>
                )
              })
            }
          <section className="px-16 sm:px-4 py-6 mintablet:py-8">
            <h2 className="text-[24px] font-extralight text-start mintablet:hidden">{AttractionsList[currentAttr].name}</h2>
              <div className=' grid grid-cols-1 w-full   minLg:px-[100px]  justify-center items-center  mintablet:grid-cols-12 gap-x-10'>
                <Fade bottom duration={1000}>
                  <img className='hidden object-cover mintablet:block rounded-[10px] col-span-4 mintablet:col-span-6 w-full  minMd:w-[450px] h-[350px]' src={AttractionsList[currentAttr].image} alt=""/>
                </Fade>
                <div className='col-span-1 mintablet:col-span-6'>
                  <h2 className="hidden mintablet:block text-[24px] font-extralight text-start">{AttractionsList[currentAttr].name}</h2>
                  <p className="text-start  text-black/50 my-4 font-normal ">
                    {AttractionsList[currentAttr].description}
                  </p>
                </div>
             <Fade bottom duration={1000}>
             <img className='mintablet:hidden object-cover rounded-[10px] col-span-1 w-full  minMd:w-[450px] h-[350px]' src={AttractionsList[currentAttr].image} alt=""/>
             </Fade>
              </div>
          </section>
          </div>
        </section>
      </section>
      <section ref={foodRef} className="px-16 py-6 mb-[50px] sm:px-5">
        <h2 className="text-4xl mintablet:hidden font-extralight text-center my-4 sm:text-2xl font-playfair">
          Food court
        </h2>
        <div className="text-black/50 font-normal sm:text-base sm:px-3 grid grid-cols-1 mintablet:grid-cols-12 items-center gap-x-10">
          <img className='h-[400px] hidden mintablet:block w-full col-span-1 rounded-[10px] mintablet:col-span-6' src={FoodMenu} alt=""/>
          <div className='col-span-1 mintablet:col-span-6'>
          <h2 className="text-4xl text-black hidden mintablet:block font-extralight text-start my-4 sm:text-2xl font-playfair">
            Food court
          </h2>
            <p className=''>
              Discover a culinary paradise at our resort's food court, where a diverse array of delectable flavors awaits. From international delicacies to local specialties, savor an unforgettable dining experience amidst a vibrant and inviting atmosphere.
            </p>
            <p className='mt-3 hidden mintablet:block'>Explore our food menu:</p>
            <div className='  hidden mintablet:flex flex-row gap-x-4 gap-y-3 flex-wrap mt-4 sm:px-3'>
              {
                  FoodCourts.map((item:any,index:number)=>{
                    return (
                     <li key={index} className="bg-black/10 list-none cursor-pointer text-black px-3 py-2 h-[40px] hover:bg-black hover:text-white group">
                       <a target='_blank' href={item?.link}  className='group-hover:!text-white text-black no-underline'>
                          {item?.name}
                      </a>
                     </li>
                    )
                  })
                }
        </div>
          </div>
          <img className='h-[350px] mintablet:hidden mt-4 w-full minMd:w-[70%] mx-auto col-span-1 rounded-[10px] object-cover' 
            src={FoodMenu} alt=""
          />
        </div>
       <div className='mt-4 mintablet:hidden '>
       <p className='mt-5 mb-2  sm:px-3'>Explore our food menu:</p>
        <div className='flex flex-row gap-x-4 gap-y-3 flex-wrap  sm:px-3'>
          {
                FoodCourts.map((item:any,index:number)=>{
                  return (
                    <a target='_blank' href={item?.link} onClick={()=>handleClick(index)} className="bg-black/10 text-black px-3 py-2 h-[40px] hover:bg-black hover:text-white"
                      key={index}>
                        {item?.name}
                    </a>
                  )
                })
              }
        </div>
       </div>
      </section>
    </div>
  );
};

export default Attractions;
