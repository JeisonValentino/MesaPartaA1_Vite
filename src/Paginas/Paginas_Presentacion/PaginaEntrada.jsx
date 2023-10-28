import React,{ Fragment, useEffect, useRef, useState } from "react"
import  Cabecera  from "./Complemets/Cabecera"
import { Suelo } from "./Complemets/Suelo"
import './PaginaEntrada.css'


import Loading from "../ControladorPage/Loading"
const PaginaEntrada = ()=>{
const [loading ,setLoading]=useState(true);


const cambiarEstado = ()=>{
    setLoading(false)
}

useEffect(() => {
    cambiarEstado(); // Llamas a cambiarEstado cuando el componente se renderiza
  }, []);


return(

    <Fragment>





 <Cabecera   />

{loading ? <Loading/>: 
<>
<div className="main">

 
</div> 




</>
}

<Suelo/>


    </Fragment>
)
}


export default PaginaEntrada