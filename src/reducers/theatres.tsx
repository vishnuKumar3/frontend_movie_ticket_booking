import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const theatresReducer = createSlice({
  name:"theatres",
  initialState:{
    theatresList:[],
    theatresObject:{}
  },
  reducers:{
    setTheatresList(state, action){
      state.theatresList = action.payload;
    }
  },
  extraReducers:(builder)=>{
    builder.addCase(fetchTheatres.fulfilled,(state,action)=>{
      state.theatresList = action.payload?.theatres || [];
      let theatres = action?.payload?.theatres || [];
      state.theatresObject = theatres.reduce((accumulator:any, theatreInfo:any)=>{
        if(theatreInfo?.theatreId){
          accumulator[theatreInfo?.theatreId] = theatreInfo;
        }
        return accumulator;
      },{})
    })
  }  
})

export const {setTheatresList} = theatresReducer.actions;
export default theatresReducer.reducer;

export const fetchShowTheatres:any = createAsyncThunk("theatres/fetchShowTheatres",async function(data, thunkApi){
  try{
    let res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/shows/fetch-show-theatres`,data)
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

export const fetchTheatres:any = createAsyncThunk("theatres/fetchTheatres",async function(data, thunkApi){
  try{
    let res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/theatres/fetch-theatres`,data)
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
      message:"Error occurred while fetching theatres list"
    })
  }
})

export const addTheatre:any = createAsyncThunk("theatres/addTheatre",async function(data, thunkApi){
  try{
    let res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/theatres/add-theatre`,data)
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
      message:"Error occurred while adding movie to DB"
    })
  }
})