import { Button, Card, CardActions, CardContent, CardMedia, IconButton, Typography, Skeleton, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper"
import SearchBar from "./SearchBar";
import { useState, useEffect, useMemo } from "react";
import Logger from "../../../utils/Logger";
import React from "react";
import { convertDbTimeToReadable } from "../../../utils/Convert_db_time_to_user_readable";
import Status from "./Status";
import Title from "./Title";
import { GetReservations } from "../../../services/Reservation";
import Pagination from "../../Pagination";
import Sort from "../../Sort/Sort";
import ReservationItemDetailsModal from "./ReservationItemDetailsModal";
import { Add } from "@mui/icons-material";
import CreateReservationForm from "./CreateReservation";
import CancelIcon from '@mui/icons-material/Cancel';
import CancelReservation from "./CancelReservation";

const pageSize=10

const Reservations = ()=> {
    const [totalItems, setTotalItems] = useState<number>(0)
    const [query,setQuery] = useState<string>("");
    const [searching, setSearching] = useState<boolean> (false)
    const [reservations,setReservations] = React.useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState<string>('recent');
    const [openFullDetails, setOpenFullDetails] = React.useState(false) 
    const [focusedReservationId, setFocusedReservationId] = React.useState("")
    const [openNewModal, setOpenNewModal] = useState(false)
    const [openCancelModal, setOpenCancelModal] = useState(false)

    const paginatedData = useMemo(() => {
      const firstPageIndex = (currentPage - 1) * pageSize;
      const lastPageIndex = firstPageIndex + pageSize;
      return reservations.slice(firstPageIndex, lastPageIndex);
    }, [currentPage,reservations]);

     const pageCount= useMemo(()=>{
        return  reservations.length>0 ? Math.ceil(reservations.length/pageSize) : 1
    }, [reservations]) 

    React.useEffect (()=>{
    
      const FetchAllReservations = ()=> {
        setSearching(true)
        GetReservations(query,sortBy).then(
  
          res=>{
            console.log(res.data.data)
            setReservations(res.data.data)
            setTotalItems(res.data.data.length)
            setSearching(false)
          },
          err=>{
            setSearching(false)
            Logger("Error:",err)
          }
        )
      }
  
      FetchAllReservations()
    },[query,sortBy,openNewModal])
    
    useEffect (()=>{
        // if (query.length>0) {
        //     setSearching(true)
        // }
        // else {
        //     setSearching(false)
        // }
    },[query])

    // if (!searching && reservations.length<=0) {
    //     return  <React.Fragment>
    //       <Title>Reservations</Title>
    //         <div className='w-full mx-auto text-center'>No reservations history</div>
    //     </React.Fragment>
    //   }


  const handleRowClick =  (evt:any, reservationId:string) => {
    setFocusedReservationId(reservationId);
    setOpenFullDetails(true)
  }
 
    return (
        <Box
            component="main"
            sx={{
            backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
            }}
            className="pt-[80px] px-[25px] !w-full "
        >

        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                m: 1,
                width: 1,
                height: 128
                },
            }}
            >
                <div className="flex flex-col space-y-5 minMd:space-y-0 minMd:flex-row minMd:space-x-10">
                    <SearchBar placeHolder="Search by customer name or transaction id" query={query} 
                        setQuery={setQuery} 
                        searching={searching} 
                        setSearching={setSearching}
                        className="w-full minMd:!w-1/2"
                    />
                    <Sort setSortValue={setSortBy}
                        options={[
                           {
                            name:"Most recent",
                            value:"recent"
                           },
                           {
                            name:"Oldest",
                            value:"oldest"
                           }
                           
                        ]}
                    />
                    {/* <div className="justify-self-end">
                    <Paper elevation={3} className="px-3 font-bold  flex flex-col justify-center">
                        <p className="text-center">New reservation</p>
                        <IconButton onClick={()=>setOpenNewModal(true)}>
                            <Add/>
                        </IconButton>
                    </Paper>
                    </div> */}
                </div>
            </Box>
            <Box
                 sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                    m: 1,
                    mt:4
                    },
                }}
            >
                <React.Fragment>
                    <div className="flex justify-between w-full space-x-4">
                    <Title>Reservations history ({totalItems} items)</Title>
                    <div className="flex space-x-3">
                        <Paper elevation={3} className="px-3 font-bold  flex flex-col justify-center">
                            <p className="text-center">New <span className="hidden minMd:inline">reservation</span></p>
                            <IconButton onClick={()=>setOpenNewModal(true)}>
                                <Add/>
                            </IconButton>
                        </Paper>
                        <Paper elevation={3} className="px-3 font-bold  flex flex-col justify-center">
                        <p className="text-center">Cancel <span className="hidden minMd:inline">reservation</span></p>
                        <IconButton onClick={()=>setOpenCancelModal(true)}>
                            <CancelIcon/>
                        </IconButton>
                    </Paper>
                    </div>
                    </div>
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
                        !searching &&
                        <TableBody>
                        {paginatedData.map((reservation:any) => (
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
                        searching &&
                        <TableBody>
                        {[1,2,3,4,5].map((count:any) => (
                            <TableRow  key={count}>
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
                </React.Fragment>
                <div className="w-full flex justify-end pb-10">
                     <Pagination pageCount={pageCount}
                        setCurrentPage={setCurrentPage}
                      />
                </div>
            </Box>
            <ReservationItemDetailsModal reservationId={focusedReservationId} 
                open={openFullDetails} 
                setOpen={setOpenFullDetails}
            />
            <CreateReservationForm 
                open={openNewModal}
                setOpen={setOpenNewModal}
            />
            <CancelReservation
                open={openCancelModal}
                setOpen={setOpenCancelModal}
            />
        </Box>
    )
}

export default Reservations;  