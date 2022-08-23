import { Fragment, useEffect, useState } from "react";
import Loading from "../ControladorPage/Loading";
import  Cabecera  from "./Complemets/Cabecera"
import { Suelo } from "./Complemets/Suelo"

 const  Noticias=()=>{
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
    
    
    
      const [ElevarEvento,setElevarEvento]=useState(true);
      const MostrarEvento=(v1)=>{
          setElevarEvento(v1)
      }
    
    return(
    
        <Fragment>

<Cabecera bajarEventoEvaluacion={bajarEventoEvaluacion} MostrarEvento={MostrarEvento}/>

    {loading ? <Loading/>:<div>

    {bajarEvento ? (<></>):(<>  


    {ElevarEvento ? (<></>) : (<></>)}
    <Suelo/> </>)}
  

    </div>

    }

    </Fragment>
)

}

export default Noticias;