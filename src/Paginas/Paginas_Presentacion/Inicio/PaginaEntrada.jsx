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
import niña_agenda from "./Imagenes/niña-agenda 1.png"
import escolaridad_1 from "./Imagenes/2.png"

import academia from "./Imagenes/4.png"
import extracurriculares from "./Imagenes/6.png"

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


<blockquote style={{textAlign:"center",color:"#333F87",marginTop:"2rem",fontSize:"3rem"}}>
APRENDO Y EMPRENDO PARA UNA VIDA DE EXITOS   
</blockquote>



<hr />

<div className="container_cartas_servicios1">
    <div className="cartas_servicios">
    <img src={escolaridad_1} />
    <div className="descripcion">
   
      <h3>Escolaridad</h3><p>Educacion  inicial, primaria  y secundaria </p>
    </div><button type="button" class="btn btn-primary btn-lg">Saber Mas</button></div>
    <div className="cartas_servicios">
    <img src={academia} />
    <div className="descripcion">
      <h3>Academia </h3><p>Lograremos que nuestros estudiantes alcance con exito su etapa escolar y preuniversitaria , garantizando el ingreso seguro a las mas importantes universidades</p>
    </div><button type="button" class="btn btn-primary btn-lg">Saber Mas</button></div>
    <div className="cartas_servicios">
    <img src={extracurriculares} />
    <div className="descripcion">
      <h3>Cursos extracurriculares y Talleres </h3><p>Son programas adicionales de aprendizaje y desarrollo que permiten a los estudiantes explorar intereses específicos, adquirir habilidades nuevas y participar en actividades enriquecedoras fuera del plan de estudios principal</p>
    </div><button type="button" class="btn btn-primary btn-lg">Saber Mas</button></div>
</div>


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
 
<div className="propuestaEducativa">
    <div className="contenedor_propuesta1">
<div className="contenedor_imagen_propuesta">
<img src={niña_agenda}></img>
</div>

    </div>
    <div className="contenedor_propuesta2">
        <h3>La mejor propuesta educativa</h3>
        <p>Somos una de las organizaciones educativas mas grandes del pais con 25 años de experiencias brindadndo una educacion de calidad</p>
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