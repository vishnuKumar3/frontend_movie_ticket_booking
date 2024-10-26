import { colors } from "../color_config"
import { makeStyles } from "@mui/styles"
import { useSelector } from "react-redux"

export default function MovieManagement(){

    const titleComponent = (title:string)=>{ 
      return(<>
        <p style={{color:"black",fontWeight:700,fontSize:"15px"}}>{title} :</p>
      </>)
    }

    const inputComponent = (type:string)=>{
      return(
        <>
          <input type={type} className="rounded w-full" style={{fontWeight:600,border:`1px solid ${colors.inputGrayVariant}`,height:"30px",padding:"5px"}}/>
        </>
      )
    }

    const combinedComponent = (title:any, input:any)=>{
      return(
        <>
          <div className="flex flex-col justify-start gap-y-2 w-full">
            {title}
            {input}
          </div>
        </>
      )
    }

    const languages = useSelector((state:any)=>state.languages);

    const handleMiniPosterUpload =()=>{
      //let files = event.target.files;
      //setFilename(files?.[0]?.name || "");
      //setFileObj(files?.[0] || {})
    }

  return(
    <>
      <div className="w-full p-5 flex flex-col items-center justify-center gap-y-10 pb-10">
        <h2>Movie Management</h2>
        <form className="w-11/12 lg:w-96 flex flex-col items-start gap-y-3">
          {combinedComponent(titleComponent('MovieName'),inputComponent("text"))}
          {combinedComponent(titleComponent('Genre'),inputComponent("text"))}
          {combinedComponent(titleComponent('Duration (minutes)'),inputComponent("number"))}
          {combinedComponent(titleComponent('ReleasedYear'),inputComponent("text"))}          
          {combinedComponent(titleComponent('MovieDescription'),inputComponent("text"))}          
          {combinedComponent(titleComponent('ReleaseDate'),inputComponent("date"))}   
          <div className="flex flex-col justify-start gap-y-2 w-full pt-2">
            {titleComponent("MovieLanguages")}
            <div className="flex flex-row items-center flex-wrap gap-x-3">
              {
                languages && languages?.languagesList?.map((languageInfo:any)=>{
                  return(
                    <>
                      <div style={{fontSize:"15px",fontWeight:600}} className="flex flex-row items-center gap-x-1">
                        <input onChange={(e)=>{
                          console.log(e.target.value)
                        }} type="checkbox" name="languageIDs" value={languageInfo?.languageId}/>{languageInfo?.languageName}
                      </div>
                    </>
                  )
                })
              }
            </div>
          </div>
          <div className="flex flex-col justify-start gap-y-2 w-full pt-2">
            <label style={{color:"black",fontWeight:600,fontSize:"15px"}} className="cursor-pointer flex flex-row items-center gap-x-2" htmlFor="movieMiniPoster" ><i style={{fontSize:"20px"}} className="fa fa-cloud-upload"></i> Upload Movie Mini Poster</label>
            <input id="movieMiniPoster" accept='image/*' onChange={handleMiniPosterUpload} className="z-0 hidden absolute opacity-0" type="file"/>
          </div>  
          <div className="flex flex-col justify-start gap-y-2 w-full pt-2">
            <label style={{color:"black",fontWeight:600,fontSize:"15px"}} className="cursor-pointer flex flex-row items-center gap-x-2" htmlFor="movieLargePoster" ><i style={{fontSize:"20px"}} className="fa fa-cloud-upload"></i> Upload Movie Large Poster</label>
            <input id="movieLargePoster" accept='image/*' onChange={handleMiniPosterUpload} className="z-0 hidden absolute opacity-0" type="file"/>
          </div>                           
        </form>
      </div>
    </>
  )
}