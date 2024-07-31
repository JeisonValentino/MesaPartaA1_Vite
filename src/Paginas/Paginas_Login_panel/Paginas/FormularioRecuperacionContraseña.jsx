import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { Fragment, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "./FormularioLogin";


const FormularioRecuperacionContraseña=()=>{
    const { token } = useParams();



    const {
       ingresar,
       ingresarStado,submitRecuperacion,enviarRecuperacion
      } = useContext(AuthContext);
      const {recuperacionContraseña} = ingresar;
    return(<Fragment>
         <h2>Recuperar Contraseña</h2>
         <div style={{ marginTop: "0", width: "80%", maxWidth: "40rem" }}>
         <label
              className="subTitulo form-label"
              style={{ width: "80%", color: "black", marginTop: "5%" }}
            >
              Contraseña
            </label>
            <InputText
              onChange={ingresarStado}
              name="recuperacionContraseña"
              value={recuperacionContraseña}
              required
              autoFocus
              style={{ width: "100%" }}
              className={classNames({
                "p-invalid":
                  (submitRecuperacion && (recuperacionContraseña === "" || !recuperacionContraseña)) 
              })}
            />
            {submitRecuperacion && recuperacionContraseña === "" && (
              <small style={{ display: "block" }} className="p-error">
               La contraseña no puede estar vacia 
              </small>
            )}

            <div
              style={{ width: "100%", maxWidth: "40rem", paddingBottom: "3%" }}
            >
              <button
                className="style_institucional"
                type="submit"
                style={{ marginTop: "20px", fontSize: "1.5rem", width: "100%" }}
                onClick={() => enviarRecuperacion(token)}
              >
                Recuperar contraseña
              </button>
            </div>
            </div>
    </Fragment>)
}
export default FormularioRecuperacionContraseña;