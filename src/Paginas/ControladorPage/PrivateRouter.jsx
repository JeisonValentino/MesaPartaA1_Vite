import { Navigate, Outlet, useNavigate } from "react-router-dom";
import jwt_decode from 'jwt-decode'
import { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { Service } from "../Paginas_Login_panel/Paginas/pagesLogin/Service";
import setAuchToken from "../Paginas_Login_panel/ConfigurationAuthenticacion/setAuchToken";
import store from "../Paginas_Login_panel/ConfigurationAuthenticacion/store";
import { setCurrentUser } from "../Paginas_Login_panel/Paginas/FormularioLogin";
import { logout } from "./authContext";
import { updateTimeRemaining } from "../Paginas_Login_panel/ConfigurationAuthenticacion/types";
export default function PrivateRouter(){
  const dispatch = useDispatch();
  const navigate = useNavigate();
    const [validaIp , setValidaIp]=useState()
    const loggedin=useSelector(state =>state.auth.loggedIn);
    const [timeRemaining, setTimeRemaining] = useState(0);
    
const  valida=async () =>{
    let data = await Service.ping() .then(res=>{return res })
    .catch(e=>console.log(e))
    setValidaIp(true)

}

useEffect(() => {
  const checkAndRedirect = () => {
    if (localStorage.jwtToken) {
      setAuchToken(localStorage.jwtToken);
      const decoded = jwt_decode(localStorage.jwtToken);

      dispatch(
        setCurrentUser({
          user: decoded,
          loggedIn: true,
        })
      );

      const currentTime = Math.floor(Date.now() / 1000);
      const remainingTime = decoded.exp - currentTime;
      if (remainingTime !== timeRemaining) {
        setTimeRemaining(remainingTime);
        if (remainingTime <= 50) {
          console.log("Token is about to expire, updating time remaining",remainingTime);
      
          dispatch(updateTimeRemaining(remainingTime));

        }
      }

      if (remainingTime <= 0) {
        console.log("Token has expired, logging out");
        dispatch(logout());
        setTimeout(() => {
          navigate('/Login');
        }, 2000);
      }
    }
  };

  const intervalId = setInterval(checkAndRedirect, 1000); // Verificar cada segundo si el token ha expirado

  return () => clearInterval(intervalId); // Limpiar el intervalo cuando el componente se desmonta
}, [dispatch, navigate]);



useEffect(()=>{

    valida()
    
    },[])

if(!validaIp){
    return <p>El servidor de servicios APACHE se cayo por favor contactar con soporte de sistema +926695038</p>
}


if(!loggedin){

  return <Navigate to={"/salir"} />
}



    

return(

    <>


        <Outlet/>
    </>
)
}