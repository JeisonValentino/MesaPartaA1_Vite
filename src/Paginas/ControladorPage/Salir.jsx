import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import "./salir.css"
import Alert from 'react-bootstrap/Alert';

export default function Salir(){


const [contador ,setContador]=useState(0);
const redirect = useNavigate()
useEffect(()=>{


    
    setTimeout(()=>{
        setContador(contador+1)

    },1000)

    if(contador===3){
        redirect("/Login")
    }

},[contador])


return (
    <div style={{width:"100%",height:"100%"}}>
    <Alert key={'info'} variant={'info'} >
        <p style={{color:"black",textAlign:"center",textTransform:"uppercase"}}>Saliendo en  {contador}  de 3 segundos </p>
        </Alert>
<Loading />

  
    
</div>

)
}