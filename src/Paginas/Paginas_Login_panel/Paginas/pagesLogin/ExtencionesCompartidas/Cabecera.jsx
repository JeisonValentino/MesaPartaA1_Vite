import { Link, Navigate, useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from "react";
import { Accordion, AccordionTab } from 'primereact/accordion';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignJustify, faDoorClosed, faDoorOpen, faFileExcel, faUser } from "@fortawesome/free-solid-svg-icons";
import './Cabecera.css'
import { Sidebar } from 'primereact/sidebar';
import { Button } from "primereact/button";
import {useSelector,useDispatch} from 'react-redux'
import styled from 'styled-components';
import { Service } from "../Service";
import { checkToken, logout, reloadToken } from "../../../../ControladorPage/authContext";
import { Toast } from 'primereact/toast';
import { Fragment } from "react";

 const Style_link = styled(Link)`

color: #6c757d;
    font-weight:bold;
    font-size: 80%;
    transition:all 0.4s linear ;
    text-transform: uppercase;
    font-family: 'Open Sans,Arial,sans-serif';
 text-decoration: none;
    &:hover{
    color: white;
}



`;



export const Cabecera = (props)=>{


  const [visible,setVisibleRight]=useState(false)

const toastBC = useRef(null);
const [perfil,setPerfil]=useState({});
var URLactual = window.location.pathname;
const {pruebaConsole , pruebaConsole2,MostrarToolbar , setAbrirToolBar,abrirToolBar, contenidoToolBar} = props;
const [contador , setContador]=useState(0)
const [contadorCambio, setContadorCambio]=useState(10)

const redirect = useNavigate()
const dispatch=useDispatch();


const [validaUrl,setValidaUrl]=useState(true);
useEffect(()=>{
  const intervalo = setInterval(() => {


  checkToken()

  if (!localStorage.jwtToken){
    redirect("/salir")
    }

  },1000)
 
return () =>{
  clearInterval(intervalo)
}
  
},[validaUrl===false])


useEffect(()=>{
  if(validaUrl){
    console.log("se revalido el token ")
    reloadToken()
    setValidaUrl(false)
  }
},[validaUrl])



const  retornarPerfl =  async()=> {
  await Service.retornarPerfl().then(response =>{
    setPerfil(response)
    
  })
}

useEffect ( ()=>{


 
  retornarPerfl()

},[])


    useEffect(()=>{
    
        document.getElementById("cabecera").addEventListener("mouseleave" , ()=>{
        
         
           
            
            document.getElementById("cabecera2").classList.remove("mostrarCabecera")
        
        })
        
          document.getElementById("cabecera").addEventListener("mouseenter" , ()=>{
        
         
           
            
            document.getElementById("cabecera2").classList.add("mostrarCabecera")
        
          })
        
        },[])

const validarUrl=(va)=>{

  if(window.location.pathname ===va){
  return "contenidoSub sobreUrl"
   

  }else {
    return "contenidoSub "
  }

 
}
const leftToolbarTemplate = () => {
  return (
      <Fragment >
      
        <div >
        <button style={{width:"100%"}} className="p-sidebar-icon p-link mr-1">
        <span className="pi pi-print" /><div style={{marginLeft:"4px"}}>PDF</div> 
          </button>
          <button style={{width:"100%"}} className="p-sidebar-icon p-link mr-1">
          <FontAwesomeIcon icon={faFileExcel}/> <div style={{marginLeft:"4px"}}>Excel</div>
          </button>
        </div>
      </Fragment>
  )
}

const onchangeImage= (dat)=>{





  var reader =new FileReader();

  if(dat !=null){

  const byteCharacters = atob(dat);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  
  const blob = new Blob([byteArray], {type: 'image/jpeg'});
  
  reader.addEventListener("load", function () {
      
      return reader.result
  })

  reader.readAsDataURL(blob)
  return URL.createObjectURL(blob)

}else{
  
  
  return ""}

  }



const valida=()=>{
  setValidaUrl(true)
  dispatch(reloadToken())
}
return(

<div className="cabeceraFija" >

<Toast ref={toastBC} position="bottom-center" />
  <div id="cabecera" className='cabecera'>
  <Sidebar visible={visible} onHide={() => setVisibleRight(false)}>
  <div className="Usuario">
  {perfil?.photo?.data? (
    <img style={{maxWidth:"50%"}} src={onchangeImage(perfil.photo.data)} />
  
  ):(
  <FontAwesomeIcon style={{width:"60%",height:"40%"}} icon={faUser}/>
  
  )}
  
  <div className="nombrePefil">
  {`${perfil.nombre}  ${perfil.apellidoPaterno} ${perfil.apellidoMaterno}`}
  </div>
  <Link to="/Sistema-Administrador/Perfil">
  <div className={validarUrl("/Sistema-Administrador/Perfil")}>Ver perfil</div></Link>
  </div>
  <Link to="/Sistema-Administrador">
  <div className={validarUrl("/Sistema-Administrador")}>Inicio</div></Link>
  <Accordion multiple>
  <AccordionTab header="Administrador ">
      <div className="barrasLinks">
  
      <Style_link to="/Sistema-Administrador/Administrador/Usuarios"> <div className={validarUrl("/Sistema-Administrador/Administrador/Usuarios")} >Usuarios</div> </Style_link>
  
      <Style_link to="/Sistema-Administrador/Administrador/Empleado"> <div className={validarUrl("/Sistema-Administrador/Administrador/Empleado")} >Empleados</div> </Style_link>
  </div>
      </AccordionTab>
      <AccordionTab header="Atencion al cliente ">
      <div className="barrasLinks">
      
          <Style_link to="/Sistema-Administrador/Atencion-Cliente/MesaPartes"><div className={validarUrl("/Sistema-Administrador/Atencion-Cliente/MesaPartes")}>Mesa de partes</div> </Style_link>
  
          
          <Style_link to="/Sistema-Administrador/Atencion-Cliente/CRM"><div className={validarUrl("/Sistema-Administrador/Atencion-Cliente/CRM")}>CRM</div></Style_link>
          
           <Style_link to="/Sistema-Administrador/Atencion-Cliente/Estudiantes"> <div className={validarUrl("/Sistema-Administrador/Atencion-Cliente/Estudiantes")} >Estudiantes</div> </Style_link></div>
  
       
      </AccordionTab>
    

      <AccordionTab header="Mantenimiento">
      <Style_link to="/Sistema-Administrador/Mantenimiento/Almacenamiento"><div className={validarUrl("/Sistema-Administrador/Mantenimiento/Almacenamiento")}>Almacenamiento</div> </Style_link>
      </AccordionTab>
  
  </Accordion>
  
   <div className="contenido CerrarSession" onClick={()=>
  dispatch(logout())} >Salir <FontAwesomeIcon icon={faDoorOpen}/> </div>
   
  </Sidebar>

  <Sidebar position="right" visible={abrirToolBar} onHide={() => setAbrirToolBar(false)} icons={leftToolbarTemplate}>
                 <div style={{display:"flex" ,justifyContent:"center",alignContent:"center"}}>
                 
                 <h3>Opciones Interactivas </h3></div>
                 <div >
     
                         <div style={{display:"flex" ,justifyContent:"center",alignContent:"center"}}>

{contenidoToolBar?contenidoToolBar():""}

                         </div>
                         </div>
                         </Sidebar>
          <div id="cabecera2"   className="cabecera2">
      
          <Button id='botonActivadorLateral' onClick={() => setVisibleRight(true) } >
          <FontAwesomeIcon
            icon={ faAlignJustify }
          ></FontAwesomeIcon>
          </Button>
          {URLactual==='/Sistema-Administrador/Administrador/Empleado' ? <div><Button className='botonFiltrador'  style={{zIndex:"8",fontSize:"80%" }} onClick={() => pruebaConsole2(true)} >Mostrar Filtro</Button></div> :<></>}
          {URLactual==='/Sistema-Administrador/Administrador/Usuarios' ? <div><Button className='botonFiltrador'  style={{zIndex:"8",fontSize:"80%" }} onClick={() => pruebaConsole(true)} >Mostrar Filtro</Button></div> :<></>}
          {
            URLactual==='/Sistema-Administrador/Atencion-Cliente/Estudiantes' ?<div><Button className='botonFiltrador'  style={{zIndex:"8",fontSize:"80%" }} onClick={() => MostrarToolbar(true)} >Mostrar Filtro</Button></div>:<></>
          }
          {
            URLactual==='/Sistema-Administrador/Mantenimiento/Almacenamiento' ?<div><Button className='botonFiltrador'  style={{zIndex:"8",fontSize:"80%" }} onClick={() => setAbrirToolBar(true)} >Mostrar Filtro</Button></div>:<></>
          }
          </div>
          </div>
       
</div>
)
}