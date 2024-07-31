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


// Función para mover el scroll a una posición específica


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
                
                <Style_link to="/Nosotros" className="linkCabecera">
                Nosotros
              </Style_link>
                </li>
                <li>
                <Style_link to="/Servicios" className="linkCabecera">
                Servicios
              </Style_link>
                </li>
                <li>
                <Style_link to="/Blog" className="linkCabecera">
                Blog
              </Style_link>
                </li>
              </ul>
            </div>
            <div className="contenedores">
              <h3>Soporte</h3>
              <ul>
                <li >
                <Style_link  to="/Libro-Reclamaciones" className="linkCabecera">
                Libro de reclamaciones
              </Style_link>
                </li>
                <li>
                <Style_link to="/Preguntas-Frecuentes" className="linkCabecera">
                Preguntas frecuentes
              </Style_link>
                </li>
                <li>
                <Style_link to="/Politicas-Privacidad" className="linkCabecera">
                Politicas de privacidad
              </Style_link>
                </li>
              </ul>
            </div>
            <div className="contenedores">
              <h3>Contacto</h3>
              <ul>
                <li>
                <a
                      className="linkCabecera"
                      style={{ textDecoration: "none" }}
                      target="_blank"
                      href="https://api.whatsapp.com/send/?phone=51905444655"
                    >
                      905 444 655
                    </a>
                </li>
                <li>
                <a
                      className="linkCabecera"
                      style={{ textDecoration: "none" }}
                      target="_blank"
                      href="mailto:admision@circuloa1school.org"
                    >
                      admision@circuloa1school.org
                    </a>
                </li>
                <li>
                <a
                      className="linkCabecera"
                      style={{ textDecoration: "none" }}
                      target="_blank"
                      href="https://www.facebook.com/CirculoCantoRey"
                    >
                      Facebook
                    </a>
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
