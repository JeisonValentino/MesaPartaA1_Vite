import axios from "axios";
import { InputText } from "primereact/inputtext";
import { Fragment, useContext, useEffect, useState } from "react";
import { AuthContext } from "./FormularioLogin";
import { classNames } from "primereact/utils";
import { validarCorreo } from "./pagesLogin/Modulos/funcionesCompartidas";
import { Navigate, useNavigate } from "react-router-dom";

const FormularioPassword = () => {
  const {
    ingresar,
    activarMensaje,
    ingresarStado,
    sumitTedLogin,
    sumitEmail,
    setActivarMensaje,
  } = useContext(AuthContext);
  const { dni } = ingresar;
  const navigate = useNavigate();
  useEffect(() => {
    if (activarMensaje) {
      setTimeout(() => {
        navigate("/Login");
        setActivarMensaje(false);
      }, 2000);
    }
  }, [activarMensaje]);

  return (
    <Fragment>
      <h2>Recuperar Contraseña</h2>
      <div style={{ marginTop: "0", width: "80%", maxWidth: "40rem" }}>
        {activarMensaje ? (
          <div style={{ textAlign: "center" }}>
            se envio el correo electronico
          </div>
        ) : (
          <Fragment>
            <label
              className="subTitulo form-label"
              style={{ width: "80%", color: "black", marginTop: "5%" }}
            >
              Documento de identidad
            </label>
            <InputText
              onChange={ingresarStado}
              name="dni"
              value={dni}
              required
              autoFocus
              style={{ width: "100%" }}
              className={classNames({
                "p-invalid":
                  (sumitTedLogin && (dni === "" || !dni)) ||
                  (sumitTedLogin && dni.length < 8),
              })}
            />
            {sumitTedLogin && dni === "" && (
              <small style={{ display: "block" }} className="p-error">
                El documento de identidad no puede estar vacio
              </small>
            )}
            {sumitTedLogin && dni.length < 8 && (
              <small style={{ display: "block" }} className="p-error">
                El formato del dni es incorrecto
              </small>
            )}

            <div
              style={{ width: "100%", maxWidth: "40rem", paddingBottom: "3%" }}
            >
              <button
                className="style_institucional"
                type="submit"
                style={{ marginTop: "20px", fontSize: "1.5rem", width: "100%" }}
                onClick={() => sumitEmail()}
              >
                INGRESAR
              </button>
            </div>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};
export default FormularioPassword;
