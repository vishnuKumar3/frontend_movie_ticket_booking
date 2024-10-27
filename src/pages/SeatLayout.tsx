import { useEffect,useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { colors } from "../color_config";
import {message} from "antd"
import { useParams } from "react-router-dom";
import { fetchShow, seatBooking } from "../reducers/movies";
import { useCookies } from "react-cookie";

export default function SeatLayout(){
  const [movieInfo,setMovieInfo]:[any,any] = useState({}); 

  const [messageApi, contextHolder] = message.useMessage();
  const [selectedSeats, setSelectedSeats] = useState([])
  const [enableBookTicketsButton, setEnableBookTicketsButton] = useState(false);
  const [showId, setShowId] = useState(""); 
  const params = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state:any)=>state.user);
  const [cookies, setCookie, removeCookies] = useCookies();

  const [showInfo, setShowInfo]:[any,any] = useState({});
  const [seatLayout, setSeatLayout] = useState([]);
  const movies = useSelector((state:any)=>state.movies);

  /*[
    {
      "name":'C',
      "position":3,
      "seats":[0,0,1,1,1,0,1,1,1,1,0]
    },
    {
      "name":'A',
      "position":1,
      "seats":[0,1,0,1,1,1,0,1,1,1,0]
    },
    {
      "name":'B',
      "position":2,
      "seats":[0,1,1,1,1,0,1,1,1,1,1]
    },        
  ]*/

  const arrangeSeats = (seatStructure:any)=>{
    let tempSeatLayout = JSON.parse(JSON.stringify(seatStructure));
    tempSeatLayout.sort((a:any,b:any)=>{return (b?.position-a?.position)});
    setSeatLayout(tempSeatLayout);
  }

  useEffect(()=>{
    if(params?.showId){
      setShowId(params?.showId)
      const criteria={showId:params?.showId};
      dispatch(fetchShow(criteria)).then((action:any)=>{
        if(action?.error){
          messageApi.error({content:action?.payload?.message, duration:5})
        }
        else{
          setShowInfo(action?.payload?.showInfo);
          setSeatLayout(action?.payload?.showInfo?.seatStructure)
          arrangeSeats(action?.payload?.showInfo?.seatStructure);
        }
      }).catch((err:any)=>{
        messageApi.error({content:err?.message, duration:5})
      })     
    }
    setMovieInfo(movies.moviesObject[movies.selectedMovieId] || {});
  },[params])

  useEffect(()=>{
    if(selectedSeats.length>0){
      setEnableBookTicketsButton(true);
    }
    else{
      setEnableBookTicketsButton(false);
    }
  },[selectedSeats])

  const seatInfo = [
    {
      title:"Available",
      background:"white"
    },
    {
      title:"Booked",
      background:"gray"
    },
    {
      title:"Selected",
      background:"black"
    }
  ]

  const seatAvailabilityInfoComponent = (background:string,title:string)=>{
    return(
      <div className="flex flex-row items-center gap-x-2">
        <div style={{padding:"10px",borderRadius:"4px",border:`1px solid ${colors.borderGrayVariant}`,background:background}}>
        </div>
        <p style={{fontSize:"15px",fontWeight:500}}>{title}</p>
      </div>
    )
  }

  const submitSeatBooking = ()=>{
    if(cookies?.accessToken){
      let payload = {selectedSeats:selectedSeats};
      dispatch(seatBooking(payload)).then((action:any)=>{
        if(action?.error){
          messageApi.error({content:action?.payload?.message, duration:5})
        }
        else{
          messageApi.success({content:action?.payload?.message, duration:5})
        }
      }).catch((err:any)=>{
        messageApi.error({content:err?.message, duration:5})
      })    
    }
    else{
      messageApi.info({content:"Please login to continue",duration:5});
    }
  }

  const bookTickets = (rowName:string, selectedSeat:number)=>{
    let selectedSeatInfo = {
      seatNumber:selectedSeat,
      rowName:rowName
    }
    let tempSelectedSeats = JSON.parse(JSON.stringify(selectedSeats)),tempSeatLayout = JSON.parse(JSON.stringify(seatLayout));
    tempSelectedSeats.push(selectedSeatInfo);
    setSelectedSeats(tempSelectedSeats);

    tempSeatLayout.map((layout:any)=>{
      console.log(layout?.name?.toUpperCase() === rowName?.toUpperCase())
      if(layout?.name?.toUpperCase() === rowName?.toUpperCase()){
        layout.seats[selectedSeat] = -1;
      }
    })
    setSeatLayout(tempSeatLayout);
  }

  const unBookTickets = (rowName:string, selectedSeat:number)=>{
    let selectedSeatInfo = {
      seatNumber:selectedSeat,
      rowName:rowName
    }
    let tempSelectedSeats = JSON.parse(JSON.stringify(selectedSeats)),tempSeatLayout = JSON.parse(JSON.stringify(seatLayout));
    tempSelectedSeats.map((seatInfo:any,index:number)=>{
      if(seatInfo?.seatNumber === selectedSeatInfo?.seatNumber && seatInfo?.rowName?.toLowerCase() === selectedSeatInfo?.rowName?.toLowerCase()){
        tempSelectedSeats.splice(index,1); 
      }
    })
    setSelectedSeats(tempSelectedSeats);

    tempSeatLayout.map((layout:any)=>{
      console.log(layout?.name?.toUpperCase() === rowName?.toUpperCase())
      if(layout?.name?.toUpperCase() === rowName?.toUpperCase()){
        layout.seats[selectedSeat] = 1;
      }
    })
    setSeatLayout(tempSeatLayout);
  }  

  const renderSeatComponent = (seatRowInfo:any,seatNumber:number, seatAvailibility:number)=>{
    switch(seatAvailibility){
      case 1:
        return <div onClick={()=>{bookTickets(seatRowInfo?.name, seatNumber)}} className="bg-white hover:bg-black hover:text-white rounded-md flex flex-row justify-center items-center" style={{border:`1px solid ${colors.borderGrayVariant}`,cursor:"pointer",width:"30px",height:"30px",fontWeight:"bold"}}>{seatNumber}</div>;
      case 0:
        return <div className="flex flex-row justify-center items-center rounded-md" style={{border:`1px solid ${colors.borderGrayVariant}`,background:"gray",cursor:"not-allowed",color:"white",fontWeight:"bold",width:"30px",height:"30px"}}>{seatNumber}</div>;
      case -1:
        return <div onClick={()=>{unBookTickets(seatRowInfo?.name, seatNumber)}} className="bg-black text-white rounded-md flex flex-row justify-center items-center" style={{border:`1px solid ${colors.borderGrayVariant}`,cursor:"pointer",width:"30px",height:"30px",fontWeight:"bold"}}>{seatNumber}</div>;
      default:
        return <></>;
      }    
  }

  const seatRowComponent = (seatRowInfo:any)=>{
    return(
      <>
        <div className="flex flex-row items-center">
          <b style={{width:"70px",fontSize:"18px",textTransform:"uppercase"}}>{seatRowInfo?.name}</b>
          <div className="flex flex-row items-center gap-x-3">
              {
                seatRowInfo?.seats?.map((seat:number,index:number)=>{
                  return(
                    index!=0?<>
                      {
                        renderSeatComponent(seatRowInfo, index, seat)
                      }
                    </>:
                    <></>
                  )
                })
              }
          </div>
        </div>
      </>
    )
  }


  return(
    <>
      {contextHolder}
      <div style={{height:'calc(100vh - 60px)',width:"100%"}}>
        <div className="flex flex-row items-center justify-between p-5" style={{borderBottom:`1px solid ${colors.borderGrayVariant}`}}>
          <p style={{fontSize:"20px",fontWeight:700}}>{movieInfo?.movieName || ""}</p>
          <div className="flex flex-row items-center gap-x-3">
            {
              seatInfo.map((info:any)=>{
                return(
                  <>
                    {seatAvailabilityInfoComponent(info?.background, info?.title)}
                  </>
                )
              })
            }
          </div>
        </div>
        <div className="w-full flex flex-col items-center pt-10 gap-y-4" style={{overflowY:"scroll"}}>
          {enableBookTicketsButton && <div className="w-full flex flex-row-reverse items-center justify-start pr-5" style={{fontWeight:"bold",fontSize:"18px"}}>
            <button onClick={submitSeatBooking} className="cursor-pointer bg-black text-white rounded-md" style={{padding:"10px 20px",border:"none",fontSize:"15px",fontWeight:"bold"}}>
                Book Tickets
            </button>
          </div>}
          <div className="w-full pt-3 pb-5 flex flex-row items-center justify-center" style={{fontWeight:"bold",fontSize:"18px"}}>Executive Class : ₹ {showInfo?.ticketPrice || ""}</div>
            {
              seatLayout?.length>0 ? seatLayout?.map((seatRow:any)=>{
                return(
                  <>
                    {seatRowComponent(seatRow)}
                  </>
                )
              }):
              <p style={{fontWeight:"600"}}>No Data</p>
            }
        </div>
        <div className="flex flex-row items-center justify-center p-6 w-full" style={{position:"fixed",bottom:0, left:0, right:0,border:`1px solid ${colors.borderGrayVariant}`}}>
            <img src="/screen.svg"/>
        </div>
      </div>
    </>
  )
}