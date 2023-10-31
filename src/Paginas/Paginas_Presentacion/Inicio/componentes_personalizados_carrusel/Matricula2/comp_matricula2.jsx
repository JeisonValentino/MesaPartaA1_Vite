import { Fragment } from "react";
import "./../Estilos_generales.css";
import niño_slider from "./profesora (1).png"
import "./estilos_matricula2.css"
import { Button } from "react-bootstrap";
export default function comp_matricula2 (){
    return(
        <Fragment>


          <div className="contenedor_border contenedor_border_matricula2 matricula2">
          <div class="borde-mitad2">
          <div className="contenido_boder2">
          <div className="imagen_border2">
            <p>EXCELENTE</p>
            <p>PLANA DE DOCENTES</p>
            <Button variant="dark">MATRICULATE AQUI</Button>{' '}
          </div>
          
          </div>
          
          </div>


          <div class="borde-mitad1">  

          <div className="contenido_boder1">
          <div className="imagen_border1"><img src={niño_slider}></img></div>
          
          </div>
          </div>
              
            
          </div>
<div class="cuadrado matricula2">
  <div class="borde-mitad_matricula">

  </div>
</div>

        </Fragment>
    )
}