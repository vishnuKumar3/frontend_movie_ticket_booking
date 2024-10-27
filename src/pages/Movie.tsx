import { useEffect, useState } from "react";
import { colors } from "../color_config"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchShowTheatres } from "../reducers/theatres";
import { setTheatresList } from "../reducers/theatres";
import { message } from "antd";
import { useRef } from "react";
import moment from "moment";
import { setSelectedMovieId } from "../reducers/movies";
import { useMediaQuery } from "@mui/material";
import {createTheme} from "@mui/material/styles"

export default function Movie(){

  const theme = createTheme();
  const dispatch = useDispatch(); 
  const movies = useSelector((state:any)=>state.movies);
  const theatres = useSelector((state:any)=>state.theatres);
  const pathParams:any = useParams();
  const [movieInfo, setMovieInfo]:any = useState({});
  const [messageApi, contextHolder] = message.useMessage();
  const languages = useSelector((state:any)=>state.languages);
  const [movieId, setMovieId] = useState("");
  const [availableShowDates, setAvailableShowDates] = useState([]);
  const [selectedShow, setSelectedShow] = useState("");
  const navigate = useNavigate()
  let payload:any = useRef();
  const mobile = useMediaQuery(theme.breakpoints.down("md"));  

  const fetchMovieTheatreList = (payload:any)=>{
    dispatch(fetchShowTheatres(payload.current)).then((action:any)=>{
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

  const generateOneWeekTimingsFromCurrent = ()=>{
    let momentObj = moment().startOf("day");
    payload.current = {
      movieId:pathParams?.movieId || "",
      languageId:"",
      showDate:"",
    }

    const requiredFormat = "YYYY-MM-DD";
    let dates:any = [];
    for(let i=0;i<7;i++){
      momentObj = momentObj.add(i==0?i:1,"d");
      let record = {
        dateStr:momentObj.format(requiredFormat),
        date:momentObj.format("DD"),
        day:momentObj.day(momentObj.day())?.toString()?.slice(0,3)
      }
      if(i==0){
        setSelectedShow(record?.dateStr)
        payload.current["showDate"] = record?.dateStr;
      }
      dates.push(record);
    }
    setAvailableShowDates(dates);
    payload.current["languageId"] = languages?.languagesList?.[0]?.languageId || ""
    fetchMovieTheatreList(payload)
  }

  useEffect(()=>{
    let moviesObject = movies?.moviesObject || {}; 
    console.log("movie page",moviesObject,pathParams)
    setMovieInfo(moviesObject[pathParams?.movieId] || {})
    dispatch(setSelectedMovieId(pathParams?.movieId));
    setMovieId(pathParams?.movieId)
    generateOneWeekTimingsFromCurrent()
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

  const handleChangeInShow = (key:string, value:any)=>{
    if(key === "showDate"){
      setSelectedShow(value);
    }
    payload.current[key] = value;
    fetchMovieTheatreList(payload)
  } 

  const handleShowSelection = (showId:string)=>{
    navigate(`/seat-layout/${showId}`)
  }


  return(
    <>
      <div className="w-full pb-10">
        {contextHolder}
        <div style={{backgroundImage:`url(${movieInfo?.bigPoster?.Location || "goat-poster.avif"})`,width:"100%",height:mobile?"200px":"500px",backgroundPosition:"center",backgroundRepeat:"no-repeat",backgroundSize:"100%"}}>
          <div className="flex flex-row items-start" style={{background:"linear-gradient(to right,black,#0000)",width:"100%",height:mobile?"200px":"500px",color:"white"}}>
            <div className="h-full flex flex-col gap-y-3 justify-center ml-5 sm:ml-24">
              <h1 style={{color:colors.greenVariant}}>{movieInfo.movieName}</h1>
              <p className="flex flex-row items-center gap-x-2"><i className="fa fa-language"></i><span>U/A Telugu</span></p>
              <p className="flex flex-row items-center gap-x-2"><i className="fa fa-clock-o"></i><span>{movieInfo.duration} min</span></p>
              {!mobile && <button style={{background:colors.greenVariant,color:"black",padding:mobile?"5px 10px":"10px 20px",border:"none",fontWeight:600,fontSize:mobile?"13px":"15px"}} className="flex flex-row items-center mt-5 cursor-pointer gap-x-2 rounded-md cursor-pointer justify-center"><i className="fa fa-play-circle-o"></i>Watch Trailer</button>}
            </div>
          </div>        
        </div>
        <div className="p-5">
          <div className="flex flex-col gap-y-2">
            <p style={{fontWeight:700,fontSize:"20px"}}>About the movie</p>
            <p>{movieInfo.movieDescription}</p>
          </div>
        </div>
        <div className="w-full flex flex-row justify-center pt-5 pb-5"><p style={{fontWeight:"bold",fontSize:"20px"}}>Book Tickets</p></div>
        <div className="w-full flex flex-wrap justify-center">
          <div className="w-11/12 sm:w-11/12 pt-5 flex flex-col-reverse sm:flex-row justify-between items-center gap-y-8">
            <div className="flex flex-row flex-wrap gap-y-3 items-center gap-x-2">
              {
                availableShowDates.map((showDate:any)=>{
                  const isSelected = selectedShow === showDate?.dateStr;
                  return(
                    <>
                      <div onClick={()=>handleChangeInShow("showDate",showDate?.dateStr)} className="flex flex-col items-center p-1 sm:p-2 gap-y-1 rounded-md cursor-pointer" style={{border:"1px solid black",color:isSelected?"white":"black",background:isSelected?"black":"white",width:"60px",fontSize:"13px",fontWeight:"600"}}>
                        <p>{showDate?.day}</p>
                        <p>{showDate?.date}</p>
                      </div>
                    </>
                  )
                })
              }
            </div>
            <div className="w-40">
              <select name="languageId" onChange={(e:any)=>handleChangeInShow("languageId",e.target.value)} required className="rounded w-full" style={{fontWeight:600,border:`1px solid ${colors.inputGrayVariant}`,height:"50px",padding:"5px",background:"white"}}>
                  {
                    languages?.languagesList?.map((lanagugeInfo:any)=>{
                      return(
                      <>
                        <option value={lanagugeInfo?.languageId}>{lanagugeInfo?.languageName}</option>
                      </>
                      )
                    })
                  }
                </select>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-row justify-center pt-5">
          <div className="flex flex-col items-center justify-center bg-black rounded-md w-11/12" style={{border:`1px solid ${colors.borderGrayVariant}`,padding:"10px 0px 10px 0px",color:"#fffc"}}>
            {theatres?.theatresList?.length>0 ? theatres?.theatresList?.map((theatreData:any)=>{
              return(
                <>
                  <hr style={{width:"100%",border:`1px solid #fff9`}}/>
                  <div className="flex flex-col sm:flex-row gap-y-5 items-start sm:items-center justify-between" style={{width:"95%",padding:"20px 0px"}}>
                    <div style={{width:mobile?"100%":"300px"}}>
                      <p title={theatreData?.theatreInfo?.theatreName} style={{fontWeight:"bold",color:"#fffd",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{theatreData?.theatreInfo?.theatreName}</p>
                    </div>
                    <div className="flex flex-row items-center gap-x-5">
                      {
                        theatreData?.showTimings?.map((time:any)=>{
                          return (
                            <>
                              <p className="rounded-md cursor-pointer" onClick={()=>handleShowSelection(time?.showId || "")} style={{padding:mobile?"5px 10px":"10px 20px",fontSize:mobile?"13px":"auto",fontWeight:900,border:`1px solid white`,background:"black",color:"lime",}}>{convertTime(time?.showTime || "")}</p>
                            </>
                          )
                        })
                      }
                    </div>
                  </div>
                </>
              )
            }):
              <p style={{fontWeight:"600",color:"white"}}>No Data</p>
            }
          </div>
        </div>
      </div>
    </>
  )
}