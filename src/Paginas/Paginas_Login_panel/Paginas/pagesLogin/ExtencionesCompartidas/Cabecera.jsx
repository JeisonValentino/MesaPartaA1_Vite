import { Link, Navigate, useNavigate } from "react-router-dom"
import { Toast } from 'primereact/toast';
import { useEffect, useRef, useState } from "react";
import { Accordion, AccordionTab } from 'primereact/accordion';


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignJustify, faDoorClosed, faDoorOpen, faUser } from "@fortawesome/free-solid-svg-icons";
import './Cabecera.css'
import { Sidebar } from 'primereact/sidebar';
import { Button } from "primereact/button";
import { Buffer } from "buffer";
import {useSelector,useDispatch} from 'react-redux'
import styled from 'styled-components';
import { Service } from "../Service";
import { checkToken, logout } from "../../../../ControladorPage/authContext";


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


  const dispach = useDispatch();
  const [visible,setVisibleRight]=useState(false)
const [validaUrl,setValidaUrl]=useState(false);

const [perfil,setPerfil]=useState({});

const dispatch=useDispatch()

const [name, setName] = useState('');
const [navigate, setNavigate] = useState(false);

var URLactual = window.location.pathname;
const {pruebaConsole , pruebaConsole2,pruebaConsole3 , pruebaConsole4} = props;







useState(async ()=>{


  await Service.retornarPerfl().then(response =>{
    setPerfil(response)
    console.log(response)
  })


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


    const toast = useRef(null);
   
   
    function getAbsolutePath() {
        var loc = window.location;
        var pathName = loc.pathname.substring(0, loc.pathname.lastIndexOf('/') + 1);
        return loc.href.substring(0, loc.href.length - ((loc.pathname + loc.search + loc.hash).length - pathName.length));
    }


    
    const loggedin=useSelector(state =>state.auth.loggedIn);


    const showInfo = () => {
        toast.current.show({severity:'info', summary: 'Mensaje informativo ', detail:`Ya se encuentra en la pagina    ${getAbsolutePath()} `, life: 3000});
    }
return(

<div className="cabeceraFija" >
  <div id="cabecera" className='cabecera'>
  
  <Sidebar visible={visible} onHide={() => setVisibleRight(false)}>
  <div className="Usuario">
  {perfil?.photo ? (
    <img style={{width:"60%",height:"40%"}} src={onchangeImage(perfil.photo)} />
  
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
    
  
  </Accordion>
  
   <div className="contenido CerrarSession" onClick={()=>
  dispatch(logout())} >Salir <FontAwesomeIcon icon={faDoorOpen}/> </div>
   
  </Sidebar>
          <div id="cabecera2"   className="cabecera2">
      
          <Button id='botonActivadorLateral' onClick={() => setVisibleRight(true) } >
          <FontAwesomeIcon
            icon={ faAlignJustify }
          ></FontAwesomeIcon>
          </Button>
          {URLactual==='/Sistema-Administrador/Administrador/Empleado' ? <div><Button className='botonFiltrador'  style={{zIndex:"8",fontSize:"80%" }} onClick={() => pruebaConsole2(true)} >Mostrar Filtro</Button></div> :<></>}
          {URLactual==='/Sistema-Administrador/Administrador/Usuarios' ? <div><Button className='botonFiltrador'  style={{zIndex:"8",fontSize:"80%" }} onClick={() => pruebaConsole(true)} >Mostrar Filtro</Button></div> :<></>}

          </div>
          </div>
</div>
)
}