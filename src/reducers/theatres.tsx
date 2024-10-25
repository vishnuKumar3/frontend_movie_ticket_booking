import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const theatresReducer = createSlice({
  name:"theatres",
  initialState:{
    theatresList:[]
  },
  reducers:{
    setTheatresList(state, action){
      state.theatresList = action.payload;
    }
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