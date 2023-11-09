import { Fragment, useEffect, useState } from "react";
import Loading from "../../ControladorPage/Loading";
import  Cabecera  from "../Complemets/Cabecera"
import { Suelo } from "../Complemets/Suelo"
import './ElColegio.css'
import banner from "./banner-nosotros.png"
import nosotros from "./nosotros.png"
import flecha from './felcha.png'
import ojo from './ojo.png'
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
    
    
    

    
    
    
    return(
    
        <Fragment>

<Cabecera  />

{loading ? <Loading/>:<div>

<div className="main_Elcolegio">

<div className="fotoNosotros">
    <div className="fondobanner"><img src={banner}></img>  <div className="linea"></div><p>Nosotros</p></div>
</div>

<div className="nuestra_historia">
    <div className="foto_historica">
        <img src={nosotros}></img>
    </div>
        <div className="contenido_historico">
<h3>Nuestra historia</h3>
<p>Somos una instutucion educativa con 10 años de expereicencia en educacion y 5 sedes en Lima , innovadora y descubridora de potencial.Ademas ,contamos con equipos multimedia con el fin de adaptarnos a las nuevas tendencias y a la evolucion de la educacion entendiendo que la forma tradicional quedo atras.Asimismo , contamos con docentes altamente calificados quienres son evaluados constantemente para brinda un servicios de educacion optimo , ya que nuestra meta es superar estandar de calidad de la educacion que se tienen en nuestro pais y convertirnos en iconos de la educacion</p>
<p>Creemos que nuestros alumnos , y los estudiantes de todo el mundo , deben y merecen tener una educacion de calidad , basada en valores , la cultura , la tecnologia y la nuesvas tendencias que dia a dia nos abren puertas a nuevos conociiimientos para formar persona con mentes , actitudes y aptitudes brillantes ; abiertas a ideas y conceptos creativos e innovadores que lograran cambiar el mundo 
</p>
<p>Anhelamos seguir creciendo no solo en cantidad , sino tambien en calidad educativa para hacer de nuestros alumnos y de nuestro pais , mas grandes.</p>

        </div>

</div>

<div style={{display:"flex",justifyContent:"center"}}>
    <hr style={{width:"90%",padding:"1px",backgroundColor:"black",color:"black"}} />
</div>


<div className="valores">

<div className="mision_container">
    <div><img src={ojo}></img><h1>Mision</h1></div>
    <p>Cambiar la vida de nuestros estudiantes y colaboradores , generandoles pasion por alcanzar sus sueños</p>
</div>

<div className="vision_container">
<div><img src={flecha}></img><h1>Vision</h1></div>
<p>Hacer de la educacion un medio que logre un mundo mejor , para vivir generando el cambio que nuestra sociedad necesita</p>
</div>
</div>




</div>


    <Suelo/>
</div>

}




    </Fragment>
)

}

export default ElColegio;