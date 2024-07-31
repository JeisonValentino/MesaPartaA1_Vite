import {
  GoogleLogin,
  GoogleOAuthProvider,
  googleLogout,
  useGoogleLogin,
} from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { changeToast } from "../../../Paginas_Login_panel/ConfigurationAuthenticacion/reducer/toastReducer";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import Comentarios from "./Comentarios";
const GoogleAuth = ({
  user,
  setUser,
  token,
  setToken,
  comment,
  setComment,
  guardarComentario
}) => {
  const dispash = useDispatch();

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setToken(codeResponse),
    onError: (error) => handleLoginFailure(error),
  });

  const Id = import.meta.env.VITE_ID_GOOGLE_NOTE;
  const handleLoginFailure = (error) => {
    console.error("Login Failed:", error);
    dispash(
      changeToast({
        severity: "warn",
        summary: "Advertencia",
        detail: error.error || "Error desconocido",
        life: 3000,
        onclick: true,
      })
    );
  };
  useEffect(() => {
    if (token) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${token.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setUser(res.data);
          console.log(res);
        })
        .catch((err) => console.log(err));
    }
  }, [token]);
  const handleLogout = () => {
    googleLogout();
    setUser(null);
    setToken(null);
  };


  return (
    <div>
      {" "}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          flexDirection: "column",
        }}
      >
        {user ? (
          <>
            <div className="form_comentario">
              <div
                style={{
                  width: "15%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div className="imagen_perfil">
                  {" "}
                  <img src={user.picture} alt={user.name} />
                </div>
              </div>

              <div
                style={{
                  height: "100%",
                  width: "85%",
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  overflow: "hidden",
                }}
              >
               <div>
               <label htmlFor="" className="subtitulos">
                  Bienvenido, {user.name}
                </label>
                <Button  onClick={()=>guardarComentario()} style={{marginLeft:"5px",color:"black"}}>Enviar comentario</Button>
               </div>
                
                <Comentarios comment={comment} setComment={setComment} />
              </div>
            </div>
            <>
              <button className="style_institucional"  onClick={handleLogout}>Cerrar sesión</button>
            </>
          </>
        ) : (
          <>
            <label htmlFor="" className="subtitulos">
              Brindanos tu comentario
            </label>
            <Button className="style_institucional"  onClick={() => login()}>Logeate con google 🚀</Button>
            <label className="subtitulos" style={{ textAlign: "center" }}>
              Por favor, inicia sesión para comentar.
            </label>
          </>
        )}
      </div>
    </div>
  );
};

export default GoogleAuth;
