import {
  faList,
  faShareNodes,
  faUser,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import imagenCole from "./../Imagenes/imagenCole.png";
import Logo from "../Imagenes/Logo.png";
import "./cabecerca.css";
import "./CabeceraSass.scss";
import { Style_link } from "./Style_link.jsx";
import { Toast } from "primereact/toast";
import { useDispatch, useSelector } from "react-redux";
import { changeToast } from "../../Paginas_Login_panel/ConfigurationAuthenticacion/reducer/toastReducer.js";
export default function Cabecera() {
  const [menuIcon, SetMenuIcon] = useState(true);

  const [bajarEvento, setBajarEvento] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", function () {
      var header = document.querySelector(".logo2");
      return header.classList.toggle("logo2Scroll", window.scrollY > 0);
    });
  }, []);

  const cambiarCampo = () => {
    return bajarEvento ? " bajar" : "";
  };

  const CambiarEstadoCabecera = () => {
    return menuIcon ? "" : "show";
  };
  const toast = useRef();

  const { onclick, severity, summary, detail, life } = useSelector(
    (state) => state.toast
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (onclick) {
      toast.current.show({ severity, summary, detail, life });
    }
  }, [onclick, severity, summary, detail, life]);

  useEffect(() => {
    if (onclick) {
      dispatch(changeToast({ clicked: false }));
    }
  }, [onclick]);

  return (
    <>
      <div className={"CampoRedes_Sociales " + cambiarCampo()}>
        <div
          className="Cerrar"
          onClick={() => {
            setBajarEvento(!bajarEvento);
          }}
        >
          <div className="">
            <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
          </div>
        </div>

        <div className="iconos_RedesSociales">
          <a
            style={{ textDecoration: "none" }}
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.facebook.com/circuloschoolingenieriaoficial"
          >
            <div className="Facebook">
              <FontAwesomeIcon icon={faFacebook}></FontAwesomeIcon>
            </div>{" "}
          </a>
          <a
            style={{ textDecoration: "none" }}
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.instagram.com/circuloa1school.oficial/"
          >
            <div className="Instagram">
              <FontAwesomeIcon icon={faInstagram}></FontAwesomeIcon>
            </div>{" "}
          </a>

          <a
            style={{ textDecoration: "none" }}
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.tiktok.com/@circuloa1school?is_from_webapp=1&sender_device=pc"
          >
            <div className="tiktok">
              <FontAwesomeIcon icon={faTiktok}></FontAwesomeIcon>
            </div>
          </a>
        </div>
      </div>
      <div className="header_Presentacion">
        <img className="logo2" src={imagenCole}></img>

        <nav className={"nav_Presentacion"}>
          <ul className={"nav__links"}>
            <li>
              <Style_link to="/" className="linkCabecera">
                <div>INICIO</div>
              </Style_link>
            </li>
            <li>
              <Style_link to="/Nosotros" className="linkCabecera">
                NOSOTROS
              </Style_link>
            </li>
            <li>
              <Style_link to="/Servicios" className="linkCabecera">
                SERVICIOS
              </Style_link>
            </li>
            <li>
              <Style_link to="/Admision" className="linkCabecera">
                Admision
              </Style_link>
            </li>

            <li>
              <Style_link to="/Blog" className="linkCabecera">
                BLOG
              </Style_link>
            </li>

            <li>
              <Style_link to="/Contacto" className="linkCabecera">
                CONTACTO
              </Style_link>
            </li>

            <li>
              <div
                className="iconfanpages"
                onClick={() => {
                  setBajarEvento(!bajarEvento);
                }}
              >
                <FontAwesomeIcon icon={faShareNodes} />{" "}
              </div>
            </li>

          </ul>

        </nav>
     
            <div>  <Style_link to="/Login/Identification" className="linkCabecera">
            <FontAwesomeIcon icon={faUser} />{" "}
              </Style_link></div>
            
      </div>

      <div className="header_Presentacion_recubridor"></div>

      <div className={"nav_PresentacionMovil " + CambiarEstadoCabecera()}>
        <span className="CerrarNav" onClick={() => SetMenuIcon(!menuIcon)}>
          <FontAwesomeIcon
            style={{ width: "50px", height: "50px" }}
            icon={faXmark}
          />
        </span>

        <nav className={"navCabeceraMovil"}>
          <img className="logo3" src={Logo}></img>
          <ul className={""}>
            <li>
              <Style_link to="/" className="linkCabecera">
                <div>PAGINA DE INICIO </div>
              </Style_link>
            </li>
            <li>
              <Style_link to="/Nosotros" className="linkCabecera">
                Nosotros{" "}
              </Style_link>
            </li>
            <li>
              <Style_link to="/Servicios" className="linkCabecera">
                Proceso de matricula{" "}
              </Style_link>
            </li>
            <li>
              <Style_link to="/Admision" className="linkCabecera">
                Admision{" "}
              </Style_link>
            </li>

            <li>
              <Style_link to="/Blog" className="linkCabecera">
                Blog{" "}
              </Style_link>
            </li>

            <li>
              <Style_link to="/Contacto" className="linkCabecera">
                Contacto{" "}
              </Style_link>
            </li>
            <li>
              <div
                className="iconfanpages"
                onClick={() => {
                  setBajarEvento(!bajarEvento);
                }}
              >
                <FontAwesomeIcon icon={faShareNodes} />{" "}
              </div>
            </li>
            <li>
  <Style_link to="/Login/Identification" className="linkCabecera">
            <FontAwesomeIcon icon={faUser} />{" "}
              </Style_link>
</li>
          </ul>
        </nav>
           
      </div>

      <div className="menu-Icon-Header">
        <span className="menu-Icon" onClick={() => SetMenuIcon(!menuIcon)}>
          <FontAwesomeIcon icon={faList} />
        </span>
      </div>

      <div className="menu-Icon-Header_cubridor"></div>
      <Toast ref={toast} />

    </>
  );
}
