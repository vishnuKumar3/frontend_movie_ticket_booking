import { colors } from "../color_config"
import { makeStyles } from "@mui/styles"
import { useDispatch, useSelector } from "react-redux"
import {useFormik} from "formik"
import { useState } from "react"
import {message} from "antd";
import { UseDispatch } from "react-redux"
import { addMovieData } from "../reducers/movies"

export default function MovieManagement(){
    const [miniPoster, setMiniPoster] = useState();
    const [miniPosterName, setMiniPosterName] = useState({});
    const [bigPoster, setBigPoster] = useState();
    const [bigPosterName, setBigPosterName] = useState({});
    const [messageApi, contextHolder] = message.useMessage()
    const dispatch = useDispatch();

    const titleComponent = (title:string)=>{ 
      return(<>
        <p style={{color:"black",fontWeight:700,fontSize:"15px"}}>{title} :</p>
      </>)
    }

    const inputComponent = (type:string, name:string,required:boolean)=>{
      return(
        <>
          <input type={type} onChange={formik.handleChange} required={required} className="rounded w-full" name={name} style={{fontWeight:600,border:`1px solid ${colors.inputGrayVariant}`,height:"30px",padding:"5px"}}/>
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

    const handleMiniPosterUpload =(event:any)=>{
      let files = event.target.files;
      setMiniPosterName(files?.[0]?.name || "");
      setMiniPoster(files?.[0] || {})
    }

    const handleBigPosterUpload =(event:any)=>{
      let files = event.target.files;
      setBigPosterName(files?.[0]?.name || "");
      setBigPoster(files?.[0] || {})
    }    

    const generateFormDataAndSubmit = (values:any)=>{
      const formData = new FormData();
      Object.entries(values).map(([key,value]:[any,any])=>{
        if(key?.toLowerCase() === "languageIDs"){
          formData.append(key,value.join(","));
        }
        else{
          formData.append(key,value)
        }
      })
      if(miniPoster){
        formData.append("miniPoster",miniPoster);
      }
      if(bigPoster){
        formData.append("bigPoster",bigPoster);
      }
      dispatch(addMovieData(formData)).then((action:any)=>{
        if(action?.error){
          messageApi.error({content:action?.payload?.message, duration:5})
        }
        else{
          messageApi.success({content:action?.payload?.message,duration:5})
        }
      }).catch((err:any)=>{
        messageApi.error({content:err?.message, duration:5})
      })      
    }

    const formik = useFormik({
      initialValues: {
        movieName:"",
        genre:"",
        duration:0,
        releasedYear:0,
        movieDescription:"",
        releaseDate:"",
        languageIDs:[]
      },
      onSubmit: (values:any) => {
        console.log(miniPoster, bigPoster)
        console.log("form values",values);
        generateFormDataAndSubmit(values);
      },
    });    

  return(
    <>
      <div className="w-full p-5 flex flex-col items-center justify-center gap-y-10 pb-10">
        <h2>Movie Management</h2>
        {contextHolder}
        <form onSubmit={formik.handleSubmit} className="w-11/12 lg:w-96 flex flex-col items-start gap-y-3">
          {combinedComponent(titleComponent('MovieName'),inputComponent("text","movieName",true))}
          {combinedComponent(titleComponent('Genre'),inputComponent("text","genre",true))}
          {combinedComponent(titleComponent('Duration (minutes)'),inputComponent("number","duration",true))}
          {combinedComponent(titleComponent('ReleasedYear'),inputComponent("number","releasedYear",true))}          
          {combinedComponent(titleComponent('MovieDescription'),inputComponent("text","movieDescription",true))}          
          {combinedComponent(titleComponent('ReleaseDate'),inputComponent("date","releaseDate",true))}   
          <div className="flex flex-col justify-start gap-y-2 w-full pt-2">
            {titleComponent("MovieLanguages")}
            <div className="flex flex-row items-center flex-wrap gap-x-3">
              {
                languages && languages?.languagesList?.map((languageInfo:any)=>{
                  return(
                    <>
                      <div style={{fontSize:"15px",fontWeight:600}} className="flex flex-row items-center gap-x-1">
                        <input type="checkbox" onChange={formik.handleChange} name="languageIDs" value={languageInfo?.languageId}/>{languageInfo?.languageName}
                      </div>
                    </>
                  )
                })
              }
            </div>
          </div>
          <div className="flex flex-col justify-start gap-y-2 w-full pt-2">
            <label style={{color:"black",fontWeight:600,fontSize:"15px"}} className="cursor-pointer flex flex-row items-center gap-x-2" htmlFor="movieMiniPoster" ><i style={{fontSize:"20px"}} className="fa fa-cloud-upload"></i> Upload Movie Mini Poster</label>
            <input id="movieMiniPoster" accept='image/*' onChange={(e)=>handleMiniPosterUpload(e)} className="z-0 hidden absolute opacity-0" type="file"/>
          </div>  
          <div className="flex flex-col justify-start gap-y-2 w-full pt-2">
            <label style={{color:"black",fontWeight:600,fontSize:"15px"}} className="cursor-pointer flex flex-row items-center gap-x-2" htmlFor="movieLargePoster" ><i style={{fontSize:"20px"}} className="fa fa-cloud-upload"></i> Upload Movie Large Poster</label>
            <input id="movieLargePoster" accept='image/*' onChange={(e)=>handleBigPosterUpload(e)} className="z-0 hidden absolute opacity-0" type="file"/>
          </div>    
          <div className="flex flex-row items-center justify-center mt-5 w-full">
            <input type="submit" value="submit" className="rounded cursor-pointer" style={{border:"none",textTransform:"capitalize",padding:"5px 20px",background:"black",color:"white",fontSize:"15px",fontWeight:700}}/>                       
          </div>
        </form>
      </div>
    </>
  )
}