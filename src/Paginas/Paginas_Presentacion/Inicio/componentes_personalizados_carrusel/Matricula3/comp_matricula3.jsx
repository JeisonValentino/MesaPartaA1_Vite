import { Fragment } from "react";
import "./../Estilos_generales.css";
import edificio from "./colegio.jpg"
import "./estilos_matricula3.css"
import { Button } from "react-bootstrap";
export default function comp_matricula3 (){
    return(
        <Fragment>


          <div className="contenedor_border contenedor_border_matricula3 matricula3">

          <div class="borde-mitad1">  

<div className="contenido_boder1">
<div className="imagen_border1"><img src={edificio}></img></div>

</div>
</div>

          <div class="borde-mitad2">
          <div className="contenido_boder2">
          <div className="imagen_border2">
            <p>CONOCE</p>
            <p>NUESTRAS SEDES</p>
            <Button variant="dark">MATRICULATE AQUI</Button>{' '}
          </div>
          
          </div>
          
          </div>


      
              
            
          </div>
<div class="cuadrado matricula3">
  <div class="borde-mitad_matricula">

  </div>
</div>

        </Fragment>
    )
}