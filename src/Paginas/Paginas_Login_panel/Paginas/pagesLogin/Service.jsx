import axios from "axios";
import React,{ Component } from "react";



const IP ='http://localhost:8080/';
export    const   Service = {



   retornarPerfl  () {
    const response=axios.get(IP+"users/Perfil").then(response=>response.data)
    console.log(response)
    return  response
}




}