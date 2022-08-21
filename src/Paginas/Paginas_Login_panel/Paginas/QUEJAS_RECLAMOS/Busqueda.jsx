
import { faPersonWalkingArrowLoopLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TabView, TabPanel } from 'primereact/tabview';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Accordion, AccordionTab } from 'primereact/accordion';
import axios from 'axios';
import { Toast } from 'primereact/toast';
export const Busqueda = ()=>{
    const [activeIndex1, setActiveIndex1] = useState(1);
    const [value3, setValue3] = useState('');
    const [state ,setState]=useState();
  
    let postData =([])
    const toast = useRef(null);
const [data,setData]=useState({
    post:postData
});


const {post}=data ;
const transparencia = ()=>{
return(
    <div > <i className="pi pi-search" /></div>)
}

const showError = () => {
    toast.current.show({severity:'error', summary: 'OCURRIO UN ERROR', detail:'No existe el codigo de consulta ', life: 3000});
}
const showWarn = () => {
    toast.current.show({severity:'warn', summary: 'EL CODIGO ES INCORRECTO', detail:'El codigo es de maxico 13 digitos ', life: 3000});
}
const showSuccess = () => {
    toast.current.show({severity:'success', summary: 'BUSQUEDA EXITOSA', detail:'Su consulta a sido encontrada', life: 3000});
}
const buscarBac = ()=>{

    if(value3.length ===13 ){
    console.log("buscando")
var le2t =axios.get(`http://localhost:8080/solicitud/consultaBa/${value3}`).then((data) =>{
   

    showSuccess()
    setData(data.data)

 }).catch(error =>{
    showError()
return  error
})
console.log(le2t)


}else{
    showWarn()
    console.log("no busca")
}


}




    return(


<div className="todo-Busqueda">     <Toast ref={toast} />
<div
            className='carta subCarta2'
            style={{width:"300px" ,margin:"5px" }}
          >
           <Link className='subCarta'  to='/MesaPartes' style={{textDecoration:"none"}}><div style={{width:"100%",height:"100%",padding:"2%" ,textDecoration:"none"}}>
           <FontAwesomeIcon style={{width:"20px" ,height:"20px",marginRight:"5px"}} icon={faPersonWalkingArrowLoopLeft}/>
           
           REGRESAR A OPCIONES </div> </Link>
          </div>
<div className="cabecera-busqueda" style={{textAlign:"left",fontWeight:"600"}}>

Busqueda de solicitudes

</div>

<div className="cuerpo-busqueda">
<TabView  style={{marginTop:"20px"}}>
<TabPanel header="Busqueda simple"  style={{padding:"10px"}}>
<h5>Escriba el codigo de solicitud</h5>
                <span className="p-input-icon-left">
                <div className="input-group mb-3">
                <label className="input-group-text" >  <div > <i className="pi pi-search" /></div></label>
                    <input  type="text" className="form-control"  onChange={(e)=> setValue3(e.target.value)} />  <button className="btn btn-outline-secondary" type="button" onClick={buscarBac} id="button-addon2">Realizar busqueda </button></div>
                </span>


<h5>Lista de solicitudes</h5>
                <Accordion multiple activeIndex={[0]}>
                    <AccordionTab header="f">
                 
                    {  post.map(valor =>(
                       
                       <div key={valor.id}>
                       <div className="card text-white bg-primary mb-3" >
     <div className="card-header">Respondio :{valor.nombreEmpleado}    Area : {valor.Cargo}</div>
     <div className="card-body">
       <h5 className="card-title">{valor.titulo}</h5>
       <p className="card-text">{valor.concepto}</p>
     </div>
   </div></div>
                     
   
   
                          )    )  }
                  
                       
                    </AccordionTab>

                </Accordion>

</TabPanel>

<TabPanel header="Busqueda Multiple"  style={{padding:"10px"}}>



</TabPanel>
</TabView>
</div>

</div>


)

}