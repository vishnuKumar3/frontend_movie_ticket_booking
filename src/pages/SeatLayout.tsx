import { useEffect,useState } from "react";
import { useSelector } from "react-redux";
import { colors } from "../color_config";
import {message} from "antd"

export default function SeatLayout(){
  const movieInfo = {
    movieId:"1234",
    name:"The GOAT",
    releasedYear:2024,
    duration:150,
    rating:7.9,
    ticketPrice:150,
    language:"Telugu",
    releaseDate:"12th Jan 2024",
    description:"Consequences of an unknown past haunt the present of a special anti-terrorist squad. How will they confront it?"
  };

  const [messageApi, contextHolder] = message.useMessage();
  const [selectedSeats, setSelectedSeats] = useState([])
  const [enableBookTicketsButton, setEnableBookTicketsButton] = useState(false);

  const [seatLayout, setSeatLayout] = useState([
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
  ]);
  useEffect(()=>{
    let tempSeatLayout = JSON.parse(JSON.stringify(seatLayout));
    tempSeatLayout.sort((a:any,b:any)=>{return (b?.position-a?.position)});
    setSeatLayout(tempSeatLayout);
  },[])

  useEffect(()=>{
    console.log("final",seatLayout);
  },[seatLayout])

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
          <p style={{fontSize:"20px",fontWeight:700}}>{movieInfo.name}</p>
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
            <button className="bg-black text-white rounded-md" style={{padding:"10px 20px",border:"none",fontSize:"15px",fontWeight:"bold"}}>
                Book Tickets
            </button>
          </div>}
          <div className="w-full pt-3 pb-5 flex flex-row items-center justify-center" style={{fontWeight:"bold",fontSize:"18px"}}>Executive Class : ₹ {movieInfo.ticketPrice}</div>
            {
              seatLayout.map((seatRow:any)=>{
                return(
                  <>
                    {seatRowComponent(seatRow)}
                  </>
                )
              })
            }
        </div>
        <div className="flex flex-row items-center justify-center p-6 w-full" style={{position:"fixed",bottom:0, left:0, right:0,border:`1px solid ${colors.borderGrayVariant}`}}>
            <img src="/screen.svg"/>
        </div>
      </div>
    </>
  )
}