import axios from "axios"
import host from "../../../ControladorPage/host"

const baseUrl=`${host}/Preguntas`
export const ObtenerDatos= async ()=>{
    const res = await axios.get(baseUrl)
    return res.data
}

export const crearDato= async(content)=>{
    const pregunta={content, importan:false}
    const responde = await axios.post(baseUrl,pregunta)
    return responde.data
}