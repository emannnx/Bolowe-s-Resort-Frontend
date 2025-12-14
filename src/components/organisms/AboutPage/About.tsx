import { useEffect, useRef, useState } from 'react';
import './About.css';
import Carousell from '../Carousell';
import AboutCarousel from './AboutCarousel';
import Fade from "react-reveal/Fade";
import Gallery1 from "../../../assets/new_images/PROGRESS_UNISEX_SALON_125-1.jpg"
import Gallery2 from "../../../assets/new_images/PROGRESS UNISEX SALON.jpg"
import Gallery3 from "../../../assets/new_images/PROGRESS UNISEX SALON_274-1.jpg"
import Gallery4 from "../../../assets/images/gallery/IMG_6648.jpg"
import About1 from "../../../assets/images/about/IMG-20221001-WA0076.jpg"
import About2 from "../../../assets/images/about/IMG-20221001-WA0079.jpg"
import { Button } from '@mui/material';

const images = [
  {
    id: 1,
    link: Gallery1,
    alt: 'biker',
  },
  {
    id: 2,
    link: Gallery2,
    alt: 'shoot',
    height: true,
  },
  {
    id: 3,
    link: Gallery3,
    alt: 'forest',
  },
  {
    id: 4,
    link: Gallery4,
    alt: 'forest',
  },
];

const About = () => {
  const ref = useRef(null);
  const [slides, setSlides] = useState(null);
  const [showMore, setShowMore] = useState(false)
  useEffect(() => {
    setSlides(ref.current);
    window.scrollTo(0, 0);
  }, []);

  // const [activeImage, setActiveImage] = useState(0);

  return (
    <div id="about">
      <Carousell>
        <div className="hero bg-center bg-no-repeat bg-cover relative" style={{ backgroundImage: `url(${About1})` }}
        >
          <p>About Us</p>
        </div>
        <div className="hero bg-center bg-no-repeat bg-cover relative" style={{ backgroundImage: `url(${About2})` }}
        >
          <p>About Us</p>
        </div>
      </Carousell>
      <section className="px-16 py-12 sm:px-5 w-full flex flex-col items-center text-justify">
        <h2 className="text-4xl font-extralight text-center my-4 sm:text-2xl font-playfair">
          Who We Are
        </h2>
        <div className="text-black/50 font-normal sm:text-base sm:px-3 mintablet:w-[70%]">
          <Fade left duration={1000}>
            <p>
            Welcome to Bolowei’s World Resort, where fun, relaxation, and unforgettable memories come together! We're thrilled to have you join us on this incredible journey of adventure and relaxation. So, sit back, grab a virtual piña colada, and let us whisk you away to a world of pure bliss!
            </p>
          </Fade>
          <Fade left duration={1000}>
            <p className="mt-6">
            Who are we, you ask? Well, think of us as your personal vacation fairy godmothers, sprinkling a touch of magic on your holiday dreams. We're a team of passionate hospitality enthusiasts dedicated to creating the ultimate getaway experience for families and friends alike.
              At Bolowei’s World Resort, we believe that a vacation should be so much more than just a destination. It should be an enchanting escape from the everyday hustle and bustle. Picture yourself lounging by our sparkling pools, basking in the glorious sunshine while sipping on colorful mocktails.
            </p>
          </Fade>
          <Fade left duration={1000}>
            <p className='mt-6'>
            Dive into a world of laughter as you challenge your loved ones to a game of beach volleyball or embark on a thrilling water slide adventure. But that's not all! We understand the importance of keeping the whole family entertained. That's why we offer an array of activities for our littlest guests, from exciting kids' clubs to treasure hunts and even interactive shows that will have their imaginations running wild. Our world-class accommodations are designed with your comfort in mind. Whether you're seeking a cozy room with stunning ocean views or a spacious villa for the whole gang, we've got you covered. And let's not forget about the delectable dining options! Our talented chefs will take your taste buds on a gastronomic journey, serving up a fusion of flavors that will leave you craving more.
            </p>
          </Fade>
          {
            showMore ? <>
            <Fade left duration={1000}>
            <p className='mt-6'>
              So, pack your flip-flops, bring your adventurous spirit, and get ready to experience a vacation like no other. We're here to make your dreams come true, one sun-soaked memory at a time. Let the adventure begin! Oh, and did we mention the surprises? Brace yourselves for spontaneous dance parties by the pool, impromptu magic shows that will leave you amazed.
            </p>
          </Fade>
          <Fade left duration={1000}>
            <p className='mt-6'>
             But it's not just about the fun and games; we also take pride in our commitment to sustainability. We believe in preserving the natural beauty that surrounds us, which is why we've implemented eco-friendly practices throughout our resort. From energy-efficient lighting to recycling
              programs, we're doing our part to protect the environment and ensure that future generations can enjoy the wonders of this planet.
            </p>
          </Fade>
          <Fade left duration={1000}>
            <p className='mt-6'>
                We're more than just a place to stay. We're a tight-knit community of adventure seekers and relaxation enthusiasts who love nothing more than seeing the smiles on our guests' faces. Our dedicated staff is here to cater to your every need, with warm smiles and a can-do attitude that will make you feel right at home. So, whether you're seeking a romantic getaway with your special someone, a thrilling family vacation, or a fun-filled retreat with friends, look no further. We've got everything you need to create memories that will last a lifetime. We can't wait to welcome you with open arms and show you what paradise truly feels like.
            </p>
          </Fade>
          <Fade left duration={1000}>
            <p className='mt-6'>

             Let the extraordinary begin!
            </p>
          </Fade>
            </>:
            <Button variant='text' 
              sx={
                {
                  color:"#A020F0", 
                  paddingLeft:"0px", 
                  textTransform:"capitalize"
                }
              }
              onClick={()=>{
                setShowMore(true)
              }}
            >
              Read More
            </Button>
          }
          {showMore ? 
          <Button variant='text' 
          sx={
            {
              color:"#A020F0", 
              paddingLeft:"0px", 
              textTransform:"capitalize"
            }
          }
          onClick={()=>{
            setShowMore(false)
            window.scroll({
              top: 50,
              left: 0,
              behavior: 'smooth', // You can use 'auto' or 'smooth' for smooth scrolling
            });
          }}
        >
          Read less
        </Button>:null}
        </div>
      </section>
      <section className="px-16 py-12 sm:px-5">
        <h2 className="text-4xl font-extralight text-center my-4 font-playfair">
          Our Gallery
        </h2>
        <AboutCarousel imgs={images} />
      </section>
    </div>
  );
};

export default About;
