import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const languagesReducer = createSlice({
  name:"movies",
  initialState:{
    languagesList:[],
    languagesObject:{}
  },
  reducers:{

  },
  extraReducers:(builder)=>{
    builder.addCase(fetchLanguages.fulfilled,(state,action)=>{
      state.languagesList = action.payload?.languages || [];
      let languages = action?.payload?.languages || [];
      state.languagesObject = languages.reduce((accumulator:any, languageInfo:any)=>{
        if(languageInfo?.languageId){
          accumulator[languageInfo?.languageId] = languageInfo;
        }
        return accumulator;
      },{})
    })
  }
})

export default languagesReducer.reducer;

export const fetchLanguages:any = createAsyncThunk("movies/fetchLanguages",async function(data, thunkApi){
  try{
    let res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/languages/fetch-languages`,data)
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
      message:"Error occurred while fetching languages list"
    })
  }
})