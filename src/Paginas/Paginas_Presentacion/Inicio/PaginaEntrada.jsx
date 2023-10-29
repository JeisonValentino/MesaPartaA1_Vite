import React,{ Fragment, useEffect, useRef, useState } from "react"
import  Cabecera  from "./../Complemets/Cabecera"
import { Suelo } from "./../Complemets/Suelo"
import './PaginaEntrada.css'


import Loading from "../../ControladorPage/Loading"
import {componente_matricula_1,componente_matricula_2,componente_matricula_3} from "./componentes_personalizados_carrusel/componentes_matricula"
import Carrusel_imagen from "../Complemets/Carrusel_imagenes/Carrusel_imagen"
const componentes = [componente_matricula_1,componente_matricula_2,componente_matricula_3];

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
<Carrusel_imagen componentes={componentes} />
 
</div> 




</>
}

<Suelo/>


    </Fragment>
)
}


export default PaginaEntrada