import { Route, Routes } from 'react-router-dom';
import './App.css';
import About from './components/organisms/AboutPage/About';
import Home from './components/organisms/HomePage/Home';
//import Attractions from './components/organisms/AttractionsPage/Attractions';
import Layout from './components/organisms/Layout';
import Events from './components/organisms/EventPage/Events';
//import Packages from './components/organisms/PackagePage/Packages';
//import Booking from './components/organisms/Booking/Booking';
//import Reservations from './components/organisms/ReservationPage/Reservation';
import BookingConfirmation from './components/organisms/BookingConfirmation/BookingConfirmation';
// import Accomodation from './components/organisms/Accomodation/Accomodation';
import Login from './components/admin/Login';
import Register from './components/admin/Register';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import Dashboard from './components/admin/Dashboard/Dashboard';
import { Suspense, lazy, useEffect } from 'react';
import parseJwt from './utils/parseJWT';
import LogoutAdmin from './utils/LogoutAdmin';
import ProtectedRoute from './utils/ProtectedRoute';
import PageNotFound from './utils/PageNotFound';
import FallBackUI from './components/FallBackUI';



const Dashboard =  lazy(()=>import ("./components/admin/Dashboard/Dashboard"))
//const Layout = lazy(()=>import ("./components/organisms/Layout"))
const Accomodation= lazy(()=>import ("./components/organisms/Accomodation/Accomodation"))
const Attractions= lazy(()=>import ("./components/organisms/AttractionsPage/Attractions"))
const Booking =  lazy(()=>import ("./components/organisms/Booking/Booking"))
const Reservations =  lazy(()=>import ("./components/organisms/ReservationPage/Reservation"))
const Packages =  lazy(()=>import ("./components/organisms/PackagePage/Packages"))

function App() {

  useEffect(()=>{
    const intervalId =  setInterval(() => {
      checkTokenExpiration();
    }, 60000);
    
    return () => {
      clearInterval(intervalId)
    }
  }, [])

  const checkTokenExpiration = () => {
   const token = localStorage.getItem('token');
   if (token) {
   
     const decodedToken = parseJwt(token)
     if (decodedToken.exp < Date.now() / 1000) {
       LogoutAdmin()
     }
   }
 };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="booking/:type" element={<Suspense fallback={<FallBackUI/>}><Booking /></Suspense>} />
          <Route path="about" element={<About />} />
          <Route path="packages" element={<Suspense fallback={<FallBackUI/>}><Packages /></Suspense>} />
          <Route path="attractions" element={<Suspense fallback={<FallBackUI/>}><Attractions /></Suspense>} />
          <Route path="events" element={<Events />} />
          <Route path="reservation/:type" element={<Suspense fallback={<FallBackUI/>}><Reservations /></Suspense>} />
          <Route path="booking/reciept/:reservationId" element={<BookingConfirmation/>}/>
          <Route path='accomodation' element={<Suspense fallback={<FallBackUI/>}><Accomodation/></Suspense>}/>
        </Route>
        <Route path="/admin/login" element={<Login/>} />
        <Route path="/admin/register" element={<Register/>} />
        <Route path='/admin/dashboard' element={<Suspense fallback={<FallBackUI/>}><ProtectedRoute><Dashboard/></ProtectedRoute></Suspense>}/>
        <Route path="*" element={<PageNotFound/>}/>
    
      </Routes>
      <ToastContainer/>
    </div>
  );
}

export default App;
