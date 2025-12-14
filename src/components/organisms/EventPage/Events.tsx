import { useEffect, useState } from 'react';
import weddingNew from '../../../assets/images/wedding_new.jpeg';
import events  from '../../../Data/EventAndMeetings';
import Carousell from '../Carousell';
import './Events.css';
import Anniverary from "../../../assets/images/anniversary.jpeg";
//import Event3 from "../../../assets/images/event_3.jpeg";
import Event1 from "../../../assets/images/event/IMG_6277.jpg"
import Event3 from "../../../assets/new_images/anni.jpg"
import Event2 from "../../../assets/images/event/Screenshot_20230303_215518_Gallery.jpg"
import { useSearchParams } from 'react-router-dom';

const Events = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
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

      }
  });

  return (
    <div id="events" className="page">
      <Carousell>
        <div className="hero bg-center bg-no-repeat bg-cover" style={{ backgroundImage: `url(${weddingNew})` }}>
          <p>WEDDINGS</p>
        </div>
        <div className="hero bg-center bg-no-repeat bg-cover" style={{ backgroundImage: `url(${Event2})` }}>
          <p>PARTIES</p>
        </div>
        <div className="hero bg-center bg-no-repeat bg-cover" style={{ backgroundImage: `url(${Event3})` }}>
          <p>ANNIVERSERIES</p>
        </div>
      </Carousell>
      <div className="features">
        {/* <img src={wedding1} alt="" className="feature-img" />{' '} */}
        <div className="feature-text">
          <h1>EVENTS & MEETINGS</h1>
          <p>
          We don't just offer a stunning backdrop for leisure and relaxation, but we also provide exceptional venues and services for unforgettable events and meetings. Whether you're planning a corporate conference, a dream wedding, or a special celebration, we have the perfect spaces and expertise to bring your vision to life.
          </p>
        </div>
        <div>
          {
            events?.map((evt:any,index:number)=>{
              return (
                <section key={index} id={evt.name}  className="px-16  sm:px-4  py-6 mintablet:py-0 mintablet:mb-[50px]">
                  <h2 className="text-[24px] px-[15px] minMd:px-[60px] font-extralight text-start mintablet:hidden">{evt.name}</h2>
                  <div className=' grid grid-cols-1 w-full px-[15px] minMd:px-[60px] minLg:px-[100px]  justify-center items-center  mintablet:grid-cols-12 gap-x-10'>
                    <img className='hidden mintablet:block rounded-[10px] col-span-4 mintablet:col-span-6 w-full  minMd:w-[450px] h-[350px]' src={evt.image} alt=""/>
                    <div className='col-span-1 mintablet:col-span-6'>
                      <h2 className="hidden mintablet:block text-[24px] font-extralight text-start">{evt.name}</h2>
                      <p className="text-start  text-black/50 my-4 font-normal ">
                        {evt.description}
                      </p>
                    </div>
                  <img className='mintablet:hidden rounded-[10px] col-span-1 w-full  minMd:w-[450px] h-[350px]' src={evt.image} alt=""/>
                  </div>
            </section>
              )
            })  
          }
        </div>
      </div>
    </div>
  );
};

export default Events;
