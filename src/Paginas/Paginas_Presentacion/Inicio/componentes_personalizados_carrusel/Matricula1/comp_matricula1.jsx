import { Fragment } from "react";
import "./../Estilos_generales.css";
import niño_slider from "./niño-slider (1).png"
import "./estilos_matricula1.css"
import { Button } from "react-bootstrap";
export default function comp_matricula1 (){
    return(
        <Fragment>


          <div className="contenedor_border contenedor_border_matricula1">
          <div class="borde-mitad2">
          <div className="contenido_boder2">
          <div className="imagen_border2">
            <h2>MATRICULA</h2>
            <h2>2024</h2>
            <h3>LISTA DE ESPERA</h3>
            <Button variant="light">REGISTRATE AQUI</Button>{' '}
          </div>
          
          </div>
          
          </div>


          <div class="borde-mitad1">  

          <div className="contenido_boder1">
          <div className="imagen_border1"><img src={niño_slider}></img></div>
          
          </div>
          </div>
              
            
          </div>
<div class=" matricula1 cuadrado">
  <div class="borde-mitad_matricula">

  </div>
</div>

        </Fragment>
    )
}