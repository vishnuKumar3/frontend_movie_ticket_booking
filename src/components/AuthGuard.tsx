import { useEffect,useState } from "react";
import { useSelector } from "react-redux"
import {message} from "antd";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function AuthGuard({children}:any){
  const user = useSelector((state:any)=>state.user);
  const [messageApi,contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const [cookies, setCookies, removeCookie] = useCookies()
  const [errorCase, setErrorCase] = useState(true);

  useEffect(()=>{
    if(cookies?.accessToken && user?.userData?.appRole === import.meta.env.VITE_ADMIN_APP_ROLE){
      //Allow access
      setErrorCase(false);
    }
    else{
      setErrorCase(true);
      messageApi.error({content:"You donot have permissions for this page",duration:5})
      setTimeout(()=>{
        navigate("/")
      },5000)
    }
  },[])

  return(
    <>
      {contextHolder}
      {!errorCase && children}
    </>
  )
}