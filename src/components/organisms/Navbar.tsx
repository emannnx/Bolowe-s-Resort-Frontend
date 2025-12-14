import logo from '/src/assets/images/bolowies_logo_nw.png';
import menu from '/src/assets/images/burgerMenu.svg';
import close from '/src/assets/images/close.svg';
import '../../styles/navbar.css';
import { Link, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Fade from "react-reveal/Fade"
import { GetRoomsType } from '../../services/Accomodation';
import { Skeleton } from '@mui/material';
import { GetPackages } from '../../services/Package';
import EventAndMeetings from '../../Data/EventAndMeetings';
import DropDown from '@mui/icons-material/KeyboardArrowDown';

const Navbar = () => {
  const [navScroll, setNavScroll] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showAttrDrop, setShowAttrDrop] = useState(false)
  const [accomodations, setAccomodations] = useState ([])
  const [loadingAcomo, setLoadingAccomo] = useState<boolean>(false)
  const [packages, setPackages] = useState ([])
  const [loadingPack, setLoadingPack] = useState<boolean>(false)
  const [showAccoDrop, setShowAccoDrop] = useState(false)
  const [showPackDrop, setShowPackDrop] = useState(false)
  const [showEventDrop, setShowEventDrop] = useState(false)
  const [showDropDown, setShowDropDown] = useState<number>(0)  //set to 1 for attraction menu, 2 for accomodation, and so on

  useEffect(()=>{
      const fetchRoomTypes = ()=> {
        setLoadingAccomo(true)
        GetRoomsType().then(
          res=>{
            setAccomodations(res.data.data)
            setLoadingAccomo(false)
          },
          err=>{
            console.log(err)
          }
        )
      }

      const fetchPackages = ()=> {
        setLoadingPack(true)
        GetPackages().then(
          res=>{
            setLoadingPack(false)
            //Logger("Packages", res.data)
            setPackages(res.data)
          },
          err=>{
            //setIsLoading(false)
            console.log(err)
          }
        )
    
    }
      fetchPackages();
      fetchRoomTypes();
  },[])

  // useEffect(()=>{
  //   const resizeEvent = window.addEventListener("resize", ()=>{
  //      if (window.innerWidth >= 992) {
  //         if (isOpen) {
  //           alert("Hello")
  //           setIsOpen(false)
  //         }
  //      }
  //   })
  // })

  const changeNav: any = () => {
    if (scrollY > 80) {
      setNavScroll(true);
    } else {
      setNavScroll(false);
    }
  };
  window.addEventListener('scroll', changeNav);

  // Nav bar open-close control in mobile view

  const handleNav = () => {
    isOpen ? setIsOpen(false) : setIsOpen(true);
  };

  const handleCollapse = (dropdownNo:number) => {
      if (showDropDown===dropdownNo) {
        setShowDropDown(0) //reset to 0
        return
      }

      setShowDropDown(dropdownNo)

  }
  return (
    <nav className={`mintablet:h-[80px] ${isOpen ? 'bg-white mintablet:bg-[#141414]  mintablet:bg-opacity-20  h-[400px]  shadow-lg' : ''} ${!navScroll ? '' : 'backdrop-blur-lg'} `}>
      <div className="logo-ham">
        <a href="/#" className="logo">
          <img className="h-full w-full" src={logo} alt="" />
        </a>
        <div className="hambuger">
          <img
            src={menu}
            onClick={handleNav}
            className={`${isOpen ? 'hidden' : ''} open`}
          ></img>
          <img
            src={close}
            onClick={handleNav}
            className={`${!isOpen ? 'hidden' : ''} close`}
          ></img>
        </div>
      </div>
      <ul
        className={`nav-links overflow-y-auto ${navScroll?"!text-black":""} ${
          isOpen ? 'h-screen mintablet:h-auto  w-full mintablet:w-auto' : 'h-0 !p-0 mintablet:h-auto'
        } transition-all overflow-hidden`}
      >
        <li className="nav-link-custom border-b w-full mintablet:border-none mintablet:w-auto pb-3 mintablet:py-0  font-bold text-[16px] mintablet:font-normal">
          <NavLink className="nav-link-custom" onClick={handleNav} to="/">
            Home
          </NavLink>
        </li>
        <li className="nav-link-custom border-b w-full mintablet:border-none mintablet:w-auto py-3 mintablet:py-0  text-[16px] font-bold mintablet:font-normal">
          <NavLink className="nav-link-custom" onClick={handleNav} to="/about">
            About
          </NavLink>
        </li>
        <li onClick={()=>handleCollapse(1)} className="text-[16px] border-b py-3   font-bold mintablet:hidden group w-full">
          <button className={`${showDropDown===1 ? "text-[#A020F0] " :""}w-full bg-transparent   py-1 flex justify-between items-center`}>
            Attraction
            {/* <img  src={DropDown} className={showAttrDrop?"rotate-180 transition-transform p-0 m-0":"rotate-0 transition-transform p-0 m-0"}/> */}
            <DropDown className={showDropDown===1?"rotate-180 transition-transform p-0 m-0 text-[#A020F0]":"rotate-0 transition-transform p-0 m-0"} />
          </button>
          {
            showDropDown===1 &&
             <Fade duration={500} top collapse opposite distance="20px">
              <div className='bg-trasparent text-[16px] font-bold flex divide-y flex-col space-y-3 py-4 w-full'>
              <Link className='menu-links  py-2  hover:bg-black px-3 hover:text-white transition-colors duration-500'  
                onClick={handleNav} to="/attractions?to=food"
              >
                Food court
              </Link>
              <Link className='menu-links py-2 hover:bg-black hover:text-white px-3 transition-colors duration-500'  
                onClick={handleNav} to="/attractions?to=attr&pos=0"
              >
                Kiddies play area
              </Link>
              <Link className='menu-links  py-2 hover:bg-black hover:text-white px-3 transition-colors duration-500'  
                onClick={handleNav} to="/attractions?to=attr&pos=1"
              >
                Snookers
              </Link>
              <Link className='menu-links  py-2 hover:bg-black hover:text-white px-3 transition-colors duration-500'  
                onClick={handleNav} to="/attractions?to=attr&pos=2"
              >
                Quad bikes
              </Link>
              <Link className='menu-links  py-2 hover:bg-black hover:text-white px-3 transition-colors duration-500'  
              onClick={handleNav} to="/attractions?to=attr&pos=3"
            >
              Mini bus
            </Link>
            <Link className='menu-links  py-2 hover:bg-black hover:text-white px-3 transition-colors duration-500' 
              onClick={handleNav} to="/attractions?to=attr&pos=4"
            >
              Jet ski
            </Link>
            <Link className='menu-links  py-2 hover:bg-black hover:text-white px-3 transition-colors duration-500' 
              onClick={handleNav} to="/attractions?to=attr&pos=11"
            >
              Swimming pool
            </Link>
            <Link className="menu-links  py-2 hover:bg-black px-3 hover:text-white transition-colors duration-500"  
              onClick={handleNav} to="/attractions?to=attr&pos=9"
            >
              Grand Island
            </Link>
            <Link className="menu-links  py-2 hover:bg-black px-3 hover:text-white transition-colors duration-500" 
              onClick={handleNav} to="/attractions?to=attr&pos=10"
            >
              Paintball
            </Link>
          </div>
            
           </Fade >
          }
        </li>
        <li  className="hidden mintablet:block nav-link-custom group">
          <NavLink className="nav-link-custom" onClick={handleNav} to="/attractions">
            Attraction
          </NavLink>
          <Fade distance="20px" left duration={500}>
          <div className='absolute  hidden group-hover:block pt-[10px]'>
          {/* <div className='bg-white text-black flex flex-col shadow-lg  rounded-[2px]'> */} 
          <div className='bg-white text-black grid grid-cols-2  shadow-lg  rounded-[2px]'>
            <Link className='menu-links  px-10 py-3 hover:bg-black hover:text-white transition-colors duration-500'  
              onClick={handleNav} to="/attractions?to=food"
            >
              Food court
            </Link>
            <Link className='menu-links  px-10 py-3 hover:bg-black hover:text-white transition-colors duration-500'  
              onClick={handleNav} to="/attractions?to=attr&pos=0"
            >
              Kiddies play area
            </Link>
            <Link className='menu-links  px-10 py-3 hover:bg-black hover:text-white transition-colors duration-500'  
              onClick={handleNav} to="/attractions?to=attr&pos=1"
            >
              Snookers
            </Link>
            <Link className='menu-links  px-10 py-3 hover:bg-black hover:text-white transition-colors duration-500'  
              onClick={handleNav} to="/attractions?to=attr&pos=2"
            >
              Quad bikes
            </Link>
            <Link className='menu-links  px-10 py-3 hover:bg-black hover:text-white transition-colors duration-500'  
              onClick={handleNav} to="/attractions?to=attr&pos=3"
            >
              Mini bus
            </Link>
            <Link className='menu-links  px-10 py-3 hover:bg-black hover:text-white transition-colors duration-500' 
              onClick={handleNav} to="/attractions?to=attr&pos=4"
            >
              Jet ski
            </Link>
            <Link className='menu-links  px-10 py-3 hover:bg-black hover:text-white transition-colors duration-500' 
              onClick={handleNav} to="/attractions?to=attr&pos=11"
            >
              Swimming pool
            </Link>
            <Link className="menu-links  px-10 py-3 hover:bg-black hover:text-white transition-colors duration-500"  
              onClick={handleNav} to="/attractions?to=attr&pos=9"
            >
              Grand Island
            </Link>
            <Link className="menu-links  px-10 py-3 hover:bg-black hover:text-white transition-colors duration-500" 
              onClick={handleNav} to="/attractions?to=attr&pos=10"
            >
              Paintball
            </Link>
            
            
          </div>
          </div>
          </Fade >
        </li>
        <li className="nav-link-custom group hidden mintablet:block">
          <NavLink className="nav-link-custom" onClick={handleNav} to="accomodation">
            Accomodation
          </NavLink>
          <Fade distance="20px" left duration={500}>
          <div className=' absolute hidden group-hover:block pt-[10px]'>
          {
            accomodations?.length>7 ? 
            <div className='bg-white text-black grid !max-h-[400px] overflow-y-auto grid-cols-2  text-start shadow-lg  rounded-[2px]'>
            {
              !loadingAcomo &&  accomodations.length>1 ? accomodations.map((accom:any, index:number)=>(
                <Link className="capitalize menu-links px-10 py-3 hover:bg-black hover:text-white transition-colors duration-500 text-start" key={index} onClick={handleNav} to={`/accomodation?to=${accom.name}`}>
                  {accom?.name}
                </Link>
              )):<div className='px-10 py-3'>
                <Skeleton variant='text' width={"300px"}/>
                <Skeleton variant='text' width={"300px"}/>
                <Skeleton variant='text' width={"300px"}/>
                <Skeleton variant='text' width={"300px"}/>
                <Skeleton variant='text' width={"300px"}/>
              </div>
            }
            
          </div>:
          <div className='bg-white text-black flex !max-h-[400px] overflow-y-auto flex-col  text-start shadow-lg  rounded-[2px]'>
          {
            !loadingAcomo &&  accomodations.length>1 ? accomodations.map((accom:any, index:number)=>(
              <Link className="capitalize menu-links px-10 py-3 hover:bg-black hover:text-white transition-colors duration-500 text-start" key={index} onClick={handleNav} to={`/accomodation?to=${accom.name}`}>
                {accom?.name}
              </Link>
            )):<div className='px-10 py-3'>
              <Skeleton variant='text' width={"300px"}/>
              <Skeleton variant='text' width={"300px"}/>
              <Skeleton variant='text' width={"300px"}/>
              <Skeleton variant='text' width={"300px"}/>
              <Skeleton variant='text' width={"300px"}/>
            </div>
          }
          
        </div>
          }
          </div>
          </Fade >
        </li>
        <li onClick={()=>handleCollapse(2)} className="text-[16px] border-b py-3 font-bold mintablet:hidden group w-full">
          <button className={`${showDropDown===2 ? "text-[#A020F0] " :""}w-full bg-transparent   py-1 flex justify-between items-center`}>
            Accomodation
            {/* <img  src={DropDown} className={showAccoDrop?"rotate-180 transition-transform p-0 m-0":"rotate-0 transition-transform p-0 m-0"}/> */}
            <DropDown className={showDropDown===2?"rotate-180 transition-transform p-0 m-0 text-[#A020F0]":"rotate-0 transition-transform p-0 m-0"} />
          </button>
          {
            showDropDown===2 &&
             <Fade duration={500} top collapse opposite distance="20px">
              <div className='bg-trasparent text-[16px] divide-y font-bold flex flex-col space-y-3  py-4 w-full'>
              {
                !loadingAcomo && accomodations.length>1 ? accomodations.map((accom:any, index:number)=>(
                  <Link className="capitalize  py-2 hover:bg-black hover:text-white px-3 transition-colors duration-500 text-start" key={index} onClick={handleNav} to={`/accomodation?to=${accom.name}`}>
                    {accom?.name}
                  </Link>
                )):<div className='py-2'>
                  <Skeleton variant='text' width={"300px"}/>
                <Skeleton variant='text' width={"300px"}/>
                <Skeleton variant='text' width={"300px"}/>
                <Skeleton variant='text' width={"300px"}/>
                <Skeleton variant='text' width={"300px"}/>
                </div>
              }
            </div>
           </Fade >
          }
        </li>
        <li className="nav-link-custom group border-b hidden mintablet:block">
          <NavLink className="nav-link-custom" onClick={handleNav} to="/packages">
            Packages
          </NavLink>
          <Fade distance="20px" left duration={500}>
          <div className=' absolute hidden group-hover:block pt-[10px]'>
          {/* <div className='bg-white text-black flex !max-h-[400px] overflow-y-auto flex-col  text-start shadow-lg  rounded-[2px]'> */}
          {
            packages?.length> 7  ? 
            <div className='bg-white text-black  !max-h-[400px] overflow-y-auto grid grid-cols-2 text-start shadow-lg  rounded-[2px]'>
            {
              !loadingPack && packages.length>1 ? packages?.map((pack:any, index:number)=>(
                <Link className="capitalize  menu-links px-10 py-3 hover:bg-black hover:text-white transition-colors duration-500 text-start" key={index} onClick={handleNav} to={`/packages?to=${pack._id}&name=${pack.name}`}>
                  {pack?.name}
                </Link>
              )):<div className='px-10 py-3'>
                <Skeleton  variant='text' width={"100px"}/>
                <Skeleton   variant='text' width={"100px"}/>
                <Skeleton   variant='text' width={"100px"}/>
                <Skeleton   variant='text' width={"100px"}/>
                <Skeleton   variant='text' width={"100px"}/>
              </div>
            }
            
          </div>:
          <div className='bg-white text-black flex !max-h-[400px] overflow-y-auto flex-col  text-start shadow-lg  rounded-[2px]'>
          {
            !loadingPack && packages.length>1 ? packages?.map((pack:any, index:number)=>(
              <Link className="capitalize  menu-links px-10 py-3 hover:bg-black hover:text-white transition-colors duration-500 text-start" key={index} onClick={handleNav} to={`/packages?to=${pack._id}&name=${pack.name}`}>
                {pack?.name}
              </Link>
            )):<div className='px-10 py-3'>
              <Skeleton  variant='text' width={"100px"}/>
              <Skeleton   variant='text' width={"100px"}/>
              <Skeleton   variant='text' width={"100px"}/>
              <Skeleton   variant='text' width={"100px"}/>
              <Skeleton   variant='text' width={"100px"}/>
            </div>
          }
          
        </div>
          }
          </div>
          </Fade >
        </li>
        <li onClick={()=>handleCollapse(3)} className="text-[16px] font-bold border-b py-3 mintablet:hidden group w-full">
          <button className={`${showDropDown===3 ? "text-[#A020F0] " :""}w-full bg-transparent   py-1 flex justify-between items-center`}>
            Packages
            <DropDown className={showDropDown===3?"rotate-180 transition-transform p-0 m-0 text-[#A020F0]":"rotate-0 transition-transform p-0 m-0"} />
          </button>
          {
            showDropDown===3 &&
             <Fade duration={500} top collapse opposite distance="20px">
              <div className='bg-trasparent text-[16px] divide-y font-bold flex flex-col space-y-3  py-4 w-full'>
              {
                !loadingPack && packages.length>1 ? packages.map((pack:any, index:number)=>(
                  <Link className="capitalize   py-2 text-start px-3" key={index} onClick={handleNav} to={`/packages?to=${pack._id}&name=${pack.name}`}>
                    {pack?.name}
                  </Link>
                )):<div className='py-2'>
                   <Skeleton variant='text' width={"300px"}/>
                <Skeleton variant='text' width={"300px"}/>
                <Skeleton variant='text' width={"300px"}/>
                <Skeleton variant='text' width={"300px"}/>
                <Skeleton variant='text' width={"300px"}/>
                </div>
              }
            </div>
           </Fade >
          }
        </li>
        <li className="nav-link-custom group hidden mintablet:block">
          <NavLink className="nav-link-custom" onClick={handleNav} to="events">
            Events and Meetings
          </NavLink>
          <Fade distance="20px" left duration={500}>
          <div className=' absolute hidden group-hover:block pt-[10px]'>
          <div className='bg-white text-black flex !max-h-[400px] overflow-y-auto flex-col  text-start shadow-lg   rounded-[2px]'>
            {
                EventAndMeetings.map((evt:any, index:number)=>(
                <Link className="capitalize menu-links px-10 py-3 hover:bg-black hover:text-white transition-colors duration-500  text-start" 
                  key={index} onClick={handleNav} to={`/events?to=${evt.name}`}
                >
                  {evt?.name}
                </Link>
              ))
            }
            
          </div>
          </div>
          </Fade >
        </li>
        <li onClick={()=>handleCollapse(4)} className="text-[16px] border-b font-bold py-3 mintablet:hidden group w-full">
          <button className={`${showDropDown===4 ? "text-[#A020F0] " :""}w-full bg-transparent   py-1 flex justify-between items-center`}>
          Events and Meetings
          <DropDown className={showDropDown===4?"rotate-180 transition-transform p-0 m-0 text-[#A020F0]":"rotate-0 transition-transform p-0 m-0"} />
          </button>
          {
            showDropDown===4 &&
             <Fade duration={500} top collapse opposite distance="20px">
              <div className='bg-trasparent text-[16px] font-bold divide-y flex flex-col space-y-3 py-4 w-full'>
              {
                 
                  EventAndMeetings.map((evt:any, index:number)=>(
                  <Link className="capitalize menu-links px-3 py-2 hover:bg-black hover:text-white transition-colors duration-500  text-start" 
                    key={index} onClick={handleNav} to={`/events?to=${evt.name}`}
                  >
                    {evt?.name}
                  </Link>
                ))
              
              }
            </div>
           </Fade >
          }
        </li>
        <li
          id="nav-cta"
          className="w-full mt-10 mintablet:mt-0 mintablet:w-auto hover:scale-110 transition ease-in duration-300"
        >
          <NavLink  className="px-2 flex justify-center  w-full text-white no-underline" onClick={handleNav} to="reservation/accomodation">
            Reservation
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
