import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { checkToken, logout } from "./authContext";
import { useEffect } from "react";
import {useSelector} from 'react-redux'
export default function PrivateRouter(){


    

    const loggedin=useSelector(state =>state.auth.loggedIn);
    

if(!loggedin){

  return <Navigate to={"/Login"} />
}


    

return(

    <>


        <Outlet/>
    </>
)
}