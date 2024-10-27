import { colors } from "../color_config"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import {createTheme} from "@mui/material/styles"

export default function MovieCard(props:any){
  const theme = createTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("md"));

  const movieInfo = props.movieInfo;
  const navigate = useNavigate();

  const redirectToMoviePage = (movieId:number)=>{
    navigate(`/movie/${movieId}`)
  }

  return(
    <>
      <div className="flex flex-col items-center w-max">
          <div className="rounded-t-md" onClick={()=>redirectToMoviePage(movieInfo?.movieId)} style={{width:mobile?"150px":"250px",height:mobile?"200px":"350px",cursor:"pointer",border:`0px solid ${colors.borderGrayVariant}`}}>
            <img className="rounded-t-md" style={{width:"100%",height:"100%"}} src={movieInfo?.miniPoster?.Location || "goat.avif"}/>
          </div>
          <div className="flex flex-col items-start gap-y-2 w-full pl-2 pr-2 pt-4 pb-4 text-white h-max rounded-b-md bg-black" style={{border:`1px solid ${colors.borderGrayVariant}`,borderTop:"1px" }}>
            <div className="w-full flex flex-row items-center justify-between">
              <p className="font-bold uppercase" style={{color:colors.greenVariant}}>{movieInfo.movieName}</p>
            </div>
            <div className="w-full flex flex-row items-center justify-between" style={{fontSize:"13px"}}>
              <p><span style={{border:`1px solid #fff5`, padding:"1px",fontSize:"12px",fontWeight:500}}>HD</span></p>
              <p>{movieInfo.releasedYear}</p>
            </div>                
            <div className="w-full flex flex-row items-center justify-between" style={{fontSize:"13px"}}>
              <p className="flex flex-row items-center gap-x-1"><i className="fa fa-clock-o" style={{fontSize:"12px",color:"white"}}></i> {movieInfo.duration} min</p>
              <p className="flex flex-row items-center gap-x-1"><i className="fa fa-star" style={{fontSize:"15px",color:"red"}}></i> 7.9</p>
            </div>          
          </div>
      </div>
    </>
  )
}