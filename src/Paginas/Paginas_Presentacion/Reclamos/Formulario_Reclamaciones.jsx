import { useEffect } from "react";
import { useState } from "react";
import  Cabecera  from "../Complemets/Cabecera"
import { Suelo } from "../Complemets/Suelo"
import { Button } from "react-bootstrap";
import PersonalizadoInput from "../../Paginas_Login_panel/Paginas/pagesLogin/Modulos/Inputs_maps/PersonalizadoInput";

export default function Formulario_Reclamaciones(){
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

    return(      <Fragment>

        <Cabecera  />
        
        {loading ? <Loading/>:<div>
        
        
        <div className="formulario_reclamaciones">
<h4 style={{textAlign:"center",fontWeight:"bold",color:"#333F87"}}>Dejanos tu consulta</h4>
<PersonalizadoInput submitted={submitted} listaFormulario={listaFormulario} Entity={formularioEntity}  onInputChange={onInputChange} />
<div style={{display:"flex",justifyContent:"center",marginTop:"1rem",width:"100%"}}><Button style={{backgroundColor:"#333F87",width:"80%"}}>REGISTRATE AQUI</Button></div>{' '}
</div>
        
        
        <Suelo/>
</div>

}




    </Fragment>)
}