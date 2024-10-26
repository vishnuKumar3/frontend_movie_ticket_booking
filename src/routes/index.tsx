import { useRoutes } from "react-router-dom";
import Home from "../pages/Home.tsx";
import Login from "../components/Login.tsx"
import Signup from "../components/Signup.tsx"
import MovieCard from "../components/MovieCard.tsx";
import MainMenu from "../pages/MainMenu.tsx";
import Movie from "../pages/Movie.tsx";
import SeatLayout from "../pages/SeatLayout.tsx";
import MovieManagement from "../pages/MovieManagement.tsx"

export default function Routes(){
    return useRoutes([
        {
            path:"/",
            element:<MainMenu/>,
            children:[
                {   
                    path:"/",
                    element:<Home/>
                },
                {
                    path:"/movie/:movieId",
                    element:<Movie/>
                },
                {
                    path:"/seat-layout",
                    element:<SeatLayout/>
                },
                {
                    path:"/movie-management",
                    element:<MovieManagement/>
                }
            ]
        },
        {
            path:"/login",
            element:<Login/>
        },
        {
            path:"/signup",
            element:<Signup/>
        }
    ])
}