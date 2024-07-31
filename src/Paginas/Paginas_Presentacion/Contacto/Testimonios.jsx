import { Fragment, useEffect, useRef, useState } from "react";
import Loading from "../../ControladorPage/Loading";
import Cabecera from "../Complemets/Cabecera";
import { Suelo } from "../Complemets/Suelo";
import banner from "../Nosotros/banner-nosotros.png";
import "./testimonios.css";
import PersonalizadoInput from "../../Paginas_Login_panel/Paginas/pagesLogin/Modulos/Inputs_maps/PersonalizadoInput";
import { Style_link } from "../Complemets/Style_link";
import llamada from "./llamando-contacto.png";
import { Button } from "react-bootstrap";
import checkAnimacion from "./../../../lotties/checkAnimacion.json";
import Lottie from "react-lottie";
import ReCAPTCHA from 'react-google-recaptcha'
import { useDispatch } from "react-redux";
import { changeToast } from "../../Paginas_Login_panel/ConfigurationAuthenticacion/reducer/toastReducer";

const Testimonios = () => {
  const [loading, setLoading] = useState(false);
  const recaptcha = useRef()

  const siteKey = import.meta.env.VITE_REACT_APP_SITE_KEY;

  const [listaFormulario, setListarFormulario] = useState([
    {
      id: 1,
      titulo: "",
      estilo: "institucional_regular",
      placehold: "Nombre y apellido",
      identidad: "nombre_apellido",
      advertencia: "Este cuadro requerido",
      type: "text",
      data: "texto",
    },
    ,
    {
      id: 2,
      titulo: "",
      estilo: "institucional_regular",
      placehold: "Correo electronico",
      identidad: "correo",
      advertencia: "El correo es requerido",
      type: "text",
      data: "correo",
    },
    {
      id: 3,
      titulo: "",
      estilo: "institucional_regular",
      placehold: "Numero de telefono",
      identidad: "telefono",
      advertencia: "El numero es requerido",
      type: "text",
      data: "numero",
      max:9
    },
    {
      id: 4,
      titulo: "",
      estilo: "institucional_regular",
      placehold: "Escribe tu solicitud",
      identidad: "consulta",
      advertencia: "Este cuadro requerido",
      type: "text_area",
      data: "texto",
    },
  ]);
  const [submitted, setSubmitted] = useState(false);

  let formularioLet = {
    nombre_apellido: "",
    correo: "",
    telefono: "",
    consulta: "",
  };
  const [formularioEntity, setFormularioEntity] = useState(formularioLet);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFormularioEntity({ ...formularioEntity, [name]: value });
  };

  const cambiarEstado = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    return cambiarEstado();
  }, []);

  const [loadingFormulario, setLoadingFormulario] = useState(false);

  const dispatch = useDispatch();
const aplicar = (message)=>{
  dispatch(changeToast({ severity: 'warn', summary: 'Advertencia', detail: message, life: 3000, onclick:true }));
}

  const enviarFormulario = () => {
    setSubmitted(true);
    const captchaValue = recaptcha.current.getValue()

    let validador = true;
  
    for (const key in formularioEntity) {
      const valor = formularioEntity[key];

      if (typeof valor === "string") {
        if (!valor.trim()) {
        
          validador = false;
        }

        if(key==="telefono"){
         if(formularioEntity[key].length<9){
          validador = false;
         }

        }
      }
    }

    if (validador) {
      if (!captchaValue) {

        aplicar("Debes validar el recaptcha")
      }else{

      setSubmitted(false);
      setLoadingFormulario(true);

      setTimeout(() => {
        setLoadingFormulario(false);
        const updatedFormularioEntity = { ...formularioEntity };

        for (const key in updatedFormularioEntity) {
          const valor = updatedFormularioEntity[key];
          if (typeof valor === "string") {  
            console.log(key)  
            updatedFormularioEntity[key] = "";          }
        }
        setFormularioEntity(updatedFormularioEntity);
      }, 2000);
        }
    } else {
    }
  };
  
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: checkAnimacion,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <div className="fotoNosotros">
            <div className="fondobanner">
              <img src={banner}></img>
              <div className="fondo_container_banner">
                <div className="linea"></div>
                <div>
                  <p>Contacto</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contenedor_contacto">
            <div className="informacion_contacto">
              <div className="contenedores" style={{ wordWrap: "break-word" }}>
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  height: "25rem",
                }}
              >
                <img
                  style={{ width: "100%", height: "100%" }}
                  src={llamada}
                  alt=""
                />
              </div>
            </div>
            <div className="formulario_contacto">
            {loadingFormulario?   
   <>
   <h4
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "#333F87",
                }}
              >
               Se envio Tu solicitud correctamente , pronto te contactaremos
              </h4>
   <Lottie options={defaultOptions } height={"40%"} width={"40%"}/>

   </> : <>

              <h4
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "#333F87",
                }}
              >
                Dejanos tu consulta
              </h4>
              <PersonalizadoInput
                submitted={submitted}
                listaFormulario={listaFormulario}
                Entity={formularioEntity}
                onInputChange={onInputChange}
              />
            <div style={{marginTop:"10px"}}>
            <ReCAPTCHA style={{width:"100%"}}  ref={recaptcha} sitekey={siteKey} />
            </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "1rem",
                  width: "100%",
                }}
              >
         
      
                <Button
       
                  onClick={() => {
                    enviarFormulario();
                  }}
                  style={{ backgroundColor: "#333F87", width: "80%" }}
                >
                  REGISTRATE AQUI
                </Button>
              </div>{" "}
           </>} </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Testimonios;
