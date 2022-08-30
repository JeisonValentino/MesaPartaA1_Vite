import { QuejaFormulario } from '../Paginas_Login_panel/Paginas/QuejaFormulario';
import { Route, Routes } from 'react-router-dom';
import '../../App.css';

import { MesaPartes } from '../Paginas_Login_panel/Paginas/MesaPartes';
import { Busqueda } from '../Paginas_Login_panel/Paginas/QUEJAS_RECLAMOS/Busqueda';
import { Entrada } from '../Paginas_Login_panel/Paginas/pagesLogin/Entrada';
import { MesaPartes_Post } from '../Paginas_Login_panel/Paginas/pagesLogin/ExtencionesCompartidas/MesaPartes_Post';
import React ,{ useRef } from 'react';
import Session_Invalid from './Session_Invalid';
import PaginaEntrada from '../Paginas_Presentacion/PaginaEntrada';
import  ElColegio  from '../Paginas_Presentacion/ElColegio';
import Nuestras_Sedes from '../Paginas_Presentacion/Nuestras_Sedes';
import Proceso_Matricula from '../Paginas_Presentacion/Proceso_Matricula';
import Servicios_Adicionales from '../Paginas_Presentacion/Servicios_Adicionales';
import Testimonios from '../Paginas_Presentacion/Testimonios'
import Noticias from '../Paginas_Presentacion/Noticias'
import CRM from '../Paginas_Login_panel/Paginas/pagesLogin/ModulosExtencion/CRM';
import Estudiantes from '../Paginas_Login_panel/Paginas/pagesLogin/ModulosExtencion/Estudiantes';
import Perfil from '../Paginas_Login_panel/Paginas/pagesLogin/Perfil';
import Error404 from './Error404';
import {Login} from './../Paginas_Login_panel/Paginas/Login.jsx'
function Controller_Page() {

  const loggedin=false
  

  
  function eleccion1(a){
    if(loggedin===true){

 
    
       return a

   
   }else {


     return <Session_Invalid/>
     }  
 
    }

  return (
    <div  className="App">
   
  
      <Routes>
<Route path='*' element={<Error404/>}/>
   
      <Route path='/' element={<PaginaEntrada/>} />
      <Route path='/El-Colegio' element={<ElColegio/>} />
      <Route path='/Nuestras-Sedes' element={<Nuestras_Sedes/>} />
      <Route path='/Proceso-Matricula' element={<Proceso_Matricula/>} />
      <Route path='/Servicios-Adicionales' element={<Servicios_Adicionales/>} />
      <Route path='/Testimonios' element={<Testimonios/>} />
      <Route path='/Noticias' element={<Noticias/>} />
    <Route path='/Login' element={<Login/>} />
 
    <Route path='/MesaPartes/Formulario' element={<QuejaFormulario/>} />
    <Route path='/MesaPartes/Busqueda-Solicitud' element={<Busqueda/>} />
<Route path='/MesaPartes' element={ <MesaPartes/>}  />

{/* RUTAS DEL SISTEMA WEB POR SESSION  */}
<Route path='/Sistema-Administrador/Entrada' element={ eleccion1(<Entrada/>) } />
    <Route path='/Sistema-Administrador/Atencion-Cliente/MesaPartes' element={eleccion1(<MesaPartes_Post/>)} />

    <Route path='/Sistema-Administrador/Atencion-Cliente/CRM' element={eleccion1(<CRM/>)} />

    <Route path='/Sistema-Administrador/Atencion-Cliente/Estudiantes' element={eleccion1(<Estudiantes/>)} />


    <Route path='/Sistema-Administrador/Perfil' element={eleccion1(<Perfil/>)} />


</Routes>
  
    </div>
  );
}

export default Controller_Page;