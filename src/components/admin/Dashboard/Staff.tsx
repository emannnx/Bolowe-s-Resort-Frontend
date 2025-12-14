import { Button, Card, CardActions, CardContent, CardMedia, IconButton, Typography, Skeleton } from "@mui/material";
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
import { DeleteRoom, GetStaff, deletePackage, deleteStaff } from "../../../services/Admin";
import { toast } from "react-toastify";
import CreateRoomTypeForm from "./CreateRoomType";
import UpdateRoomForm from "./UpdateRoomForm";
import { GetPackages } from "../../../services/Package";
import CreatePackageForm from "./CreatePackageForm";
import UpdatePackageForm from "./UpdatePackageForm";
import { convertDbTimeToReadable } from "../../../utils/Convert_db_time_to_user_readable";
import CreateAdmin from "./CreateAdmin";

const Staff = ()=> {
    const [totalStaff, setTotalStaff] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [staff, setStaff] = useState([])
    const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
    //const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
    const [activeStaff, setActiveStaff] = useState({})
 
    useEffect (()=>{
        fetchStaff()
      },[openCreateModal])

      const fetchStaff = ()=> {
        setIsLoading(true)
        GetStaff().then(
          res=>{
            setIsLoading(false)
            Logger("Staff", res.data.data.staff)
            //const processesArray:any =removeDuplicateRoom(res.data.data)
            //setRooms(processesArray)
            setStaff(res.data?.data?.staff)
            setTotalStaff(res.data?.data?.staff?.length)
          },
          err=>{
            //setIsLoading(false)
            console.log(err)
          }
        )
    }
      const handleDelete = (evt:any,staffId:string)=> {
        Logger("staff id:",staffId)
        deleteStaff(staffId).then(res=>{
            toast.success("Staff has been deleted successfully")
            //Logger("Data:",res.data?.data)
            //setRooms(res.data?.data)
            fetchStaff()
        },
        err=> {
            toast.error("Can't delete this staff")
            Logger("Failed to delete staff:",err)
        }
        )
      }

    //   const createPackageHandler = ()=> {
    //     if (openCreateModal) {
    //         setOpenCreateModal(false)
    //     }

    //     else if (openUpdateModal) {
    //         setOpenUpdateModal(false)
    //     }
    //     setOpenCreateRoomTypeModal(true)
    // }
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
                <p className="text-center font-bold">{totalStaff}</p>
                <p className=" text-center">Total no of staff</p>
            </Paper>
            {/* <Paper elevation={3} className="px-3 py-4">
                <p className="text-center font-bold">{totalRoomsAccom}</p>
                <p className="text-center">No of rooms accomodated</p>
            </Paper> */}
            {/* <Paper elevation={3} className="px-3 py-4">
                <p className="text-center font-bold">{totalPackageAvail}</p>
                <p className=" text-center">No of packages available</p>
            </Paper> */}
            <Paper elevation={3} className="px-3 font-bold py-4 flex flex-col justify-center">
                <p className="text-center">Add new staff </p>
                <IconButton onClick={()=>setOpenCreateModal(true)}>
                    <Add/>
                </IconButton>
            </Paper>
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
                        staff?.map((staff:any,index:number)=>(
                            <Card sx={{ maxWidth: 345 }}>
                                <CardMedia
                                    component="img"
                                    alt={staff?.staffType}
                                    height="140"
                                    image={staff?.image ? staff.image : DefaultImage}
                                    onError={(evt:any)=>evt.target.src=DefaultImage}
                                  
                                />
                                <CardContent>
                                    <Typography className="capitalize" gutterBottom variant="h5" component="div">
                                        {staff?.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                       {
                                        staff.lastLoggedIn ? `Last login: ${convertDbTimeToReadable(staff.lastLoggedIn)[0]} ${convertDbTimeToReadable(staff.lastLoggedIn)[1]}`:
                                        "No login record"
                                       }
                                    </Typography>
                                    <Typography mt={2} variant="body1" color="text.secondary">
                                       {
                                        staff?.email
                                       }
                                    </Typography>
                                    <Typography className="capitalize" variant="body2" color="text.secondary">
                                    Permission level:  { staff?.permissionLevel}
                                    </Typography>
                                    {/* <div className="w-full flex justify-end ">
                                        {
                                            staff?.available ?  <span className="bg-green-300 text-green-500 rounded-[4px] font-bold px-3 py-2">Available</span>:
                                            <span className="bg-red-300 text-red-500 rounded-[4px] font-bold px-3 py-2">Not available</span>
                                        }
                                    </div> */}
                                </CardContent>
                                <CardActions className="flex justify-end w-full">
                                    {/* <IconButton onClick={()=>{setActiveStaff(staff);setOpenUpdateModal(true)}} title="Update staffage">
                                            <EditIcon/>
                                    </IconButton> */}
                                    <IconButton onClick={(evt)=>{handleDelete(evt,staff._id)}} title="Delete package">
                                        <DeleteIcon />
                                    </IconButton>
                                </CardActions>
                                
                            </Card>
                                        ))
                    }
                </>
            }
            </Box>
            <CreateAdmin  open={openCreateModal} setOpen={setOpenCreateModal}/>
           
            {/* <UpdatePackageForm open={openUpdateModal} 
                    setOpen={setOpenUpdateModal} 
                    packageInitialValues = {activePackage}
                    
            />  */}
        </Box>
    )
}

export default Staff;  