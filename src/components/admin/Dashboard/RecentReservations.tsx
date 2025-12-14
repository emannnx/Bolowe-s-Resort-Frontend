import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { GetReservations } from '../../../services/Reservation';
import Logger from '../../../utils/Logger';
import { convertDbTimeToReadable } from '../../../utils/Convert_db_time_to_user_readable';
import Status from './Status';
import Skeleton from 'react-loading-skeleton';
import ReservationItemDetailsModal from './ReservationItemDetailsModal';





export default function RecentReservations({setPage}:any) {
  const [isLoading, setIsLoading] = React.useState(false)
  const [reservations,setReservations] = React.useState([])
  const [openFullDetails, setOpenFullDetails] = React.useState(false) 
  const [focusedReservationId, setFocusedReservationId] = React.useState("")

  React.useEffect (()=>{
    const FetchAllReservations = ()=> {
      setIsLoading(true)
      GetReservations("","recent",10).then(

        res=>{
          console.log(res.data.data)
          setReservations(res.data.data)
          setIsLoading(false)
        },
        err=>{
          setIsLoading(false)
          Logger("Error:",err)
        }
      )
    }

    FetchAllReservations()
  },[])

  function viewReservation(event: React.MouseEvent) {
    event.preventDefault();
    setPage(2)
  }

  const handleRowClick =  (evt:any, reservationId:string) => {
    setFocusedReservationId(reservationId);
    setOpenFullDetails(true)
  }

  if (!isLoading && reservations.length<=0) {
    return  <React.Fragment>
      <Title>Recent Reservations</Title>
        <div className='w-full mx-auto text-center'>No reservations history</div>
    </React.Fragment>
  }
  return (
    <React.Fragment>
      <Title>Recent Reservations</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Transaction ID</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Amount paid</TableCell>
            <TableCell>Customer name</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        {
         !isLoading &&
         <TableBody>
          {reservations.map((reservation:any) => (
            <TableRow onClick={(evt)=>{handleRowClick(evt,reservation?._id)}} key={reservation._id}>
              <TableCell>{convertDbTimeToReadable(reservation.dateCreated)[0]}<br/>{convertDbTimeToReadable(reservation.dateCreated)[1]}</TableCell>
              <TableCell className='capitalize'>{reservation.type}</TableCell>
              <TableCell>{reservation.transactionId}</TableCell>
              <TableCell>{reservation.price}</TableCell>
              <TableCell>{reservation.amountPaid?`N ${reservation.amountPaid}`:null}</TableCell>
              <TableCell>{reservation.customerName}</TableCell>
              <TableCell align="right"><Status status={reservation.status}/></TableCell>
            </TableRow>
          ))}
        </TableBody>
        }

        {
          isLoading &&
          <TableBody>
          {[1,2,3,4,5].map((count:any) => (
            <TableRow key={count}>
              <TableCell><Skeleton></Skeleton></TableCell>
              <TableCell className='capitalize'><Skeleton></Skeleton></TableCell>
              <TableCell><Skeleton></Skeleton></TableCell>
              <TableCell><Skeleton></Skeleton></TableCell>
              <TableCell><Skeleton></Skeleton></TableCell>
              <TableCell align="right"><Skeleton></Skeleton></TableCell>
            </TableRow>
          ))}
        </TableBody>
        }
      </Table>
      <Link color="primary" href="#" onClick={viewReservation} sx={{ mt: 3 }}>
         View all
      </Link>
      <ReservationItemDetailsModal reservationId={focusedReservationId} 
        open={openFullDetails} 
        setOpen={setOpenFullDetails}
      />
    </React.Fragment>
  );
}
