import { QuejaFormulario } from '../Paginas_Login_panel/Paginas/QuejaFormulario';
import { Route  , BrowserRouter as Router, Routes, BrowserRouter, Outlet, Navigate } from 'react-router-dom';
import '../../App.css';

import { MesaPartes } from '../Paginas_Login_panel/Paginas/MesaPartes';
import { Busqueda } from '../Paginas_Login_panel/Paginas/QUEJAS_RECLAMOS/Busqueda';
import { Entrada } from '../Paginas_Login_panel/Paginas/pagesLogin/Entrada';
import { MesaPartes_Post } from '../Paginas_Login_panel/Paginas/pagesLogin/ModulosExtencion/AtencionCliente/ComponentMesaPartesPost/MesaPartes_Post';
import React ,{ useRef } from 'react';
import PaginaEntrada from '../Paginas_Presentacion/Inicio/PaginaEntrada';
import  ElColegio  from '../Paginas_Presentacion/Nosotros/ElColegio';
import Nuestras_Sedes from '../Paginas_Presentacion/Servicios/Nuestras_Sedes';
import Proceso_Matricula from '../Paginas_Presentacion/Matricula/Proceso_Matricula';
import Testimonios from '../Paginas_Presentacion/Contacto/Testimonios'
import Noticias from '../Paginas_Presentacion/Blog/Noticias'
import CRM from '../Paginas_Login_panel/Paginas/pagesLogin/ModulosExtencion/AtencionCliente/CRM';
import Estudiantes from '../Paginas_Login_panel/Paginas/pagesLogin/ModulosExtencion/AtencionCliente/Estudiantes';
import Perfil from '../Paginas_Login_panel/Paginas/pagesLogin/Perfil';
import Error404 from './Error404';
import { Provider, useSelector} from 'react-redux';
import PublicRoute from './PublicRoute';
import PrivateRouter from './PrivateRouter';

import Salir from './Salir';
import store from './../Paginas_Login_panel/ConfigurationAuthenticacion/store';

import Usuarios from '../Paginas_Login_panel/Paginas/pagesLogin/ModulosExtencion/Administrador/Usuarios';
import  Empleado  from '../Paginas_Login_panel/Paginas/pagesLogin/ModulosExtencion/Administrador/Empleado';
import LoginControlador from './LoginControlador';
import { PDF_Render } from '../Paginas_Login_panel/Paginas/QUEJAS_RECLAMOS/PDF/PDF_Render';
import Almacenamiento from '../Paginas_Login_panel/Paginas/pagesLogin/ModulosExtencion/Mantenimiento/Almacenamiento';
import Page_admision from '../Paginas_Presentacion/Admision/Page_admision';
import Politicas_Privacidad from '../Paginas_Presentacion/Politicas/Politicas_Privacidad';
import Formulario_Reclamaciones from '../Paginas_Presentacion/Reclamos/Formulario_Reclamaciones';
import Page_Solicitud_Admision from '../Paginas_Presentacion/Admision/Solicitud_Admision.jsx/Page_Solicitud_Admision';
import Preguntas_frecuentes from '../Paginas_Presentacion/Preguntas_Frecuentes/Preguntas_frecuentes';
import Pagina_Opinion from '../Paginas_Presentacion/Blog/Paginas_contenido/Pagina_Opinion';
import Store_Provider_component from './../Paginas_Login_panel/ConfigurationAuthenticacion/context/Store_Provider_component'
import useStoreDialog from '../Paginas_Login_panel/ConfigurationAuthenticacion/reducer/dialog_reducer';
import { GoogleOAuthProvider } from '@react-oauth/google';
import FormularioPassword from '../Paginas_Login_panel/Paginas/FormularioPassword';
import GoogleAuthLogin from '../Paginas_Login_panel/Paginas/GoogleAuthLogin';
import FormularioLogin from '../Paginas_Login_panel/Paginas/FormularioLogin';
import FormularioRecuperacionContraseña from '../Paginas_Login_panel/Paginas/FormularioRecuperacionContraseña';
function Controller_Page() {
 
  return (
    
   <BrowserRouter>
    <Store_Provider_component />
   <Provider store={store}>
  
  
      <Routes>
      

   <Route path='/' element={<PublicRoute/>}>
      <Route index element={<PaginaEntrada/>} />
      <Route path='Nosotros' element={<ElColegio/>} />
      <Route path='Servicios' element={<Nuestras_Sedes/>} />
      <Route path='Admision' element={<Page_admision/>} />
      <Route path='Admision/Solicitud' element={<Page_Solicitud_Admision/>} />
      <Route path='Matricula' element={<Proceso_Matricula/>} />
      <Route path='Blog' element={<Noticias/>} />
      <Route path='Blog/:titulo' element={<Pagina_Opinion/>} />

      <Route path='Contacto' element={<Testimonios/>} />
      <Route path='Politicas-Privacidad' element={<Politicas_Privacidad/>} />
      <Route path='Reclamaciones' element={<Formulario_Reclamaciones/>} />
      <Route path='Preguntas-Frecuentes' element={<Preguntas_frecuentes/>} />

      <Route path='pdf' element={<PDF_Render/>} />
    <Route path='Libro-Reclamaciones' element={<QuejaFormulario/>} />
    <Route path='MesaPartes/Busqueda-Solicitud' element={<Busqueda/>} />
<Route path='MesaPartes' element={ <MesaPartes/>}  />
<Route path='salir' element={<Salir/>} />
</Route>

<Route path='Login/*' element={<LoginControlador/>} >
<Route  path="Identification"  element={<GoogleAuthLogin/>} />
<Route path='Password' element={  <FormularioPassword/>} />
<Route path='Password/reset-password/:token' element={  <FormularioRecuperacionContraseña/>} />
<Route path="" element={<Navigate to="Identification" />} />
<Route path="Password/reset-password" element={<Navigate to="/Login" />} />
</Route>

{/* RUTAS DEL SISTEMA WEB POR SESSION  */}
<Route path={'Sistema-Administrador'}  element={<PrivateRouter/>} >

<Route index element={ <Entrada/> } />
<Route path='/Sistema-Administrador/salir' element={<Salir/>}/>
{ /* 
       Modulos de Mantenimiento
    */}

    <Route path='/Sistema-Administrador/Mantenimiento/Almacenamiento' element={(<Almacenamiento/>)} />

{ /* 
       Modulos de Atencion al Cliente
    */}
    <Route path='/Sistema-Administrador/Atencion-Cliente/MesaPartes' element={(<MesaPartes_Post/>)} />

    <Route path='/Sistema-Administrador/Atencion-Cliente/CRM' element={(<CRM/>)} />

    <Route path='/Sistema-Administrador/Atencion-Cliente/Estudiantes' element={(<Estudiantes/>)} />

    { /* 
       Modulos del Administrador
    */}
    <Route path='/Sistema-Administrador/Administrador/Usuarios' element={(<Usuarios/>)} />
    <Route path='/Sistema-Administrador/Administrador/Empleado' element={(<Empleado/>)} />

   { /* 
        Modulo Perfil
    */}
    
    <Route path='/Sistema-Administrador/Perfil' element={(<Perfil/>)} />

    </Route>

    
    <Route path='*' element={<Error404/>}/>
</Routes>

</Provider>

  </BrowserRouter>

    
  );
}

export default Controller_Page;