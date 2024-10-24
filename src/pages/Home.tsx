import { useEffect } from "react"
import { useDispatch, UseDispatch, useSelector } from "react-redux"
import user, { setUserId } from "../reducers/user";
import { UseSelector } from "react-redux";

export default function Home(){
    const dispatch = useDispatch();
    const userData = useSelector((state:any)=>state.user);

    useEffect(()=>{
        dispatch(setUserId("1234"))
    },[])

    useEffect(()=>{
        console.log("user data",userData.userId)
    },[userData])

    return(
        <>
            <h1>home</h1>
        </>
    )
}