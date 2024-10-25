import { createSlice } from "@reduxjs/toolkit";

const userReducer = createSlice({
    name:"user",
    initialState:{
        userData:{}
    },
    reducers:{
        setUser(state, action){
            state.userData = action.payload;
        }
    }
})


export default userReducer.reducer;
export const {setUser} = userReducer.actions