import React,{ Fragment, useEffect, useRef, useState } from "react"
import  Cabecera  from "./../Complemets/Cabecera"
import { Suelo } from "./../Complemets/Suelo"
import './PaginaEntrada.css'
import niño_estudiando from "./Imagenes/niño estudiando.png"

import Loading from "../../ControladorPage/Loading"
import comp_matricula1 from "./componentes_personalizados_carrusel/Matricula1/comp_matricula1"
import comp_matricula2 from "./componentes_personalizados_carrusel/Matricula2/comp_matricula2"
import comp_matricula3 from "./componentes_personalizados_carrusel/Matricula3/comp_matricula3"
import Carrusel_imagen from "../Complemets/Carrusel_imagenes/Carrusel_imagen"
import { Button } from "react-bootstrap"
const componentes = [comp_matricula1,comp_matricula2,comp_matricula3];

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
<div className="proceso_Matricula">

<div className="contenido_contenedores">
    <div className="contenedor1">
    <h3>¿Quieres saber sobre nuestro proceso de matricula 2024 ? </h3>
    <Button variant="light">REGISTRATE AQUI</Button>{' '}
    </div>
    <div className="contenedor2">
       <div className="contenedos2_imagenes"> <img src={niño_estudiando}></img></div>
    </div>
</div>
</div>
 
</div> 




</>
}

<Suelo/>


    </Fragment>
)
}


export default PaginaEntrada