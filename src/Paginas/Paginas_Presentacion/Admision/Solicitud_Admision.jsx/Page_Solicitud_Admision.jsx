import { Fragment, useState } from "react";
import PersonalizadoInput from "../../../Paginas_Login_panel/Paginas/pagesLogin/Modulos/Inputs_maps/PersonalizadoInput";
import React, { useRef } from "react";
import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import { Button } from "primereact/button";
import { Steps } from "primereact/steps";
import "./Page_Solicitud_Admision.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Dialog } from 'primereact/dialog';
import Lottie from "react-lottie";
import checkAnimacion from "./../../../../lotties/checkAnimacion"
import ReCAPTCHA from "react-google-recaptcha";
import { useDispatch } from "react-redux";
import { changeToast } from "../../../Paginas_Login_panel/ConfigurationAuthenticacion/reducer/toastReducer";
const Page_Solicitud_Admision = () => {
  const recaptcha = useRef()
  let formularioDatosApoderado = {
    nombres: "",
    apellido_paterno: "",
    apellido_materno: "",
    tipo_documento: "",
    Nr_dni: "",
    correo: "",
    telefono: "",
    genero:""
  };

  let formularioDatosPostulante = {
    nombres: "",
    apellido_paterno: "",
    apellido_materno: "",
    tipo_documento: "",
    Nr_dni: "",
    nivel: "",
    grado: "",
    genero: "",
    apoderado: formularioDatosApoderado,
    archivos: [],
    sede:""
  };

  const [submittedFaseDatosPostulante, setSubmittedFaseDatosPostulante] = useState(false);
  const [submittedFaseDatosApoderado, setSubmittedFaseDatosApoderado] = useState(false);
  const [submittedFaseDatosArchivo, setSubmittedFaseDatosArchivo] = useState(false);
  const navegate=useNavigate()
  const [visible,setVisible]=useState(false);
  const listaFormularioDatosPostulante = [
    {
      id: 1,
      titulo: "* Nombres",
      estilo: "institucional_regular",
      placehold: "Escribe tu nombre",
      identidad: "nombres",
      advertencia: "Este cuadro requerido",
      type: "text",
      data: "texto",
    },
    {
      id: 2,
      titulo: "* Apellido Paterno",
      estilo: "institucional_regular",
      placehold: "Escribe tu apellido paterno",
      identidad: "apellido_paterno",
      advertencia: "Este cuadro requerido",
      type: "text",
      data: "texto",
    },
    {
      id: 3,
      titulo: "* Apellido Materno",
      estilo: "institucional_regular",
      placehold: "Escribe tu apellido materno",
      identidad: "apellido_materno",
      advertencia: "Este cuadro requerido",
      type: "text",
      data: "texto",
    },
    {
      id: 4,
      titulo: "* Documento",
      estilo: "institucional_regular",
      placehold: "Tipo de documento",
      identidad: "tipo_documento",
      advertencia: "Este cuadro requerido",
      type: "select",
      data: [
        { name: "DNI", data: "DNI" },
        { name: "EXTRANGERO", data: "EXTRANGERO" },
      ],

      object: false,
    },
    {
      id: 5,
      titulo: "* Nr identificacion",
      estilo: "institucional_regular",
      placehold: "Escribe tu nr de documento",
      identidad: "Nr_dni",
      advertencia: "Este cuadro requerido",
      type: "text",
      data: "numero",
      max:8
    },
    {
      id: 6,
      titulo: "* Genero",
      estilo: "institucional_regular",
      placehold: "Elije tu genero",
      identidad: "genero",
      advertencia: "Este cuadro requerido",
      type: "select",
      object: false,
      data: [
        { name: "Masculino", data: "Masculino" },
        { name: "Femenino", data: "Femenino" },
      ],
    },
  ];
  const listaFormularioDatosPostulacion = [


    {
      id: 1,
      titulo: "* Sede",
      estilo: "institucional_regular",
      placehold: "Seleccione la sede a la que pertenece",
      identidad: "sede",
      advertencia: "Este cuadro requerido",
      type: "select",
      object: false,
      data: [{name:"San Juan de lurigancho",data:"SJL-CANTO REY"}
      ],
    },
    {
      id: 2,
      titulo: "* Nivel",
      estilo: "institucional_regular",
      placehold: "Seleccione el nivel al que pertenece",
      identidad: "nivel",
      advertencia: "Este cuadro requerido",
      type: "select",
      object: false,
      data: [{name:"San Juan de lurigancho",data:"SJL-CANTO REY"}
      ],
    },
    {
      id: 3,
      titulo: "* Grado",
      estilo: "institucional_regular",
      placehold: "Seleccione el grado al que pertenece",
      identidad: "grado",
      advertencia: "Este cuadro requerido",
      type: "select",
      object: false,
      data: [{name:"San Juan de lurigancho",data:"SJL-CANTO REY"}
      ],
    }, 
  ];

  const listaFormularioDatosPadres = [
    {
      id: 1,
      titulo: "* Nombres",
      estilo: "institucional_regular",
      placehold: "Escribe tu nombre",
      identidad: "nombres",
      advertencia: "Este cuadro requerido",
      type: "text",
      data: "texto",
    },
    {
      id: 2,
      titulo: "* Apellido Paterno",
      estilo: "institucional_regular",
      placehold: "Escribe tu apellido paterno",
      identidad: "apellido_paterno",
      advertencia: "Este cuadro requerido",
      type: "text",
      data: "texto",
    },
    {
      id: 3,
      titulo: "* Apellido Materno",
      estilo: "institucional_regular",
      placehold: "Escribe tu apellido materno",
      identidad: "apellido_materno",
      advertencia: "Este cuadro requerido",
      type: "text",
      data: "texto",
    },
    {
      id: 4,
      titulo: "* Documento",
      estilo: "institucional_regular",
      placehold: "Tipo de documento",
      identidad: "tipo_documento",
      advertencia: "Este cuadro requerido",
      type: "select",
      object: false,
      data: [
        { name: "DNI", data: "DNI" },
        { name: "EXTRANGERO", data: "EXTRANGERO" },
      ],


    },
    {
      id: 5,
      titulo: "* Nr identificacion",
      estilo: "institucional_regular",
      placehold: "Escribe tu nr de documento",
      identidad: "Nr_dni",
      advertencia: "Este cuadro requerido",
      type: "text",
      data: "numero",
      max:8
    },
    {
      id: 6,
      titulo: "* Genero",
      estilo: "institucional_regular",
      placehold: "Elije tu genero",
      identidad: "genero",
      advertencia: "Este cuadro requerido",
      type: "select",
      object: false,
      data: [
        { name: "Masculino", data: "Masculino" },
        { name: "Femenino", data: "Femenino" },
      ],
    },
    {
      id: 7,
      titulo: "* Correo Electronico",
      estilo: "institucional_regular",
      placehold: "Escribe tu correo electronico",
      identidad: "correo",
      advertencia: "Este cuadro requerido",
      type: "text",
      data: "correo",
    },
    {
      id: 8,
      titulo: "* Numero de celular",
      estilo: "institucional_regular",
      placehold: "Escribe tu numero de celular",
      identidad: "telefono",
      advertencia: "Este cuadro requerido",
      type: "text",
      data: "numero",
      max:9
    }
  ];

  const listaFormularioArchivosRequerimiento = [
    {
      id: 1,
      titulo: "* Archivos",
      estilo: "institucional_regular",
      identidad: "archivos",
      advertenciaVacia: "debe haber archivos presentados",
      advertenciaCantidad: 2,
      advertenciaTamañoArchivo: 1,
      type: "file",
    },
  ];
  const [formularioEntity, setFormularioEntity] = useState(
    formularioDatosPostulante
  );
  const onInputChange = (e,object) => {
    const { name, value } = e.target;
    setFormularioEntity({ ...formularioEntity, [name]: value });
  };
  const onInputChangeObject = (e,object) => {
    const { name, value } = e.target;
console.log(formularioEntity.apoderado)
    let objetoText= Object.keys(formularioEntity).find(key =>formularioEntity[key]===object)
    console.log(objetoText)
    setFormularioEntity({...formularioEntity, [objetoText]:{...object,[name]: value }});
  }


  const { archivos: file } = formularioEntity;
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
    setFormularioEntity((prevState) => ({
      ...prevState,
      [name]: [...prevState[name], archivo],
    }));
  };

  const EliminarFile = ({ id, name }) => {
    setFormularioEntity((prevState) => {
      // Filtrar los archivos existentes para excluir el que deseamos eliminar
      const nuevosArchivos = prevState[name].filter((item) => item.id !== id);
      // Agregar el nuevo archivo al array actualizado
      return {
        ...prevState,
        [name]: [...nuevosArchivos],
      };
    });
  };

  const generateRandomId = () => {
    // Genera un número aleatorio y lo convierte en una cadena hexadecimal
    return "file-upload-" + Math.random().toString(36).substring(7);
  };

  const items = [
    {
      icon: "pi pi-user",
      template: (item) => itemRenderer(item, 0),
    },
    {
      icon: "pi pi-users",
      template: (item) => itemRenderer(item, 1),
    },
    {
      icon: "pi pi-check",
      template: (item) => itemRenderer(item, 2),
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const itemRenderer = (item, itemIndex) => {
    const isActiveItem = activeIndex === itemIndex;
    const backgroundColor = isActiveItem
      ? "var(--primary-color)"
      : "var(--surface-b)";
    const textColor = isActiveItem
      ? "var(--surface-b)"
      : "var(--text-color-secondary)";

    return (
      <span
        className="inline-flex align-items-center justify-content-center align-items-center border-circle border-primary border-1 h-3rem w-3rem z-1"
        style={{
          backgroundColor: backgroundColor,
          color: textColor,
          marginTop: "-25px",
        }}
        
      >
        <i className={`${item.icon} text-xl`} />
      </span>
    );
  };

const validacionDatosPostulante = ()=>{
  let validador=true;
  setSubmittedFaseDatosPostulante(false)
  for (const key in formularioEntity) {
    const valor = key === 'apoderado' ? formularioEntity[key].identidad : formularioEntity[key];

    if (typeof valor === 'string') {
      if (!valor.trim()) {
  console.error(key , "encontrado")
        validador=false;
      }
    } else if (Array.isArray(valor)) {
      if (valor.length === 0) {
       
      }
    }
  }

  if(validador){
setActiveIndex(activeIndex+1)
  }else{
    setSubmittedFaseDatosPostulante(true)
  }

}





const validacionDatosResponsable = ()=>{
  let validador=true;
  setSubmittedFaseDatosApoderado(false)
  for (const key in formularioEntity.apoderado) {
    const valor = formularioEntity.apoderado[key];

    if (typeof valor === 'string') {

      if (!valor.trim()) {
        console.error(valor , "encontrado")

        validador=false;
      }
    } 
  }

  if(validador){
    setActiveIndex(activeIndex+1)
  }else{
    setSubmittedFaseDatosApoderado(true)
  }

}

const [loading, setLoading]=useState(false)
const siteKey = import.meta.env.VITE_REACT_APP_SITE_KEY;

const dispash=useDispatch()

const aplicar=(mensaje)=>{
  dispash(changeToast({ severity: 'warn', summary: 'Advertencia', detail: mensaje, life: 3000, onclick:true }))
}

const validacionDatosArchivos = ()=>{
  const captchaValue = recaptcha.current.getValue()

  let validador=true;
  setSubmittedFaseDatosArchivo(false)
  setLoading(false)
  for (const key in formularioEntity) {
    const valor =  formularioEntity[key];

  if (Array.isArray(valor)) {
      if (valor.length < 1) {
        console.error("no aprobado")
        validador=false;
      }
    }
  }

  if(validador){
    if (!captchaValue) {
console.log("no pasa")
      aplicar("Debes validar el recaptcha")
    }else{
setLoading(true)

setTimeout(()=>{
  setLoading(false)
setVisible(true)
},2000)
    }
  }else{
    setSubmittedFaseDatosArchivo(true)
  }
}

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: checkAnimacion,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

  return (
    <Fragment>
      <div className="formulario_solicitud_cuerpo">

      <Dialog header={<p style={{fontSize:"80%"}}>Carga de solicitud exitosa</p>} visible={visible} style={{ width: '80%' }} onHide={() => {if (!visible) return;navegate("/") }}>
    
    <Lottie options={defaultOptions } height={"40%"} width={"40%"}/>
    <p style={{fontSize:"100%"}} className="m-0">
      Tu solicitud se cargo con exito,te estaremos contactando lo mas pronto posible 
    </p>
</Dialog>

        <Steps
          model={items}
          activeIndex={activeIndex}
          readOnly={false}
          className="m-2 pt-4"
        />

        {activeIndex === 0 ? (
          <div className=" card formulario_solicitud_admision">
         <div className="card">  
         <label htmlFor="">DATOS PERSONALES</label>
    <div style={{display:"flex",justifyContent:"center"}}> <hr /></div>
          <PersonalizadoInput
              submitted={submittedFaseDatosPostulante}
              listaFormulario={listaFormularioDatosPostulante}
              Entity={formularioEntity}
              onInputChange={onInputChange}
            /></div>

         <div className="card "> 
         <label htmlFor="">DATOS DE POSTULACION</label>
         <div style={{display:"flex",justifyContent:"center"}}> <hr /></div>

           <PersonalizadoInput
              submitted={submittedFaseDatosPostulante}
              listaFormulario={listaFormularioDatosPostulacion}
              Entity={formularioEntity}
              onInputChange={onInputChange}
            /></div>
            <div className="btn_pages">
              <div className=""></div>
              <Button
                onClick={() => validacionDatosPostulante()}
                icon={<FontAwesomeIcon icon={faArrowRight} />}
              ></Button>
            </div>
          </div>
        ) : (
          <>
            {activeIndex === 1 ? (
              <div className=" card formulario_solicitud_admision">
              <div className="card">  
              <label htmlFor="">DATOS DEL RESPONSABLE</label>
    <div style={{display:"flex",justifyContent:"center"}}> <hr /></div>
                <PersonalizadoInput
                  submitted={submittedFaseDatosApoderado}
                  listaFormulario={listaFormularioDatosPadres}
                  Entity={formularioEntity.apoderado}
                  onInputChange={onInputChangeObject}
                />
                </div>
                <div className="btn_pages">
                  <Button
                    onClick={() => setActiveIndex(activeIndex - 1)}
                    icon={<FontAwesomeIcon icon={faArrowLeft} />}
                  ></Button>
                  <Button
                    onClick={() => validacionDatosResponsable()}
                    icon={<FontAwesomeIcon icon={faArrowRight} />}
                  ></Button>
                </div>
              </div>
            ) : (
              <>
                {activeIndex === 2 ? (
                  <div className=" card formulario_solicitud_admision">
                    <PersonalizadoInput
                      EliminarFile={EliminarFile}
                      invoiceUploadHandler={invoiceUploadHandler}
                      submitted={submittedFaseDatosArchivo}
                      listaFormulario={listaFormularioArchivosRequerimiento}
                      Entity={formularioEntity}
                    />
                                <ReCAPTCHA  ref={recaptcha} sitekey={siteKey} />

                    <div className="btn_pages">
                    <Button
                    onClick={() => setActiveIndex(activeIndex - 1)}
                    icon={<FontAwesomeIcon icon={faArrowLeft} />}
                  ></Button>
<Button  icon="pi pi-check" loading={loading}  onClick={() => validacionDatosArchivos()} />


                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </>
            )}
          </>
        )}
      </div>
    </Fragment>
  );
};

export default Page_Solicitud_Admision;
