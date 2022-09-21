import { Navigate, Outlet } from 'react-router-dom';
import {checkToken} from './authContext';
import {useSelector} from 'react-redux'
export default function PublicRoute(){

    const loggedin=useSelector(state =>state.auth.loggedIn);

    
if(loggedin){

    return <Navigate to={'/Sistema-Administrador'}/>
}

return(
<>
<Outlet/>

</>

)
}