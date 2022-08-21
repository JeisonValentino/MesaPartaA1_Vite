import { Fragment, useEffect, useState } from "react";
import Loading from "../ControladorPage/Loading";
import  Cabecera  from "./Complemets/Cabecera";
import { Suelo } from "./Complemets/Suelo";
const Testimonios = ()=>{

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

    <Suelo/> </>)}  </div>

}

    </Fragment>
)

}

export default Testimonios ;