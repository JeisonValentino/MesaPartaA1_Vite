import { Fragment, useEffect, useState } from "react";
import Loading from "../../../ControladorPage/Loading";
import ReactHtmlParser from 'react-html-parser';

import { useParams } from "react-router-dom";
import useNoteStore, {
  initNote,
} from "../../../Paginas_Login_panel/ConfigurationAuthenticacion/reducer/useNoteStore";
import Comentarios from "./Comentarios";
import GoogleAuth from "./GoogleAuth";
import axios from "axios";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./pagina_opinion.css";
import {
  crearComentario,
  obtenerComentarios,
} from "../../Complemets/Rutas/notas_axios";
import { useDispatch } from "react-redux";
import { changeToast } from "../../../Paginas_Login_panel/ConfigurationAuthenticacion/reducer/toastReducer";
import Paginacion_componentes from "../../../Paginas_Login_panel/Paginas/pagesLogin/Modulos/Paginacion_Components/Paginacion_componentes";
const Pagina_Opinion = () => {
  const { titulo } = useParams();
  const [data, setDate] = useState();
  const [comment, setComment] = useState("");
  const { notas, loading, error } = useNoteStore((state) => ({
    loading: state.loading,
    notas: state.notes,
    error: state.error,
  }));

  useEffect(() => {
    if (!notas.length && !error && !loading) {
      initNote()();
    }
    setDate(notas.find((res) => res.titulo == titulo));
  }, [loading]);
  const [user, setUser] = useState();
  const [token, setToken] = useState();
  const clientId = import.meta.env.VITE_ID_GOOGLE_NOTE;
  let comentarioEntity = {
    id: 1,
    notas_id: 1,
    user: "",
    imagen: "",
    comentario: {
      mensaje: "",
      fecha: "",
    },
  };
  const [comentario, setComentario] = useState(comentarioEntity);
  const generarID = () => {
    const timestamp = Date.now().toString(36); // Convertir la marca de tiempo en base 36
    const randomNum = Math.random().toString(36).substr(2, 5); // Número aleatorio en base 36
    return timestamp + randomNum; // Combinar la marca de tiempo y el número aleatorio
  };
  const dispash = useDispatch();
  const [loadingComentario, setLoadingComentario] = useState(true);
  const guardarComentario = async () => {
    const now = new Date().toISOString(); // Fecha y hora actual en formato ISO
    if (comment != "") {
      setLoadingComentario(true);
      try {
        const nuevoComentario = {
          id: generarID(),
          notas_id: data.data.id,
          user: user.name,
          imagen: user.picture,
          comentario: {
            mensaje: comment,
            fecha: now,
          },
        };

        // Crear el comentario en el servidor
        await crearComentario(nuevoComentario);

        // Limpiar el comentario del estado
        setComentario({
          ...comentario,
          comentario: {
            ...comentario.comentario,
            mensaje: "",
          },
        });

        // Limpiar el campo de comentario en el estado
        setComment("");

        dispash(
          changeToast({
            severity: "success",
            summary: "Éxito",
            detail: "Comentario enviado exitosamente",
            life: 3000,
            onclick: true,
          })
        );
      } catch (error) {
        dispash(
          changeToast({
            severity: "danger",
            summary: "Advertencia",
            detail: `Error presentado: ${error}`,
            life: 3000,
            onclick: true,
          })
        );
      } 
    } else {
      dispash(
        changeToast({
          severity: "warn",
          summary: "Advertencia",
          detail: "el comentario no puede estar vacio",
          life: 3000,
          onclick: true,
        })
      );
    }
  };
  const [datacomentarios, setDataComentarios] = useState([]);
  useEffect(() => {
    if (loadingComentario && data?.data?.id) {
        const cargarComentario = async () => {
            try {
              // Realizar la llamada a obtenerComentarios solo si data.data.id está presente
              const response = await obtenerComentarios();
              const data_coment = response;
      
             const comentariosFiltrados = Array.from(data_coment).filter((res) => res.notas_id === data.data.id);
      
              // Actualizar el estado con los comentarios filtrados
              setDataComentarios(comentariosFiltrados);
            } catch (error) {
              console.error("Error al cargar los comentarios:", error);
              // Aquí puedes agregar la lógica para manejar el error, como mostrar un mensaje de error al usuario
            } finally {
              // Establecer loadingComentario en falso después de cargar los comentarios
              setLoadingComentario(false);
            }
          };
          cargarComentario();
    }
  }, [loadingComentario, data?.data?.id]);

  const formateadorHora= (hora)=>{
    const fechaHora = new Date(hora);

    // Obtener los componentes de la fecha y hora
    const año = fechaHora.getFullYear();
    const mes = (fechaHora.getMonth() + 1).toString().padStart(2, '0'); // Los meses van de 0 a 11, por eso sumamos 1
    const dia = fechaHora.getDate().toString().padStart(2, '0');
    const horas = fechaHora.getHours().toString().padStart(2, '0');
    const minutos = fechaHora.getMinutes().toString().padStart(2, '0');
    const segundos = fechaHora.getSeconds().toString().padStart(2, '0');
    const milisegundos = fechaHora.getMilliseconds().toString().padStart(3, '0');
    
    // Crear la cadena de texto formateada
    return `${año}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;
  }


  return (
    <Fragment>

{loading ? <></>:<>
    <div style={{width:"100%" ,padding:"4rem"}}>
    <label htmlFor="" className="titulo">{data?.data?.titulo}</label>

    {data?.data?.contenido}
    </div>
</>}



      <div className="formulario_opinion">
        {loading ? (
          <Loading />
        ) : (
          <div>
            <GoogleOAuthProvider clientId={clientId}>
              <GoogleAuth
                guardarComentario={guardarComentario}
                comment={comment}
                setComment={setComment}
                token={token}
                setToken={setToken}
                user={user}
                setUser={setUser}
              />
            </GoogleOAuthProvider>
           
          </div>
        )}
      </div>
      {loadingComentario ? (
              <>          

                <Loading />
              </>
            ) : (
              <Paginacion_componentes style={"flex"} itemsPerPage={5}>
         
                {datacomentarios.slice().reverse().map((dat, key) => {
                  return (
                    <div key={key} className="comentarios_fijos">
                 
                        <img className="imagen_perfil" src={dat.imagen} alt={dat.user} />
                      <div className="cuerpo_comentario">
                   <span>
                   <label htmlFor="subtitulo">{dat.user}</label>
                      <label htmlFor="subtitulo">{formateadorHora(dat.comentario.fecha)}</label>
                   </span>
                     <div>
                     {ReactHtmlParser(dat.comentario.mensaje)}
                     </div>
                      </div>
                    </div>
                  );
                })}
                </Paginacion_componentes >
          
            )}
    </Fragment>
  );
};

export default Pagina_Opinion;
