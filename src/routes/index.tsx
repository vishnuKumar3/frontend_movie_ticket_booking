import { useRoutes } from "react-router-dom";
import Home from "../pages/Home.tsx";
import Login from "../components/Login.tsx"
import Signup from "../components/Signup.tsx"
import MovieCard from "../components/MovieCard.tsx";
import MainMenu from "../pages/MainMenu.tsx";
import Movie from "../pages/Movie.tsx";
import SeatLayout from "../pages/SeatLayout.tsx";
import MovieManagement from "../pages/MovieManagement.tsx"
import TheatreManagement from "../pages/TheatreManagement.tsx";
import ShowManagement from "../pages/ShowManagement.tsx";

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
                    path:"/seat-layout/:showId",
                    element:<SeatLayout/>
                },
                {
                    path:"/movie-management",
                    element:<MovieManagement/>
                },
                {
                    path:"/theatre-management",
                    element:<TheatreManagement/>
                },
                {
                    path:"/show-management",
                    element:<ShowManagement/>
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