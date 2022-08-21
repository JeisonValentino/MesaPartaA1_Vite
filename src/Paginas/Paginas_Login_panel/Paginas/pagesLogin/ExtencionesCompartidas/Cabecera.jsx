import { Link } from "react-router-dom"
import { Toast } from 'primereact/toast';
import { useEffect, useRef, useState } from "react";
import { Accordion, AccordionTab } from 'primereact/accordion';
import { logoutUser } from "../../Login";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignJustify } from "@fortawesome/free-solid-svg-icons";
import './Cabecera.css'
import { Button } from "primereact/button";
export const Cabecera = ()=>{

    useEffect(()=>{
    
        document.getElementById("cabecera").addEventListener("mouseleave" , ()=>{
        
         
           
            
            document.getElementById("cabecera2").classList.remove("mostrarCabecera")
        
        })
        
          document.getElementById("cabecera").addEventListener("mouseenter" , ()=>{
        
         
           
            
            document.getElementById("cabecera2").classList.add("mostrarCabecera")
        
          })
        
        },[])


    const toast = useRef(null);
    const [activeIndex, setActiveIndex] = useState(null); const dispatch = useDispatch()
   
    function getAbsolutePath() {
        var loc = window.location;
        var pathName = loc.pathname.substring(0, loc.pathname.lastIndexOf('/') + 1);
        return loc.href.substring(0, loc.href.length - ((loc.pathname + loc.search + loc.hash).length - pathName.length));
    }
    const showInfo = () => {
        toast.current.show({severity:'info', summary: 'Mensaje informativo ', detail:`Ya se encuentra en la pagina    ${getAbsolutePath()} `, life: 3000});
    }
return(
<div id="cabecera" className='cabecera'>
        <div id="cabecera2"   className="cabecera2">
    
        <Button id='botonActivadorLateral' onClick={() => setVisibleRight(true) } className="mr-2">
        <FontAwesomeIcon
          icon={ faAlignJustify }
        ></FontAwesomeIcon>
        </Button>
        </div>
        </div>
)
}