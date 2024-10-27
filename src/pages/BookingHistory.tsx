import { useEffect,useState } from "react"
import { colors } from "../color_config"
import { useDispatch } from "react-redux"
import { fetchBookings } from "../reducers/movies"
import {message} from "antd";
import moment from "moment";

export default function BookingHistory(){
  const dispatch = useDispatch()
  const [messageApi,contextHolder] = message.useMessage()
  const [bookingHistory,setBookingHistory] = useState([]);

const fetchPastBookings = ()=>{
  dispatch(fetchBookings()).then((action:any)=>{
    if(action?.error){
      messageApi.error({content:action?.payload?.message, duration:5})
    }
    else{
      setBookingHistory(action?.payload?.userBookings || []);
      //Trigger alert only there is an error as this is background process
    }
  }).catch((err:any)=>{
    messageApi.error({content:err?.message, duration:5})
  })      
}

  useEffect(()=>{
    fetchPastBookings();
  },[])
  return(
    <>
      {contextHolder}
      <div className="flex flex-row items-center justify-center mt-5 w-full">
        <p style={{fontWeight:600,fontSize:"20px"}}>Booking History</p>
      </div>
      <div className="w-full flex flex-row items-center gap-x-3 gap-y-3 mt-5 p-5 w-full">
        {bookingHistory?.length>0 ? 
        bookingHistory?.map((booking:any)=>{
          return(
            <>
            <div className="flex flex-row items-center gap-x-2 bg-black" style={{width:"400px"}}>
              <img style={{width:"100px",height:"150px"}} src={booking?.movieInfo?.miniPoster?.Location}/>
              <div style={{width:"300px",height:"150px",overflow:"hidden"}} className="text-white rounded flex flex-col items-start gap-y-1 pl-3 pt-3 bg-black">
                <p style={{fontWeight:600,fontSize:"18px",color:colors.greenVariant,whiteSpace:"nowrap",textOverflow:"ellipsis",overflow:"hidden"}} title={booking?.movieInfo?.movieName}>{booking?.movieInfo?.movieName}</p>
                <p style={{fontWeight:600,fontSize:"15px",whiteSpace:"nowrap",textOverflow:"ellipsis",overflow:"hidden"}} title={booking?.theatreInfo?.theatreName}>{booking?.theatreInfo?.theatreName}</p>
                <p style={{fontWeight:600,fontSize:"15px",whiteSpace:"nowrap",textOverflow:"ellipsis",overflow:"hidden"}}>Booked For: {moment(booking?.showDate).isValid()?moment(booking?.showDate).format("YYYY-MM-DD"):""}</p>
                <p className="flex flex-row flex-wrap items-center gap-x-1" style={{fontWeight:600,fontSize:"15px",whiteSpace:"nowrap",textOverflow:"ellipsis",overflow:"hidden"}}>Seats:
                  {booking?.selectedSeats?.map((seatInfo:any)=>{
                    return(
                    <>
                      <span>
                        {(seatInfo?.rowName || "")+(seatInfo?.seatNumber || "")}
                      </span>
                    </>  
                    )
                  })
                  }
                </p>
              </div>    
            </div>        
            </>
          )
        }):
        <div className="flex flex-row items-center justify-center w-full">
          <p style={{fontWeight:600,fontSize:"18px"}}>
            No Data
          </p>
        </div>
      }
      </div>
    </>
  )
}