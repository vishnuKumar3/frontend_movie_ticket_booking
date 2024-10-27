import {message} from "antd"
import { useEffect,useState } from "react";
import { addShowData, fetchMovies } from "../reducers/movies";
import { useDispatch, useSelector } from "react-redux";
import { fetchTheatres } from "../reducers/theatres";
import { setMoviesList } from "../reducers/movies";
import { fetchLanguages } from "../reducers/languages";
import { useFormik } from "formik";
import { colors } from "../color_config";
import moment from "moment";

export default function ShowManagement(){
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const movies = useSelector((state:any)=>state.movies);
  const theatres = useSelector((state:any)=>state.theatres);
  const languages = useSelector((state:any)=>state.languages);
  const [minDateToStart, setMinDateToStart] = useState("");
  const [minDateForEndsOn, setMinDateForEndsOn] = useState("");

  const titleComponent = (title:string)=>{ 
    return(<>
      <p style={{color:"black",fontWeight:700,fontSize:"15px"}}>{title} :</p>
    </>)
  }

  const inputComponent = (type:string, name:string,required:boolean)=>{
    return(
      <>
        <input type={type} value={formik.values[name]} onChange={formik.handleChange} required={required} className="rounded w-full" name={name} style={{fontWeight:600,border:`1px solid ${colors.inputGrayVariant}`,height:"30px",padding:"5px"}}/>
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

  const formatDataAndSubmit = (values:any, resetForm:any)=>{
    dispatch(addShowData(values)).then((action:any)=>{
      if(action?.error){
        messageApi.error({content:action?.payload?.message, duration:5})
      }
      else{
        resetForm();
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
    onSubmit: (values:any,{resetForm}) => {
      console.log("values",values)
      formatDataAndSubmit(values, resetForm);
    },
  });   

  useEffect(()=>{
    console.log("movieId",formik.values.movieId);
    let movieInfo = movies?.moviesObject?.[formik.values.movieId] || {};
    setMinDateToStart(moment(movieInfo?.releaseDate).format("YYYY-MM-DD"));
    setMinDateForEndsOn(moment(movieInfo?.releaseDate).format("YYYY-MM-DD"));
  },[formik.values.movieId])

  return(
    <>
      {contextHolder}
      <div className="w-full p-5 flex flex-col items-center justify-center gap-y-10 pb-10">
        <h2>Show Management</h2>
        <form onSubmit={formik.handleSubmit} className="w-11/12 lg:w-96 flex flex-col items-start gap-y-3">
          <div className="flex flex-col justify-start gap-y-2 w-full">
            {titleComponent("MovieName")}
            <select name="movieId" onChange={formik.handleChange} required className="rounded w-full" style={{fontWeight:600,border:`1px solid ${colors.inputGrayVariant}`,height:"30px",padding:"5px",background:"white"}}>
              <option disabled selected value="">Select an option</option>              
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
              <option disabled selected value="">Select an option</option> 
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
              <option disabled selected value="">Select an option</option> 
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
          <div className="flex flex-col justify-start gap-y-2 w-full">
            {titleComponent("StartsFrom")}
            <input type={"date"} value={formik.values["startsFrom"]} onChange={formik.handleChange} min={minDateToStart} required className="rounded w-full" name={"startsFrom"} style={{fontWeight:600,border:`1px solid ${colors.inputGrayVariant}`,height:"30px",padding:"5px"}}/>            
          </div>             
          <div className="flex flex-col justify-start gap-y-2 w-full">
            {titleComponent("EndsOn")}
            <input type={"date"} onChange={formik.handleChange} min={minDateForEndsOn} required className="rounded w-full" value={formik.values["endsOn"]} name={"endsOn"} style={{fontWeight:600,border:`1px solid ${colors.inputGrayVariant}`,height:"30px",padding:"5px"}}/>            
          </div>     
          {combinedComponent(titleComponent("ShowTime"),inputComponent("time","showTime",true))}    
          <div className="flex flex-row items-center justify-center mt-5 w-full">
            <input type="submit" value="submit" className="rounded cursor-pointer" style={{border:"none",textTransform:"capitalize",padding:"5px 20px",background:"black",color:"white",fontSize:"15px",fontWeight:700}}/>                       
          </div>            
        </form>
      </div>        
    </>
  )
}