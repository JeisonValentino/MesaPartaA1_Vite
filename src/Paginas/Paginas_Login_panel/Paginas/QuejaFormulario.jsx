import React, { Fragment, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { RadioButton } from "primereact/radiobutton";
import { classNames } from "primereact/utils";
import { Dropdown } from "primereact/dropdown";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import { Dialog } from "primereact/dialog";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AutoComplete } from "primereact/autocomplete";
import {
  faMagnifyingGlass
} from "@fortawesome/free-solid-svg-icons";
import "./QuejaFormulario.css";
import { useEffect } from "react";
import { Service } from "./pagesLogin/Service";
import { BlobProvider, pdf, PDFDownloadLink } from "@react-pdf/renderer";
import PDF_Queja from "./QUEJAS_RECLAMOS/PDF/PDF_Queja";
import PDF_Certificado from "./QUEJAS_RECLAMOS/PDF/PDF_Certificado";
import PDF_Traslado from "./QUEJAS_RECLAMOS/PDF/PDF_Traslado";
import { useRef } from "react";
import { Toast } from "primereact/toast";
import { Buffer } from "buffer";
import PersonalizadoInput from "./pagesLogin/Modulos/Inputs_maps/PersonalizadoInput";
import Loading from "../../ControladorPage/Loading";

export const QuejaFormulario = () => {
  const [displayPosition, setDisplayPosition] = useState(false);
  let fileDTO = [];
  const [quejaFormulario, setQuejaFormulario] = useState({
    id: "",
    sede: "",
    contacto: "",
    numeroDocumento: "",
    tipoDni: "",
    correoPersonal: "",
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    domicilio: "",
    Apoderado: "",
    correoCorporativo: "",
    FormaContacto: "",
    tipoBienContratado: "",
    clasificacion: "",
    asunto: "",
    tipoReclamo: "QUEJA",
    detalle: "",
    pedido: "",
    nombreEstudiante: "",
    apellidoMaternoEstudiante: "",
    apellidoPaternoEstudiante: "",
    numeroDocumentoEstudiante: "",
    tipoDocumentoEstudiante: "",
    tipoMatricula: "",
    telefono: "",
    montoReclamado: "",
    DescripcionProducto: "",
    file: fileDTO,
    filePDF: { name: "", type: "", data: "" },
  });
  const [extendible, setExtendible] = useState({
    extendible1: "",
    extendible2: "",
    extendible3: "",
  });
  const [enviarFormulario, setEnviarFormulario] = useState(false);
  const [displayBasic, setDisplayBasic] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);
  const onHide2 = () => {
    setDisplayBasic(false);
    window.location.reload(true);
    setQuejaFormulario["id"] = "";
  };

  let opcionesHoja = [
    { name: "SALAMANCA", code: 1 },
    { name: "SAN JUAN", code: 2 },
  ];

  let opcionesHoja2 = [
    { name: "QUEJA", code: 1 },
  ];

  let opcionesHoja3 = [
    { name: "COLEGIO VIRTUAL", code: 1 },
    { name: "COLEGIO SEMIPRESENCIAL", code: "2" },
    { name: "CIRCULO DE REFORZAMIENTO", code: 3 },
    { name: "ACADEMIA", code: 4 },
  ];

  let opcionesHoja4 = [
    { name: "SERVICIO", code: 1 },
    { name: "PRODUCTO", code: "2" },
  ];

  const onHide = () => {
    setDisplayPosition(false);
  };


  const listaFormulario = [
    
    
    {
      id: 1,
      titulo: "* Monto reclamado",
      estilo: "institucional_regular",
      placehold: "Escribe el monto reclamado",
      identidad: "montoReclamado",
      advertencia: "Este cuadro requerido",
      type: "text",
      data: "numero",
      max:8
    },{
      id: 2,
      titulo: "* Descripcion del bien contratado",
      estilo: "institucional_regular",
      placehold: "Escribe La descripcion de lo contrado",
      identidad: "DescripcionProducto",
      advertencia: "Este cuadro requerido",
      type: "text",
      data: "texto",
    },
    {
      id: 3,
      titulo: "Detalle lo acontesido",
      estilo: "institucional_regular",
      placehold: "",
      identidad: "detalle",
      advertencia: "Este cuadro requerido",
      type: "text_area",
      data: "texto",
    },
    {
      id: 4,
      titulo: "Detalle el pedido",
      estilo: "institucional_regular",
      placehold: "Escribe tu solicitud",
      identidad: "pedido",
      advertencia: "Este cuadro requerido",
      type: "text_area",
      data: "texto",
    },
    
    {
      id: 5,
      titulo: "* Archivos",
      estilo: "institucional_regular",
      identidad: "file",
      advertenciaVacia: "debe haber archivos presentados",
      advertenciaCantidad: 5,
      advertenciaTamañoArchivo: 10,
      type: "file",
    },
  ];




  const [dataget, setDataGet] = useState();
  const consultarApi = async () => {
    setLoadingPost(true);
    let estadoData = false;
    let data = await axios
      .get(
        "https://api.perudevs.com/api/v1/dni/simple?document=" +
          quejaFormulario.numeroDocumento +
          "&key=cGVydWRldnMucHJvZHVjdGlvbi5maXRjb2RlcnMuNjM1YTBmY2Y0OGI3MzQ0ZDZiYmE0NGY3"
      )
      .then((res) => {
        return res.data;
      })
      .catch((res) => {
        estadoData = true;
        toast.current.show({
          severity: "error",
          summary: "Mensaje de error",
          detail: "No se encontro a la persona ",
          life: 3000,
        });
      });

    if (!estadoData) {
      let quejaFormulario_ = { ...quejaFormulario };
      quejaFormulario_["nombre"] = data.resultado.nombres;
      quejaFormulario_["apellidoMaterno"] = data.resultado.apellido_materno;
      quejaFormulario_["apellidoPaterno"] = data.resultado.apellido_paterno;
      setQuejaFormulario(quejaFormulario_);
    }
    setLoadingPost(false);
  };

  const consultarApi2 = async () => {
    setLoadingPost(true);
    let estadoData = false;
    let data = await axios
      .get(
        "https://api.perudevs.com/api/v1/dni/simple?document=" +
          quejaFormulario.numeroDocumentoEstudiante +
          "&key=cGVydWRldnMucHJvZHVjdGlvbi5maXRjb2RlcnMuNjM1YTBmY2Y0OGI3MzQ0ZDZiYmE0NGY3"
      )
      .then((res) => {
        return res.data;
      })
      .catch((res) => {
        estadoData = true;
        toast.current.show({
          severity: "error",
          summary: "Mensaje de error",
          detail: "No se encontro a la persona ",
          life: 3000,
        });
      });

    if (!estadoData) {
      let quejaFormulario_ = { ...quejaFormulario };
      quejaFormulario_["nombreEstudiante"] = data.resultado.nombres;
      quejaFormulario_["apellidoMaternoEstudiante"] =
        data.resultado.apellido_materno;
      quejaFormulario_["apellidoPaternoEstudiante"] =
        data.resultado.apellido_paterno;
      setQuejaFormulario(quejaFormulario_);
    }
    setLoadingPost(false);
  };

  useEffect(() => {
    setLoading(true);
  }, [loading]);

  const [loadingpost, setLoadingPost] = useState(false);

  const enviarPost = async () => {
    let archivo = {
      name: "",
      type: "",
      data: "",
    };
    let base64String = "";
    var reader = new FileReader();
    let estado = false;
    let quejaFormulario_ = { ...quejaFormulario };
    let blobPdf = "";
    if (quejaFormulario.tipoReclamo === "QUEJA") {
      blobPdf = await pdf(
        <PDF_Queja quejaFormulario={quejaFormulario} />
      ).toBlob();
      var fileactual = new File([blobPdf], "hojadereclamo.pdf", {
        lastModified: new Date().getTime(),
        type: blobPdf.type,
      });
      archivo.name = "hojadereclamo.pdf";
    } else if (quejaFormulario.tipoReclamo === "CERTIFICADOS") {
      blobPdf = await pdf(
        <PDF_Certificado quejaFormulario={quejaFormulario} />
      ).toBlob();
      var fileactual = new File([blobPdf], "certificado.pdf", {
        lastModified: new Date().getTime(),
        type: blobPdf.type,
      });
      archivo.name = "certificado.pdf";
    } else if (quejaFormulario.tipoReclamo === "TRAMITE DE TRASLADO") {
      blobPdf = await pdf(
        <PDF_Traslado quejaFormulario={quejaFormulario} />
      ).toBlob();
      var fileactual = new File([blobPdf], "Tramite-traslado.pdf", {
        lastModified: new Date().getTime(),
        type: blobPdf.type,
      });
      archivo.name = "Tramite-traslado.pdf";
    }

    reader.readAsDataURL(fileactual);

    reader.onload = async function () {
      archivo.type = blobPdf.type;
      base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
      archivo.data = base64String;

      console.log("paso el onload");

      console.log(archivo);
      quejaFormulario_["filePDF"] = archivo;
      setQuejaFormulario(quejaFormulario_);
      setLoadingPost(true);
      console.log(quejaFormulario);
      const dataCODE = await Service.GuardarSolicitud(quejaFormulario_)
        .then((res) => {
          return res;
        })
        .catch((resf) => {
          estado = true;
          setLoadingPost(false);
          console.log(resf);
        });

      if (!estado) {
        setLoadingPost(false);
        setDisplayBasic(true);
        setEnviarFormulario(false);
        quejaFormulario.id = dataCODE.message;
        let quejaFormulario_1 = { ...quejaFormulario };
        quejaFormulario_1["id"] = dataCODE.message;
        setQuejaFormulario(quejaFormulario_1);
      }
    };
  };

  const onChangeFormulario = () => {
    setEnviarFormulario(true);

    if (
      quejaFormulario.nombre !== "" &&
      quejaFormulario.apellidoMaterno !== "" &&
      quejaFormulario.apellidoPaterno !== "" &&
      quejaFormulario.numeroDocumento !== "" &&
      quejaFormulario.correoPersonal !== "" &&
      quejaFormulario.tipoDni !== "" &&
      quejaFormulario.domicilio !== "" &&
      quejaFormulario.sede !== "" &&
      (file.length > 4) &&
      quejaFormulario.correoPersonal !== "" &&
      quejaFormulario.telefono !== "" &&
      quejaFormulario.Apoderado !== "" &&
      quejaFormulario.tipoReclamo !== "" 
    ) {
      console.log("paso el primer parametro");
      if (quejaFormulario.tipoReclamo === "QUEJA") {
        if (
          quejaFormulario.detalle !== "" &&
          quejaFormulario.pedido !== "" &&
          quejaFormulario.tipoBienContratado.name !== "" &&
          quejaFormulario.montoReclamado !== "" &&
          quejaFormulario.DescripcionProducto !== ""
        ) {
          enviarPost();
        }
      } else if (quejaFormulario.tipoReclamo === "CERTIFICADOS") {
        if (
          quejaFormulario.nombreEstudiante !== "" &&
          quejaFormulario.apellidoMaternoEstudiante !== "" &&
          quejaFormulario.apellidoPaternoEstudiante !== "" &&
          quejaFormulario.tipoDocumentoEstudiante !== "" &&
          quejaFormulario.numeroDocumentoEstudiante !== ""
        ) {
          console.log("esta enviando certificado");
          enviarPost();
        }
      } else if (quejaFormulario.tipoReclamo === "MATRICULA") {
        if (
          quejaFormulario.nombreEstudiante !== "" &&
          quejaFormulario.apellidoMaternoEstudiante !== "" &&
          quejaFormulario.apellidoPaternoEstudiante !== "" &&
          quejaFormulario.tipoDocumentoEstudiante !== "" &&
          quejaFormulario.numeroDocumentoEstudiante !== "" &&
          quejaFormulario.tipoMatricula !== ""
        ) {
          enviarPost();
        }
      } else if (quejaFormulario.tipoReclamo === "TRAMITE DE TRASLADO") {
        if (
          quejaFormulario.nombreEstudiante !== "" &&
          quejaFormulario.apellidoMaternoEstudiante !== "" &&
          quejaFormulario.apellidoPaternoEstudiante !== "" &&
          quejaFormulario.tipoDocumentoEstudiante !== "" &&
          quejaFormulario.numeroDocumentoEstudiante !== ""
        ) {
          console.log("esta enviando TRASLADO");
          enviarPost();
        }
      }
    }
  };
  const generateRandomId = () => {
    // Genera un número aleatorio y lo convierte en una cadena hexadecimal
    return "file-upload-" + Math.random().toString(36).substring(7);
  };

  const { file } = quejaFormulario;
  const invoiceUploadHandler = ({ data, name }) => {
    console.log("paso3");
    let archivo = {
      name: "",
      type: "",
      data: "",
    };
    let base64String = "";
    var reader = new FileReader();
    console.log(data.target.files[0]);
    reader.readAsDataURL(data.target.files[0]);
    reader.onload = function () {
      base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
      archivo.data = base64String;
    };
    for (var i = 0; i < file.length; i++) {
      let sumatoria = 1;
      if (data.target.files[0].name === file[i].name) {
        for (var a = 0; a < file.length; a++) {
          if (data.target.files[0].name === file[a].name.split("-")[2]) {
            sumatoria++;
          }
        }
        archivo.name = `copia-${sumatoria}-` + data.target.files[0].name;
        break;
      } else {
        archivo.name = data.target.files[0].name;
      }
    }
    if (file.length === 0) {
      archivo.name = data.target.files[0].name;
    }
    archivo.id = generateRandomId();
    archivo.type = data.target.files[0].type;
    setQuejaFormulario((prevState) => ({
      ...prevState,
      [name]: [...prevState[name], archivo],
    }));
  };

  const EliminarFile = ({ id, name }) => {
    setQuejaFormulario((prevState) => {
      // Filtrar los archivos existentes para excluir el que deseamos eliminar
      const nuevosArchivos = prevState[name].filter((item) => item.id !== id);
      // Agregar el nuevo archivo al array actualizado
      return {
        ...prevState,
        [name]: [...nuevosArchivos],
      };
    });
  };

  const onInputChange = (e,object) => {
    const { name, value } = e.target;
    setQuejaFormulario({ ...quejaFormulario, [name]: value });
  };
  const onchangeImage = (dat) => {
    var reader = new FileReader();

    if (dat !== null) {
      console.log("PASO EL NULL");

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

  const buscarDireccion = async (e) => {
    let data =  await axios.get('http://localhost:3000/api/autocomplete', {
      params: {
        input: e
      }
    })
      .then((res) => {
        return res.data;
      });
    
      let array= data.predictions.map(item=>{
        return item.description
      })
    setDataGet(array);

  };

  const onchangeRadioButon = (e, name) => {
    let _quejaFormulario = { ...quejaFormulario };
    console.log(e);
    _quejaFormulario[`${name}`] = e;

    setQuejaFormulario(_quejaFormulario);
    console.log(e);
  };
  const openPDF = (url, blob) => {
    console.log(blob);
  };

  const onchangeRadioButon2 = (e, name, name2) => {
    let _quejaFormulario = { ...quejaFormulario };
    let _extendible = { ...extendible };

    _quejaFormulario[`${name}`] = e.name;
    if (e.name === "MATRICULA") {
      setDisplayPosition(true);
    }

    _extendible[`${name2}`] = e;
    setExtendible(_extendible);

    _quejaFormulario["correoCorporativo"] = "";

    _quejaFormulario["asunto"] = "";
    _quejaFormulario["detalle"] = "";
    _quejaFormulario["pedido"] = "";
    _quejaFormulario["nombreEstudiante"] = "";
    _quejaFormulario["apellidoMaternoEstudiante"] = "";
    _quejaFormulario["apellidoPaternoEstudiante"] = "";
    _quejaFormulario["numeroDocumentoEstudiante"] = "";
    _quejaFormulario["tipoDocumentoEstudiante"] = "";
    _quejaFormulario["numeroDocumentoEstudiante"] = "";
    setQuejaFormulario(_quejaFormulario);
  };
  const [estadoDireccion, setEstadoDireccion] = useState(false);
  const onchangeDirreccion = (e, name) => {
    let _quejaFormulario = { ...quejaFormulario };
    _quejaFormulario[`${name}`] = e;
    setQuejaFormulario(_quejaFormulario);
  };

  function validarArchivo() {
    if (Array.from(file).length >= 5) {
      return "custom-file-upload failed";
    } else {
      return "custom-file-upload";
    }
  }

  function validarEmail(valor) {
    if (
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        valor
      )
    ) {
      return true;
    } else {
      return false;
    }
  }



  return (
    <Fragment>
      <Toast ref={toast} />
      {loadingpost ? <div className="loadingpost">

        <Loading/>
      </div> : <></>}
      <Dialog
        header={
          <h5 style={{ textAlign: "center" }}>
            SE HA GENERADO EL SIGUIENTE CODIGO DE SOLICITUD
          </h5>
        }
        visible={displayBasic}
        style={{ width: "50vw" }}
        onHide={() => onHide2()}
      >
        <h1 style={{ textAlign: "center", color: "black" }}>
          {quejaFormulario.id}
        </h1>

        <p>* Se le enviara un correo con el pdf de su solicitud </p>

        <PDFDownloadLink
          document={<PDF_Queja quejaFormulario={quejaFormulario} />}
          fileName={`${quejaFormulario.id}.pdf`}
        >
          {({ blob, url, loading, error }) =>
            loading ? (
              "Loading document..."
            ) : (
              <Button onClick={() => openPDF(url, blob)}>
                {" "}
                descargar pdf{" "}
              </Button>
            )
          }
        </PDFDownloadLink>
      </Dialog>

      <Dialog
        header="GUIA DE MATRICULA"
        visible={displayPosition}
        position={"top"}
        modal
        style={{ width: "50vw" }}
        onHide={() => onHide()}
        draggable={false}
        resizable={false}
      >
        <div style={{ background: "rgba(26, 4, 133, 0.92)", color: "white" }}>
          <h5>ORIENTACIONES Y REQUISITOS DE MATRÍCULA.</h5>
          <ol className="list-group list-group-numbered">
            <li
              style={{ background: "rgba(26, 4, 133, 0.92)" }}
              className="list-group-item"
            >
              <label style={{ color: "white" }}>Requisitos a presentar </label>
              <ol className="list-group list-group-numbered">
                <li
                  className="list-group-item"
                  style={{ color: " rgba(44, 2, 255, 0.92)" }}
                >
                  Rellenar los campos del formulario de "IDENTIFICACION DEL
                  ESTUDIANTE "{" "}
                </li>
                <li
                  className="list-group-item"
                  style={{ color: " rgba(44, 2, 255, 0.92)" }}
                >
                  Foto dni de estudiante y padres ambos lados
                </li>
                <li
                  className="list-group-item"
                  style={{ color: " rgba(44, 2, 255, 0.92)" }}
                >
                  Foto reporte o constancia logros de notas del estudiante debe
                  indicar código modular del local de la i.e ó i.e.p
                </li>
                <li
                  className="list-group-item"
                  style={{ color: " rgba(44, 2, 255, 0.92)" }}
                >
                  Voucher de cancelación matrícula
                </li>
                <li
                  className="list-group-item"
                  style={{ color: " rgba(44, 2, 255, 0.92)" }}
                >
                  Enviar la solicitud{" "}
                </li>
              </ol>
            </li>
            <li
              style={{ background: "rgba(26, 4, 133, 0.92)" }}
              className="list-group-item"
            >
              <label style={{ color: " white" }}>
                Entrega del correo institucional{" "}
              </label>
              <ol className="list-group list-group-numbered">
                <li
                  className="list-group-item"
                  style={{ color: " rgba(44, 2, 255, 0.92)" }}
                >
                  Si ya cumplió con el paso uno (1) el colegio le envía un
                  correo y contraseña donde podrá acceder a todas las clases vía
                  meet. con sus profesores{" "}
                </li>
              </ol>
            </li>
            <li
              style={{ background: "rgba(26, 4, 133, 0.92)" }}
              className="list-group-item"
            >
              {" "}
              <label style={{ color: "white" }}>
                {" "}
                Horario de clases y calendario google{" "}
              </label>
              <ol className="list-group list-group-numbered">
                <li
                  className="list-group-item"
                  style={{ color: " rgba(44, 2, 255, 0.92)" }}
                >
                  El horario de clases virtual , semipresencial y presencial es
                  el mismo de 8:00 am a 12:00am de lunes a viernes{" "}
                </li>
                <li
                  className="list-group-item"
                  style={{ color: " rgba(44, 2, 255, 0.92)" }}
                >
                  Las clases son sincrónicas con cada profesor y el estudiante{" "}
                </li>
                <li
                  className="list-group-item"
                  style={{ color: " rgba(44, 2, 255, 0.92)" }}
                >
                  Orientaciones a padres se realizan al terminar el día 12:00m
                  con cada padre y el profesor de turno vía meet., consultar con
                  el docente en el momento.{" "}
                </li>
                <li
                  className="list-group-item"
                  style={{ color: " rgba(44, 2, 255, 0.92)" }}
                >
                  Todas las clases están en el calendario desde allí debe
                  ingresar el estudiante.{" "}
                </li>
              </ol>
            </li>

            <li
              style={{ background: "rgba(26, 4, 133, 0.92)" }}
              className="list-group-item"
            >
              <label style={{ color: "white" }}>CUBICOL </label>
              <ol className="list-group list-group-numbered">
                <li
                  style={{ color: " rgba(44, 2, 255, 0.92)" }}
                  className="list-group-item"
                >
                  {" "}
                  En la plataforma educativa se envía a su correo institucional
                  usuario y contraseña, aquí se encuentran el sílabo del
                  trimestre y todo lo que se trabajará en clase con cada
                  profesor. s{" "}
                </li>
              </ol>
            </li>

            <li
              style={{ background: "rgba(26, 4, 133, 0.92)" }}
              className="list-group-item"
            >
              <label style={{ color: "white" }}>Constancia de vacante </label>
              <ol className="list-group list-group-numbered">
                <li
                  className="list-group-item"
                  style={{ color: " rgba(44, 2, 255, 0.92)" }}
                >
                  {" "}
                  Le entregamos en el correo institucional en un plazo de cinco
                  ( 5) días hábiles para que entregue a la i,e ó i.e.p que el
                  niño ha sido traslado.{" "}
                </li>
              </ol>
            </li>
          </ol>

          <label
            style={{
              marginLeft: "25%",
              marginTop: "5%",
              color: "white",
              marginBottom: "5%",
            }}
          >
            Lic. Maria Ortiz : Coordinación académica
          </label>
        </div>
      </Dialog>

      {loading ? (
        <div style={{ width: "100%", padding: "2rem" }}>
          <div className="card" style={{ marginTop: "3%", padding: "2%" }}>
            <label>Libro de reclamaciones</label>
            <hr />
            <div className="row">
              <div className="col" style={{ width: "50rem" }}>
                <label className="form-label">Sede: </label>
                <Dropdown
                  style={{ width: "80%", marginLeft: "2%" }}
                  value={quejaFormulario.sede}
                  options={opcionesHoja}
                  onChange={(e) => onchangeRadioButon(e.value, "sede")}
                  optionLabel="name"
                  placeholder="Selecciona una cede"
                  required
                  autoFocus
                  className={classNames({
                    "p-invalid": !quejaFormulario.sede && enviarFormulario,
                  })}
                />

                {!quejaFormulario.sede && enviarFormulario && (
                  <label
                    className={classNames({
                      "p-error": !quejaFormulario.sede && enviarFormulario,
                    })}
                  >
                    La sede es invalido .
                  </label>
                )}
              </div>
              <div className="col-7">
                <h5 style={{ fontSize: "220%", letterSpacing: "5px" }}>
                  CIRCULO A1 SCHOOL{" "}
                </h5>
              </div>
            </div>
          </div>
          <div className="card" style={{ marginTop: "3%", padding: "2%" }}>
            <label>IDENTIFICACION DEL SOLICITANTE </label>
            <hr />

            <div className="row">
            <label>*Debes buscar el dni</label>
              <div className="col-md-4">
                <label className="form-label">Nombre : </label>
                <InputText
                  disabled={true}
                  value={quejaFormulario.nombre}
                  onChange={(e) => onchangeRadioButon(e.target.value, "nombre")}
                  required
                  autoFocus
                  className={classNames({
                    "p-invalid": !quejaFormulario.nombre && enviarFormulario,
                  })}
                />

                {!quejaFormulario.nombre && enviarFormulario && (
                  <label
                    className={classNames({
                      "p-error": !quejaFormulario.nombre && enviarFormulario,
                    })}
                  >
                    El nombre es invalido .
                  </label>
                )}
              </div>
              <div className="col-md-4">
                <label className="form-label">Apellido Materno: </label>
                <InputText
                  disabled={true}
                  value={quejaFormulario.apellidoMaterno}
                  onChange={(e) =>
                    onchangeRadioButon(e.target.value, "apellidoMaterno")
                  }
                  required
                  autoFocus
                  className={classNames({
                    "p-invalid":
                      !quejaFormulario.apellidoMaterno && enviarFormulario,
                  })}
                />

                {!quejaFormulario.apellidoMaterno && enviarFormulario && (
                  <label
                    className={classNames({
                      "p-error":
                        !quejaFormulario.apellidoMaterno && enviarFormulario,
                    })}
                  >
                    El apellido MATERNO es invalido .
                  </label>
                )}
              </div>
              <div className="col-md-4">
                <label className="form-label">Apellido Paterno : </label>
                <InputText
                  disabled={true}
                  value={quejaFormulario.apellidoPaterno}
                  onChange={(e) =>
                    onchangeRadioButon(e.target.value, "apellidoPaterno")
                  }
                  required
                  autoFocus
                  className={classNames({
                    "p-invalid":
                      !quejaFormulario.apellidoPaterno && enviarFormulario,
                  })}
                />

                {!quejaFormulario.apellidoPaterno && enviarFormulario && (
                  <label
                    className={classNames({
                      "p-error":
                        !quejaFormulario.apellidoPaterno && enviarFormulario,
                    })}
                  >
                    El apellido Paterno es invalido .
                  </label>
                )}
              </div>
            </div>
            <div style={{ marginTop: "2%" }} className="col-md-4">
              <label className="form-label">Nombre del apoderado : </label>
              <InputText
                value={quejaFormulario.Apoderado}
                onChange={(e) =>
                  onchangeRadioButon(e.target.value, "Apoderado")
                }
                required
                autoFocus
                className={classNames({
                  "p-invalid": !quejaFormulario.Apoderado && enviarFormulario,
                })}
              />

              {!quejaFormulario.Apoderado && enviarFormulario && (
                <label
                  className={classNames({
                    "p-error": !quejaFormulario.Apoderado && enviarFormulario,
                  })}
                >
                  El Apoderado es invalido .
                </label>
              )}
            </div>
            <br />
            <div className="row">
              <div className="col-6">
                <label className="form-label" style={{ marginRight: "5%" }}>
                  Tipo Documento :{" "}
                </label>
                <div className="btn-group ">
                  <label style={{ marginRight: "10%" }}>DNI</label>
                  <RadioButton
                    style={{ marginRight: "10%" }}
                    name="tipoDni"
                    value="dni"
                    onChange={(e) => onchangeRadioButon(e.value, "tipoDni")}
                    checked={quejaFormulario.tipoDni === "dni"}
                    required
                    autoFocus
                    className={classNames({
                      "p-invalid": !quejaFormulario.tipoDni && enviarFormulario,
                    })}
                  />

                  <label style={{ marginRight: "10%" }}>Extrangero</label>
                  <RadioButton
                    name="tipoDni"
                    value="extrangero"
                    onChange={(e) => onchangeRadioButon(e.value, "tipoDni")}
                    checked={quejaFormulario.tipoDni === "extrangero"}
                    required
                    autoFocus
                    className={classNames({
                      "p-invalid": !quejaFormulario.tipoDni && enviarFormulario,
                    })}
                  />

                  {!quejaFormulario.tipoDni && enviarFormulario && (
                    <label
                      className={classNames({
                        "p-error": !quejaFormulario.tipoDni && enviarFormulario,
                      })}
                    >
                      El tipo Dni es invalido .
                    </label>
                  )}
                </div>
              </div>
              <div className="col-8">
                <label className="form-label">Nº documento : </label>
                <InputText
                  style={{ marginLeft: "1%", width: "50%" }}
                  value={quejaFormulario.numeroDocumento}
                  maxLength={8}
                  onChange={(e) =>
                    onchangeRadioButon(e.target.value, "numeroDocumento")
                  }
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  required
                  autoFocus
                  className={classNames({
                    "p-invalid":
                      !quejaFormulario.numeroDocumento && enviarFormulario,
                  })}
                />
                <Button
                  onClick={() => consultarApi()}
                  style={{ marginLeft: "5%" }}
                  label={<FontAwesomeIcon icon={faMagnifyingGlass} />}
                />

                {!quejaFormulario.numeroDocumento && enviarFormulario && (
                  <label
                    className={classNames({
                      "p-error":
                        !quejaFormulario.numeroDocumento && enviarFormulario,
                    })}
                  >
                    El numeroDocumento es invalido .
                  </label>
                )}
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-md-5">
                <label>Correo Personal : </label>

                <InputText
                  value={quejaFormulario.correoPersonal}
                  onChange={(e) =>
                    onchangeRadioButon(e.target.value, "correoPersonal")
                  }
                  required
                  autoFocus
                  className={classNames({
                    "p-invalid":
                      !validarEmail(quejaFormulario.correoPersonal) &&
                      enviarFormulario,
                  })}
                />

                {!validarEmail(quejaFormulario.correoPersonal) &&
                  enviarFormulario && (
                    <label
                      className={classNames({
                        "p-error":
                          !validarEmail(quejaFormulario.correoPersonal) &&
                          enviarFormulario,
                      })}
                    >
                      El correo es invalido .
                    </label>
                  )}
              </div>

              <div className="col-md-5">
                <label>Telefono Personal : </label>

                <InputText
                  value={quejaFormulario.telefono}
                  onChange={(e) =>
                    onchangeRadioButon(e.target.value, "telefono")
                  }
                  required
                  maxLength={9}
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  autoFocus
                  className={classNames({
                    "p-invalid": !quejaFormulario.telefono && enviarFormulario,
                  })}
                />

                {quejaFormulario.telefono.length < 9 && enviarFormulario && (
                  <label
                    className={classNames({
                      "p-error": !quejaFormulario.telefono && enviarFormulario,
                    })}
                  >
                    la cantidad de digitos debe ser de 9.
                  </label>
                )}

                {!quejaFormulario.telefono && enviarFormulario && (
                  <label
                    className={classNames({
                      "p-error": !quejaFormulario.telefono && enviarFormulario,
                    })}
                  >
                    El telefono es invalido .
                  </label>
                )}
              </div>

              <div className="col-7">
                <label>Dirreccion domicilio : </label>
                <AutoComplete invalid={!quejaFormulario.domicilio && enviarFormulario} 
                 value={quejaFormulario.domicilio} suggestions={dataget} 
                 completeMethod={(e)=>buscarDireccion(e.query)}         onChange={(e) =>   onchangeDirreccion(e.target.value, "domicilio")} forceSelection />

                {(!quejaFormulario.domicilio && enviarFormulario) && (
                    <label
                      className={"p-error"}
                    >
                      El domicilio es invalido ,debes seleccionar uno .
                    </label>
                  )}
              </div>
            </div>
          </div>

          <div className="card" style={{ marginTop: "3%", padding: "2%" }}>
            <label>DETALLE DE LA SOLICITUD </label>
            <hr />
            <div className="row">
              <div className="col-6">
      
                  <div>
                    {" "}
                    <label>Tipo de bien contratado : </label>
                    <Dropdown
                      style={{ width: "60%", marginLeft: "2%" }}
                      value={extendible.extendible3}
                      options={opcionesHoja4}
                      onChange={(e) =>
                        onchangeRadioButon2(
                          e.value,
                          "tipoBienContratado",
                          "extendible3"
                        )
                      }
                      optionLabel="name"
                      placeholder="Selecciona  "
                      required
                      autoFocus
                      className={classNames({
                        "p-invalid":
                          !quejaFormulario.tipoBienContratado &&
                          enviarFormulario,
                      })}
                    />
                    {!quejaFormulario.tipoBienContratado &&
                      enviarFormulario && (
                        <label
                          className={classNames({
                            "p-error":
                              !quejaFormulario.sede && enviarFormulario,
                          })}
                        >
                          El bien contratado es invalido .
                        </label>
                      )}
                  </div>
       
              </div>
            </div>

            <div className="row">
            
          
            <PersonalizadoInput
                submitted={enviarFormulario}
                listaFormulario={listaFormulario}
                Entity={quejaFormulario}
                EliminarFile={EliminarFile}
                      invoiceUploadHandler={invoiceUploadHandler}
                onInputChange={onInputChange}
              />
            
            </div>
          </div>

          <Button
            style={{ width: "100%", margin: "2%", marginLeft: "0" }}
            onClick={onChangeFormulario}
            label="Enviar"
          />
        </div>
      ) : (
        <>cargando</>
      )}
    </Fragment>
  );
};
