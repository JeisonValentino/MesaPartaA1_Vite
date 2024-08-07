import axios from "axios";
import React,{ Component } from "react";
import jwt_decode from "jwt-decode";



const IP ='http://localhost:8080/';
export    const   Service = {



     ping  (timeout = 6000 ) {
        return new Promise((resolve, reject) => {

            try {
        fetch(IP).then(() => {
           
            resolve(true)})
        .catch(() => resolve(false));
        setTimeout(() => {
            resolve(false);
          }, timeout);

        } catch (e) {
          
          }
        })
    
     }
        ,

        enviarCorreoRecuperacionPassword(dni){
            return axios.post(IP+`users/authentication/ActualizarContraseña-Correo/${dni}`)

        },

        enviarPasswordRecuperacionPassword(contraseña,codigo){
            return axios.post(IP+`users/authentication/validateTokenPassword/${codigo}?contraseña=${contraseña}`,)

        },

    refresToken(){
        return axios({
            method : 'post',
        url:    IP+"users/authentication/refrestToken"
    ,    headers: {
        'Authorization': localStorage.getItem('jwtToken-Refresh')
    }
    
    
    })
    },

   retornarPerfl  () {
    const response=axios.get(IP+"users/Perfil").then(response=>response.data)
    
    return  response
},ActualizarPerfil(formData){
   return  axios({
        method: 'put',
        url: IP+'users/GuardarPorPerfil',
        data: formData,
        
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
},
AgregarLoginEstudiante(valor ){
    return axios.post(IP+`estudiante/GuardarLoginEstudiantes`, valor).then(response=>response.data)
},ServiceBuscarLoginEstudiante( id ){
    return axios.get(IP+`estudiante/BuscarLoginEstudiantes/${id}`).then(response=>response.data)
}
,obtenerListaConfiguracion(id){
    return axios.get(IP+`estudiante/BuscarListaConfiguracionEstudiantes/${id}`).then(response=>response.data)
}
,buscarEstadoNotificacion(id){
    return axios.get(IP+`estudiante/BuscarEstadoConfiguracionEstudiantes/${id}`).then(response=>response.data)
},subirImagenServer(formData){
    return axios({
        method: 'PUT',
        url: IP+'estudiante/subirImagen',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then(response=>response.data)
},GuardarSolicitud(dat){
   return axios.post(IP+'solicitud/GuardarSolicitud', dat).then(response=>response.data)
},ObtenerListaArticulo(){
    const response=axios.get(IP+'almacenamiento/listarArticulos').then(response=>response.data)
    return response;
},ObtenerListaMarcas(){
    const response=axios.get(IP+'almacenamiento/listarMarcas').then(response=>response.data)
    return response;
},CrearListaMarca(dat){
    return axios.post(IP+'almacenamiento/CrearMarcar', dat).then(response=>response.data)
},EliminarColumnaMarca(id){
    return axios.delete(IP+`almacenamiento/EliminarMarca/${id}`).then(response=>response.data)
},CrearArticulo(dat){
    return axios.post(IP+'almacenamiento/CrearArticulo', dat).then(response=>response.data)
},ModificarArticulo(dat){
    return axios.put(IP+'almacenamiento/ModificarArticulo', dat).then(response=>response.data)
},EliminarArticulo(id){
    return axios.delete(IP+`almacenamiento/EliminarArticulo/${id}`).then(response=>response.data)
},ObtenerListaArticuloPorId(id){
    const response=axios.get(IP+`almacenamiento/listarItemArticulo/${id}`).then(response=>response.data)
    return response;
},CrearItemArticulo(dat){
    return axios.post(IP+'almacenamiento/CrearItemArticulo', dat).then(response=>response.data)
},ModificarItemArticulo(dat){
    return axios.put(IP+'almacenamiento/ModificarItemArticulo', dat).then(response=>response.data)
}

}