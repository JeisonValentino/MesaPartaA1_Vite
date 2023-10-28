import { Fragment } from "react";
import escudo from "./../Imagenes/escudo.png";
import "./footer.css";
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Style_link = styled(Link)`

color: rgb(255,255,255);
    font-weight: 200;
    font-size: 16px;
    transition:all 0.4s linear ;
    
    text-transform: uppercase;
    font-family: 'Roboto', sans-serif;
 text-decoration: none;
 
    &:hover{
    color: blue;
}`


export const Suelo = () => {
  return (
    <Fragment>
      <div className="footer">
        <div className="contenido">
          <div className="imagen_footer">
            <img src={escudo}></img>
          </div>
          <div className="links_footer">
            <div className="contenedores">
              <h3>Informacion</h3>
              <ul>
                <li>
                
                <Style_link to="/" className="linkCabecera">
                Nosotros
              </Style_link>
                </li>
                <li>
                <Style_link to="/" className="linkCabecera">
                Servicios
              </Style_link>
                </li>
                <li>
                <Style_link to="/" className="linkCabecera">
                Blog
              </Style_link>
                </li>
              </ul>
            </div>
            <div className="contenedores">
              <h3>Soporte</h3>
              <ul>
                <li>
                <Style_link to="/" className="linkCabecera">
                Libro de reclamaciones
              </Style_link>
                </li>
                <li>
                <Style_link to="/" className="linkCabecera">
                Preguntas frecuentes
              </Style_link>
                </li>
                <li>
                <Style_link to="/" className="linkCabecera">
                Politicas de privacidad
              </Style_link>
                </li>
              </ul>
            </div>
            <div className="contenedores">
              <h3>Contacto</h3>
              <ul>
                <li>
                <Style_link to="/" className="linkCabecera">
                993 180 314
              </Style_link>
                </li>
                <li>
                <Style_link to="/" className="linkCabecera">
                admision@circuloa1school.org
              </Style_link>
                </li>
                <li>
                <Style_link to="/" className="linkCabecera">
                Facebook
              </Style_link> 
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="Copyritght">
          Copyritght @ 2023 Todos los derechos reservados
        </div>
      </div>
    </Fragment>
  );
};
