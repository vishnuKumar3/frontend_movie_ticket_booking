import {message} from "antd"
import { useEffect } from "react";
import { addShowData, fetchMovies } from "../reducers/movies";
import { useDispatch, useSelector } from "react-redux";
import { fetchTheatres } from "../reducers/theatres";
import { setMoviesList } from "../reducers/movies";
import { fetchLanguages } from "../reducers/languages";
import { useFormik } from "formik";
import { colors } from "../color_config";

export default function ShowManagement(){
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const movies = useSelector((state:any)=>state.movies);
  const theatres = useSelector((state:any)=>state.theatres);
  const languages = useSelector((state:any)=>state.languages);

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

  const fetchAllMovies = ()=>{
    dispatch(fetchMovies()).then((action:any)=>{
      if(action?.error){
        messageApi.error({content:action?.payload?.message, duration:5})
      }
      else{
        dispatch(setMoviesList(action?.payload?.movies));
        //we just need to trigger alert when there is an error 
      }
    }).catch((err:any)=>{
      messageApi.error({content:err?.message, duration:5})
    })    
  }

  const fetchAllTheatres = ()=>{
    dispatch(fetchTheatres()).then((action:any)=>{
      if(action?.error){
        messageApi.error({content:action?.payload?.message, duration:5})
      }
      else{
        //we just need to trigger alert when there is an error      
      }
    }).catch((err:any)=>{
      messageApi.error({content:err?.message, duration:5})
    })     
  }

  const fetchAllLanguages = ()=>{
    dispatch(fetchLanguages()).then((action:any)=>{
      if(action?.error){
        messageApi.error({content:action?.payload?.message, duration:5})
      }
      else{
        //we just need to trigger alert when there is an error
      }
      }).catch((err:any)=>{
        messageApi.error({content:err?.message, duration:5})
      })      
  }

  useEffect(()=>{
    fetchAllMovies();
    fetchAllTheatres();
    fetchAllLanguages();
  },[])

  useEffect(()=>{
    console.log("movies list",movies?.moviesList)
  },[movies])

  const formatDataAndSubmit = (values:any)=>{
    dispatch(addShowData(values)).then((action:any)=>{
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

  const formik = useFormik({
    initialValues: {
      movieId:"",
      theatreId:"",
      languageId:"",
      startsFrom:"",
      endsOn:"",
      showTime:"",
      ticketPrice:""
    },
    onSubmit: (values:any) => {
      console.log("values",values)
      formatDataAndSubmit(values);
    },
  });   

  return(
    <>
      {contextHolder}
      <div className="w-full p-5 flex flex-col items-center justify-center gap-y-10 pb-10">
        <h2>Show Management</h2>
        <form onSubmit={formik.handleSubmit} className="w-11/12 lg:w-96 flex flex-col items-start gap-y-3">
          <div className="flex flex-col justify-start gap-y-2 w-full">
            {titleComponent("MovieName")}
            <select name="movieId" onChange={formik.handleChange} required className="rounded w-full" style={{fontWeight:600,border:`1px solid ${colors.inputGrayVariant}`,height:"30px",padding:"5px",background:"white"}}>
              {
                movies?.moviesList?.map((movieInfo:any)=>{
                  return(
                  <>
                    <option value={movieInfo?.movieId}>{movieInfo?.movieName}</option>
                  </>
                  )
                })
              }
            </select>
          </div>
          <div className="flex flex-col justify-start gap-y-2 w-full">
            {titleComponent("TheatreName")}
            <select name="theatreId" onChange={formik.handleChange} required className="rounded w-full" style={{fontWeight:600,border:`1px solid ${colors.inputGrayVariant}`,height:"30px",padding:"5px",background:"white"}}>
              {
                theatres?.theatresList?.map((theatreInfo:any)=>{
                  return(
                  <>
                    <option value={theatreInfo?.theatreId}>{theatreInfo?.theatreName}</option>
                  </>
                  )
                })
              }
            </select>
          </div>
          <div className="flex flex-col justify-start gap-y-2 w-full">
            {titleComponent("Language")}
            <select name="languageId" onChange={formik.handleChange} required className="rounded w-full" style={{fontWeight:600,border:`1px solid ${colors.inputGrayVariant}`,height:"30px",padding:"5px",background:"white"}}>
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
          {combinedComponent(titleComponent("TicketPrice"),inputComponent("number","ticketPrice",true))}
          {combinedComponent(titleComponent("StartsFrom"),inputComponent("date","startsFrom",true))}
          {combinedComponent(titleComponent("EndsOn"),inputComponent("date","endsOn",true))}
          {combinedComponent(titleComponent("ShowTime"),inputComponent("time","showTime",true))}    
          <div className="flex flex-row items-center justify-center mt-5 w-full">
            <input type="submit" value="submit" className="rounded cursor-pointer" style={{border:"none",textTransform:"capitalize",padding:"5px 20px",background:"black",color:"white",fontSize:"15px",fontWeight:700}}/>                       
          </div>            
        </form>
      </div>        
    </>
  )
}