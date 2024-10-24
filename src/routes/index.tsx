import { useRoutes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../components/Login.tsx"
import Signup from "../components/Signup.tsx"

export default function Routes(){
    return useRoutes([
        {
            path:"/",
            element:<Home/>
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