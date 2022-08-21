import { Fragment, useEffect, useState } from "react";
import Loading from "../ControladorPage/Loading";
import Sede from './Imagenes/Sede.jpeg'
import  Cabecera  from "./Complemets/Cabecera";
import { Suelo } from "./Complemets/Suelo";
import './Nuestras_Sedes.css'
 const Nuestras_Sedes = ()=>{
    const [loading ,setLoading]=useState(false);

    const cambiarEstado=()=>{
        setLoading(true);
        setTimeout(()=>{
    
            setLoading(false);
        },500)
    }
    
    useEffect(()=>{
        return cambiarEstado()
    }, [])
    
    
    
    
    
    const [bajarEvento,setBajarEvento]=useState(false)
    
    const  bajarEventoEvaluacion=(v1)=>{


        setBajarEvento(v1);
      }
    
    
    
    
    return(
    
        <Fragment>

<Cabecera bajarEventoEvaluacion={bajarEventoEvaluacion} />
    {loading ? <Loading/>:<div>
    {bajarEvento ? (<></>):(<>  

<div className="Container_Nuestras_Sedes">
    <img style={{width:"100%" , height:"100%"}} src={Sede}  />
</div>


    <Suelo/> </>)}  </div>

}

    </Fragment>
)

}
export default Nuestras_Sedes; 