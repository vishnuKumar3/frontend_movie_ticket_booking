import { useEffect } from "react"
import { useDispatch, UseDispatch, useSelector } from "react-redux"
import TopNavigation from "../components/TopNavigation";
import { Outlet } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import {createTheme} from "@mui/material/styles"

export default function MainMenu(){
    const theme = createTheme();
    const mobile = useMediaQuery(theme.breakpoints.down("md"));
    const userData = useSelector((state:any)=>state.user);

    useEffect(()=>{
        console.log("user data",userData.userId)
    },[userData])

    return(
        <>
            <TopNavigation/>
            <div style={{transform:mobile?"translateY(0px)":"translateY(60px)"}}>
              <Outlet/>
            </div>
        </>
    )
}