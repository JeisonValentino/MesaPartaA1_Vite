import { Navigate, Outlet } from 'react-router-dom';
import {checkToken} from './authContext';
import {useSelector} from 'react-redux'
export default function PublicRoute(){


    


return(
<>
<Outlet/>

</>

)
}