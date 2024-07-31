import { Fragment } from "react";
import "./../Estilos_generales.css";
import niño_slider from "./profesora (1).png"
import "./estilos_matricula2.css"
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
export default function comp_matricula2 (){

  const navegacion = useNavigate();
    return(
        <Fragment>


          <div className="contenedor_border contenedor_border_matricula2 matricula2">
          <div className="borde-mitad2">
          <div className="contenido_boder2">
          <div className="imagen_border2">
            <p>EXCELENTE</p>
            <p>PLANA DE DOCENTES</p>
            <Button  onClick={()=>navegacion("/Admision/Solicitud")} variant="dark">MATRICULATE AQUI</Button>{' '}
          </div>
          
          </div>
          
          </div>


          <div className="borde-mitad1">  

          <div className="contenido_boder1">
          <div className="imagen_border1"><img src={niño_slider}></img></div>
          
          </div>
          </div>
              
            
          </div>
<div className="cuadrado matricula2">
  <div className="borde-mitad_matricula">

  </div>
</div>

        </Fragment>
    )
}