import { makeStyles } from "@mui/styles"
import { createTheme} from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from "react";
import Button from '@mui/material/Button';
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import {message} from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { LinearProgress } from "@mui/material";

const theme:any = createTheme();
const useStyles:any = makeStyles(()=>(
{

}
));

export default function Signup(props:any){
    const styles = useStyles();
    const [messageApi, contextHolder] = message.useMessage()
		const [open, setOpen] = useState(false);
    const [showProgress, setShowProgress] = useState(false);
		const handleClose = ()=>{
			setOpen(false);
		}

    useEffect(()=>{
      setOpen(props?.openSignupDialog);
    },[props])    

    const handleGoogleSignup = async (inputData:any)=>{
      setShowProgress(true)
      let res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/signup`,inputData,{
          headers:{
              "Content-Type":"application/json",
          }
      });
      if(res){
          setShowProgress(false);
      }
      if(res?.data?.status?.toLowerCase() === "success"){
          messageApi.open({content:res?.data?.message,type:"success",duration:5})
          props?.setOpenSignupDialog(false);
      }
      else{
          messageApi.open({content:res?.data?.message,type:"error",duration:5})
      }        
  }    

    const googleLogin:any = useGoogleLogin({
      onSuccess: async(codeResponse)=>{
          let userData = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`);
          if(userData?.data?.email){
              console.log("user data",userData);
              let userInfo = {
                email:userData?.data?.email,
                firstName:userData?.data?.given_name,
                lastName:userData?.data?.family_name,
                avatarInfo:{
                    Location:userData?.data?.picture
                }
              }
              handleGoogleSignup(userInfo)
          }
      },
      onError: (error:any) => {messageApi.open({type:"error","content":error,"duration":5})}
    });       

    return(
        <>
					<Dialog
							open={open}
              fullWidth
					>
              {contextHolder}
							<DialogTitle>
              {showProgress && <LinearProgress/>}
                <p style={{fontWeight:600,fontSize:"25px"}}>Signup</p>
							</DialogTitle>
							<DialogContent style={{display:"flex",flexDirection:"column",rowGap:"20px"}}>
                <Button
                    onClick={googleLogin}
                    style={{padding: "10px 0px", color: "black", borderColor: "#b8b8b8"}}
                    fullWidth={true}
                    variant="outlined"
                    startIcon={<FcGoogle/>}>
                    Signup with Google
                </Button>   
							</DialogContent>
					</Dialog>            
        </>
    )
}