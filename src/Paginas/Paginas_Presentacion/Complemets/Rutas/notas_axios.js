import axios from "axios"
import host from "./../../../ControladorPage/host"
const baseUrlNotas=`${host}/Notas`
const baseUrlComentarios=`${host}/Comentarios`
export const obtenerNotas=async()=>{
  
return (await axios.get(baseUrlNotas)).data
}

export const crearNotas=async  (data)=>{
    return (await axios.post(baseUrlNotas,data)).data
}

export const crearComentario= async (data)=>{
    return (await axios.post(baseUrlComentarios,data)).data
}

export const obtenerComentarios=async()=>{
  
    return (await axios.get(baseUrlComentarios)).data
    }