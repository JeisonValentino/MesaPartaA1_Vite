import { Navigate, Outlet, useNavigate } from "react-router-dom";
import {  checkToken2 } from "./authContext";
import { useEffect, useState } from "react";
import {useSelector} from 'react-redux'
import { Service } from "../Paginas_Login_panel/Paginas/pagesLogin/Service";
export default function PrivateRouter(){

    const [validaIp , setValidaIp]=useState()
    
    checkToken2()
    const loggedin=useSelector(state =>state.auth.loggedIn);
  
console.log(loggedin )

const  valida=async () =>{
    let data = await Service.ping() .then(res=>{return res })
    .catch(e=>console.log(e))
    setValidaIp(data)

}

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