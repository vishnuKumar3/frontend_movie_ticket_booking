import { useNavigate } from "react-router-dom"
import { colors } from "../color_config";
import { useEffect, useState } from "react";
import Login from "./Login";
import Signup from "./Signup"
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";

export default function TopNavigation(){
  const navigate = useNavigate();
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const [openSignupDialog, setOpenSignupDialog] = useState(false);
  const [cookies, setCookie, removeCookies] = useCookies()
  const user = useSelector((state:any)=>state.user)

  useEffect(()=>{
    console.log("cookies",cookies);
  },[])
  const menuItems = [
    {
      name:"home",
      path:"/",
    },
    {
      name:"movies",
      path:"/movie"
    }
  ]

  const redirectToPage = (menuItem:any)=>{
    navigate(menuItem?.path);
  }
  return(
    <>
      <Login openLoginDialog={openLoginDialog} setOpenLoginDialog={setOpenLoginDialog}/>
      <Signup openSignupDialog={openSignupDialog} setOpenSignupDialog={setOpenSignupDialog}/>
      <div className="z-10 w-full pl-3 pr-2 pt-2 pb-3 flex flex-row items-center justify-between flex-wrap" style={{background:"#000000",position:"fixed",top:0,left:0,color:"white"}}>
        <div className="flex flex-row items-center gap-x-20">
          <div className="flex flex-row items-center gap-x-2">
            <img src="/logo.png" style={{width:"40px",height:"40px"}}/>
            <p style={{color:colors.greenVariant, fontWeight:"bold", fontSize:"20px"}}>MoTick</p>
          </div>
          <div className="w-max h-full flex flex-row items-center gap-x-5">
            {
              menuItems.map((item)=>{
                return (
                  <>
                    <p className="cursor-pointer font-bold capitalize" onClick={()=>{redirectToPage(item)}}>{item.name}</p>
                  </>
                )
              })
            }
          </div>
        </div>
        {(cookies?.accessToken) ?
          <div className="flex flex-row items-center gap-x-3 pr-5">
            <img src={user?.userData?.avatarInfo?.Location} style={{borderRadius:"100%",width:"30px",height:"30px"}}/>
            <div className="flex flex-row items-center gap-x-1">
              <p className="cursor-pointer font-bold capitalize">{user?.userData?.firstName}</p>
              <p className="cursor-pointer font-bold">{user?.userData?.firstName}</p>
            </div>
          </div>:
         <div className="flex flex-row items-center gap-x-3">
            <button onClick={()=>setOpenLoginDialog(true)} className="cursor-pointer font-bold capitalize rounded bg-black" style={{fontSize:"14px",color:"white",padding:"5px 10px",border:"1px solid white"}}>Login</button>
            <button onClick={()=>setOpenSignupDialog(true)} className="cursor-pointer font-bold capitalize rounded bg-black" style={{fontSize:"14px",color:"white",padding:"5px 10px",border:"1px solid white"}}>Signup</button>
        </div>}
      </div>
    </>
  )
}