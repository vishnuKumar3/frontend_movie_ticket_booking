import { useEffect,useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchMovies } from "../reducers/movies";
import { fetchLanguages } from "../reducers/languages";
import {message} from "antd"
import { setMoviesList } from "../reducers/movies";
import MovieCard from "../components/MovieCard";
import moment from "moment"
import { colors } from "../color_config";

export default function UpcomingMovies(){
  const dispatch = useDispatch();
  const userData = useSelector((state:any)=>state.user);
  const [messageApi, contextHolder] = message.useMessage();
  const movies = useSelector((state:any)=>state.movies);
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(()=>{
    console.log("movies -->",movies.moviesList);
  },[movies])

  useEffect(()=>{
    console.log(window.location.pathname)
  },[])

  useEffect(()=>{
    handleMovieSearch()

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
  },[])

  useEffect(()=>{
      console.log("user data",userData.userId)
  },[userData])

  const handleMovieSearch = ()=>{
    let pattern = /[.*]+/;
    let currentDate = moment().add(1,"d").format("YYYY-MM-DD");    

    if(pattern.test(searchKeyword)){
      messageApi.error({content:"Please enter a valid keyword",duration:5})
    }
    else{
      dispatch(fetchMovies({searchKeyword:searchKeyword, startsFrom:currentDate})).then((action:any)=>{
        if(action?.error){
          messageApi.error({content:action?.payload?.message, duration:5})
        }
        else{
          dispatch(setMoviesList(action?.payload?.movies));
        }
      }).catch((err:any)=>{
        messageApi.error({content:err?.message, duration:5})
      })    
    }
  }  

  return(
      <>
        {contextHolder}
        <div className="flex flex-col items-start gap-y-3 p-2 sm:p-5 w-full">
          <h2>Upcoming Movies</h2>
          <div className="flex flex-row items-center gap-x-1 sm:gap-x-5 w-full">
            <input type="text" placeholder="Search by movie name" onChange={(e)=>setSearchKeyword(e.target.value)} className="rounded flex-1" style={{fontWeight:600,border:`1px solid ${colors.inputGrayVariant}`,height:"40px",padding:"5px"}}/>
            <button onClick={()=>{searchKeyword && handleMovieSearch()}} className="rounded cursor-pointer" style={{border:"none",textTransform:"capitalize",padding:"0px 20px",height:"40px",background:"black",color:"white",fontSize:"15px",fontWeight:700}}>Search</button>                                   
          </div>          
          <div className="flex flex-row flex-wrap items-center justify-center sm:items-start sm:justify-start gap-x-5 gap-y-5 pt-5 w-full">
            {movies?.moviesList?.length>0 ? movies?.moviesList?.map((movieInfo:any)=>{
              console.log("movie details",movieInfo);
              return (
                <>
                  <MovieCard movieInfo={movieInfo}/>
                </>
              )
            }):
            <div className="w-full flex flex-row justify-center items-center">
              <p style={{fontWeight:700,fontSize:"20px"}}>No Data</p>
            </div>
          }
          </div>
        </div>
      </>
  )
}