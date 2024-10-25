import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import userReducer from "../reducers/user.tsx"
import movieReducer from "../reducers/movies.tsx";
import theatresReducer from "../reducers/theatres.tsx";

const persistConfig = {
    key: "root",
    version: 1,
    storage
}

const combinedReducers = combineReducers({
    user:userReducer,
    movies:movieReducer,
    theatres:theatresReducer
})

const persistedReducer = persistReducer(persistConfig, combinedReducers)

const store = configureStore({
    reducer: persistedReducer
})

export default store;