import { QuejaFormulario } from '../Paginas_Login_panel/Paginas/QuejaFormulario';
import { Route  , BrowserRouter as Router, Routes, BrowserRouter } from 'react-router-dom';
import '../../App.css';

import { MesaPartes } from '../Paginas_Login_panel/Paginas/MesaPartes';
import { Busqueda } from '../Paginas_Login_panel/Paginas/QUEJAS_RECLAMOS/Busqueda';
import { Entrada } from '../Paginas_Login_panel/Paginas/pagesLogin/Entrada';
import { MesaPartes_Post } from '../Paginas_Login_panel/Paginas/pagesLogin/ModulosExtencion/AtencionCliente/MesaPartes_Post';
import React ,{ useRef } from 'react';
import PaginaEntrada from '../Paginas_Presentacion/PaginaEntrada';
import  ElColegio  from '../Paginas_Presentacion/ElColegio';
import Nuestras_Sedes from '../Paginas_Presentacion/Nuestras_Sedes';
import Proceso_Matricula from '../Paginas_Presentacion/Proceso_Matricula';
import Servicios_Adicionales from '../Paginas_Presentacion/Servicios_Adicionales';
import Testimonios from '../Paginas_Presentacion/Testimonios'
import Noticias from '../Paginas_Presentacion/Noticias'
import CRM from '../Paginas_Login_panel/Paginas/pagesLogin/ModulosExtencion/AtencionCliente/CRM';
import Estudiantes from '../Paginas_Login_panel/Paginas/pagesLogin/ModulosExtencion/AtencionCliente/Estudiantes';
import Perfil from '../Paginas_Login_panel/Paginas/pagesLogin/Perfil';
import Error404 from './Error404';
import FormularioLogin from '../Paginas_Login_panel/Paginas/FormularioLogin'
import { Provider} from 'react-redux';
import PublicRoute from './PublicRoute';
import PrivateRouter from './PrivateRouter';

import Salir from './Salir';
import store from './../Paginas_Login_panel/ConfigurationAuthenticacion/store';
import {  checkToken2 } from './authContext';
import Usuarios from '../Paginas_Login_panel/Paginas/pagesLogin/ModulosExtencion/Administrador/Usuarios';
import  Empleado  from '../Paginas_Login_panel/Paginas/pagesLogin/ModulosExtencion/Administrador/Empleado';

function Controller_Page() {

  checkToken2()
  return (
    
   <BrowserRouter>
   <Provider store={store}>
  
  
      <Routes>
      

   <Route path='/' element={<PublicRoute/>}>
      <Route index element={<PaginaEntrada/>} />
      <Route path='El-Colegio' element={<ElColegio/>} />
      <Route path='Nuestras-Sedes' element={<Nuestras_Sedes/>} />
      <Route path='Proceso-Matricula' element={<Proceso_Matricula/>} />
      <Route path='Servicios-Adicionales' element={<Servicios_Adicionales/>} />
      <Route path='Testimonios' element={<Testimonios/>} />
      <Route path='Noticias' element={<Noticias/>} />
    
 
    <Route path='MesaPartes/Formulario' element={<QuejaFormulario/>} />
    <Route path='MesaPartes/Busqueda-Solicitud' element={<Busqueda/>} />
<Route path='MesaPartes' element={ <MesaPartes/>}  />
<Route path='Login' element={<FormularioLogin/>}/>

</Route>


{/* RUTAS DEL SISTEMA WEB POR SESSION  */}
<Route path={'Sistema-Administrador'}  element={<PrivateRouter/>} >

<Route index element={ <Entrada/> } />
<Route path='/Sistema-Administrador/salir' element={<Salir/>}/>

    <Route path='/Sistema-Administrador/Atencion-Cliente/MesaPartes' element={(<MesaPartes_Post/>)} />

    <Route path='/Sistema-Administrador/Atencion-Cliente/CRM' element={(<CRM/>)} />

    <Route path='/Sistema-Administrador/Atencion-Cliente/Estudiantes' element={(<Estudiantes/>)} />


    <Route path='/Sistema-Administrador/Administrador/Usuarios' element={(<Usuarios/>)} />
    <Route path='/Sistema-Administrador/Administrador/Empleado' element={(<Empleado/>)} />
    <Route path='/Sistema-Administrador/Perfil' element={(<Perfil/>)} />
   
    </Route>

    
    <Route path='*' element={<Error404/>}/>
</Routes>

</Provider>

  </BrowserRouter>

    
  );
}

export default Controller_Page;