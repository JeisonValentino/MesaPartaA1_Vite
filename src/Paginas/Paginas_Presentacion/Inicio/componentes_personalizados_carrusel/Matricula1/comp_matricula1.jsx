import { Fragment } from "react";
import "./../Estilos_generales.css";
import niño_slider from "./niño-slider (1).png"
import "./estilos_matricula1.css"
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
export default function comp_matricula1 (){

  const navegacion = useNavigate();

    return(
        <Fragment>


          <div className="contenedor_border contenedor_border_matricula1">
          <div className="borde-mitad2">
          <div className="contenido_boder2">
          <div className="imagen_border2">
            <h2>MATRICULA</h2>
            <h2>2024</h2>
            <h3>LISTA DE ESPERA</h3>
            <Button style={{backgroundColor:"white"}} onClick={()=>navegacion("/Admision/Solicitud")} variant="light">REGISTRATE AQUI</Button>{' '}
          </div>
          
          </div>
          
          </div>


          <div className="borde-mitad1">  

          <div className="contenido_boder1">
          <div className="imagen_border1"><img src={niño_slider}></img></div>
          
          </div>
          </div>
              
            
          </div>
<div className=" matricula1 cuadrado">
  <div className="borde-mitad_matricula">

  </div>
</div>

        </Fragment>
    )
}