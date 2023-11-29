import { Fragment, useEffect, useState } from "react";
import Loading from "../ControladorPage/Loading";
import  Cabecera  from "./Complemets/Cabecera";
import { Suelo } from "./Complemets/Suelo";

const Servicios_Adicionales = ()=>{
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
    
    
    
    
    
    
 
    
   
    
    return(
    
        <Fragment>

<Cabecera  />

    {loading ? <Loading/>:<div> 

            
            </div>

}

    </Fragment>
)

}

export default Servicios_Adicionales;