import { QuejaFormulario } from '../Paginas_Login_panel/Paginas/QuejaFormulario';
import { Route, Routes } from 'react-router-dom';
import '../../App.css';
import { useSelector } from 'react-redux';
import { checkToken, Login } from '../Paginas_Login_panel/Paginas/Login';
import { MesaPartes } from '../Paginas_Login_panel/Paginas/MesaPartes';
import { Busqueda } from '../Paginas_Login_panel/Paginas/QUEJAS_RECLAMOS/Busqueda';
import { Entrada } from '../Paginas_Login_panel/Paginas/pagesLogin/Entrada';
import { MesaPartes_Post } from '../Paginas_Login_panel/Paginas/pagesLogin/ExtencionesCompartidas/MesaPartes_Post';
import React ,{ useRef } from 'react';
import { Toast } from 'primereact/toast';
import Session_Invalid from './Session_Invalid';
import PaginaEntrada from '../Paginas_Presentacion/PaginaEntrada';
import  ElColegio  from '../Paginas_Presentacion/ElColegio';
import Nuestras_Sedes from '../Paginas_Presentacion/Nuestras_Sedes';
import Proceso_Matricula from '../Paginas_Presentacion/Proceso_Matricula';
import Servicios_Adicionales from '../Paginas_Presentacion/Servicios_Adicionales';
import Testimonios from '../Paginas_Presentacion/Testimonios'
import Noticias from '../Paginas_Presentacion/Noticias'
function Controller_Page() {

  const loggedin=useSelector(state =>state.auth.loggedIn);
  const toast = useRef(null).current;
 
  checkToken();
  
  function eleccion1(a){
    if(loggedin===true){

 
    
       return a

   
   }else {


     return <Session_Invalid/>
     }  
 
    }

  return (
    <div  className="App">
    <Toast ref={toast} />
  
      <Routes>


      <Route path='/' element={<PaginaEntrada/>} />
      <Route path='/El-Colegio' element={<ElColegio/>} />
      <Route path='/Nuestras-Sedes' element={<Nuestras_Sedes/>} />
      <Route path='/Proceso-Matricula' element={<Proceso_Matricula/>} />
      <Route path='/Servicios-Adicionales' element={<Servicios_Adicionales/>} />
      <Route path='/Testimonios' element={<Testimonios/>} />
      <Route path='/Noticias' element={<Noticias/>} />
    <Route path='/Login' element={<Login/>} />
    <Route path='/Entrada' element={ eleccion1(<Entrada/>) } />
    <Route path='/MesaPartes/Respuesta' element={eleccion1(<MesaPartes_Post/>)} />
    <Route path='/MesaPartes/Formulario' element={<QuejaFormulario/>} />
    <Route path='/MesaPartes/Busqueda-Solicitud' element={<Busqueda/>} />
<Route path='/MesaPartes' element={ <MesaPartes/>}  />
</Routes>
  
    </div>
  );
}

export default Controller_Page;