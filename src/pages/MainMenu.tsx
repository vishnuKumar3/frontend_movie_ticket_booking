import { useEffect } from "react"
import { useDispatch, UseDispatch, useSelector } from "react-redux"
import TopNavigation from "../components/TopNavigation";
import { Outlet } from "react-router-dom";

export default function MainMenu(){
    const userData = useSelector((state:any)=>state.user);

    useEffect(()=>{
        console.log("user data",userData.userId)
    },[userData])

    return(
        <>
            <TopNavigation/>
            <div style={{transform:"translateY(60px)"}}>
              <Outlet/>
            </div>
        </>
    )
}