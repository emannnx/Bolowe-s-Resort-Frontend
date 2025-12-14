import {  NavLink } from 'react-router-dom';
import Call from '../../assets/images/call.svg';
import MessageText from '../../assets/images/messagetext.svg';
import Location from '../../assets/images/location.svg';
import Copyright from '../../assets/images/copyright.svg';
import Instagram from '../../assets/images/instagram.svg';
import Facebook from '../../assets/images/facebook.svg';
import Resort from '../../assets/images/Bwr.png';

const Contacts = [
  {
    id: 1,
    image: Call,
    text: '08025229444',
  },
  {
    id: 2,
    image: MessageText,
    text: 'boloweisworldresort@gmail.com',
  },

];

const Links = [
  {
    id: 1,
    title: 'Home',
    link: '/',
  },
  {
    id: 2,
    title: 'About',
    link: '/about',
  },
  {
    id: 3,
    title: 'Packages',
    link: '/packages',
  },
  {
    id: 4,
    title: 'Attractions',
    link: '/attractions',
  },
  {
    id: 5,
    title: 'Events & Meetings',
    link: '/events',
  },
  {
    id: 6,
    title: 'Food Court',
    link: '/attractions?to=food',
  },
];

const Footer = () => {
  return (
    <div>
      <div className="bg-[#141414] py-24 px-20 flex  flex-wrap justify-between sm:p-5 sm:flex-col">
        <div className="flex flex-col space-y-4 justify-center items-center">
          <img  src={Resort} className="w-12 h-12" alt="" />
          <p className="text-white/50 w-[28rem] sm:w-3/4 sm:text-center">
          Connect with nature, immerse yourself in the wonders of the ocean, and create lifelong memories in a truly idyllic setting.
          </p>
          <div className="space-x-2 flex">
            <a href="#">
              <img src={Facebook} className="w-6 h-6" alt="facebook" />
            </a>
            <a href="#">
              <img src={Instagram} className="w-6 h-6" alt="instagram" />
            </a>
          </div>
        </div>
        <div className="sm:flex sm:flex-col sm:items-center sm:py-5 ">
          <h2 className="text-white text-2xl font-extralight">Useful Links</h2>
          <div className="w-12 my-2 h-[1.8px] bg-white"></div>
          <div className="flex-col sm:text-center">
            {Links.map((link) => (
              <NavLink
                className="block text-white/50 py-3 no-underline"
                key={link.id}
                to={link.link}
              >
                {link.title}
              </NavLink>
            ))}
          </div>
        </div>
        <div className="flex flex-col sm:items-center sm:py-5">
          <h2 className="text-white text-2xl font-extralight">Contact Us</h2>
          <div className="w-12 my-2 h-[1.8px] bg-white"></div>

          <div className="mt-4 sm:flex sm:flex-col sm:text-center">
            {Contacts.map((contact) => (
              <div key={contact.id} className="flex gap-4 py-3 text-white/50">
                <img className="w-6 h-6" src={contact.image} alt="" />
                {contact.text}
              </div>
            ))}
            <div  className="flex gap-4 py-3 text-start text-white/50">
                <img className="w-6 h-6" src={Location} alt="" />
                Opete Water Front, Plantation City Estate Road, <br/> Off, Dsc Express Road.
                <br/>Warri, Delta State, Nigeria.
              </div>
          </div>
        </div>
      </div>
      <div className="bg-black h-24 w-full flex items-center justify-center space-x-2">
        <img className="w-6 h-6" src={Copyright} alt="copyright" />
        <p className="text-white/50 text-xl">Bolowei's World Resort 2023</p>
      </div>
    </div>
  );
};

export default Footer;
