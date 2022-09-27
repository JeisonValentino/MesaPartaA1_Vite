import axios from "axios";
import React,{ Component } from "react";



const IP ='http://localhost:8080/';
export    const   Service = {



   retornarPerfl  () {
    const response=axios.get(IP+"users/Perfil").then(response=>response.data)
    
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
},ListarGradoEstudiante(){
    const response=axios.get(IP+'grado/listaGrado').then(response=>response.data)

 
    return response;
},
ModificarEmpleado(formData){
   
  return  axios({
    method: 'put',
    url: IP+'empleado/modificarEmpleado',
    data: formData,
    headers: { 'Content-Type': 'multipart/form-data' }
  })


}, CrearEmpleado(formData){
    
   return axios({
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
    return axios.post(IP+'users', product)
},EliminarUsuario(valor){

   return axios.delete(IP+`users/${valor.id}`)
},EliminarUsuarioSeleccionados(data){

    return axios.post(IP+"users/ListaUsuariosEliminar",data)
},
ModificarUser(valor){
    return axios.put(IP+`users`,valor)
},
ListaEstudiantes(){
    return axios.get(IP+"estudiante/ObtenerListaEstudiantes").then(response=>response.data)
}
,CrearEstudiante(formData){
    return axios({
        method: 'post',
        url: IP+`estudiante/GuardarEstudiante`,
        data: formData,
        headers: { 'Content-Type': 'application/json' }
      }).then(response=>response.data)

}
,ModificarEstudiante(valor){
    return axios.put(IP+`estudiante/ModificarEstudiante`,valor)
},
EliminarformaContacto(id){
    return axios.delete(IP+`estudiante/EliminarformaContacto/${id}`).then(response=>response.data)
},
BuscarListaformaContactoPorEstudiante(id){
    console.log(id)
    return axios.get(IP+`estudiante/BuscarListaformaContactoPorEstudiante/${id}`).then(response=>response.data)
},AgregarFormaDecontactoEstudiante(valor,id ){
    return axios.post(IP+`estudiante/GuardarformaContactoPorEstudiante/${id}`,valor).then(response=>response.data)
},
listaRelaconFamiliar(){

    return axios.get(IP+`users/listaRelaconFamiliar`).then(response=>response.data)
}

}