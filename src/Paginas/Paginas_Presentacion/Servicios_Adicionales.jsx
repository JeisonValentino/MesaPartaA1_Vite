import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useEffect, useState } from "react";
import Loading from "../ControladorPage/Loading";
import  Cabecera  from "./Complemets/Cabecera";
import { Suelo } from "./Complemets/Suelo";
import './Servicios_Adicionales.css'
import psicologia from './Imagenes/psicologia.png'
import Corefo from './Imagenes/Corefo.png'
import { faHandshakeSimple } from "@fortawesome/free-solid-svg-icons";
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
    
    
    
    
    
    
    const [bajarEvento,setBajarEvento]=useState(false)
    
    const  bajarEventoEvaluacion=(v1)=>{


        setBajarEvento(v1);
      }
    
    
    
    return(
    
        <Fragment>

<Cabecera bajarEventoEvaluacion={bajarEventoEvaluacion} />

    {loading ? <Loading/>:<div> 

    {bajarEvento ? (<></>):(<>  
    <div className='main_Servicios_Adicionales'>
            
            <div className='parrafo1_Servicios_Adicionales'>
            SERVICIOS ADICIONALES

            </div>
            <div className="flex_Servicios_Adicionales">
                <div className="container1_ServiciosAdicionales"><img src={psicologia} />
                <h5>Área de Psicológia
</h5>
<p>Asesoramiento Psicológico para todos nuestros alumnos de nivel inicial, primaria y secundaria con el Dr. Javier Cervellón.

</p>
                <button>SABER MAS</button>
                </div>
                <div className="container1_ServiciosAdicionales"><FontAwesomeIcon icon={faHandshakeSimple} />
                
                <h5>Convenios Educativos
</h5>
<p>Las oportunidades de seguir aprendiendo y crecer profesionalmente están siempre presentes en Círculo A1 School.



</p><button>SABER MAS</button>
                </div>
                <div className="container1_ServiciosAdicionales"><img src={Corefo} />
                
                <h5>Ediciones Corefo
</h5>
<p>Revisa los puntos de venta de los libros Corefo en todo Lima Metropolitana.



</p>
                <button>SABER MAS</button>
                </div>
            </div>
            </div>

            <Suelo/> </>)}
            
            
            </div>

}

    </Fragment>
)

}

export default Servicios_Adicionales;