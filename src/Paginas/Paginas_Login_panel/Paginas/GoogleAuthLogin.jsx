import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { validarCorreo } from "./pagesLogin/Modulos/funcionesCompartidas";
import logo_colegio from "./logo colegio.jpg";
import { Link, useOutletContext } from "react-router-dom";
import { Fragment, useContext } from "react";
import { AuthContext } from "./FormularioLogin";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const GoogleAuthLogin = () => {
 
    const { ingresar, setIngresar,login ,ingresarStado,sumitTedLogin ,sumitLogin } = useContext(AuthContext);
const{correo, contraseña} =ingresar;
    return (
        <Fragment>
        <div className="titulo">
          <label htmlFor="">Bienvenido a la Intranet de CA1</label>
        </div>
        <div className="titulo2">
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignContent: "center",
              width: "80%",
              height: "100%",
              maxWidth: "9rem",
              minWidth: "8rem",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <img
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                src={logo_colegio}
                alt=""
              />
            </div>
          </div>
          <div className="container_titulo2">
            <label htmlFor="" className="subtitulo1">
              COLEGIO CIRCULO A1 SCHOOL
            </label>
            <label htmlFor="" className="subtitulo2">
              ASOCIACION PRIVADA EDUCATIVA
            </label>
          </div>
        </div>
        <div style={{ marginTop: "0", width: "80%", maxWidth: "40rem" }}>
          <label
            className="subTitulo form-label"
            style={{ width: "80%", color: "black", marginTop: "5%" }}
          >
            USUARIO
          </label>
          <InputText
            onChange={ingresarStado}
            name="correo"
            value={correo}
            required
            autoFocus
            style={{ width: "100%" }}
            className={classNames({
              "p-invalid": (sumitTedLogin && (correo === "" || !correo)) || (sumitTedLogin && !validarCorreo(correo)),
            })}
          />
          {sumitTedLogin && correo === "" && (
            <small style={{ display: "block" }} className="p-error">
              El correo no puede quedar vacío
            </small>
          )} 
          {sumitTedLogin && !validarCorreo(correo) && (
            <small style={{ display: "block" }} className="p-error">
              El formato del correo es incorrecto
            </small>
          )}
        </div>
        <div style={{ marginTop: "5%", width: "80%", maxWidth: "40rem" }}>
          <label className="subTitulo form-label" style={{ width: "80%", color: "rgb(0,0,0)" }}>
            CONTRASEÑA
          </label>
          <InputText
            type="password"
            style={{ width: "100%" }}
            onChange={ingresarStado}
            name="contraseña"
            className={classNames({
              "p-invalid": sumitTedLogin && (contraseña === "" || !contraseña),
            })}
            value={contraseña}
          />
          <Link to="/login/password">Olvide mi contraseña</Link>
          {sumitTedLogin && (contraseña === "" || !contraseña) && (
            <small style={{ display: "block" }} className="p-error">
              La contraseña no puede quedar vacía
            </small>
          )}
        </div>
        <div style={{ width: "80%", maxWidth: "40rem", paddingBottom: "3%" }}>
          <button
            className="style_institucional"
            type="submit"
            style={{ marginTop: "20px", fontSize: "1.5rem", width: "100%" }}
            onClick={() => sumitLogin()}
          >
            INGRESAR
          </button>
          <button style={{ marginTop: "20px", fontSize: "1.5rem", width: "100%" }} className="style_institucional" 
             onClick={()=>login()}> <FontAwesomeIcon icon={faGoogle}/> Logeate con google</button>

        </div>

        
        </Fragment>
    );
  };
  
  export default GoogleAuthLogin;