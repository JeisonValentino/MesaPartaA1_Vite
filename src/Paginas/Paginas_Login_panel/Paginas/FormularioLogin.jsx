
import { Fragment, createContext, useEffect, useRef, useState } from "react";
import jwt_decode from "jwt-decode";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import axios from "axios";
import setAuchToken from "../ConfigurationAuthenticacion/setAuchToken";
import { useDispatch } from "react-redux";
import { SET_CURRENT_USER } from "../ConfigurationAuthenticacion/types";
import { Service } from "./pagesLogin/Service";
import logo_colegio from "./logo colegio.jpg";
import "./formulario.css";
import { GoogleOAuthProvider, googleLogout, useGoogleLogin } from "@react-oauth/google";
import { changeToast } from "../ConfigurationAuthenticacion/reducer/toastReducer";
import { InputText } from "primereact/inputtext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { classNames } from "primereact/utils";
import { validarCorreo } from "./pagesLogin/Modulos/funcionesCompartidas";

export  const AuthContext = createContext({ingresar:{correo:"",contraseña:""},setIngresar:()=>{},sumitTedLogin:false, setSumitTedLogin :()=>{},sumitLogin:()=>{},ingresarStado:()=>{} , sumitEmail:()=>{}});


export  const FormularioLogin = ({children}) => {
    const navigate = useNavigate();
    const [ingresar, setIngresar] = useState({ correo: "", contraseña: "",dni:"",recuperacionContraseña:"" });
    const toast = useRef(null);
    const dispatch = useDispatch();
    const { correo, contraseña,dni ,recuperacionContraseña} = ingresar;
    const [sumitTedLogin, setSumitTedLogin] = useState(false);
    const [validaIp, setValidaIp] = useState(true);

    const [activarMensaje,setActivarMensaje]=useState(false);
    const [submitRecuperacion ,setSubmitRecuperacion]=useState(false);


    const enviarRecuperacion = (token)=>{
      if(!recuperacionContraseña.trim()){
        setSubmitRecuperacion(true)
      }else{
        Service.enviarPasswordRecuperacionPassword(recuperacionContraseña,token).then((res)=>{
          setSubmitRecuperacion(false);
          showSuccessAfirmative(res.data);
          navigate("/login")
        }).catch((response) => {
          showSuccess(response.response.data.message);
        });
      }
    }

    const sumitEmail = async ()=>{
      if(!dni.trim() || dni.trim().length<8){
      setSumitTedLogin(true);
      }else{
        Service.enviarCorreoRecuperacionPassword(dni).then((res)=>{
          setActivarMensaje(true)
          setSumitTedLogin(false);
        }).catch((response) => {
          showSuccess(response.response.data.message);
        });
      }
    }

    const ingresarStado = (e) => {
      setIngresar({ ...ingresar, [e.target.name]: e.target.value });
    };
  
    const showSuccess = (a) => {
      toast.current.show({
        severity: "error",
        summary: `Error de solicitud`,
        detail: `Error: ${a}`,
        life: 3000,
      });
    };

    const showSuccessAfirmative = (a) => {
      toast.current.show({
        severity: "success",
        summary: `Actualizacion existosa`,
        detail: `Actualizacion: ${a}`,
        life: 3000,
      });
    };
  
    const sumitLogin = async () => {
      console.log("click")
      if (!correo.trim() || !contraseña.trim() || !validarCorreo(correo)) {
        setSumitTedLogin(true);
      } else {
        ingresarPage();
      }
    };
  
    const ingresarPage = async () => {
      const { data } = await axios
        .post(
          `http://localhost:8080/users/authentication/signIn`,
          { login: ingresar.correo, password: ingresar.contraseña },
          {
            headers: {
              Accept: "application/json",
            },
          }
        )
        
        .catch((response) => {
          showSuccess(response.response.data.message);
        });
      localStorage.setItem("jwtToken", "Bearer " + data.data["token"]);
      localStorage.setItem("jwtToken-Refresh", "Bearer " + data.data["refrest_token"]);
  
      setAuchToken("Bearer " + data.data["token"]);
      const decoded = jwt_decode("Bearer " + data.data["token"]);
  
      dispatch(setCurrentUser({ user: decoded, loggedIn: true }));
      navigate("/Sistema-Administrador");
    };

   


  
    const login = useGoogleLogin({
      onSuccess: (codeResponse) => setToken(codeResponse),
    });
  
    const [token, setToken] = useState();
    const [user, setUser] = useState();
  

    useEffect(() => {
      if (token) {
        axios
          .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token.access_token}`, {
            headers: {
              Authorization: `Bearer ${token.access_token}`,
              Accept: "application/json",
            },
          })
          .then((res) => {
            setUser(res.data);
          })
          .catch((err) => console.log(err));
      }
    }, [token]);
  
    const handleLogout = () => {
      googleLogout();
      setUser(null);
      setToken(null);
    };

    const loginGoogle = async ()=>{
      const { data } = await axios
      .post(
        `http://localhost:8080/users/authentication/signIn-Google`,
        { login: user.email },
        {
          headers: {
            Accept: "application/json",
          },
        }
      )
      .catch((response) => {
        console.log(response.response.data.message);
        showSuccess(response.response.data.message);
      });
    localStorage.setItem("jwtToken", "Bearer " + data.data["token"]);
    localStorage.setItem(
      "jwtToken-Refresh",
      "Bearer " + data.data["refrest_token"]
    );
  
    setAuchToken("Bearer " + data.data["token"]);
    const decoded = jwt_decode("Bearer " + data.data["token"]);
  
    dispatch(setCurrentUser({ user: decoded, loggedIn: true }));
  
    navigate("/Sistema-Administrador");
  }
  useEffect(()=>{
    if(user){
loginGoogle();
 }
  },[user])

    const contextValue = {
      ingresar,
      setIngresar,
      sumitTedLogin,
      setSumitTedLogin,
      sumitLogin,
      ingresarStado,
      sumitEmail,login
      ,activarMensaje,
      setActivarMensaje,
      enviarRecuperacion,
      submitRecuperacion
      ,
    };



    if (validaIp) {
      return (
    




            <AuthContext.Provider
      value={contextValue}
    >

<Toast ref={toast} />
<div
        style={{
          marginTop: "10%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >   
        <div
          className="card login_container"
          style={{
            paddingTop: "2%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >

   
{children}
    </div>
    </div>
                </AuthContext.Provider>
    
      );
    } else {
      return <>La plataforma de servicios APACHE no se encuentra activa por favor contactar con soporte de sistema sistemacia@circuloa1school.org</>;
    }
};
export default  FormularioLogin;

export const setCurrentUser = ({ user, loggedIn, time }) => {
  return {
    type: SET_CURRENT_USER,
    payload: { user, loggedIn, time },
  };
};