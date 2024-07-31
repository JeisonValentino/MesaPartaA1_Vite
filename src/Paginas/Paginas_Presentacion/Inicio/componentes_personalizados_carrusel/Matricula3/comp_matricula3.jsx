import { Fragment } from "react";
import "./../Estilos_generales.css";
import edificio from "./colegio.jpg"
import "./estilos_matricula3.css"
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
export default function comp_matricula3 (){

  const navegacion = useNavigate();
    return(
        <Fragment>


          <div className="contenedor_border contenedor_border_matricula3 matricula3">

          <div className="borde-mitad1">  

<div className="contenido_boder1">
<div className="imagen_border1"><img src={edificio}></img></div>

</div>
</div>

          <div className="borde-mitad2">
          <div className="contenido_boder2">
          <div className="imagen_border2">
            <p>CONOCE</p>
            <p>NUESTRAS SEDES</p>
            <Button  onClick={()=>navegacion("/Admision/Solicitud")} variant="dark">MATRICULATE AQUI</Button>{' '}
          </div>
          
          </div>
          
          </div>


      
              
            
          </div>
<div className="cuadrado matricula3">
  <div className="borde-mitad_matricula">

  </div>
</div>

        </Fragment>
    )
}