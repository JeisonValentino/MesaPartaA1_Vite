
import { faList, faShareNodes, faXmark } from '@fortawesome/free-solid-svg-icons'
import { faFacebook,faInstagram,faTiktok} from '@fortawesome/free-brands-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react';
import imagenCole from './../Imagenes/imagenCole.png'
import Logo from '../Imagenes/Logo.png'
import './cabecerca.css'
import './CabeceraSass.scss'
import { Style_link }from './Style_link.jsx';

import styled from 'styled-components';
import { Link } from 'react-router-dom';





export default function  Cabecera (props) {
   const [menuIcon,SetMenuIcon] = useState(true); 

   const[bajarEvento,setBajarEvento]=useState(false);
   
   useEffect(() => {
    
   window.addEventListener("scroll",function(){
       var header=document.querySelector(".header_Presentacion");
     return   header.classList.toggle("header_Presentacion_scroll",window.scrollY > 0 )
   })
   
   
   }, []);
   
   useEffect(() => {
    
       window.addEventListener("scroll",function(){
           var header=document.querySelector(".logo2");
         return   header.classList.toggle("logo2Scroll",window.scrollY > 0 )
       })
       
       
       }, []);

useEffect(()=>{

if(bajarEvento){
  document.body.classList.add('scrollOverflow');
}else{
  document.body.classList.remove('scrollOverflow'); 
}

},[bajarEvento])

useEffect(()=>{

  if(!menuIcon){
    document.body.classList.add('scrollOverflow');
  }else{
    document.body.classList.remove('scrollOverflow'); 
  }
  
  },[menuIcon])

const cambiarCampo=()=>{
 
 return bajarEvento ?" bajar":""
}


const CambiarEstadoCabecera = ()=>{


  return menuIcon ? "":"show";
}

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
    color: red;
    font-size: 1.5rem;
    cursor: pointer;
    
`;


return (
<><div className={"CampoRedes_Sociales "+cambiarCampo()}>
<div className="Cerrar" onClick={ () =>{setBajarEvento(!bajarEvento)}} >
  <FontAwesomeIcon icon={faXmark}>


  </FontAwesomeIcon></div>

<div className="iconos_RedesSociales">
<a style={{textDecoration:"none"}} target='_blank' rel="noopener noreferrer" href='https://www.facebook.com/circuloschoolingenieriaoficial' >
  <div className='Facebook'><FontAwesomeIcon  icon={faFacebook}>
 

  </FontAwesomeIcon></div>  </a>
  <a style={{textDecoration:"none"}} target='_blank' rel="noopener noreferrer" href='https://www.instagram.com/circuloa1school.oficial/' >
  <div className='Instagram'  ><i  className="fa fa-instagram instagram" aria-hidden="true"/>
  

  </div> </a>

  


  <a style={{textDecoration:"none"}} target='_blank' rel="noopener noreferrer" href='https://www.tiktok.com/@circuloa1school?is_from_webapp=1&sender_device=pc' >
  <div className='tiktok'>

<svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="tiktok" class="svg-inline--fa fa-tiktok sc-iqcoie eKzIjO tiktok" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
<defs>
<linearGradient   x1='.258%' y1='49.75%' x2='101.258%' y2='49.75%' id='bgGradient' > 
		
                <stop offset='33%'  stop-color='white'  />
          
	   </linearGradient></defs>

<path fill="currentColor" d="M448 209.9a210.1 210.1 0 0 1 -122.8-39.25V349.4A162.6 162.6 0 1 1 185 188.3V278.2a74.62 74.62 0 1 0 52.23 71.18V0l88 0a121.2 121.2 0 0 0 1.86 22.17h0A122.2 122.2 0 0 0 381 102.4a121.4 121.4 0 0 0 67 20.14z" stroke="url(#bgGradient)"  ></path></svg>


 </div></a>
</div>

</div>
<div className='header_Presentacion'>

<img className="logo2" src={imagenCole} ></img>

<nav className={ 'nav_Presentacion'}>
<ul className={ 'nav__links'}>
    <li >
    <Style_link to="/" className='linkCabecera'  ><div >PAGINA DE INICIO </div></Style_link></li>
    <li><Style_link to="/El-Colegio" className='linkCabecera' s>El colegio  </Style_link></li>
    <li><Style_link to="/Proceso-Matricula" className='linkCabecera' >Proceso de matricula  </Style_link></li>
    <li><Style_link to="/Nuestras-Sedes" className='linkCabecera' >Nuestras sedes  </Style_link></li>
 
    <li><Style_link to="/Servicios-Adicionales" className='linkCabecera' >Servicios adicionales  </Style_link></li>
  
    <li><div className='iconfanpages' onClick={ () =>{setBajarEvento(!bajarEvento)}}><FontAwesomeIcon icon={faShareNodes}/> </div></li>
    </ul>
</nav>




</div>


<div className={"nav_PresentacionMovil " + CambiarEstadoCabecera()}>
<span className='CerrarNav'  onClick={()=> SetMenuIcon(!menuIcon) }><FontAwesomeIcon style={{width:"50px",height:"50px"}} icon={faXmark} /></span>

<nav className={ 'navCabeceraMovil'}>
<img className="logo3"  src={Logo} ></img>
<ul className={ ''}>
    <li >
    <Style_link to="/" className='linkCabecera'  ><div >PAGINA DE INICIO </div></Style_link></li>
    <li><Style_link to="/El-Colegio" className='linkCabecera' s>El colegio  </Style_link></li>
    <li><Style_link to="/Proceso-Matricula" className='linkCabecera' >Proceso de matricula  </Style_link></li>
    <li><Style_link to="/Nuestras-Sedes" className='linkCabecera' >Nuestras sedes  </Style_link></li>
 
    <li><Style_link to="/Servicios-Adicionales" className='linkCabecera' >Servicios adicionales  </Style_link></li>
  
    <li><div className='iconfanpages' onClick={ () =>{setBajarEvento(!bajarEvento)}}><FontAwesomeIcon icon={faShareNodes}/> </div></li>
    </ul>
</nav>


</div>





<div className="menu-Icon-Header">
<span className='menu-Icon' onClick={()=> SetMenuIcon(!menuIcon) }><FontAwesomeIcon icon={faList} /></span>
</div>
</>

)

}