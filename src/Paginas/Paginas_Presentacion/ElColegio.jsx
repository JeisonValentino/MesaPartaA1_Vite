import { Fragment, useEffect, useState } from "react";
import Loading from "../ControladorPage/Loading";
import  Cabecera  from "./Complemets/Cabecera"
import { Suelo } from "./Complemets/Suelo"
import './ElColegio.css'
import imagenCole from './Imagenes/imagenCole.png'
 const  ElColegio = () =>{
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
    
    
    
    const [bajarEvento,setBajarEvento]=useState(false);
    
    const  bajarEventoEvaluacion=(v1)=>{


        setBajarEvento(v1);
      }
    
    
    
    
    
    
    return(
    
        <Fragment>

<Cabecera bajarEventoEvaluacion={bajarEventoEvaluacion} />

{loading ? <Loading/>:<div>

{bajarEvento ? (<></>):(<>
<div className="main_Elcolegio">
<div className="parrafo1_Elcolegio">
EL COLEGIO
</div>
<hr className="small"></hr>
<div className="contenedor_Elcolegio">
<div id="parrafo2_Elcolegio"><img src={imagenCole}/></div>
    <div id="parrafo1_Elcolegio">
    <p style={{textAlign: 'justify'}}>Somos una institución educativa con 10 años de experiencia en educación y 5 sedes en Lima, los cuales nos respaldan como una institución sobresaliente, innovadora y descubridora de potencial. Además, contamos con equipos multimedia con el fin de adaptarnos a las nuevas tendencias y a la evolución de la educación entendiendo que la forma tradicional quedó atrás. Asimismo, contamos con docentes altamente calificados quienes son evaluados constantemente para brindar un servicio de educación óptimo, ya que nuestra meta es superar el estándar de calidad de la educación que se tiene en nuestro país y convertirnos en iconos de la educación.</p>

<p>Creemos que nuestros alumnos, y los estudiantes de todo el mundo, deben y merecen tener una educación de calidad, basada en valores, la cultura, la tecnología y las nuevas tendencias que día a día nos abren puertas a nuevos conocimientos para formar personas con mentes, actitudes y aptitudes brillantes; abiertas a ideas y conceptos creativos e innovadores que lograrán cambiar el mundo.</p>

<p>Anhelamos seguir creciendo no solo en cantidad, sino también en calidad educativa para hacer de nuestros alumnos y de nuestro país, más grandes.</p></div>
    
</div>
</div></>)}
    <Suelo/>
</div>

}




    </Fragment>
)

}

export default ElColegio;