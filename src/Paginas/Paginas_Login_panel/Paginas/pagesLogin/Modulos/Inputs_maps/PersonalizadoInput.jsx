import { InputText } from "primereact/inputtext";
import { Fragment } from "react";
import InputSelect from "../InputSelect";
import { InputTextarea } from "primereact/inputtextarea";

import "./estilos_content_inputs.css";
import { classNames } from "primereact/utils";
import FileInput from "../InputsFiles/FileInput";
const PersonalizadoInput = ({
  listaFormulario,
  onInputChange,
  Entity,
  submitted,
  EliminarFile,
  invoiceUploadHandler,
}) => {
  function validarCorreo(valor) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validar la entrada con la expresión regular
    if (emailRegex.test(valor)) {
      return true;
    } else {
      return false;
    }
  }

  const tipoInputText = (dat) => {
    if (dat === "institucional_regular") {
      return "institucional_regular";
    }
  };

  const validarNumero = (event, dat) => {
    if (dat === "numero") {
      console.log(event.key);
      if (!/[0-9]/.test(event.key) && event.key !== "Backspace") {
        event.preventDefault();
      }
    }
  };

  return (
    <Fragment key="formFragment">
      {listaFormulario?.map((data, id) => {
        return (
          <Fragment key={id}>
            {data.type === "text" ? (
              <div key={id} style={{ marginTop: "1rem" }}>
                {data.titulo !== "" ? (
                  <label key={`label-${id}`}>{data.titulo}</label>
                ) : (
                  ""
                )}
                <InputText
                  key={`inputText-${id}`}
                  name={`${data.identidad}`}
                  value={Entity?.[data?.identidad]}
                  onChange={(e) => onInputChange(e, Entity)}
                  required
                  placeholder={data.placehold}
                  autoFocus
                  maxLength={data.data === "numero" ? data.max : undefined}
                  className={classNames({
                    "p-invalid":
                      (submitted && (Entity?.[data?.identidad] === "" || !Entity?.[data?.identidad]) ) ||
                      (submitted &&
                        data.data === "correo" &&
                        !validarCorreo(Entity?.[data.identidad]))
                        ||
                      (submitted &&
                        data.data === "numero" &&
                        Entity?.[data?.identidad].length<data.max)
                        ,
                    [tipoInputText(data.estilo)]: true,
                  })}
                  onKeyDown={(event) => validarNumero(event, data.data)}
                />
                {submitted && Entity?.[data?.identidad] == "" && (
                  <small
                    style={{ display: "block" }}
                    key={`small-${id}`}
                    className="p-error"
                  >
                    {data.advertencia}
                  </small>
                )}

                {data.data === "correo" &&
                  submitted &&
                  !validarCorreo(Entity?.[data.identidad]) && (
                    <small
                      style={{ display: "block" }}
                      key={`correoError-${id}`}
                      className="p-error"
                    >
                      El correo es incorrecto
                    </small>
                  )}

                  {submitted &&
                        data.data === "numero" &&
                        Entity?.[data?.identidad].length<data.max &&
                  !validarCorreo(Entity?.[data.identidad]) && (
                    <small
                      style={{ display: "block" }}
                      key={`CantidadError-${id}`}
                      className="p-error"
                    >
                      Se requieren {data.max} digitos
                    </small>
                  )}



              </div>
            ) : (
              <>
                {" "}
                {data.type === "select" ? (
                  <div key={id} style={{ marginTop: "1rem" }}>
                    <label key={`labelSelect-${id}`}>{data.titulo}</label>
                    <InputSelect
                      key={`inputSelect-${id}`}
                      id={`inputSelect-${id}`}
                      data={data?.data}
                      object={data?.object}
                      value={Entity?.[data?.identidad]}
                      name={`${data?.identidad}`}
                      placeholder={data.placehold}
                      onChange={(e) => onInputChange(e, Entity)}
                      className={submitted && Entity?.[data?.identidad] == ""}
                    />
                    {submitted && Entity?.[data?.identidad] === "" && (
                      <small
                        style={{ display: "block" }}
                        key={`selectError-${id}`}
                        className="p-error"
                      >
                        {data.advertencia}
                      </small>
                    )}
                  </div>
                ) : (
                  <>
                    {data.type === "text_area" ? (
                      <div key={id} style={{ marginTop: "1rem" }}>
                        {data.titulo !== "" ? (
                          <label key={`labelFile-${id}`}>{data.titulo}</label>
                        ) : (
                          ""
                        )}
                        <InputTextarea
                          key={`inputTextArea-${id}`}
                          name={`${data.identidad}`}
                          value={Entity?.[data?.identidad]}
                          onChange={(e) => onInputChange(e)}
                          required
                          placeholder={data.placehold}
                          autoFocus
                          className={classNames({
                            "p-invalid":
                              submitted && Entity?.[data?.identidad] === "",
                            [tipoInputText(data.estilo)]: true,
                          })}
                          onKeyDown={(event) => validarNumero(event, data.data)}
                          rows={5}
                          cols={30}
                        />
                        {submitted && Entity?.[data?.identidad] === "" && (
                          <small
                            style={{ display: "block" }}
                            key={`textAreaError-${id}`}
                            className="p-error"
                          >
                            {data.advertencia}
                          </small>
                        )}
                      </div>
                    ) : (
                      <>
                        {data.type === "file" ? (
                          <>
                            <div key={id} style={{ marginTop: "1rem" }}>
                              {data.titulo !== "" ? (
                                <label key={`labelTextArea-${id}`}>
                                  {data.titulo}
                                </label>
                              ) : (
                                ""
                              )}
                              <FileInput
                                id={`inputFile-${id}`}
                                value={Entity?.[data?.identidad]}
                                name={`${data?.identidad}`}
                                EliminarFile={(e) => EliminarFile(e)}
                                invoiceUploadHandler={(e) =>
                                  invoiceUploadHandler(e)
                                }
                                className={submitted}
                                advertencia={data.advertenciaTamañoArchivo}
                                cantidadMax={data.advertenciaCantidad}
                              />
                              {submitted &&
                                Entity[data.identidad].length == 0 && (
                                  <small
                                    style={{ display: "block" }}
                                    key={`FileErrorVacio-${id}`}
                                    className="p-error"
                                  >
                                    {data.advertenciaVacia}
                                  </small>
                                )}

                              {Entity[data.identidad].length >=
                                data.advertenciaCantidad && (
                                <small
                                  style={{ display: "block" }}
                                  key={`FileErrorCantidad-${id}`}
                                  className="p-error"
                                >
                                  Solo puede subir {data.advertenciaCantidad}{" "}
                                  archivos como cantidad maxima
                                </small>
                              )}
                            </div>
                          </>
                        ) : (
                          <div key={`divPlaceholder-${id}`}></div>
                        )}
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </Fragment>
        );
      })}
    </Fragment>
  );
};

export default PersonalizadoInput;
