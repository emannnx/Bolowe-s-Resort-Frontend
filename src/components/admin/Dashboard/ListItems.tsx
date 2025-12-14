import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
//import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LogoutIcon from "@mui/icons-material/Logout"
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import BedroomParentIcon from '@mui/icons-material/BedroomParent';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import logout from '../../../utils/LogoutAdmin';



export const MainListItems = ({setPageNumber,permLevel}:any)=> (
 
  <React.Fragment>
    <ListItemButton onClick={()=> setPageNumber(1)}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton onClick={()=> setPageNumber(2)}>
      <ListItemIcon>
        <BookOnlineIcon />
      </ListItemIcon>
      <ListItemText primary="Reservations" />
    </ListItemButton>
    <ListItemButton onClick={()=> setPageNumber(3)}>
      <ListItemIcon>
        <BedroomParentIcon />
      </ListItemIcon>
      <ListItemText primary="Accomodations" />
    </ListItemButton>
    <ListItemButton onClick={()=> setPageNumber(4)}>
      <ListItemIcon>
        <BusinessCenterIcon />
      </ListItemIcon>
      <ListItemText primary="Packages" />
    </ListItemButton>
   {
    permLevel==="root" &&
    <ListItemButton onClick={()=> setPageNumber(5)}>
    <ListItemIcon>
      <PeopleIcon />
    </ListItemIcon>
    <ListItemText primary="Staffs" />
  </ListItemButton>
   }
  </React.Fragment>
);

export const SecondaryListItems = ({setPageNumber}:any)=> (
  <React.Fragment>
    {/* <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton> */}
    <ListItemButton onClick={logout}>
      <ListItemIcon>
        <LogoutIcon />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItemButton>
  </React.Fragment>
);