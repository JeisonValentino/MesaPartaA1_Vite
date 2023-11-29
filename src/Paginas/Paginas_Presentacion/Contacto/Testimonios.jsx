import { Fragment, useEffect, useState } from "react";
import Loading from "../../ControladorPage/Loading";
import  Cabecera  from "../Complemets/Cabecera";
import { Suelo } from "../Complemets/Suelo";
import banner from "../Nosotros/banner-nosotros.png";
import './testimonios.css'
import PersonalizadoInput from "../../Paginas_Login_panel/Paginas/pagesLogin/Modulos/Inputs_maps/PersonalizadoInput";
const Testimonios = ()=>{

 const [loading ,setLoading]=useState(false);
 const [listaFormulario,setListarFormulario] =useState([
    {id:1,titulo:'',estilo:'institucional_regular',placehold:"Nombre y apellido", identidad:"nombre_apellido",advertencia:'Este cuadro requerido',type:'text',data:'texto'} , 
,  {id:2,titulo:'',estilo:'institucional_regular',placehold:"Correo electronico", identidad:"correo",advertencia:'El correo es requerido',type:'text',data:'correo'} 
,{id:3,titulo:'',estilo:'institucional_regular',placehold:"Numero de telefono", identidad:"telefono",advertencia:'El numero es requerido',type:'text',data:'numero'} 
, {id:4,titulo:'',estilo:'institucional_regular',placehold:"Escribe tu solicitud", identidad:"consulta",advertencia:'Este cuadro requerido',type:'text_area',data:'texto'}
])
const [submitted, setSubmitted]=useState(false);

  let formularioLet={
    id:'',nombre_apellido:'',correo:'',telefono:'',consulta:''
    }
    const [formularioEntity,setFormularioEntity]=useState(formularioLet);

  const onInputChange = (e) => {
    const { name, value } = e.target
    setFormularioEntity({...formularioEntity, [name]:value} )
    console.log(formularioEntity)
  }

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
    <div className="fotoNosotros">
            <div className="fondobanner">
              <img src={banner}></img> <div className="linea"></div>
              <p>Contacto</p>
            </div>
          </div>

 <div className="contenedor_contacto">

    <div className="informacion_contacto"></div>
    <div className="formulario_contacto">
<h4 style={{textAlign:"center",fontWeight:"bold",color:"#333F87"}}>Dejanos tu consulta</h4>
<PersonalizadoInput submitted={submitted} listaFormulario={listaFormulario} Entity={formularioEntity}  onInputChange={onInputChange} />

    
 </div>
 </div>

     </div>

}
<Suelo/> 

    </Fragment>
)

}

export default Testimonios ;