import { useNavigate } from "react-router-dom"
import { colors } from "../color_config";

export default function TopNavigation(){
  const navigate = useNavigate();
  const menuItems = [
    {
      name:"home",
      path:"/",
    },
    {
      name:"movies",
      path:"/movie"
    }
  ]

  const redirectToPage = (menuItem:any)=>{
    navigate(menuItem?.path);
  }
  return(
    <>
      <div className="z-10 w-full pl-3 pr-2 pt-2 pb-3 flex flex-row items-center justify-between flex-wrap" style={{background:"#000000",position:"fixed",top:0,left:0,color:"white"}}>
        <div className="flex flex-row items-center gap-x-20">
          <div className="flex flex-row items-center gap-x-2">
            <img src="/logo.png" style={{width:"40px",height:"40px"}}/>
            <p style={{color:colors.greenVariant, fontWeight:"bold", fontSize:"20px"}}>MoTick</p>
          </div>
          <div className="w-max h-full flex flex-row items-center gap-x-5">
            {
              menuItems.map((item)=>{
                return (
                  <>
                    <p className="cursor-pointer font-bold capitalize" onClick={()=>{redirectToPage(item)}}>{item.name}</p>
                  </>
                )
              })
            }
          </div>
        </div>
        <div>

        </div>
      </div>
    </>
  )
}