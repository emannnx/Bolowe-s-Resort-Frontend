import { useEffect, useState } from 'react';
import './Home.css';
import ArrowRight2 from '../../../assets/images/arrowright2.svg';
import Parlor from '../../../assets/images/parlor.png';
import {  useNavigate } from 'react-router-dom';
import Fade from 'react-reveal/Fade';
import { GetPackages } from '../../../services/Package';
import Logger from '../../../utils/Logger';
import Pulse from 'react-reveal/Pulse';
import Skeleton from 'react-loading-skeleton';
import AboutNew from '../../../assets/images/about/IMG-20221001-WA0076.jpg';
import BookTypes from '../../../Constants/BookTypes';
import progressUnisexSalon82 from "../../../assets/new_images/PROGRESS_UNISEX_SALON_82-1.jpg"
import progressUnisexSalon62 from "../../../assets/new_images/PROGRESS_UNISEX_SALON_62.jpg"
import progressUnisexSalon195 from "../../../assets/new_images/PROGRESS_UNISEX_SALON_195.jpg"
import progressUnisexSalon125 from "../../../assets/new_images/PROGRESS_UNISEX_SALON_125-1.jpg"
import progressUnisexSalon197 from  "../../../assets/new_images/PROGRESS_UNISEX_SALON_197.jpg"
import Review from '../Review/Review';
import BoloNew from "../../../assets/new_images/new_bolo.jpg";
import Bolo43 from "../../../assets/new_images/BOLOWEI_RESORT_43.jpg" 
import EventMeeting from "../../../assets/new_images/event_meeting.jpeg";
import { ContactUs } from '../../../services/general';
import { toast } from 'react-toastify';
import { CircleLoader } from 'react-spinners';
import FadeCarousel from './Carousel';
import progressUnisexSalon84 from "../../../assets/new_images/PROGRESS UNISEX SALON_84-1.jpg";
import progressUnisexSalonBAndN from "../../../assets/new_images/PROGRESS_UNISEX_SALON_4_b&n.jpg";
import whatsAppIcon from "../../../assets/icons/whatsApp.svg";
import progressUnisexSalon82Mobile from "../../../assets/place_holders/iloveimg-resized/PROGRESS_UNISEX_SALON_82-1.jpg"
import progressUnisexSalon62Mobile from "../../../assets/place_holders/iloveimg-resized/PROGRESS_UNISEX_SALON_62.jpg"
import progressUnisexSalon195Mobile from "../../../assets/place_holders/iloveimg-resized/PROGRESS_UNISEX_SALON_195.jpg"
import progressUnisexSalon125Mobile from "../../../assets/place_holders/iloveimg-resized/PROGRESS_UNISEX_SALON_125-1.jpg"
import progressUnisexSalon197Mobile from  "../../../assets/place_holders/iloveimg-resized/PROGRESS_UNISEX_SALON_197.jpg"
import BoloNewMobile from "../../../assets/place_holders/iloveimg-resized/new_bolo.jpg";
import Bolo43Mobile from "../../../assets/place_holders/iloveimg-resized/BOLOWEI_RESORT_43.jpg" 
import progressUnisexSalon84Mobile from "../../../assets/place_holders/iloveimg-resized/PROGRESS UNISEX SALON_84-1.jpg";
import progressUnisexSalonBAndNMobile from "../../../assets/place_holders/iloveimg-resized/PROGRESS_UNISEX_SALON_4_b&n.jpg";
import GirlsShower from "../../../assets/images/meetingAndEvent.jpg"
import AmazonMobile from "../../../assets/new_images/mobile.jpg";
import Amazon  from "../../../assets/new_images/amazon_fit.jpg"

const MAX_SLIDE_COUNT = 3;

const items = [
    {
      src: progressUnisexSalon82,
      heading1: 'Get ready for an exhilarating',
      heading2: 'and fun-filled adventure',
      key: 1,
      mobileSrc: progressUnisexSalon82Mobile,
    },
    {
      src: progressUnisexSalon195,
      heading1: 'Discover the epitome of luxury',
      heading2: 'and indulgence on the open seas',
      key: 2,
      mobileSrc: progressUnisexSalon195Mobile,
    },
    {
      src: BoloNew,
      heading1: 'Connect with nature,',
      heading2: 'immerse yourself in the wonders of the ocean, and',
      key: 3,
    },
    {
      src: progressUnisexSalon62,
      heading1: 'Create lifelong memories in a truly idyllic setting.',
      key: 4,
      mobileSrc: progressUnisexSalon62Mobile,
    },
    {
      src: Amazon,
      heading1: '',
      key: 5,
      mobileSrc: AmazonMobile,
    },
  
];

const Home = () => {
  const [packages, setPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [sendingMail, setSendingMail] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const fetchPackages = () => {
      setIsLoading(true);
      GetPackages().then(
        (res) => {
          setIsLoading(false);
          Logger('Packages', res.data);
          setPackages(res.data);
        },
        (err) => {
          //setIsLoading(false)
          console.log(err);
        }
      );
    };

    fetchPackages();
  }, []);

  const handleClick = (id: string) => {
    navigate(`/booking/${BookTypes.PACKAGE}?item_id=${id}`);
  };

  const handleEmailSubmission = (evt: any) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    const payload = {
      email: formData.get('email') as string,
      name: formData.get('name') as string,
      message: formData.get('message') as string,
    };

    setSendingMail(true);
    ContactUs(payload).then(
      (res) => {
        setSendingMail(false);
        toast.success(
          'Email sent successfully. We will get back to you as soon as possible'
        );
      },
      (err) => {
        setSendingMail(false);
        toast.error('Oops, we could not send your email');
      }
    );
  };

  return (
    <div className='!max-w-full !overflow-x-hidden'>
      <main className=''>
        <FadeCarousel items={items}/>
        <a href="https://wa.me/2348025229444" 
          className='fixed bottom-[20px] right-5 minMd:right-[70px] mintablet:right-[100px] z-[777]' 
          target='_blank'  
        >
          <img src={whatsAppIcon} alt="" className='h-[38px] w-[38px] mintablet:w-[52px]  mintablet:h-[52px] '/>
        </a>
      </main>
      {/*End of Carousel Content*/}
      {/*Description Section*/}
      <section className="desc hidden mintablet:grid  py-6">
      {/* <h2 className="who block mintablet:hidden">Who We Are</h2> */}
       <Fade duration={2000}>
        <div className="desc-image">
            <img loading='lazy' className='rounded-[10px] object-cover' src={AboutNew} alt="resort" />
          </div>
        </Fade>
        <Fade right distance="100px" delay={600} duration={1000}>
          <div className="desc-text">
            <h2 className="who">Who We Are</h2>
            <p className="text-black/50 mt-12 w-3/4 sm:w-full">
              Welcome to Bolowei's Resort, a luxury resort located in Warri. Our
              resort offers a stunning range of amenities and services that are
              sure to make your stay unforgettable. Whether you're looking for a
              romantic getaway, a family vacation, or a corporate event, our
              resort has everything you need to create lasting memories.{' '}
              <a
                href="/about"
                className="text-black no-underline flex flex-row group brightness-0 "
              >
                Learn More
                <img
                  className="w-6 h-6 group-hover:scale-125"
                  src={ArrowRight2}
                  alt=""
                />
              </a>
            </p>
          </div>
        </Fade>
      </section>
      {/*End of Description Section*/}
      {/*Mobile Description Section*/}
      <section className="desc mintablet:!hidden">
        {/* <h2 className="who block mintablet:hidden">Who We Are</h2> */}
        <Fade duration={500}>
          <div className="desc-text">
                <h2 className="who font-bold text-3xl">Who We Are</h2>
                <p className="text-black/50 mt-12 w-3/4 sm:w-full text-start">
                Welcome to Bolowei’s World Resort, where fun, relaxation, and unforgettable memories come together! We're thrilled to have you join us on this incredible journey of adventure and relaxation. So, sit back, grab a virtual piña colada, and let us whisk you away to a world of pure bliss!{' '}
                  <a href="/about" className="text-black mt-2 no-underline flex flex-row group brightness-0 ">
                    Learn More
                    <img className='w-6 h-6 group-hover:scale-125' src={ArrowRight2} alt=""/>
                  </a>
                </p>
              </div>
        </Fade>
       
          <div className="desc-image mt-6">
          <Fade bottom distance="30px" duration={1000}>
            <img loading='lazy' className='rounded-[10px] object-cover' src={AboutNew} alt="resort" />
            </Fade>
          </div>
       
      </section>
      {/*End of mobile Description Section*/}
      {/*Activities Section*/}
      <div className='mt-[100px]'>
        <h1 className='text-3xl minMd:text-4xl font-bold text-center'>Our Gallery</h1>
      <div className="px-16 sm:px-4 flex flex-col minMd:flex-row mintablet:justify-center flex-wrap gap-x-6 py-14 space-y-5 mintablet:space-y-0 mintablet:gap-y-4">
       <div className='w-full  minMd:w-[45%] mintablet:w-[25.9375rem]'>
        <Fade  duration={3000}>
          <img
            loading='lazy'
            src={progressUnisexSalon84}
            className="hidden minMd:block !w-full  rounded-[10px] mintablet:h-[37.5rem]  h-[350px] object-cover"
            alt=""
          /> 
          <img
            loading='lazy'
            src={progressUnisexSalon84Mobile}
            className="minMd:hidden !w-full  rounded-[10px] mintablet:h-[37.5rem]  h-[350px] object-cover"
            alt=""
          /> 
        </Fade>
       </div>
        <div className="flex-col hidden mintablet:flex space-y-2 sm:space-y-0">
          <Pulse  duration={2000}>
            <img
              className="w-full minMd:w-1/2 mintablet:w-[25.9375rem] object-cover rounded-[10px] mintablet:h-[18.75rem] sm:pb-5 h-auto"
              src={progressUnisexSalon125}
              alt="cruise-ship"
              loading='lazy'
            />
          </Pulse>
          <Pulse  duration={2000} delay={1000}>
            <img
              className="w-full minMd:w-1/2 mintablet:w-[25.9375rem] object-cover rounded-[10px] mintablet:h-[18.75rem] sm:pb-5 h-auto"
              src={Bolo43}
              alt="resort"
            />
          </Pulse>
        </div>
        <div className="mintablet:hidden sm:py-3 w-full minMd:w-[45%] mintablet:w-[25.9375rem]">
          <Pulse  duration={2000}>
              <img
                className="w-full rounded-[10px] object-cover mintablet:h-[18.75rem]  h-[350px]"
                src={Bolo43Mobile }
                loading='lazy'
              alt="cruise-ship"
            />
          </Pulse>
        </div >
        <div className="mintablet:hidden sm:py-4 w-full minMd:w-[45%] mintablet:w-[25.9375rem]">
          <Pulse  duration={2000} delay={1000}>
            <img
              className="w-full rounded-[10px] object-cover mintablet:h-[18.75rem]  h-[350px]"
              src={progressUnisexSalon195Mobile}
              alt="ping-pong"
              loading='lazy'
            />
          </Pulse>
        </div>
        <div className="sm:py-4 w-full minMd:w-[45%] mintablet:w-[25.9375rem]">
          <Fade  duration={3000} delay={1000}>
            <img
                className="rounded-[10px] w-full object-cover hidden minXl:block  mintablet:h-[37.5rem] h-[350px]"
                src={progressUnisexSalonBAndN}
                alt="biker"
                loading='lazy'
              />
              <img
                className="rounded-[10px] w-full object-cover   mintablet:hidden  mintablet:h-[37.5rem] h-[350px]"
                src={progressUnisexSalonBAndNMobile}
                alt="biker"
                loading='lazy'
              />
            </Fade>
          </div>
        </div>
      </div>
      {/*End of Activities Section*/}
      {/*Packages Section*/}
      <section className="px-16 sm:px-4  sm:py-5 flex flex-col items-center">
        <h2 className="text-3xl minMd:text-4xl font-bold text-center">Packages</h2>
       <Fade left duration={1000}>
        <p className=" text-black/50 px-[15px]  my-8 font-normal mintablet:w-[70%] text-start mintablet:text-center">
            At Bolowei’s World Resort, We believe in tailor-made experiences that suit your every vacation desire. We've curated a range of exciting packages designed to cater to your unique preferences and create memories that will leave you longing for more. Whether you're seeking a tranquil escape, an action-packed adventure, or a romantic rendezvous, we have the perfect package just for you.
          </p>
        </Fade>
        <p className="text-start text-black/50 my-8 font-normal mt-2"></p>
        {/*Offer Section*/}
        <div className="flex flex-wrap w-full  gap-x-6 gap-y-6 my-0 mb-10 flex-col minMd:flex-row minMd:justify-center">
          {isLoading ? (
            <>
              <div className="flex-col  shadow-lg mintablet:w-[25rem] minMd:w-[45%] w-full">
                <Skeleton height="16.25rem" width="100%" />
                <aside className=" flex flex-col px-4 py-6 items-center">
                  <Skeleton height="30px" width="6rem" />
                  <Skeleton height="30px" width="6rem" />

                  {/* Package Button */}
                  <Skeleton width="200px" height="50px" className="mx-auto" />
                </aside>
              </div>
              <div className="flex-col  shadow-lg mintablet:w-[25rem] minMd:w-[45%] w-full">
                <Skeleton height="16.25rem" width="100%" />
                <aside className=" flex flex-col px-4 py-6 items-center">
                  <Skeleton height="30px" width="6rem" />
                  <Skeleton height="30px" width="6rem" />

                  {/* Package Button */}
                  <Skeleton width="200px" height="50px" className="mx-auto" />
                </aside>
              </div>

              <div className="flex-col  shadow-lg mintablet:w-[25rem] minMd:w-[45%] w-full">
                <Skeleton height="16.25rem" width="100%" />
                <aside className=" flex flex-col px-4 py-6 items-center">
                  <Skeleton height="30px" width="6rem" />
                  <Skeleton height="30px" width="6rem" />

                  {/* Package Button */}
                  <Skeleton width="200px" height="50px" className="mx-auto" />
                </aside>
              </div>
            </>
          ) : (
            <>
              {packages.length>0 && packages?.slice(0, 3).map((pack: any, index: number) => (
                <Fade duration={3000} delay={100 * index}>
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
                  className="bg-[#1AACAC] text-white px-20 my-6 rounded-lg py-4 border-solid border-[1px] border-[#1AACAC] font-bold"
                >
                  Buy ticket
                </button>
              </div>
           </div>
                </Fade>
              ))}
            </>
          )}
        </div>
      </section>
      {/*End of Offer Section*/}
      {/*Attractions Section*/}
      <section className="px-16   sm:px-4 py-6 sm:py-5 mt-[10px]  mx-auto">
        <h2 className="text-3xl font-bold  text-center mintablet:hidden">Attractions</h2>
       <div className=' grid grid-cols-1 w-full px-[15px] minMd:px-[60px]  minLg:px-[100px]  justify-center items-center  mintablet:grid-cols-12 gap-x-10'>
        <Fade duration={2000}>
          <img className='hidden mintablet:block rounded-[10px] col-span-4 mintablet:col-span-6 w-full  minMd:w-[500px] h-[452px] object-cover' src={progressUnisexSalon197} alt=""/>
        </Fade>
        <Fade right duration={1000}>
          <div className='col-span-1 mintablet:col-span-6'>
            <h2 className="hidden mintablet:block text-4xl font-extralight ">Attractions</h2>
            <p className="text-start text-black/50 my-8 font-normal">
                We are thrilled to introduce you to the incredible attractions that will make your stay truly unforgettable. Prepare to be captivated by the beauty of our resort and the endless possibilities for excitement and rejuvenation.
            </p>
          </div>
        </Fade> 
        <Fade right duration={1000}>
          <img className='mintablet:hidden rounded-[10px] col-span-1 mx-auto mintablet:col-span-6 w-full  minMd:w-[450px] h-[300px] object-cover' src={progressUnisexSalon197} alt=""/>
        </Fade>
       </div>
      </section>
      {/*End of Attractions Section*/}
      {/*Events & Meetings Section*/}
      <section className="px-16 sm:px-4 py-20 mx-auto  sm:py-5">
        <h2 className="text-3xl  text-center mintablet:hidden font-bold">Events & Meetings</h2>
        <div className='grid grid-cols-1 auto-cols-auto w-full px-[15px] gap-x-[40px] minMd:px-[60px] minLg:px-[100px]  justify-center items-center  mintablet:grid-cols-12'>
        <Fade duration={2000}>
          {/* <img className='hidden mintablet:block rounded-[10px] col-span-4 mintablet:col-span-6 w-full  minMd:w-[450px] h-[452px]' src={EventMeeting} alt=""/> */}
          <img className='hidden mintablet:block rounded-[10px] col-span-4 mintablet:col-span-6 w-full  minMd:w-[450px] h-[452px]' src={GirlsShower} alt=""/>
        </Fade>
        <Fade right distance="100px" duration={1000} delay={600}>
          <div className='col-span-1 mintablet:col-span-6'>
              <h2 className="hidden mintablet:block text-4xl font-extralight text-start">Events & Meetings</h2>
              <p className="text-start text-black/50 my-8 font-normal">
              We don't just offer a stunning backdrop for leisure and relaxation, but we also provide exceptional venues and services for unforgettable events and meetings. Whether you're planning a corporate conference, a dream wedding, or a special celebration, we have the perfect spaces and expertise to bring your vision to life.
              </p>
          </div>
          </Fade>
          <Fade right duration={1000}>
            {/* <img className='mintablet:hidden rounded-[10px] col-span-1 mx-auto mintablet:col-span-6 w-full  minMd:w-[450px] h-[300px] object-cover' 
              src={EventMeeting} alt=""
            /> */}<img className='mintablet:hidden rounded-[10px] col-span-1 mx-auto mintablet:col-span-6 w-full  minMd:w-[450px] h-[300px] object-cover' 
              src={GirlsShower} alt=""
              />
          </Fade>
          </div>
      </section>
      {/*End of Events & Meetings Section*/}
      {/*Parlor Section*/}
      <section className="parlor flex bg-gray-100">
        <Fade duration={2000}>
          <img className="w-[60%]  hidden" src={Parlor} />
        </Fade>
        <Fade bottom duration={1000}>
        <div className="minLg:hidden bg-white minMd:mx-auto rounded-md mt-24 sm:mt-0 py-4 px-4 h-fit flex-col sm:rounded-none">
          <h2 className="text-2xl text-center my-4">Contact Us</h2>
          <form onSubmit={handleEmailSubmission} className='bg-white mx-0 px-0'>
          <input
            type="text"
            placeholder="Name"
            name="name"
            required
            className="w-[28.0625rem] !h-[52px] sm:w-full py-3 px-2 rounded-md border-[1px] border-solid border-black my-4 outline-none"
          />
          <input
            type="email"
            required
            name="email"
            placeholder="Email"
            className=" block w-[28.0625rem] !h-[52px] sm:w-full py-3 px-2 rounded-md border-[1px] border-solid border-black my-4 outline-none"
          />
          <textarea
            name="message"
            placeholder="Message"
            required
            id=""
            cols={20}
            rows={8}
            className="outline-none sm:w-full resize-none w-[28.0625rem] py-1 px-2 rounded-md border-[1px] border-solid border-black my-4"
          ></textarea>
          <button  className="w-[28.0625rem] flex justify-center items-center sm:w-full py-4 bg-black rounded-md text-white">
             {
              sendingMail ? <CircleLoader color='#fff'/> : "Send"
             }
          </button>
          </form>
        </div>
        </Fade>
      </section>
      {/* Contact us large screen */}
      <section
        className="parlor hidden minLg:block h-[934px]  bg-center  bg-cover !bg-no-repeat relative"
        style={{ backgroundImage: `url(${Parlor})` }}
      >
        <Review />
        {/* <Fade duration={2000}>
         <img className='w-[60%]' src={Parlor}/>
       </Fade> */}
        <Fade bottom duration={1000}>
          <div className="bg-white minMd:mx-auto rounded-md mt-24 sm:mt-0 py-4 px-4 h-fit flex-col sm:rounded-none absolute right-[50px] minLg:right-[100px] top-[143px]">
            <h2 className="text-2xl text-center my-4">Contact Us</h2>
            <form
              onSubmit={handleEmailSubmission}
              className="bg-white mx-0 px-0"
            >
              <input
                type="text"
                placeholder="Name"
                required
                name="name"
                className="w-[28.0625rem] !h-[52px] sm:w-full py-3 px-2 rounded-md border-[1px] border-solid border-black my-4 outline-none"
              />
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                className=" block w-[28.0625rem] !h-[52px] sm:w-full py-3 px-2 rounded-md border-[1px] border-solid border-black my-4 outline-none"
              />
              <textarea
                name="message"
                placeholder="Message"
                id=""
                cols={20}
                required
                rows={8}
                className="outline-none sm:w-full resize-none w-[28.0625rem] py-1 px-2 rounded-md border-[1px] border-solid border-black my-4"
              ></textarea>
              <button className="w-[28.0625rem] flex justify-center items-center sm:w-full py-4 bg-black rounded-md text-white">
                {sendingMail ? <CircleLoader color="#fff" /> : 'Send'}
              </button>
            </form>
          </div>
        </Fade>
      </section>
      <section className="px-16 sm:px-4  flex-col items-center flex mb-5" 
      > 
       <h1 className='mintablet:hidden text-2xl text-center my-2'>Get Directed</h1>
       <div className='flex flex-col mintablet:flex-row  items-center mintablet:justify-center'>
          <div className='mintablet:order-2 mintablet:ml-10 flex flex-col !items-center'>
          <h1 className='hidden text-2xl text-center my-4 mintablet:block'>Get Directed</h1>
          <div className='w-full flex justify-center  mintablet:w-[300px]'>
            <p className='text-center mintablet:text-start  text-black/50 my-2 mintablet:my-8 font-normal'>
              Discover the easiest way to reach our 
              exquisite resort by using our website's 
              embedded Google Map for hassle-free directions.
            </p>
          </div>
          </div>
          <div className='mintablet:order-1 hidden minMd:block'>
           <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3971.244524073929!2d5.791050475083961!3d5.5306991339034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1041b34a4d379a11%3A0x77f16cd09e3efb76!2sBolowei%20Resort%20Opete!5e0!3m2!1sen!2sng!4v1688022170600!5m2!1sen!2sng" width="400" height="300" style={{border:0}}  loading="lazy" ></iframe>
          </div>
          <div className='mintablet:order-1  minMd:hidden'>
           <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3971.244524073929!2d5.791050475083961!3d5.5306991339034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1041b34a4d379a11%3A0x77f16cd09e3efb76!2sBolowei%20Resort%20Opete!5e0!3m2!1sen!2sng!4v1688022170600!5m2!1sen!2sng"  width="320px" height="300" style={{border:0}}  loading="lazy" ></iframe>
          </div>
       </div>
      </section>
      {/* End of contact us large screen section */}
    </div>
  )
};

export default Home;
