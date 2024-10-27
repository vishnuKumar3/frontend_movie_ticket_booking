import { useNavigate } from "react-router-dom"
import { colors } from "../color_config";
import { useEffect, useState} from "react";
import { useMemo } from "react";
import * as React from 'react';
import Login from "./Login";
import Signup from "./Signup"
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { setUser } from "../reducers/user";
import { useMediaQuery } from "@mui/material";
import {createTheme} from "@mui/material/styles"
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

export default function TopNavigation(){
  const theme = createTheme();
  const navigate = useNavigate();
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const [openSignupDialog, setOpenSignupDialog] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies()
  const user = useSelector((state:any)=>state.user)
  const dispatch = useDispatch()
  const mobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(()=>{
    console.log("cookies",cookies);
  },[])
  const menuItems = [
    {
      name:"home",
      path:"/",
    },
    {
      name:"UpcomingMovies",
      path:"/"
    },
    {
      name:"BookingHistory",
      path:"/booking-history"
    }
  ]

  const logout = ()=>{
    removeCookie("accessToken");
    dispatch(setUser({}))
    navigate("/")
}

  const MobileNavbar = ()=>{
    return(
      <>
        <div>
          <div className="flex flex-row items-center justify-between bg-black w-full p-2 pb-4" style={{color:"white"}}>
            <div className="flex flex-row items-center gap-x-4">
              <PopupState variant="popover" popupId="demo-popup-menu">
              {(popupState) => (
                <React.Fragment>
                  <i {...bindTrigger(popupState)} style={{fontSize:"25px"}} className="fa fa-bars" aria-hidden="true"></i>
                  <Menu {...bindMenu(popupState)} disableScrollLock={true}>
                    <MenuItem className="cursor-pointer font-bold capitalize" onClick={()=>{redirectToPage("/")}}>Home</MenuItem>
                    <MenuItem className="cursor-pointer font-bold capitalize" onClick={()=>{redirectToPage("/upcoming-movies")}}>upcoming movies</MenuItem>
                    {cookies?.accessToken && <MenuItem className="cursor-pointer font-bold capitalize" onClick={()=>{redirectToPage("/booking-history")}}>booking History</MenuItem>}
                    {cookies?.accessToken && (user?.userData?.appRole === import.meta.env.VITE_ADMIN_APP_ROLE) && <MenuItem className="cursor-pointer font-bold capitalize" onClick={()=>{redirectToPage("/admin-panel")}}>Admin Panel</MenuItem>}
                  </Menu>
                </React.Fragment>
              )}        
              </PopupState>     
              <div className="flex flex-row items-center gap-x-2">
                <img src="/logo.png" style={{width:"40px",height:"40px"}}/>
                <p style={{color:colors.greenVariant, fontWeight:"bold", fontSize:"20px"}}>MoTick</p>
              </div>
            </div>   
            {(cookies?.accessToken) ?
            <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
              <React.Fragment>
                <div {...bindTrigger(popupState)} className="flex flex-row items-center gap-x-3 pr-3">
                  {ProfileImage}
                  <div className="flex flex-row items-center gap-x-1">
                    <p className="cursor-pointer font-bold capitalize">{user?.userData?.firstName}</p>
                    <p className="cursor-pointer font-bold">{user?.userData?.firstName}</p>
                  </div>
                </div>
                <Menu {...bindMenu(popupState)} disableScrollLock={true}>
                  <MenuItem className="flex flex-row gap-x-2"><i className="fa fa-user"></i>Profile</MenuItem>
                  <MenuItem onClick={logout} className="flex flex-row gap-x-2"><i className="fa fa-sign-out"></i>Logout</MenuItem>
                </Menu>
              </React.Fragment>
            )}        
            </PopupState>:
          <div className="flex flex-row items-center gap-x-3">
              <button onClick={()=>setOpenLoginDialog(true)} className="cursor-pointer font-bold capitalize rounded bg-black" style={{fontSize:"14px",color:"white",padding:"5px 10px",border:"1px solid white"}}>Login</button>
              <button onClick={()=>setOpenSignupDialog(true)} className="cursor-pointer font-bold capitalize rounded bg-black" style={{fontSize:"14px",color:"white",padding:"5px 10px",border:"1px solid white"}}>Signup</button>
          </div>}                 
          </div>
      </div>      
      </>
    )
  }
  
  const ProfileImage = useMemo(()=> <img src={user?.userData?.avatarInfo?.Location} style={{borderRadius:"100%",width:"30px",height:"30px",cursor:"pointer"}}/>,[user?.userData]);


  const redirectToPage = (path:any)=>{
    navigate(path);
  }
  return(
    <>
      <Login openLoginDialog={openLoginDialog} setOpenLoginDialog={setOpenLoginDialog}/>
      <Signup openSignupDialog={openSignupDialog} setOpenSignupDialog={setOpenSignupDialog}/>
      {mobile?
      <MobileNavbar/>:
      <div className="z-10 w-full pl-3 pr-2 pt-2 pb-3 flex flex-row items-center justify-between flex-wrap" style={{background:"#000000",position:"fixed",top:0,left:0,color:"white"}}>
        <div className="flex flex-row items-center gap-x-20">
          <div className="flex flex-row items-center gap-x-2">
            <img src="/logo.png" style={{width:"40px",height:"40px"}}/>
            <p style={{color:colors.greenVariant, fontWeight:"bold", fontSize:"20px"}}>MoTick</p>
          </div>
          <div className="w-max h-full flex flex-row items-center gap-x-5">
            <p className="cursor-pointer font-bold capitalize" onClick={()=>{redirectToPage("/")}}>Home</p>
            <p className="cursor-pointer font-bold capitalize" onClick={()=>{redirectToPage("/upcoming-movies")}}>upcoming movies</p>
            {cookies?.accessToken && <p className="cursor-pointer font-bold capitalize" onClick={()=>{redirectToPage("/booking-history")}}>booking History</p>}
            {cookies?.accessToken && (user?.userData?.appRole === import.meta.env.VITE_ADMIN_APP_ROLE) && <p className="cursor-pointer font-bold capitalize" onClick={()=>{redirectToPage("/admin-panel")}}>Admin Panel</p>}
          </div>
        </div>
        {(cookies?.accessToken) ?
          <PopupState variant="popover" popupId="demo-popup-menu">
          {(popupState) => (
            <React.Fragment>
              <div {...bindTrigger(popupState)} className="flex flex-row items-center gap-x-3 pr-5">
                {ProfileImage}
                <div className="flex flex-row items-center gap-x-1">
                  <p className="cursor-pointer font-bold capitalize">{user?.userData?.firstName}</p>
                  <p className="cursor-pointer font-bold">{user?.userData?.firstName}</p>
                </div>
              </div>
              <Menu {...bindMenu(popupState)} disableScrollLock={true}>
              <MenuItem className="flex flex-row gap-x-2"><i className="fa fa-user"></i>Profile</MenuItem>
              <MenuItem onClick={logout} className="flex flex-row gap-x-2"><i className="fa fa-sign-out"></i>Logout</MenuItem>
              </Menu>
            </React.Fragment>
          )}        
          </PopupState>:
         <div className="flex flex-row items-center gap-x-3">
            <button onClick={()=>setOpenLoginDialog(true)} className="cursor-pointer font-bold capitalize rounded bg-black" style={{fontSize:"14px",color:"white",padding:"5px 10px",border:"1px solid white"}}>Login</button>
            <button onClick={()=>setOpenSignupDialog(true)} className="cursor-pointer font-bold capitalize rounded bg-black" style={{fontSize:"14px",color:"white",padding:"5px 10px",border:"1px solid white"}}>Signup</button>
        </div>}
      </div>
      } 
    </>
  )
}