import axios from "axios";
import React,{ Component } from "react";



const IP ='http://localhost:8080/';
export    const   Service = {



   retornarPerfl  () {
    const response=axios.get(IP+"users/Perfil").then(response=>response.data)
    console.log(response)
    return  response
},ActualizarPerfil(formData){
   return  axios({
        method: 'put',
        url: IP+'users/GuardarPorPerfil',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' }
      })
}
,
ListaMesaPartes(){

    const response=axios.get(IP+"respuesta/ObtenerSolicitud").then(response=>response.data)

   
    return response;
},
ConsultarPost(id){
    const response=axios.get(IP+`respuesta/ObtenerSolicitudPost/${id}`).then(response=>response.data)

   
    return response;
},
ListarUsuario(){
    const response=axios.get(IP+'users/ListarUsuarios').then(response=>response.data)

 
    return response;
},ObtenerListaEmpleado(){
    const response=axios.get(IP+'empleado').then(response=>response.data)

 
    return response;
},
ListarSedesCode(){
    const response=axios.get(IP+'sede/listaSede').then(response=>response.data)

 
    return response;
},
ModificarEmpleado(formData){
   
   axios({
    method: 'put',
    url: IP+'empleado/modificarEmpleado',
    data: formData,
    headers: { 'Content-Type': 'multipart/form-data' }
  })


},CrearEmpleado(formData){
    
    axios({
        method: 'post',
        url: IP+'empleado',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' }
      })
},
listarRoles(){
    const response=axios.get(IP+'empleado/ListarEmpleadosNorole').then(response=>response.data)

 
    return response;
}

,CrearUsuario(product){
    axios.post(IP+'users', product)
},EliminarUsuario(valor){

   return axios.delete(IP+`users/${valor.id}`)
},
ModificarUser(valor){
    return axios.put(IP+`users`,valor)
}
}