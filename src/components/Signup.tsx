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

const theme:any = createTheme();
const useStyles:any = makeStyles(()=>(
{

}
));

export default function Login(){
    const styles = useStyles();
    const [messageApi, contextHolder] = message.useMessage()
		const [open, setOpen] = useState(false);
		const handleClose = ()=>{
			setOpen(false);
		}

    const googleLogin:any = useGoogleLogin({
      onSuccess: async(codeResponse)=>{
          let userData = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`);
          if(userData?.data?.email){
              console.log("user data",userData);
              let userInfo = {
                  email:userData?.data?.email
              }
          }
      },
      onError: (error:any) => {messageApi.open({type:"error","content":error,"duration":5})}
    });       

    return(
        <>
					<Dialog
							open={true}
							onClose={handleClose}
              fullWidth
					>
							<DialogTitle>
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