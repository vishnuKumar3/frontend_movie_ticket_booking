import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import interceptor from "../interceptor/interceptor";

const moviesReducer = createSlice({
  name:"movies",
  initialState:{
    moviesList:[],
    moviesObject:{},
    selectedMovieId:""
  },
  reducers:{
    setMoviesList(state, action){
      state.moviesList = action.payload || [];
      let movies = action?.payload || [];
      state.moviesObject = movies.reduce((accumulator:any, movieInfo:any)=>{
        if(movieInfo?.movieId){
          accumulator[movieInfo?.movieId] = movieInfo;
        }
        return accumulator;
      },{})
      console.log("state",state.moviesObject)
    },
    setSelectedMovieId(state,action){
      console.log("payload",action.payload)
      state.selectedMovieId = action.payload || "";
    }
  }
})

export const {setMoviesList, setSelectedMovieId} = moviesReducer.actions;
export default moviesReducer.reducer;


export const fetchMovies:any = createAsyncThunk("movies/fetchMovies",async function(data, thunkApi){
  try{
    let res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/movies/fetch-movies`,data)
    if(res?.data?.status?.toLowerCase() === "success"){
      return thunkApi.fulfillWithValue(res?.data)
    }
    else{
      return thunkApi.rejectWithValue(res.data)
    }
  }
  catch(err){
    return thunkApi.rejectWithValue({
      status:"error",
      message:"Error occurred while fetching movies list"
    })
  }
})

export const addMovieData:any = createAsyncThunk("movies/addMovieData",async function(data, thunkApi){
  try{
    let res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/movies/add-movie`,data)
    if(res?.data?.status?.toLowerCase() === "success"){
      return thunkApi.fulfillWithValue(res?.data)
    }
    else{
      return thunkApi.rejectWithValue(res.data)
    }
  }
  catch(err){
    return thunkApi.rejectWithValue({
      status:"error",
      message:"Error occurred while adding movie info"
    })
  }
})

export const addShowData:any = createAsyncThunk("shows/addShowData",async function(data, thunkApi){
  try{
    let res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/shows/add-show`,data)
    if(res?.data?.status?.toLowerCase() === "success"){
      return thunkApi.fulfillWithValue(res?.data)
    }
    else{
      return thunkApi.rejectWithValue(res.data)
    }
  }
  catch(err){
    return thunkApi.rejectWithValue({
      status:"error",
      message:"Error occurred while adding show data"
    })
  }
})

export const fetchShow:any = createAsyncThunk("shows/fetchShow",async function(data, thunkApi){
  try{
    let res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/shows/fetch-show`,data)
    if(res?.data?.status?.toLowerCase() === "success"){
      return thunkApi.fulfillWithValue(res?.data)
    }
    else{
      return thunkApi.rejectWithValue(res.data)
    }
  }
  catch(err){
    return thunkApi.rejectWithValue({
      status:"error",
      message:"Error occurred while fetching show data"
    })
  }
})

export const seatBooking:any = createAsyncThunk("shows/seatBooking",async function(data, thunkApi){
  try{
    let res = await interceptor.post(`${import.meta.env.VITE_BACKEND_URL}/shows/book-tickets`,data)
    if(res?.data?.status?.toLowerCase() === "success"){
      return thunkApi.fulfillWithValue(res?.data)
    }
    else{
      return thunkApi.rejectWithValue(res.data)
    }
  }
  catch(err){
    return thunkApi.rejectWithValue({
      status:"error",
      message:"Error occurred while seat booking"
    })
  }
})

export const fetchBookings:any = createAsyncThunk("bookings/fetchBooking",async function(data, thunkApi){
  try{
    let res = await interceptor.post(`${import.meta.env.VITE_BACKEND_URL}/userBookings/fetch-user-bookings`,data)
    if(res?.data?.status?.toLowerCase() === "success"){
      return thunkApi.fulfillWithValue(res?.data)
    }
    else{
      return thunkApi.rejectWithValue(res.data)
    }
  }
  catch(err){
    return thunkApi.rejectWithValue({
      status:"error",
      message:"Error occurred while fetching booking history"
    })
  }
})