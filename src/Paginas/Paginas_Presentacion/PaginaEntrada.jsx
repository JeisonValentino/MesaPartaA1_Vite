import React,{ Fragment, useEffect, useRef, useState } from "react"
import  Cabecera  from "./Complemets/Cabecera"
import { Suelo } from "./Complemets/Suelo"
import './PaginaEntrada.css'

import videoColegioVentas from './Imagenes/videoColegioVentas.mp4'
import Loading from "../ControladorPage/Loading"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {  faCirclePlay } from "@fortawesome/free-regular-svg-icons"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import $ from 'jquery'
const PaginaEntrada = ()=>{
const [loading ,setLoading]=useState(false);
const [play, setPlay]=useState(false);
const vidRef = useRef(null);
const [bajarEvento,setBajarEvento]=useState(false)
const cambiarEstado=()=>{
    setLoading(true);
    setTimeout(()=>{

        setLoading(false);
    },500)
}

useEffect(()=>{
    return cambiarEstado()
}, [])


useEffect(()=>{
 
       
        vidRef.current.pause();

},[play])

const BajarVideo = ()=>{
  
  
    return play?'bajar':''

}

const  bajarEventoEvaluacion=(v1)=>{


    setBajarEvento(v1);
  }

return(

    <Fragment>
<div className={'videoFormato '+BajarVideo()} onClick={()=>setPlay(!play)}>
<div className="Cerrar" onClick={()=>setPlay(!play)} >
<div>
    <FontAwesomeIcon icon={faXmark}/></div>
</div>
<video  ref={vidRef} id="myvideo" controls style={{with:"800px" , height:"550px",position:"relative",top:"7%",left:"30%"}} >
    <source  style={{with:"100%" , height:"100%" }}  src={videoColegioVentas} type="video/mp4" ></source>
                    </video>
</div>
 <Cabecera bajarEventoEvaluacion={bajarEventoEvaluacion} />

{loading ? <Loading/>: 
<>
{bajarEvento ? (<></>):(<>
<div className="main">

  <div className="container_Presentacion" >
  <video style={{with:"100%" , height:"100%"}} >
                        <source style={{with:"100%" , height:"100%",position:"absolute" ,top:0,left:0}}  src={videoColegioVentas} type="video/mp4" ></source>
                    </video>
                    
  </div>
  <div className="play" onClick={()=>setPlay(!play)}>
  <FontAwesomeIcon icon={faCirclePlay}/>
  </div> 
</div> 
{play?<></>:<Suelo/>}
</> )}
</>
}




    </Fragment>
)
}


export default PaginaEntrada