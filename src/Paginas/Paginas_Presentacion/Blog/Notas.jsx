import { Fragment } from "react";
import "./notas.css";
import colegio from "./../Imagenes/AlumnosClase.jpeg";
import { Link } from "react-router-dom";
const Notas = ({imagen,titulo,contenido}) => {
  return (
    <Fragment>
      <div className="contenedor_nota">
        <div className="cabecera">
          <img  src={imagen?imagen:colegio} alt="" />
        </div>
        <div className="cuerpo">
          <label htmlFor="" className="titulo">
           {titulo}
          </label>
          <p className="resumen">
           {contenido}
          </p>
          <div  className="redirigir">
          <Link to={`/Blog/${titulo}`}>  Ver mas...</Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default Notas;
