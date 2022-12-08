import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import FormularioLogin from "../Paginas_Login_panel/Paginas/FormularioLogin";
import { checkToken2, reloadToken } from "./authContext";


export default function LoginControlador () {
   checkToken2()
    const loggedin=useSelector(state =>state.auth.loggedIn);





if(loggedin){

    return <Navigate to={"/Sistema-Administrador"} />
  }
  
  
  
      
  
  return(
  
      <>
  
  <Outlet/>
      </>
  )
}