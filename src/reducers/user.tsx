import { createSlice } from "@reduxjs/toolkit";

const userReducer = createSlice({
    name:"user",
    initialState:{
        userId:"10"
    },
    reducers:{
        setUserId(state, action){
            state.userId = action.payload
        }
    }
})


export default userReducer.reducer;
export const {setUserId} = userReducer.actions;