import { useEffect,useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchMovies } from "../reducers/movies";
import { fetchLanguages } from "../reducers/languages";
import {message} from "antd"
import { setMoviesList } from "../reducers/movies";
import MovieCard from "../components/MovieCard";
import moment from "moment";

export default function Home(){
  const dispatch = useDispatch();
  const userData = useSelector((state:any)=>state.user);
  const [messageApi, contextHolder] = message.useMessage();
  const movies = useSelector((state:any)=>state.movies);

  useEffect(()=>{
    console.log("movies",movies.moviesList);
  },[movies])

  useEffect(()=>{
    console.log(window.location.pathname)
  },[])

  useEffect(()=>{
    let oldDate = moment().subtract(30,"d").format("YYYY-MM-DD");
    let currentDate = moment().format("YYYY-MM-DD");
    dispatch(fetchMovies({startsFrom:currentDate, startsBefore:oldDate})).then((action:any)=>{
      if(action?.error){
        messageApi.error({content:action?.payload?.message, duration:5})
      }
      else{
        dispatch(setMoviesList(action?.payload?.movies));
      }
    }).catch((err:any)=>{
      messageApi.error({content:err?.message, duration:5})
    })

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

  return(
      <>
        {contextHolder}
        <div className="flex flex-col items-start gap-y-3 p-5">
          <h2>Trending Movies</h2>
          <div className="flex flex-row flex-wrap items-center gap-x-5 pt-5 w-full">
            {movies?.moviesList?.length>0 ? 
            movies.moviesList.map((movieInfo:any)=>{
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