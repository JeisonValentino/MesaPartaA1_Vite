import {
  faFilePdf,
  faFileWord,
  faUnlink,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Buffer } from "buffer";
import { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { Toast } from 'primereact/toast';
import { useDispatch, useSelector } from "react-redux";
import { changeToast } from "../../../../ConfigurationAuthenticacion/reducer/toastReducer";

const FileInput = (props) => {
  const {
    value,
    name,
    className,
    advertencia,
    EliminarFile,
    invoiceUploadHandler,id,cantidadMax
  } = props;

  const onchangeImage = (dat) => {
    var reader = new FileReader();

    if (dat !== null) {
      const byteCharacters = Buffer.from(dat, "base64").toString("binary");
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);

      const blob = new Blob([byteArray], { type: "image/jpeg" });

      reader.addEventListener("load", function () {
        return reader.result;
      });

      reader.readAsDataURL(blob);

      return URL.createObjectURL(blob);
    } else {
      return "";
    }
  };
const[loading , setLoading]=useState(true)
  useEffect(()=>{
    setLoading(false)

  },[value])

  const dispatch = useDispatch();
const aplicar = (message)=>{
  dispatch(changeToast({ severity: 'warn', summary: 'Advertencia', detail: message, life: 3000, onclick:true }));
}
  

  return (
    <div className="row" style={{ padding: "2%" }}>
      <div className="card" style={{ padding: "2%", maxHeight: "500px" }}>
        <label htmlFor="file-upload" className={`custom-file-upload ${Array.from(value).length >= cantidadMax?"failed":""}`}>
          <i className="fa fa-cloud-upload"></i> Subir Archivos
        </label>
        <input
          id="file-upload"
          type="file"
          disabled={Array.from(value).length >= cantidadMax}
          onChange={(e) => {

            const { files } = e.target;
    if (files && files.length > 0) {
      const file = files[0];
      const maxSizeBytes = advertencia * 1024 * 1024; // 10MB en bytes

      if (file.size > maxSizeBytes) {
        console.log("error")
        aplicar(`El archivo excede el tamaño máximo permitido (${advertencia}MB). No se guardará.`)

        return;
      }

            invoiceUploadHandler({ data: e, name ,id})
    }
          }}
        />
     {loading?(<>... Cargando</>):(   <div  className="fotosDiv">
          {Array.from(value).map((e, i) => {
            return (
              <div className="hijosFotos" key={i}>
                <div className="hijosFotosNumeracion" >
                  {i + 1}
                </div>
                <div>
                  <p className="hijosFotosName">{e.name}</p>
                </div>
                <div className="hijosFotosType">
                  <p>{e.type}</p>
                </div>
                <div className="hijosFotosData">
                  {e.type === "image/png" || e.type === "image/jpeg" ? (
                    <img
                      style={{ width: "100%" }}
                      src={onchangeImage(e.data)}
                    />
                  ) : (
                    <>
                      {e.type === "application/pdf" ? (
                        <FontAwesomeIcon
                          style={{ height: "100%" }}
                          icon={faFilePdf}
                        />
                      ) : (
                        <>
                          {e.type === "application/x-zip-compressed" ? (
                            <FontAwesomeIcon
                              style={{ height: "100%" }}
                              icon={faFileZipper}
                            />
                          ) : (
                            <>
                              {e.type ===
                              "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ? (
                                <FontAwesomeIcon
                                  style={{ height: "100%" }}
                                  icon={faFileWord}
                                />
                              ) : (
                                <>
                                  <FontAwesomeIcon
                                    style={{ height: "100%" }}
                                    icon={faUnlink}
                                  />
                                </>
                              )}
                            </>
                          )}
                        </>
                      )}
                    </>
                  )}
                </div>

                <div>
                  <Button onClick={() => EliminarFile({id: e.id, name })} />
                </div>
              </div>
            );
          })}
        </div>)}
      </div>
    </div>
  );
};

export default FileInput;
