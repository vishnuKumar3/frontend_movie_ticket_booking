import { useRoutes } from "react-router-dom";
import Home from "../pages/Home.tsx";
import Login from "../components/Login.tsx"
import Signup from "../components/Signup.tsx"
import MovieCard from "../components/MovieCard.tsx";
import MainMenu from "../pages/MainMenu.tsx";
import Movie from "../pages/Movie.tsx";

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