import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { checkToken } from "./authContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import FormularioLogin from "../Paginas_Login_panel/Paginas/FormularioLogin";


export default function LoginControlador () {
   const useDispash = useDispatch(); 
   
   
   useDispash(checkToken());
    const loggedin=useSelector(state =>state.auth.loggedIn);
    const clientId = import.meta.env.VITE_ID_GOOGLE_NOTE;





if(loggedin){

    return <Navigate to={"/Sistema-Administrador"} />
  }
  
  
  
      
  
  return(
  
      <>
  <GoogleOAuthProvider clientId={clientId}>
  <FormularioLogin>
  <Outlet/>
  </FormularioLogin>
  </GoogleOAuthProvider>
  
      </>
  )
}