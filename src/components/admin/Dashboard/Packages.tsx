import { Button, Card, CardActions, CardContent, CardMedia, IconButton, Typography, Skeleton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
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
import { DeleteRoom, deletePackage } from "../../../services/Admin";
import { toast } from "react-toastify";
import CreateRoomTypeForm from "./CreateRoomType";
import UpdateRoomForm from "./UpdateRoomForm";
import { GetPackages } from "../../../services/Package";
import CreatePackageForm from "./CreatePackageForm";
import UpdatePackageForm from "./UpdatePackageForm";
import CreatePackageCategory from "./CreatePackageCategory";

const Packages = ()=> {
    const [totalPackages, setTotalPackages] = useState(0)
    const [totalPackageAvail, setTotalPackageAvail] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [packages, setPackages] = useState([])
    const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
    const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
    const [activePackage, setActivePackage] = useState({})
    const [openCreateCat, setOpenCreateCat] = useState(false)
    const [open, setOpen] = useState(false);
    const [selectedPackageId, setSelectedPackageId] = useState("");
    const permLevel = localStorage.getItem("permissionLevel")
 
    useEffect (()=>{
        fetchPackages()
      },[openCreateModal, openUpdateModal])

      const fetchPackages = ()=> {
        setIsLoading(true)
        GetPackages().then(
          res=>{
            setIsLoading(false)
            Logger("Packages", res)
            //const processesArray:any =removeDuplicateRoom(res.data.data)
            //setRooms(processesArray)
            setPackages(res.data)
            setTotalPackages(res.data.length)
            //compute total packages available
            const totalAvailablePackages = res.data?.filter((pack:any)=>pack.available===true).length
            setTotalPackageAvail(totalAvailablePackages)
          },
          err=>{
            //setIsLoading(false)
            console.log(err)
          }
        )
    }
      const handleDelete = (evt:any)=> {
        Logger("Room id:",selectedPackageId)
        deletePackage(selectedPackageId).then(res=>{
            setOpen(false)
            toast.success("Package  has been deleted successfully")
            //Logger("Data:",res.data?.data)
            //setRooms(res.data?.data)
            fetchPackages()
        },
        err=> {
            toast.error("Can't delete this room")
            Logger("Failed to delete room:",err)
        }
        )
      }

       const createPackageHandler = ()=> {
         if (openCreateModal) {
             setOpenCreateModal(false)
         }

         else if (openUpdateModal) {
             setOpenUpdateModal(false)
         }
         setOpenCreateCat(true)
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
                <p className="text-center font-bold">{totalPackages}</p>
                <p className=" text-center">Total no of packages</p>
            </Paper>
            {/* <Paper elevation={3} className="px-3 py-4">
                <p className="text-center font-bold">{totalRoomsAccom}</p>
                <p className="text-center">No of rooms accomodated</p>
            </Paper> */}
            <Paper elevation={3} className="px-3 py-4">
                <p className="text-center font-bold">{totalPackageAvail}</p>
                <p className=" text-center">No of packages available</p>
            </Paper>
            {
                permLevel === "root"  &&
                <Paper elevation={3} className="px-3 font-bold py-4 flex flex-col justify-center">
                <p className="text-center">Create new package</p>
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
                        packages?.map((pack:any,index:number)=>(
                            <Card sx={{ maxWidth: 345 }}>
                                <CardMedia
                                    component="img"
                                    alt={pack?.packType}
                                    height="140"
                                    image={pack?.image ? pack.image : DefaultImage}
                                    onError={(evt:any)=>evt.target.src=DefaultImage}
                                  
                                />
                                <CardContent>
                                    <Typography className="capitalize" gutterBottom variant="h5" component="div">
                                        {pack?.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {pack?.content?.map((cont:string,index:number)=>(
                                            <span key={index} className="mr-1"
                                            >
                                                {cont} 
                                                {pack.content.length !== index+1 ? "," : "" }
                                            </span>
                                        ))}
                                    </Typography>
                                    <div className="w-full flex justify-between ">
                                        <span>{pack?.description}</span>
                                        {
                                            pack?.available ?  <span className="bg-green-300 text-green-500 rounded-[4px] font-bold px-3 py-2">Available</span>:
                                            <span className="bg-red-300 text-red-500 rounded-[4px] font-bold px-3 py-2">Not available</span>
                                        }
                                    </div>
                                </CardContent>
                               {
                                permLevel==="root" && 
                                <CardActions className="flex justify-end w-full">
                                <IconButton onClick={()=>{setActivePackage(pack);setOpenUpdateModal(true)}} title="Update package">
                                        <EditIcon/>
                                </IconButton>
                                <IconButton onClick={(evt)=>{
                                    setSelectedPackageId(pack?._id)
                                    setOpen(true)
                                 }} 
                                 title="Delete package"
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
            <CreatePackageForm  open={openCreateModal} setOpen={setOpenCreateModal}
                createPackageCategoryHandler={createPackageHandler}
            />
            
            <UpdatePackageForm open={openUpdateModal} 
                    setOpen={setOpenUpdateModal} 
                    packageInitialValues = {activePackage}
                    createPackageCategoryHandler={createPackageHandler}
                    
            /> 
            <CreatePackageCategory
                open={openCreateCat}
                setOpen={setOpenCreateCat}
                
            />
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {"Are you sure this package should be deleted?"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                You won't be able to undo this operation unless you create another package. Additionally, please make sure you are not deleting the single ticket or base gate fee package in this category, such as the single gold ticket package. If you are removing the single package, kindly create a new one promptly to prevent any inaccuracies in system pricing estimation.
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

export default Packages;  