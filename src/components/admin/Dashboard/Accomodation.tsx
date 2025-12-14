import { Button, Card, CardActions, CardContent, CardMedia, IconButton, Typography, Skeleton,
Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText} from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper"
import Add from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useState , useEffect } from "react";
import Logger from "../../../utils/Logger";
import { GetRoomsType, GetRoom } from "../../../services/Accomodation";
import CreateRoomForm from "./CreateRoomForm";
import DefaultImage from "../../../assets/images/default_image.webp"
import { DeleteRoom } from "../../../services/Admin";
import { toast } from "react-toastify";
import CreateRoomTypeForm from "./CreateRoomType";
import UpdateRoomForm from "./UpdateRoomForm";

const Accomodation = ()=> {
    const [totalRooms, setTotalRooms] = useState(0)
    const [totalRoomsAvail, setTotalRoomsAvail] = useState(0)
    const [totalRoomsAccom, setTotalRoomsAccom] = useState(0)
    const [roomTypes,setRoomTypes] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [rooms, setRooms] = useState([])
    const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
    const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
    const [openCreateRoomTypeModal, setOpenCreateRoomTypeModal] = useState<boolean>(false);
    const [activeRoom, setActiveRoom] = useState({})
    const [open, setOpen ] = useState(false);
    const permLevel = localStorage.getItem("permissionLevel")
    const [selectedRoomId, setSelectedRoomId] = useState("")
 
    useEffect (()=>{
        const fetchRoomTypes = ()=> {
            GetRoomsType().then(
              res=>{
                Logger("Room types", res)
                setRoomTypes(res.data.data)
              },
              err=>{
                console.log(err)
              }
            )
        }
     
        fetchRoomTypes()
        fetchRooms()
      },[openCreateModal,openCreateRoomTypeModal,openUpdateModal])
      const fetchRooms = ()=> {
        setIsLoading(true)
        GetRoom().then(
          res=>{
            setIsLoading(false)
            Logger("Rooms", res)
            //const processesArray:any =removeDuplicateRoom(res.data.data)
            //setRooms(processesArray)
            setRooms(res.data.data)
            setTotalRooms(res.data.data.length)
          },
          err=>{
            //setIsLoading(false)
            console.log(err)
          }
        )
    }
      const handleDelete = (evt:any)=> {
        DeleteRoom(selectedRoomId).then(res=>{
            setOpen(false)
            toast.success("This room has been deleted successfully")
            fetchRooms()
        },
        err=> {
            toast.error("Can't delete this room")
            Logger("Failed to delete room:",err)
        }
        )
      }

      const createRoomHandler = ()=> {
        if (openCreateModal) {
            setOpenCreateModal(false)
        }

        else if (openUpdateModal) {
            setOpenUpdateModal(false)
        }
        setOpenCreateRoomTypeModal(true)
    }

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

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
            className="pt-[80px] px-[25px]"
        >

        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                m: 1,
                width: 128,
                height: 128
                },
            }}
            >
            <Paper elevation={3} className="px-3 py-4">
                <p className="text-center font-bold">{totalRooms}</p>
                <p className=" text-center">Total no of rooms</p>
            </Paper>
            {/* <Paper elevation={3} className="px-3 py-4">
                <p className="text-center font-bold">{totalRoomsAccom}</p>
                <p className="text-center">No of rooms accomodated</p>
            </Paper> */}
            {/* <Paper elevation={3} className="px-3 py-4">
                <p className="text-center font-bold">{totalRoomsAvail}</p>
                <p className=" text-center">No of rooms available</p>
            </Paper> */}
            {
                permLevel ==="root" &&
                <Paper elevation={3} className="px-3 font-bold py-4 flex flex-col justify-center">
                    <p className="text-center">Create new room</p>
                    <IconButton onClick={()=>setOpenCreateModal(true)}>
                        <Add/>
                    </IconButton>
                </Paper>
            }
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
            {
                isLoading ? <>
                <div className="flex-col  shadow-lg mintablet:w-[25rem] minMd:w-[45%] w-full">
                  <Skeleton height="16.25rem" width="100%"/>
                  <aside className=" flex flex-col px-4 py-6 items-center">
                      <Skeleton  height="30px" width="6rem"  />
                      <Skeleton  height="30px" width="6rem"  />
                      
                      {/* Package Button */}
                      <Skeleton width="200px" height="50px" className='mx-auto'/>
                    
                    </aside>
                </div>
                <div className="flex-col  shadow-lg mintablet:w-[25rem] minMd:w-[45%] w-full">
                  <Skeleton height="16.25rem" width="100%"/>
                  <aside className=" flex flex-col px-4 py-6 items-center">
                      <Skeleton  height="30px" width="6rem"  />
                      <Skeleton  height="30px" width="6rem"  />
                      
                      {/* Package Button */}
                      <Skeleton width="200px" height="50px" className='mx-auto'/>
                    
                    </aside>
                </div>
                
                <div className="flex-col  shadow-lg mintablet:w-[25rem] minMd:w-[45%] w-full">
                  <Skeleton height="16.25rem" width="100%"/>
                  <aside className=" flex flex-col px-4 py-6 items-center">
                      <Skeleton  height="30px" width="6rem"  />
                      <Skeleton  height="30px" width="6rem"  />
                      
                      {/* Package Button */}
                      <Skeleton width="200px" height="50px" className='mx-auto'/>
                    
                    </aside>
                </div>
                <div className="flex-col  shadow-lg mintablet:w-[25rem] minMd:w-[45%] w-full">
                  <Skeleton height="16.25rem" width="100%"/>
                  <aside className=" flex flex-col px-4 py-6 items-center">
                      <Skeleton  height="30px" width="6rem"  />
                      <Skeleton  height="30px" width="6rem"  />
                      
                      {/* Package Button */}
                      <Skeleton width="200px" height="50px" className='mx-auto'/>
                    
                    </aside>
                </div>
                <div className="flex-col  shadow-lg mintablet:w-[25rem] minMd:w-[45%] w-full">
                  <Skeleton height="16.25rem" width="100%"/>
                  <aside className=" flex flex-col px-4 py-6 items-center">
                      <Skeleton  height="30px" width="6rem"  />
                      <Skeleton  height="30px" width="6rem"  />
                      
                      {/* Package Button */}
                      <Skeleton width="200px" height="50px" className='mx-auto'/>
                    
                    </aside>
                </div>
              </>:
                <>
                    {
                        rooms?.map((room:any,index:number)=>(
                            <Card sx={{ maxWidth: 345 }}>
                                <CardMedia
                                    component="img"
                                    alt={room?.roomType}
                                    height="140"
                                    image={room?.image ? room.image : DefaultImage}
                                    onError={(evt:any)=>evt.target.src=DefaultImage}
                                />
                                <CardContent>
                                    <Typography className="capitalize" gutterBottom variant="h5" component="div">
                                        {room?.roomType}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {room?.content?.map((cont:string,index:number)=>(
                                            <span key={index} className="mr-1"
                                            >
                                                {cont} 
                                                {room.content.length !== index+1 ? "," : "" }
                                            </span>
                                        ))}
                                    </Typography>
                                </CardContent>
                                {
                                    permLevel === "root" && 
                                    <CardActions className="flex justify-end w-full">
                                    <IconButton onClick={()=>{setActiveRoom(room);setOpenUpdateModal(true)}} title="Update room" >
                                            <EditIcon/>
                                    </IconButton>
                                    <IconButton 
                                        onClick={(evt)=>{
                                            setSelectedRoomId(room?._id)
                                            handleClickOpen()
                                        }} 
                                        title="Delete room"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                    </CardActions>
                                }
                                
                            </Card>
                                        ))
                    }
                </>
            }
            </Box>
            <CreateRoomForm createRoomTypeHandler={createRoomHandler} open={openCreateModal} setOpen={setOpenCreateModal} roomTypes={roomTypes}/> 
            <CreateRoomTypeForm open={openCreateRoomTypeModal} setOpen={setOpenCreateRoomTypeModal}/>
            <UpdateRoomForm open={openUpdateModal} 
                    setOpen={setOpenUpdateModal} 
                    createRoomTypeHandler={createRoomHandler}
                    roomInitialValues = {activeRoom}
                    roomTypes={roomTypes}
            />
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {"Are you sure this room should be deleted?"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                It is not advisable to delete this room, as the system may have already booked it for customers. Please only proceed with the deletion if you are certain that any booking conflicts can be resolved with the customers in case they arise.
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} autoFocus>Cancel</Button>
                <Button onClick={handleDelete} >
                    Delete anyway
                </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default Accomodation;  