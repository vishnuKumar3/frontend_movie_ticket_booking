import { useEffect,useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchMovies } from "../reducers/movies";
import {message} from "antd"
import { setMoviesList } from "../reducers/movies";
import MovieCard from "../components/MovieCard";

export default function Home(){
  const dispatch = useDispatch();
  const userData = useSelector((state:any)=>state.user);
  const [messageApi, contextHolder] = message.useMessage();
  const movies = useSelector((state:any)=>state.movies);

  useEffect(()=>{
    console.log("movies",movies.moviesList);
  },[movies])

  useEffect(()=>{
    dispatch(fetchMovies()).then((action:any)=>{
      if(action?.error){
        messageApi.error({content:action?.payload?.message, duration:5})
      }
      else{
        dispatch(setMoviesList(action?.payload?.movies));
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
        {movies.moviesList.map((movieInfo:any)=>{
          return (
            <>
              <MovieCard movieInfo={movieInfo}/>
            </>
          )
        })}
      </>
  )
}