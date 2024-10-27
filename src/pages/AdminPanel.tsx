import { useNavigate } from "react-router-dom"

export default function AdminPanel(){
  const navigate = useNavigate();
  const ButtonComponent = (name:string,pathToRedirect:string)=>{
    return(
      <>
        <button className="rounded cursor-pointer" onClick={()=>navigate(pathToRedirect)} style={{border:"none",textTransform:"capitalize",padding:"10px 30px",background:"black",color:"white",fontSize:"15px",fontWeight:700}}>
          {name}
        </button>      
      </>
    )
  }

  return(
    <>
      <div className="flex flex-row items-center justify-center mt-5">
        <p style={{fontWeight:600,fontSize:"20px"}}>Admin Panel</p>
      </div>      
      <div className="w-full flex flex-row items-center flex-wrap justify-center gap-x-3 gap-y-3 mt-5 p-5">
        {ButtonComponent("MovieManagement","/movie-management")}
        {ButtonComponent("Theatre Management","/theatre-management")}
        {ButtonComponent("Show Management","/show-management")}          
      </div>
    </>
  )
}