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
import BookingHistory from "../pages/BookingHistory.tsx";
import UpcomingMovies from "../pages/UpcomingMovies.tsx";
import AdminPanel from "../pages/AdminPanel.tsx";
import AuthGuard from "../components/AuthGuard.tsx";

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
                    path:"/upcoming-movies",
                    element:<UpcomingMovies/>
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
                    element:(
                    <AuthGuard>
                        <MovieManagement/>
                    </AuthGuard>)
                },
                {
                    path:"/theatre-management",
                    element:(
                    <AuthGuard>
                        <TheatreManagement/>
                    </AuthGuard>)
                },
                {
                    path:"/show-management",
                    element:(
                        <AuthGuard>
                            <ShowManagement/>
                        </AuthGuard>)
                },
                {
                    path:"/booking-history",
                    element:<BookingHistory/>
                },
                {
                    path:"/admin-panel",
                    element:(
                        <AuthGuard>
                            <AdminPanel/>
                        </AuthGuard>)
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