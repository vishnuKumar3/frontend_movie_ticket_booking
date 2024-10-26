import { useEffect, useState } from "react";
import { colors } from "../color_config"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchShowTheatres } from "../reducers/theatres";
import { setTheatresList } from "../reducers/theatres";
import { message } from "antd";

export default function Movie(){

  const response = {
    status:'success',
    movies:[{
    movieId:"1234",
    name:"The GOAT",
    releasedYear:2024,
    duration:150,
    rating:7.9,
    language:"Telugu",
    releaseDate:"12th Jan 2024",
    description:"Consequences of an unknown past haunt the present of a special anti-terrorist squad. How will they confront it?"
  }]};  

  const dispatch = useDispatch(); 
  const movies = useSelector((state:any)=>state.movies);
  const theatres = useSelector((state:any)=>state.theatres);
  const pathParams:any = useParams();
  const [movieInfo, setMovieInfo]:any = useState({});
  const [messageApi, contextHolder] = message.useMessage();

  const fetchMovieTheatreList = ()=>{
    dispatch(fetchShowTheatres()).then((action:any)=>{
      if(action?.error){
        messageApi.error({content:action?.payload?.message, duration:5})
      }
      else{
        dispatch(setTheatresList(action?.payload?.theatres));
      }
    }).catch((err:any)=>{
      messageApi.error({content:err?.message, duration:5})
    })    
  }

  useEffect(()=>{
    let moviesObject = movies?.moviesObject || {}; 
    console.log("movie page",moviesObject,pathParams)
    setMovieInfo(moviesObject[pathParams?.movieId] || {})
    fetchMovieTheatreList()
  },[pathParams])

  const convertTime = (time:string)=>{
    let res = time;
    if(time){
      let timeParts = time.split(":");
      let hourPart = parseInt(timeParts?.[0]);
      let minutePart = parseInt(timeParts?.[1]);
      let meridian = "AM"
      if(hourPart>=12){
        meridian = "PM";
        if(hourPart>12){
          hourPart-=12;
        }
      }
      else{
        meridian = "AM";
      }
      res = hourPart.toString()+":"+minutePart.toString()+" "+meridian;
    }
    return res;
  }


  return(
    <>
      <div className="w-full pb-10">
        {contextHolder}
        <div style={{backgroundImage:'url("/goat-poster.avif")',width:"100%",height:"500px",backgroundPosition:"center",backgroundRepeat:"no-repeat",backgroundSize:"100%"}}>
          <div className="flex flex-row items-start" style={{background:"linear-gradient(to right,black,#0000)",width:"100%",height:"500px",color:"white"}}>
            <div className="h-full flex flex-col gap-y-3 justify-center ml-24">
              <h1 style={{color:colors.greenVariant}}>{movieInfo.name}</h1>
              <p className="flex flex-row items-center gap-x-2"><i className="fa fa-language"></i><span>U/A {movieInfo.language}</span></p>
              <p className="flex flex-row items-center gap-x-2"><i className="fa fa-clock-o"></i><span>{movieInfo.duration} min</span></p>
              <button style={{background:colors.greenVariant,color:"black",padding:"10px 20px",border:"none",fontWeight:600,fontSize:"15px"}} className="flex flex-row items-center mt-5 cursor-pointer gap-x-2 rounded-md cursor-pointer justify-center"><i className="fa fa-play-circle-o"></i>Watch Trailer</button>
            </div>
          </div>        
        </div>
        <div className="p-5">
          <div>
            <p style={{fontWeight:700,fontSize:"20px"}}>About the movie</p>
            <p>{movieInfo.description}</p>
          </div>
        </div>
        <div className="w-full flex flex-row justify-center pt-5">
          <div className="flex flex-col items-center bg-black rounded-md" style={{width:"90%",border:`1px solid ${colors.borderGrayVariant}`,padding:"10px 0px 0px 0px",color:"#fffc"}}>
            {theatres?.theatresList.map((theatreInfo:any)=>{
              return(
                <>
                  <hr style={{width:"100%",border:`1px solid #fff9`}}/>
                  <div className="flex flex-row items-center justify-between" style={{width:"95%",padding:"20px 0px"}}>
                    <div style={{width:"300px"}}>
                      <p title={theatreInfo?.theatreName} style={{fontWeight:"bold",color:"#fffd",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{theatreInfo.theatreName}</p>
                    </div>
                    <div className="flex flex-row items-center gap-x-5">
                      {
                        theatreInfo?.showTimings.map((time:string)=>{
                          return (
                            <>
                              <p className="rounded-md cursor-pointer" style={{padding:"10px 20px",fontWeight:900,border:`1px solid white`,background:"black",color:"lime",}}>{convertTime(time)}</p>
                            </>
                          )
                        })
                      }
                    </div>
                  </div>
                </>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}