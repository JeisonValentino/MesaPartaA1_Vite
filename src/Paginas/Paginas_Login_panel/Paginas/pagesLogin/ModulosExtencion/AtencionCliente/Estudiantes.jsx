import { faFileExcel, faMagnifyingGlassMinus, faTrash, faUser, faUserGear, faUserPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { debounce } from "debounce";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable"
import { InputText } from "primereact/inputtext"
import { SelectButton } from "primereact/selectbutton";
import { Sidebar } from "primereact/sidebar";
import { Toast } from "primereact/toast";
import React, { useEffect, useRef, useState } from "react"
import { Fragment } from "react"
import Loading from "../../../../../ControladorPage/Loading"
import { Cabecera } from "../../ExtencionesCompartidas/Cabecera"
import { Service } from "../../Service";
import { RadioButton } from 'primereact/radiobutton';
import { Dialog } from "primereact/dialog";
import useSound from "use-sound";
import notificacionAprob from './../../Modulos/notificacionAprob.mp3'
import fallo from './../../Modulos/fallo.mp3'
import { classNames } from "primereact/utils";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import './estudiantes.css'
;
import parse from "html-react-parser";
import { Tiptap } from "./Tiptap ";




export default function Estudiantes (){

const[loading,setLoading]=useState(true)
const [selectedEstudiantes, setSelectedEstudiantes ] = useState(null);
const dt = useRef(null);
const [tamañoDialog,setTamañoDialog]= useState('40%');
const [crearNotificacionCorreo,SetCrearNotificacionCorreo]=useState(false)
const [configurationDialog,setConfigurationDialog]=useState(false)
let emptyFile={
    id:'',name:'',type:'',data:''
}

let tipoDocumento ={
    id:'',nombreDocumento:''
}

let emptyEstudiantes={
id:'',nombre:'',apellidoMaterno:'',apellidoPaterno:'',
correo:'',numeroDocumento:'',idSede:'',idTipoDocumentoIdentidad:tipoDocumento,
gradoEstudiante_id:'',id_files:emptyFile,direccion:'',idTipoSexo:'',gradoInstruccion:'',
estadoEstudiante_id:''
}
let emptyformaContacto={
    id:null,nombre:'',apellidoMaterno:'',apellidoPaterno:'',numeroDocumento:'',idEstudiante:'',idTipoDocumentoIdentidad:tipoDocumento,idrelacionfamiliar:'',numeroTelefono:''
}
let emptyConfiguracionEstudiante={
    id:'' , tipoNotificacion_id:'',plataforma:'',data:'',estudiante_id:'',fechaCreacion:'',file:''
}
const [formaContacto,setFormaContacto]=useState(emptyformaContacto)
const [configurarionFormularioEstudiante , setConfiracionFormularioEstudiante]=useState(emptyConfiguracionEstudiante);
const [configurarionFormularioEstudiantes , setConfiracionFormularioEstudiantes]=useState();
const [formaContactos,setFormaContactos]=useState([])
const [estudiantes,setEstudiantes]=useState([])
const [estudiante,setEstudiante]=useState(emptyEstudiantes)
const [seleccionChange,setSeleccionChange]=useState();
const [tipoEstadoValidacion ,setTipoEstadoValidacion]=useState('Todos');
const [renderizadorEstudiantes,setRenderizadorEstudiantes]=useState([])
const [visibleCustomToolbar, setVisibleCustomToolbar] = useState(false);
const [submitted,setSubmitted]=useState()
const [submitted2,setSubmitted2]=useState()
const [estudianteDialog,setEstudianteDialog]=useState()
const [detalleDialog,setDetalleDialog]=useState(false)
const[eliminarEstudiantesDialog,setEliminarEstudiantesDialog]=useState(false);
const [EnviarSonido] = useSound(notificacionAprob)
const [fallosonido]=useSound(fallo)
const [valueEstado,setValueEstado]=useState()
const [estado, setEstado] = useState({
    step: 1
  })

  let emptyLoginEstudiante ={
id:'',
correo:'', contraseña:'', estudiante_id:{},fechaRegistro:''

  }
const [loginEstudiante,setLoginEstudiante]=useState(emptyLoginEstudiante)
const toast = useRef(null)
const ListarEstudiante= async ()=>{
  const data= await Service.ListaEstudiantes().catch(res=>{
    console.log(res)
    toast.current.show({severity:'error', summary: `${res.response.data.message}`, life: 20000});
  })
  setEstudiantes(data);
}

useEffect(()=>{

    ListarEstudiante()
    setLoading(false)
},[])

useEffect(()=>{
 

let data = estudiantes ? estudiantes.map((e) => e): []
setRenderizadorEstudiantes(data) 
},[estudiantes])

const onColReorder = () => {
    toast.current.show({severity:'success', summary: 'Columna reordenada exitoso ', life: 3000});
}




const header = (
    <div className="" >
    <div >
        <h5 className="mx-0 my-1" style={{color:"white"}}>Buscar usuario</h5>
        <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText type="search" onChange={(e) => BuscarGlobal(e) } placeholder="Search..." />
            
        </span>
        
        
    </div>

   </div>
);
const [busqueda,setBusqueda]=useState('')
const BuscarGlobal= (e)=>{
    debounceFn(e.target.value)
   
}
let debounceFn = debounce(filtrador, 0);
function filtrador  (e){
    setBusqueda(e)
    var resultadoBusqueda = !e ? estudiantes:  estudiantes.filter(elemento => {

        if(tipoEstadoValidacion==='Todos'){
        if (
            elemento.nombre
              .toString()
              .toLowerCase()
              .includes(e.toLowerCase())||elemento.correo
              .toString()
              .toLowerCase()
              .includes(e.toLowerCase())||elemento.numeroDocumento
              .toString()
              .toLowerCase()
              .includes(e.toLowerCase())||elemento.id
              .toString()
              .toLowerCase()
              .includes(e.toLowerCase())){
                return elemento
              }
            }else if(tipoEstadoValidacion==="Activos"){
                if (
                    (elemento.nombre
                      .toString()
                      .toLowerCase()
                      .includes(e.toLowerCase())&&(elemento.estadoEstudiante_id.conceptoEstado==="Habilitado"))||(elemento.correo.toString()
                      .toLowerCase()
                      .includes(e.toLowerCase())&&elemento.estadoEstudiante_id.conceptoEstado==="Habilitado")
                      ||(elemento.numeroDocumento
                      .toString()
                      .toLowerCase()
                      .includes(e.toLowerCase())&&elemento.estadoEstudiante_id.conceptoEstado==="Habilitado")||(elemento.id
                      .toString()
                      .toLowerCase()
                      .includes(e.toLowerCase())&&elemento.estadoEstudiante_id.conceptoEstado==="Habilitado")){
                        return elemento
                      }

            }else if(tipoEstadoValidacion==="Desabilitado"){
                if (
                    (elemento.nombre
                        .toString()
                        .toLowerCase()
                        .includes(e.toLowerCase())&&(elemento.estadoEstudiante_id.conceptoEstado==="Desabilitado"))||(elemento.correo.toString()
                        .toLowerCase()
                        .includes(e.toLowerCase())&&elemento.estadoEstudiante_id.conceptoEstado==="Desabilitado")
                        ||(elemento.numeroDocumento
                        .toString()
                        .toLowerCase()
                        .includes(e.toLowerCase())&&elemento.estadoEstudiante_id.conceptoEstado==="Desabilitado")||(elemento.id
                        .toString()
                        .toLowerCase()
                        .includes(e.toLowerCase())&&elemento.estadoEstudiante_id.conceptoEstado==="Desabilitado")){
                        return elemento
                      }
            }

    })
    console.log(resultadoBusqueda)
    setRenderizadorEstudiantes(resultadoBusqueda)
}


const [listaRelaconFamiliar ,setListaRelaconFamiliar]=useState()

const obtenerlistaRelaconFamiliar=async ()=>{
    let data = await Service.listaRelaconFamiliar();
    console.log(data)
    setListaRelaconFamiliar(data)
}
useEffect(() => {
    obtenerlistaRelaconFamiliar()
}, []);
const cuerpoCorreo =(rowData)=>{
return(

    <>
<div style={{display:"flex"
}} className="correoTr" >
    {rowData.correo}
</div>

    </>
)

}
const MostrarOpciones=(rowData)=>{

    return(
<Fragment>

               <div style={{display:"flex",columnGap:"2px"}}>
                 <Button
                   label={<FontAwesomeIcon icon={faMagnifyingGlassMinus}/>}
                   onClick={() => onClickDetalle(rowData) } style={{background:"#1646cb"}}
                 />
                 <Button
                   label={<FontAwesomeIcon icon={faUserPen} style={{ color:"black"}}/>}
                   onClick={() => onClickEdit(rowData) } style={{background:"yellow"}}
                 />
                 <Button
                   label={<FontAwesomeIcon icon={faUserGear}/>}
                   style={{background:"black"}}
                   onClick={() => onClickConfig(rowData) }
                   />
                 <Button
                   label={<FontAwesomeIcon icon={faTrash}/>}
                   onClick={() => onClickDelete(rowData) } style={{background:"red"}}
                 />
              
               </div>
              </Fragment>

    )
}


const tableNotificacionDetalle=()=>{
    hide(1000)
setDisplay2(true)

}

const leftToolbarTemplate = () => {
    return (
        <React.Fragment >
        
          <div >
          <button style={{width:"100%"}} onClick={(e)=>console.log(e)} className="p-sidebar-icon p-link mr-1">
          <span className="pi pi-print" /><div style={{marginLeft:"4px"}}>PDF</div> 
            </button>
            <button style={{width:"100%"}} className="p-sidebar-icon p-link mr-1">
            <FontAwesomeIcon icon={faFileExcel}/> <div style={{marginLeft:"4px"}}>Excel</div>
            </button>
          </div>
        </React.Fragment>
    )
}
const buscarEstadoNotificacion= async(id)=>{
let data =await Service.buscarEstadoNotificacion(id);
return data.estado;
}
const deleteEstudiantesDialogFooter = (
    <React.Fragment>
        <Button label="No" icon="pi pi-times" className="p-button-text"
         onClick={()=> hideDeleteEstudiantesDialog()} />
        <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={()=>EliminarEstudiantesSeleccionados()} />
      
    </React.Fragment>
);


const EliminarEstudiantesSeleccionados = async () => {
   
  
    await Service.EliminarUsuarioSeleccionados(selectedProducts).then(res=>{
     toast.current.show({ severity: 'success', summary: 'Successful', detail: `${res.data.message}`, life: 3000 });
     EnviarSonido()
    }).catch(res=>{
     toast.current.show({ severity: 'error', summary: 'Ocurrio un error inesperado', detail: `${res.response.data.message}`, life: 3000 });
             fallosonido()
    })
    
     obtenerLista()
 
     setDeleteProductsDialog(false);
     setSelectedProducts(null);
   
    
     
 }




const onClickDetalle= (data)=>{
    setDetalleDialog(true);
   
    setEstudiante({...data})
}

const onClickConfig =(data)=>{
    setEstudiante({...data})
setConfigurationDialog(true)
listaConfiguracion(data)
}

const onClickDelete= ()=>{
    
}

const onClickEdit= (data)=>{
    setEstudiante({...data})
 
let dat = data.id
console.log(data)
BuscarListaformaContactoPorEstudiante(dat)
BuscarLoginEstudiante(dat)
let _loginEstudiante={...loginEstudiante}
_loginEstudiante['estudiante_id']=data
setLoginEstudiante(_loginEstudiante);
console.log(loginEstudiante)
let _formContacto={...formaContacto};
_formContacto['idEstudiante']=data
setValueEstado(data.estadoEstudiante_id.conceptoEstado)
setFormaContacto(_formContacto)
AbrirDialog()
    
}




function MostrarToolbar(valor){
    setVisibleCustomToolbar(valor)
}


const AbrirDialog = () => {
   
    setSubmitted(false);
    setEstudianteDialog(true);

    
}

const ocultarDialog= ()=>{
    setEstudiante(emptyEstudiantes);
    setFormaContacto(emptyformaContacto)
   setFormaContactos([])
   setLoginEstudiante(emptyLoginEstudiante)
   setValueEstado("")
setEstado({ step: 1 })
    setSubmitted(false);
    setEstudianteDialog(false);
    setTamañoDialog('40%')

}

const ocultarDialogDetalle=()=>{


    setEstudiante(emptyEstudiantes);
    setFormaContacto(emptyformaContacto)
   setFormaContactos([])
   setLoginEstudiante(emptyLoginEstudiante)
    setDetalleDialog(false)
}
const ocultarDialogConfiguration= ()=>{
    setConfigurationDialog(false)
}
const hideDeleteEstudiantesDialog = () => {
  
    setEliminarEstudiantesDialog(false);
    
}


const listaConfiguracion=async(id)=>{
    let data = await Service.obtenerListaConfiguracion(id);
    setConfiracionFormularioEstudiantes(data)
}

const onEstadoChange = (e) => {
    
    setTipoEstadoValidacion(e.value);

   
}

useEffect(()=>{

    
    var resultadoBusqueda =   estudiantes.filter(elemento => {
        if(tipoEstadoValidacion==='Todos'){
            if (
                elemento.nombre
                  .toString()
                  .toLowerCase()
            ||elemento.correo
                  .toString()
                  .toLowerCase()
          ||elemento.numeroDocumento
                  .toString()
                  .toLowerCase()
    ||elemento.id
                  .toString()
                  .toLowerCase()
      ){
                    return elemento
                  }
                }else
        if(tipoEstadoValidacion==="Activos"){
           if (
               (elemento.nombre
                 .toString()
                 .toLowerCase()
                 &&(elemento.estadoEstudiante_id.conceptoEstado==="Habilitado"))||(elemento.correo.toString()
                 .toLowerCase()
                &&elemento.estadoEstudiante_id.conceptoEstado==="Habilitado")
                 ||(elemento.numeroDocumento
                 .toString()
                 .toLowerCase()
              &&elemento.estadoEstudiante_id.conceptoEstado==="Habilitado")||(elemento.id
                 .toString()
                 .toLowerCase()
                &&elemento.estadoEstudiante_id.conceptoEstado==="Habilitado")){
                   return elemento
                 }

       }else if(tipoEstadoValidacion==="Desabilitado"){
           if (
               (elemento.nombre
                   .toString()
                   .toLowerCase()
                 &&(elemento.estadoEstudiante_id.conceptoEstado==="Desabilitado"))||(elemento.correo.toString()
                   .toLowerCase()
                 &&elemento.estadoEstudiante_id.conceptoEstado==="Desabilitado")
                   ||(elemento.numeroDocumento
                   .toString()
                   .toLowerCase()
                  &&elemento.estadoEstudiante_id.conceptoEstado==="Desabilitado")||(elemento.id
                   .toString()
                   .toLowerCase()
                  &&elemento.estadoEstudiante_id.conceptoEstado==="Desabilitado")){
                   return elemento
                 }
               }
           
  
    
        })

    console.log(busqueda==='')
        setRenderizadorEstudiantes(resultadoBusqueda)
},[tipoEstadoValidacion,busqueda===''])

const nextStep = (e)=>{
    e.preventDefault();
    if(estado.step ==1 ){
setTamañoDialog('80%')
    }
if(estado.step==2){
    setTamañoDialog('50%')
}


setSubmitted(true)
const { step } = estado
setEstado({ step: step + 1 })
setSubmitted(false)
}


const prevStep = () => {
    const { step } = estado
    setEstado({ step: step - 1 })
    if(estado.step ==1 ){
        
            }
        if(estado.step==2){
            setTamañoDialog('40%')
        }

        if(estado.step==3){
            setTamañoDialog('80%')
        }
  
      

  }
  {console.log(loginEstudiante)}
  const GuardarEstudiante= async (e)=>{
e.preventDefault()
let error=false;
let error2=false;
let mensaje='';
let mensaje2='';
let valor={};
console.log(estudiante)
if(estudiante.id){
console.log("paso por el id existen")

await Service.ModificarEstudiante(estudiante).then(res=>{
    mensaje=res
}).catch((res)=>{
    fallosonido()
    error=true;
    toast.current.show({ severity: 'error', summary: 'Ocurrio un problema', detail: `${res.response.data.message}`, life: 3000 });
})

await Service.AgregarFormaDecontactoEstudiante(formaContactos,estudiante.id).then(res=>{
  return res
}).catch((res)=>{
    fallosonido()
    error2=true;
    console.log(res)
    toast.current.show({ severity: 'error', summary: 'Ocurri un problema', detail: `${res.response.data.message}`, life: 3000 });

});
console.log(loginEstudiante)
await Service.AgregarLoginEstudiante (loginEstudiante).then(res=>{
    return res
  }).catch((res)=>{
      fallosonido()
      error2=true;
      console.log(res)
      toast.current.show({ severity: 'error', summary: 'Ocurri un problema', detail: `${res.response.data.message}`, life: 3000 });
  
  });


if(!error){
    EnviarSonido()
    ListarEstudiante()
    ocultarDialog() 
   
            toast.current.show({ severity: 'success', summary: 'Successful', detail: `${mensaje}`, life: 3000 });



        }


}else{

    console.log("no tiene id ")


     await Service.CrearEstudiante(estudiante,formaContactos).then(res=>{
     valor  = (res)
    }).catch((res)=>{
        fallosonido()
        error=true;
        toast.current.show({ severity: 'error', summary: 'Ocurrio un problema', detail: `${res.response.data.message}`, life: 3000 });

    })
    
    if(!error){
        EnviarSonido()
        ListarEstudiante()
                toast.current.show({ severity: 'success', summary: 'Successful', detail: `${mensaje}`, life: 3000 });
                ocultarDialog()   
             onClickEdit(valor)
           

            }




}




  }

  const [formularioNotificacion , setFormularioNotificacion]=useState(true)
const MostrarFormularioNotififcion = ()=>{

    setFormularioNotificacion(!formularioNotificacion)
}
  const AgregarFormaDecontactoEstudiante=async(e)=>{
   e.preventDefault()
   setSubmitted2(true)

if(formaContacto.apellidoMaterno.trim()&&formaContacto.nombre.trim && formaContacto.apellidoPaterno && formaContacto.numeroDocumento && !formaContacto.idrelacionfamiliar=='' && !formaContacto.idTipoDocumentoIdentidad=='' && !formaContacto.numeroTelefono==''){
   formaContactos.push(formaContacto)

   let valo=formaContacto.idEstudiante
setFormaContacto({
    id:null,nombre:'',apellidoMaterno:'',apellidoPaterno:'',numeroDocumento:'',idEstudiante:valo,idTipoDocumentoIdentidad:tipoDocumento,idrelacionfamiliar:'',numeroTelefono:''
})

setSubmitted2(false)
    toast.current.show({ severity: 'success', summary: 'Operacion exitosa', detail: `se agrego el contacto`, life: 3000 });
}else{
    toast.current.show({ severity: 'info', summary: 'Alerta', detail: `hay faltas en el formulario , revisar `, life: 3000 });
}
}


  const EliminarformaContacto =  (id)=>{
let valor = formaContactos.filter((dataid)=>dataid.id !==id)
setFormaContactos(valor)
  }


  const BuscarListaformaContactoPorEstudiante= async(id)=>{

    let data = await Service.BuscarListaformaContactoPorEstudiante(id)
  
    setFormaContactos(data)
  }

  const BuscarLoginEstudiante = async(id)=>{
    let data =await Service.ServiceBuscarLoginEstudiante(id)
    console.log(data?data:emptyLoginEstudiante)
    setLoginEstudiante(data)
  }

  const renderHeader = () => {
    return (
        <span className="ql-formats">
            <button className="ql-bold" aria-label="Bold"></button>
            <button className="ql-italic" aria-label="Italic"></button>
            <button className="ql-underline" aria-label="Underline"></button>
        </span>
    );
}

const headerR = renderHeader();

  const [animation, setAnimation] = useState('open')
  const [display, setDisplay]     = useState(true)
  const [display2, setDisplay2]     = useState(false)
  const [animation2, setAnimation2] = useState('close')
  const hide = async (ms) => {
    setFormularioNotificacion(!formularioNotificacion)
    setDisplay2(false)
if(animation==='open'){
      setAnimation('close')
      setAnimation2('open')
}else{
    setAnimation('open')
    setAnimation2('close')
}
      await new Promise(r => setTimeout(r, ms))

      setDisplay(!display)

  }

const CambiarEstado = (e) =>{
let _Estudiante = {...estudiante}

    _Estudiante['estadoEstudiante_id']= e.target.value

  
    
    setEstudiante(_Estudiante);

console.log(e.target.value)


}
const{id_files}=estudiante
const onchangeImage= (dat)=>{


    

    
    var reader =new FileReader();
  
    if(dat !==null){
      console.log("PASO EL NULL")
   
    const byteCharacters = atob(dat);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
   
    const blob = new Blob([byteArray], {type: 'image/jpeg'});
    
    reader.addEventListener("load", function () {
        
        return reader.result
    })
  
    reader.readAsDataURL(blob)
    
    return URL.createObjectURL(blob)
  
  }else{
    
    
    return ""}
  

    }
   
    const imageHandler = async ( e )=> {
        
        
        let base64String =''
  
 

      var reader = new FileReader();
      console.log("next");
        
      reader.onload = function () {
          base64String = reader.result.replace("data:", "")
              .replace(/^.+,/, "");
    
         
    
          // alert(imageBase64Stringsep);
       
    
          id_files.data=(base64String);
          setLoadingFoto(false)
      }
   
      id_files.name=e.target.files[0].name
      id_files.type=e.target.files[0].type
      setEstudiante({...estudiante,id_files : id_files})

      
      reader.readAsDataURL(e.target.files[0]);
    }

const [loadingFoto,setLoadingFoto]=useState(false);
    useEffect(()=>{
        setLoadingFoto(true)

    },[loadingFoto])
const estudianteFormulario=()=>{


const { step } = estado
switch (step) {
    case 1:
        return (
<div className="MoverDerechaDialog">



{loadingFoto ? (<>
{
  
  estudiante.id_files.data ?(
      
      <div style={{display:"flex",justifyContent:"center" }}>

<div  style={{color:"black",position:"relative" ,width:"30%",zIndex:"5"}} >
 
  <img  style={{width:"100%",height:"100%"}}
   src={onchangeImage(estudiante.id_files.data)} />
 </div>

  </div>

  ) :(
      <FontAwesomeIcon style={{width:"20%",height:"10%"}} icon={faUser}/> )} 

</> ):(<></>)}


<input style={{marginTop:"15px"}}
                    type='file'
                    accept='image/*'
                    name='files'
                    id='files'
                    onChange={e => imageHandler(e)}
                    className='form-control'
                    disabled ={estudiante.estadoEstudiante_id.conceptoEstado === "Habilitado"? false : true}  />



            <div className="field">
                         <label htmlFor="nombre">Nombre</label>
                         <InputText id="nombre" value={estudiante.nombre} onChange={(e) => onInputChange(e, 'nombre')} required autoFocus className={classNames({ 'p-invalid': submitted && !estudiante.nombre })} 

disabled ={estudiante.estadoEstudiante_id.conceptoEstado === "Habilitado"? false : true} 
                         />
                         {submitted && !estudiante.nombre && <small className="p-error">El nombre es requerido.</small>}
<br/>
<label htmlFor="apellidoPaterno">Apellido Paterno</label>
                         <InputText id="apellidoPaterno" value={estudiante?.apellidoPaterno} onChange={(e) => onInputChange(e, 'apellidoPaterno')} required autoFocus className={classNames({ 'p-invalid': submitted && !estudiante?.apellidoPaterno })} 

disabled ={estudiante.estadoEstudiante_id.conceptoEstado === "Habilitado"? false : true} 
                         />
                         {submitted && !estudiante?.apellidoPaterno && <small className="p-error">La apellidoPaterno es requerida .</small>}

                         <label htmlFor="apellidoMaterno">Apellido Materno</label>
                         <InputText id="apellidoMaterno" value={estudiante?.apellidoMaterno} onChange={(e) => onInputChange(e, 'apellidoMaterno')} required autoFocus className={classNames({ 'p-invalid': submitted && !estudiante.apellidoMaterno })}
                         disabled ={estudiante.estadoEstudiante_id.conceptoEstado === "Habilitado"? false : true} 
                          />
                         {submitted && !estudiante?.apellidoMaterno && <small className="p-error">La apellidoMaterno es requerida .</small>}


                         <label htmlFor="correo">Correo</label>
                         <InputText id="correo" value={estudiante.correo} onChange={(e) => onInputChange(e, 'correo')} required autoFocus className={classNames({ 'p-invalid': submitted && !estudiante.correo })} 
disabled ={estudiante.estadoEstudiante_id.conceptoEstado === "Habilitado"? false : true} 

                         />
                         {submitted && !estudiante.correo && <small className="p-error">El correo es requerida .</small>}

                         <label htmlFor="direccion">Direccion</label>
                         <InputText id="direccion" value={estudiante.direccion} onChange={(e) => onInputChange(e, 'direccion')} required autoFocus className={classNames({ 'p-invalid': submitted && !estudiante.direccion })}
                         disabled ={estudiante.estadoEstudiante_id.conceptoEstado === "Habilitado"? false : true} 
                          />
                         {submitted && !estudiante.direccion && <small className="p-error">La direccion es requerida .</small>}
 

                         <label htmlFor="numeroDocumento">Numero Documento</label>
                         <InputNumber id="numeroDocumento" value={estudiante?.numeroDocumento || ""} mode="decimal" name="numeroDocumento" 
                         onChange={(e)=>onInputChange2(e)} required autoFocus className={classNames({ 'p-invalid': submitted && !estudiante.numeroDocumento })} 

                         disabled ={estudiante.estadoEstudiante_id.conceptoEstado === "Habilitado"? false : true} 
                         />
                         {submitted && !estudiante.numeroDocumento && <small className="p-error">La numeroDocumento es requerida .</small>}
                         {estudiante.numeroDocumento}

                         

                         </div>
                         <hr/>
                     <div className="field">
                         <label className="mb-3">Tipo Documento </label>
                         <div className="formgrid grid ">
                             <div className="field-radiobutton col-6">
                                 <RadioButton inputId="category1" name="idTipoDocumentoIdentidad"
                                  value={{id:'1' ,nombreDocumento:'DNI' }} onChange={(e)=>onCategoryChange(e,"idTipoDocumentoIdentidad")} checked={estudiante.idTipoDocumentoIdentidad.nombreDocumento === 'DNI'} 
                                  disabled ={estudiante.estadoEstudiante_id.conceptoEstado === "Habilitado"? false : true} 

                                  />
                                 <label htmlFor="category1">Dni</label>
                             </div>
                             <div className="field-radiobutton col-6">
                                 <RadioButton inputId="category2" name="idTipoDocumentoIdentidad"  value={{'id':'2' ,nombreDocumento:'extrangero' }}  onChange={(e)=>onCategoryChange(e,"idTipoDocumentoIdentidad")} checked={estudiante.idTipoDocumentoIdentidad.nombreDocumento === 'extrangero'} 
disabled ={estudiante.estadoEstudiante_id.conceptoEstado === "Habilitado"? false : true} 

                                 />
                                 <label htmlFor="category2">Extrangero</label>
                             </div>
                             
                         </div>
                     </div>
                         <hr/>
                     <div className="field">
                     <label className="mb-3">Seleccion la sede</label>
                     <div className="formgrid grid card">
                    
                     <Dropdown value={estudiante.idSede} options={sedes} 
                     onChange={(e)=>onEstudianteChange(e, 'idSede')}   optionLabel="nombre"
                        
                     disabled ={estudiante.estadoEstudiante_id.conceptoEstado === "Habilitado"? false : true} 
                         />
                       
     </div></div>

     <hr/>
     <div className="field">
                     <label className="mb-3">Grado Estudiante</label>
                     <div className="formgrid grid card">
                    
                     <Dropdown value={estudiante.gradoEstudiante_id} options={opcionesGrado} 
                     onChange={(e)=>onEstudianteChange(e, 'gradoEstudiante_id')}   optionLabel="nombreGrado"
                        
                     disabled ={estudiante.estadoEstudiante_id.conceptoEstado === "Habilitado"? false : true} 
                         />
                       
     </div></div>

     <hr/>
                     <div className="field">
                         <label className="mb-3">Sexo</label>
                         <div className="formgrid grid ">
                             <div className="field-radiobutton col-6">
                                 <RadioButton inputId="category1" name="idTipoSexo" value="Mujer" onChange={(e)=>onCategoryChange(e,"idTipoSexo")} checked={estudiante.idTipoSexo === 'Mujer'} 
disabled ={estudiante.estadoEstudiante_id.conceptoEstado === "Habilitado"? false : true} 

                                 />
                                 <label htmlFor="category1">Mujer</label>
                             </div>
                             <div className="field-radiobutton col-6">
                                 <RadioButton inputId="category2" name="idTipoSexo" value="Hombre" onChange={(e)=>onCategoryChange(e,"idTipoSexo")} checked={estudiante.idTipoSexo === 'Hombre'}
                                 
                                 disabled ={estudiante.estadoEstudiante_id.conceptoEstado === "Habilitado"? false : true} 
                                  />
                                 <label htmlFor="category2">Hombre</label>
                             </div>
                             
                         </div>
                     </div>
                     
                <h5>Estado Estudiante</h5>
                <SelectButton value={estudiante.estadoEstudiante_id} options={[{id:1 ,conceptoEstado:  'Habilitado'}, {id:2 ,conceptoEstado:  'Desabilitado'}]} optionLabel="conceptoEstado" onChange={(e) => CambiarEstado(e)} 


                />
               


</div>
)
case 2:
    
    return (
        <div className='container-rm'>
        <div className='row'>
          <div className='col-6'>
            <label htmlFor='telefono'>Lista de contactos</label>

            <div style={{ overflow: 'auto', height: '655px' }}>

                  {!formaContactos.length==0? formaContactos?.map((data,i) => {

                    return (
                      <div
                        key={i}
                        className='card'
                        style={{ margin: '5px' }}
                      >
                        <div className='container-rm'>
                          {' '}
                          <div className='row'>
                            <div className='col-6'>
                              <p style={{ marginLeft: '5px' }}>
                                {' '}
                                Nombre : {data.nombre + data.apellidoMaterno + data.apellidoPaterno}
                              </p>
                              <p style={{ marginLeft: '5px' }}>
                                {' '}
                                Concepto : {data.idrelacionfamiliar.concepto}
                              </p>
                              <p style={{ marginLeft: '5px' }}>
                                {' '}
                                Numero documento : {data.numeroDocumento}
                              </p>
                              <p style={{ marginLeft: '5px' }}>
                                {' '}
                                Telefono : {data.numeroTelefono}
                              </p>
                            </div>
                         
                          </div>
                        </div>

                        <Button
                          style={{ height: '2px', width: '100%' }}
                          label='X'
                          onClick={() => EliminarformaContacto(data.id)}
                        />
                      </div>
                    )
                  })
                  :<div style={{textAlign:"center",display:"flex",justifyContent:"center",alignItems:"center",height:"100%"}}> 
                  <div  style={{textAlign:"center",display:"block"}} >NO HAY DATOS QUE MOSTRAR, COLOCAR CONTACTO DEL ESTUDIANTE</div>
                  </div>
                  }

                  
                </div>
              

            </div>


            <div className='col-6'>


          <div className="field">


          <label htmlFor="nombre2">Nombre</label>
                         <InputText id="nombre2" value={formaContacto.nombre} onChange={(e) => onChangeFormaContacto1(e, 'nombre')} required autoFocus className={classNames({ 'p-invalid': submitted2 && !formaContacto.nombre })} />
                         {submitted2 && !formaContacto.nombre && <small className="p-error">El nombre es requerido.</small>}



          <label htmlFor="apellidoPaterno2">Apellido Paterno</label>
                         <InputText id="apellidoPaterno2" value={formaContacto.apellidoPaterno} onChange={(e) => onChangeFormaContacto1(e, 'apellidoPaterno')} required autoFocus className={classNames({ 'p-invalid': submitted2 && !formaContacto.apellidoPaterno })} />
                         {submitted2 && !formaContacto.apellidoPaterno && <small className="p-error">La apellidoPaterno es requerida .</small>}


                         <label htmlFor="apellidoMaterno2">Apellido Materno</label>
                         <InputText id="apellidoMaterno2" value={formaContacto.apellidoMaterno} onChange={(e) => onChangeFormaContacto1(e, 'apellidoMaterno')} required autoFocus className={classNames({ 'p-invalid': submitted2 && !formaContacto.apellidoMaterno })} />
                         {submitted2 && !formaContacto.apellidoMaterno && <small className="p-error">La apellidoMaterno es requerida .</small>}

                         <label htmlFor="numeroDocumento2">Numero Documento</label>
                         <InputNumber id="numeroDocumento2" value={formaContacto.numeroDocumento} useGrouping={false} mode="decimal"  onChange={(e) => onChangeFormaContacto2(e, 'numeroDocumento')} required autoFocus className={classNames({ 'p-invalid': submitted2 && !formaContacto.numeroDocumento })} />
                         {submitted2 && !formaContacto.numeroDocumento && <small className="p-error">La numeroDocumento es requerida .</small>}

                  <label htmlFor='numeroTelefono2'> Telefono </label>
                  <InputNumber
                    id='numeroTelefono2'
                    value={formaContacto.numeroTelefono}
                    onChange={e => onChangeFormaContacto2(e, 'numeroTelefono')}
                    required
                    autoFocus
                    className={classNames({
                      'p-invalid': submitted2 && !formaContacto.numeroTelefono
                    })}
                  />
          </div>
         relacion familiar
          <div className="field">

          <Dropdown value={formaContacto.idrelacionfamiliar} options={listaRelaconFamiliar} 
                     onChange={(e)=>onChangeFormaContacto3(e, 'idrelacionfamiliar')}   optionLabel="concepto"  className={classNames({
                      'p-invalid': submitted2 && !formaContacto.idrelacionfamiliar
                    })}
                         />
          </div>

          <hr/>
                     <div className="field">
                         <label className="mb-3">Tipo Documento </label>
                         <div className="formgrid grid ">
                             <div className="field-radiobutton col-6">
                                 <RadioButton inputId="category1" name="idTipoDocumentoIdentidad2"
                                  value={{id:'1' ,nombreDocumento:'DNI' }}  onChange={(e)=>onChangeFormaContacto1(e,"idTipoDocumentoIdentidad")} checked={formaContacto?.idTipoDocumentoIdentidad.nombreDocumento === 'DNI'} 
                                  className={classNames({
                      'p-invalid': submitted2 && !formaContacto.idTipoDocumentoIdentidad
                    })}
                                   />
                                 <label htmlFor="category12">Dni</label>
                             </div>
                             <div className="field-radiobutton col-6">
                                 <RadioButton inputId="category22" name="idTipoDocumentoIdentidad"  value={{id:'2' ,nombreDocumento:'extrangero' }}  onChange={(e)=>onChangeFormaContacto1(e,"idTipoDocumentoIdentidad")} checked={formaContacto.idTipoDocumentoIdentidad.nombreDocumento === 'extrangero'} 
 className={classNames({
                      'p-invalid': submitted2 && !formaContacto.idTipoDocumentoIdentidad
                    })}

                                 />
                                 <label htmlFor="category32">Extrangero</label>
                             </div>
                             
                         </div>
                     </div>

                    <Button label="Agregar Contacto" onClick={(e)=>AgregarFormaDecontactoEstudiante(e)}/>
                </div>


            </div>
            </div>
    )
    case 3:
    
    return (
    
    <>
<div className='container-rm'>
        <div className='row'>

        <div className="field">
        <label htmlFor="Correo3">Correo</label>
                         <InputText id="correo3"  value={loginEstudiante.correo} onChange={(e) => onChangeLoginEstudiante1(e, 'correo')} required autoFocus className={classNames({ 'p-invalid': submitted2 && !loginEstudiante.apellidoMaterno })} />
                         {submitted2 && !loginEstudiante.apellidoMaterno && <small className="p-error">El correo es requerido .</small>}

                         <label htmlFor="contraseña3">Contraseña</label>
                         <InputText id="contraseña3"  value={loginEstudiante.contraseña} onChange={(e) => onChangeLoginEstudiante1(e, 'contraseña')} required autoFocus className={classNames({ 'p-invalid': submitted2 && !loginEstudiante.contraseña })} />
                         {submitted2 && !loginEstudiante.contraseña && <small className="p-error">La contraseña es requerida .</small>}

        </div>


        </div>

</div>
    </>
        )

}
}

const estudianteDialogFooter = ()=>{
 
    return (<React.Fragment>


{estudiante.estadoEstudiante_id.conceptoEstado === "Desabilitado"?

<Button  label="Guardar" icon="pi pi-check" className="p-button-text" onClick={(e)=>GuardarEstudiante(e)} />:""
}

{estado.step==1 && !estudiante.id?


           <Button  label="Guardar" icon="pi pi-check" className="p-button-text" onClick={(e)=>GuardarEstudiante(e)} />
           :""
       }
       {estado.step==2||estado.step==3?
           <>
                {' '}
                <Button label="Retroceder" onClick={(e)=>prevStep(e)} > </Button>
                </>
:""
            }

            {estado.step==1 && estudiante.id || estado.step==2 && estudiante.id?
          <>
              {estudiante.estadoEstudiante_id.conceptoEstado === "Habilitado"? (

                <Button onClick={(e)=>nextStep(e)} label="Siguiente"  > </Button>):("")}
          
                </>
         :""   }

     


       {estado.step==3?
           <Button  label="Guardar" icon="pi pi-check" className="p-button-text" onClick={(e)=>GuardarEstudiante(e)} />
           :""
       }
       </React.Fragment>)
   }


const onChangeLoginEstudiante1 = (e,name)=>{
    const val = (e.target && e.target.value) || '';
let loginEstudianteChange_={...loginEstudiante}
loginEstudianteChange_[`${name}`]= val
setLoginEstudiante(loginEstudianteChange_)
console.log(loginEstudiante)
}
const subirImagen= async(e,editor)=>{
let file= e.target.files[0];
const formData = new FormData()
formData.append('file', file)
let valor= await Service.subirImagenServer(formData);
console.log(valor)
}

const onInputChange = (e, name)=>{
    const val = (e.target && e.target.value) || '';
    let _product = {...estudiante};

    _product[`${name}`] = val;

    setEstudiante(_product);
}

const onChangeConfigurationEstudiante= (e, name)=>{
    const val = (e.target && e.target.value) || '';
    let _product = {...configurarionFormularioEstudiante};

    _product[`${name}`] = val;

    setConfiracionFormularioEstudiante(_product);

}

const onChangeConfigurationEstudianteText= (e)=>{

    const val=e
    let _product = {...configurarionFormularioEstudiante};

    _product[`data`] = val;
    setConfiracionFormularioEstudiante(_product);

}

const onChangeFormaContacto1= (e, name)=>{
    const val = (e.target && e.target.value) || '';
let _formContacto={...formaContacto};
_formContacto[`${name}`]=val
console.log(val)

setFormaContacto(_formContacto);

}



const onChangeFormaContacto2= (e, name)=>{
    const val =e.value
    let _formContacto={...formaContacto};
    _formContacto[`${name}`]=val
    
    setFormaContacto(_formContacto);
    
}

const [listaInput,setListaInput]=useState({
    idrelacionfamiliar:'',idTipoDocumentoIdentidad:''
})
const onChangeFormaContacto3=(e,name)=>{

    const val =e.value
    let _formContacto={...formaContacto};
    let _formContacto2={...listaInput};
    _formContacto[`${name}`]=val
    _formContacto2[`${name}`]=val
    setFormaContacto(_formContacto);
    setListaInput(_formContacto2)
}

const onInputChange2 = e => {

   
    let _product = {...estudiante};
console.log(e)
    _product[`numeroDocumento`] = e.value;

    setEstudiante(_product);
    
   
}


const onCategoryChange = (e,name) => {
    let _product = {...estudiante};
    _product[`${name}`] = e.value;
    console.log(e.value)
    setEstudiante(_product);
}

const onEstudianteChange = (e, name)=>{
      
 
    const val2=(e.value);
    let _product = {...estudiante};
    _product[`${name}`] = val2;
    setEstudiante(_product);
    console.log(val2)
  }

  const [sedes , setSedes]=useState();

const [opcionesGrado,setOpcionesGrado]=useState();


const listarGradoEstudiante = async ()=>{
    let data =await Service.ListarGradoEstudiante().then(res =>{
        return res
    })
 
    setOpcionesGrado(data)
}

useEffect(()=>{
    listarGradoEstudiante();
},[])


  const listarSede= async()=>{
    let data =await Service.ListarSedesCode().then(res =>{
        return res
    })
 
    setSedes(data)
         }

         useEffect(() => {
            listarSede()
        
         }, []);

return(

<Fragment>
<Cabecera MostrarToolbar={MostrarToolbar}  visibleCustomToolbar2={visibleCustomToolbar}/>
<Toast ref={toast} />

{loading?<Loading></Loading>:<>


<Sidebar position="right" visible={visibleCustomToolbar} onHide={() => setVisibleCustomToolbar(false)} icons={leftToolbarTemplate}>
            <div style={{display:"flex" ,justifyContent:"center",alignContent:"center"}}>
            
            <h3>Opciones Interactivas </h3></div>
            <div className='container-sm'>

                    <div className="row">

                    
                    <Button label="Nuevo Estudiante" style={{with:"100%",marginTop:"10px"}} onClick={AbrirDialog}/>
                    <Button label="Eliminar Estudiantes" style={{with:"100%",marginTop:"10px"}} onClick={() =>setEliminarEstudiantesDialog(true)} />

                    </div>
            </div>

            <div style={{display:"flex" ,justifyContent:"center",alignContent:"center"}}>

                    <h3>Filtros Avanzados </h3>
                    </div>
                    <div className='container-sm'>

                    <div className="row">
    <div className="col-12 " >
  
    <div className="field">
                <h5>Tipo de estado </h5>
                <div className="formgrid grid ">
        
                        <div className="field-radiobutton col-6">
                <RadioButton value="Activos" inputId="category1" name="estado" onChange={onEstadoChange} checked={tipoEstadoValidacion === 'Activos'}  />
                <label className="mb-3">Activos</label>
                </div>
                <div className="field-radiobutton col-6">
                    <RadioButton value="Desabilitado" name="estado" onChange={onEstadoChange} checked={tipoEstadoValidacion === 'Desabilitado'}  />
                    <label className="mb-3">Desabilitado</label>
                </div>
                <div className="field-radiobutton col-6" >
                    <RadioButton value="Todos" name="estado" onChange={onEstadoChange} checked={tipoEstadoValidacion === 'Todos'} />
                    Todos
                </div>
                </div>
                </div>
    </div>
    
  </div>

                    </div>
                </Sidebar>
                <div style={{width:"100%" ,display:"flex", justifyContent:"center"}}>
<DataTable  onColReorder={onColReorder}  reorderableColumns   style={{zIndex:"5" ,width:"100%" }} ref={dt} value={renderizadorEstudiantes} selection={selectedEstudiantes} onSelectionChange={(e) => setSelectedEstudiantes(e.value)}
                    dataKey="id" paginator rows={5} rowsPerPageOptions={[5, 10, 25,50,100,150,200]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Desde {first} a {last} del total de {totalRecords} estudiantes "
                     header={header} responsiveLayout="scroll">

<Column rowReorder selectionMode="multiple" headerStyle={{ width: '1rem',background:"#1E2E86"}} exportable={false}></Column>
<Column field="id" header="Id" sortable style={{ width: '1rem', background:"#1E2E86",color:"#FEFEFE"   }}></Column>
<Column field="correo"  header="Correo"  sortable style={{  background:"#1E2E86" ,color:"#FEFEFE"  }}></Column>

<Column field="nombre" header="Nombre" sortable style={{ width: '1rem' ,background:"#1E2E86" ,color:"#FEFEFE"  }}></Column>
<Column field="numeroDocumento" header="Numero Documento" sortable style={{ width: '1rem' ,background:"#1E2E86",color:"#FEFEFE" }}></Column>
<Column field="action" style={{ width: '1rem' ,background:"#1E2E86" ,color:"#FEFEFE"}}  header="Acciones" body={MostrarOpciones}></Column>
</DataTable>

</div>
   <Dialog visible={eliminarEstudiantesDialog} style={{ width: '450px' }} header="Eliminar estudiantes" modal footer={deleteEstudiantesDialogFooter} onHide={hideDeleteEstudiantesDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem'}} />
                    <span>¿Estas seguro que quieres eliminar los usuarios seleccionados ? </span>
                </div>
            </Dialog>


            <Dialog visible={estudianteDialog} style={{ width: `${tamañoDialog}` }} header="Edicion de datos estudiante" modal className="p-fluid" onHide={()=>ocultarDialog()} footer={estudianteDialogFooter()}  >
{estudianteFormulario()}

               

            </Dialog>

            <Dialog visible={detalleDialog} header="Detalle de estudiante" modal className="p-fluid" style={{ width:"90%",height:"90%"}} onHide={()=>ocultarDialogDetalle()}  >
<div className="contenedorDetalleEstudiantes" >
            {loadingFoto ? (<>
                <div className="DatosPersonalesEstudiante">
                <div style={{ width:"100%"}} className="cabeceraDetaller">
                <div style={{display:"flex",justifyContent:"flex-start",alignItems:"flex-start",maxWidth:"100%",maxHeight:"100%"  }}>
{
  
  estudiante.id_files.data ?(
      
    

<div  style={{color:"black",position:"relative" ,Width:"100%",Height:"100%" ,zIndex:"5"}} >
 
  <img  style={{width:"100%",height:"100%"}}
   src={onchangeImage(estudiante.id_files.data)} />
 </div>

  

  ) :(
      <FontAwesomeIcon style={{width:"30%",height:"10%"}} icon={faUser}/> )} 
</div></div>

<div className="detalleDatos"></div>
</div>
</> ):(<></>)}



               </div>

            </Dialog>

            
            <Dialog visible={configurationDialog}  header="Configuracion Servicios Estudiante" modal className="p-fluid" onHide={()=>ocultarDialogConfiguration()} style={{ width:"60%",height:"80%" }} >
<>
{crearNotificacionCorreo ? <></>:<>
               <Button label={formularioNotificacion? "Crear Notificacion Personalizada ":"Regresar a las opciones anteriores"} onClick={()=>  hide(1000)}/>
               </>}
               { display
        ? <div className = {`Modal ${animation}`}>
    
     <div className="field">
     {configurarionFormularioEstudiantes?
        <table className="table">
         <thead>
             <tr>
             <th></th>
                 <th>Tipo de Notificacion</th>
                 <th>Estado</th>
                 <th>Fecha de creacion</th>
                 <th>Tiempo de notificacion</th>
                 <th>Plataforma</th>
             </tr>
         </thead>
         <tbody>
{configurarionFormularioEstudiantes.map((res)=>{
            <tr className="tableNotificacionesTR" onClick={()=>tableNotificacionDetalle(res.idEstudiante)}>
            <td>
                  1
                </td>
                <td>
                    Pension
                </td>
                <td>
                   {buscarEstadoNotificacion(res.idEstudiante)}
                </td>
                <td>
                    Pension
                </td>
                <td>
                    Pension
                </td>
                <td>
                    Pension
                </td>
            </tr>})
            
           
            }
     
         </tbody>
        </table>
     :<>no hay configuraciones para este estudiante</>}
     </div>

          </div>
        :(<>
        {display2? 
        
      <>DISPLAY 2 </> :<>
           
      {crearNotificacionCorreo ? (<>
        <Button label="Regresar a las opciones Anteriores " onClick={()=> SetCrearNotificacionCorreo(false) } />

        <Tiptap  onChangeConfigurationEstudianteText={onChangeConfigurationEstudianteText} subirImagen={subirImagen} />

      </>) :( <>
           
      <div className = {`Modal ${animation2}`}>
        <div className="field">
        <Button label="Crear Notificacion Correo" onClick={()=> SetCrearNotificacionCorreo(true) } />
        

          
            <div>
 
            </div>

<div>

</div>
        </div>
           </div></>)}
    </>    }
           </>
        )
        }


</>
            </Dialog>
         

</>}

</Fragment>

)

}