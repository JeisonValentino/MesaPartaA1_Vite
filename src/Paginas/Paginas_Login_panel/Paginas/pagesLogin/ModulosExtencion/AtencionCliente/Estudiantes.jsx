import { faFileExcel, faMagnifyingGlassMinus, faTrash, faUserPen } from "@fortawesome/free-solid-svg-icons";
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
export default function Estudiantes (){

const[loading,setLoading]=useState(true)
const [selectedEstudiantes, setSelectedEstudiantes ] = useState(null);
const dt = useRef(null);
const [tamañoDialog,setTamañoDialog]= useState('40%');
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
    estado:''
}
let emptyformaContacto={
    id:null,nombre:'',apellidoMaterno:'',apellidoPaterno:'',numeroDocumento:'',idEstudiante:'',idTipoDocumentoIdentidad:tipoDocumento,idrelacionfamiliar:'',numeroTelefono:''
}
const [formaContacto,setFormaContacto]=useState(emptyformaContacto)
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
const[eliminarEstudiantesDialog,setEliminarEstudiantesDialog]=useState(false);
const [EnviarSonido] = useSound(notificacionAprob)
const [fallosonido]=useSound(fallo)
const [estado, setEstado] = useState({
    step: 1
  })

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

const BuscarGlobal= (e)=>{
    debounceFn(e.target.value)
}
let debounceFn = debounce(filtrador, 500);
function filtrador  (e){
    var resultadoBusqueda = !e ? estudiantes:  estudiantes.filter(elemento => {
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

const MostrarOpciones=(rowData)=>{

    return(
<Fragment>

               <div style={{display:"flex",columnGap:"2px"}}>
                 <Button
                   label={<FontAwesomeIcon icon={faMagnifyingGlassMinus}/>}
                   onClick={() => onClickDetalle(rowData) } style={{background:"#1646cb"}}
                 />
                 <Button
                   label={<FontAwesomeIcon icon={faUserPen}/>}
                   onClick={() => onClickEdit(rowData) } style={{background:"blue"}}
                 />
                 <Button
                   label={<FontAwesomeIcon icon={faTrash}/>}
                   onClick={() => onClickDelete(rowData) } style={{background:"red"}}
                 />
              
               </div>
              </Fragment>

    )
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


const onClickDetalle= ()=>{

}
const onClickEdit= (data)=>{
    setEstudiante({...data})
    console.log(data)
let dat = data.id
BuscarListaformaContactoPorEstudiante(dat)
let _formContacto={...formaContacto};
_formContacto['idEstudiante']=data
setFormaContacto(_formContacto)
AbrirDialog()
    
}
console.log(formaContacto)
const onClickDelete= ()=>{
    
}
const onClickDesabilitar= ()=>{
    
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
setEstado({ step: 1 })
    setSubmitted(false);
    setEstudianteDialog(false);
    setTamañoDialog('40%')

}
const hideDeleteEstudiantesDialog = () => {
  
    setEliminarEstudiantesDialog(false);
    
}



const onEstadoChange = (e) => {
    
    setTipoEstadoValidacion(e.value);
   
}

const nextStep = (e)=>{
    e.preventDefault();
setTamañoDialog('80%')
setSubmitted(true)
const { step } = estado
setEstado({ step: step + 1 })
setSubmitted(false)
}


const prevStep = () => {
    const { step } = estado
    setTamañoDialog('40%')
    setEstado({ step: step - 1 })
  }
  const GuardarEstudiante= async (e)=>{
e.preventDefault()
let error=false;
let error2=false;
let mensaje='';
let mensaje2='';
let valor={};
console.log(estudiante)
if(estudiante.id){


await Service.ModificarEstudiante(estudiante).then(res=>{
    mensaje=res
}).catch((res)=>{
    fallosonido()
    error=true;
    toast.current.show({ severity: 'error', summary: 'Ocurrio un problema', detail: `${res.response.data.message}`, life: 3000 });
})

Service.AgregarFormaDecontactoEstudiante(formaContactos,estudiante.id).then(res=>{
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

                console.log(valor)
                onClickEdit(valor)
          

            }




}




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

const estudianteFormulario=()=>{


const { step } = estado
switch (step) {
    case 1:
        return (
<div className="MoverDerechaDialog">

            <div className="field">
                         <label htmlFor="nombre">Nombre</label>
                         <InputText id="nombre" value={estudiante.nombre} onChange={(e) => onInputChange(e, 'nombre')} required autoFocus className={classNames({ 'p-invalid': submitted && !estudiante.nombre })} />
                         {submitted && !estudiante.nombre && <small className="p-error">El nombre es requerido.</small>}
<br/>
<label htmlFor="apellidoPaterno">Apellido Paterno</label>
                         <InputText id="apellidoPaterno" value={estudiante?.apellidoPaterno} onChange={(e) => onInputChange(e, 'apellidoPaterno')} required autoFocus className={classNames({ 'p-invalid': submitted && !estudiante?.apellidoPaterno })} />
                         {submitted && !estudiante?.apellidoPaterno && <small className="p-error">La apellidoPaterno es requerida .</small>}

                         <label htmlFor="apellidoMaterno">Apellido Materno</label>
                         <InputText id="apellidoMaterno" value={estudiante?.apellidoMaterno} onChange={(e) => onInputChange(e, 'apellidoMaterno')} required autoFocus className={classNames({ 'p-invalid': submitted && !estudiante.apellidoMaterno })} />
                         {submitted && !estudiante?.apellidoMaterno && <small className="p-error">La apellidoMaterno es requerida .</small>}


                         <label htmlFor="correo">Correo</label>
                         <InputText id="correo" value={estudiante.correo} onChange={(e) => onInputChange(e, 'correo')} required autoFocus className={classNames({ 'p-invalid': submitted && !estudiante.correo })} />
                         {submitted && !estudiante.correo && <small className="p-error">El correo es requerida .</small>}

                         <label htmlFor="direccion">Direccion</label>
                         <InputText id="direccion" value={estudiante.direccion} onChange={(e) => onInputChange(e, 'direccion')} required autoFocus className={classNames({ 'p-invalid': submitted && !estudiante.direccion })} />
                         {submitted && !estudiante.direccion && <small className="p-error">La direccion es requerida .</small>}
 

                         <label htmlFor="numeroDocumento">Numero Documento</label>
                         <InputNumber id="numeroDocumento" value={estudiante?.numeroDocumento || ""} mode="decimal" name="numeroDocumento" 
                         onChange={(e)=>onInputChange2(e)} required autoFocus className={classNames({ 'p-invalid': submitted && !estudiante.numeroDocumento })} />
                         {submitted && !estudiante.numeroDocumento && <small className="p-error">La numeroDocumento es requerida .</small>}
                         {estudiante.numeroDocumento}

                         

                         </div>
                         <hr/>
                     <div className="field">
                         <label className="mb-3">Tipo Documento </label>
                         <div className="formgrid grid ">
                             <div className="field-radiobutton col-6">
                                 <RadioButton inputId="category1" name="idTipoDocumentoIdentidad"
                                  value={{id:'1' ,nombreDocumento:'DNI' }} onChange={(e)=>onCategoryChange(e,"idTipoDocumentoIdentidad")} checked={estudiante.idTipoDocumentoIdentidad.nombreDocumento === 'DNI'} />
                                 <label htmlFor="category1">Dni</label>
                             </div>
                             <div className="field-radiobutton col-6">
                                 <RadioButton inputId="category2" name="idTipoDocumentoIdentidad"  value={{'id':'2' ,nombreDocumento:'extrangero' }}  onChange={(e)=>onCategoryChange(e,"idTipoDocumentoIdentidad")} checked={estudiante.idTipoDocumentoIdentidad.nombreDocumento === 'extrangero'} />
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
                         />
                       
     </div></div>

     <hr/>
     <div className="field">
                     <label className="mb-3">Grado Estudiante</label>
                     <div className="formgrid grid card">
                    
                     <Dropdown value={estudiante.gradoEstudiante_id} options={opcionesGrado} 
                     onChange={(e)=>onEstudianteChange(e, 'gradoEstudiante_id')}   optionLabel="nombreGrado"
                         />
                       
     </div></div>

     <hr/>
                     <div className="field">
                         <label className="mb-3">Sexo</label>
                         <div className="formgrid grid ">
                             <div className="field-radiobutton col-6">
                                 <RadioButton inputId="category1" name="idTipoSexo" value="Mujer" onChange={(e)=>onCategoryChange(e,"idTipoSexo")} checked={estudiante.idTipoSexo === 'Mujer'} />
                                 <label htmlFor="category1">Mujer</label>
                             </div>
                             <div className="field-radiobutton col-6">
                                 <RadioButton inputId="category2" name="idTipoSexo" value="Hombre" onChange={(e)=>onCategoryChange(e,"idTipoSexo")} checked={estudiante.idTipoSexo === 'Hombre'} />
                                 <label htmlFor="category2">Hombre</label>
                             </div>
                             
                         </div>
                     </div>


</div>
)
case 2:
    
    return (
        <div className='container-rm'>
        <div className='row'>
          <div className='col-6'>
            <label htmlFor='telefono'>Lista de contactos</label>

            <div style={{ overflow: 'auto', height: '655px' }}>
{console.log(formaContactos.length)}
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


          <label htmlFor="nombre">Nombre</label>
                         <InputText id="nombre" value={formaContacto.nombre} onChange={(e) => onChangeFormaContacto1(e, 'nombre')} required autoFocus className={classNames({ 'p-invalid': submitted2 && !formaContacto.nombre })} />
                         {submitted2 && !formaContacto.nombre && <small className="p-error">El nombre es requerido.</small>}



          <label htmlFor="apellidoPaterno">Apellido Paterno</label>
                         <InputText id="apellidoPaterno" value={formaContacto.apellidoPaterno} onChange={(e) => onChangeFormaContacto1(e, 'apellidoPaterno')} required autoFocus className={classNames({ 'p-invalid': submitted2 && !formaContacto.apellidoPaterno })} />
                         {submitted2 && !formaContacto.apellidoPaterno && <small className="p-error">La apellidoPaterno es requerida .</small>}


                         <label htmlFor="apellidoMaterno">Apellido Materno</label>
                         <InputText id="apellidoMaterno" value={formaContacto.apellidoMaterno} onChange={(e) => onChangeFormaContacto1(e, 'apellidoMaterno')} required autoFocus className={classNames({ 'p-invalid': submitted2 && !formaContacto.apellidoMaterno })} />
                         {submitted2 && !formaContacto.apellidoMaterno && <small className="p-error">La apellidoMaterno es requerida .</small>}

                         <label htmlFor="numeroDocumento">Numero Documento</label>
                         <InputNumber id="numeroDocumento" value={formaContacto.numeroDocumento} useGrouping={false} mode="decimal"  onChange={(e) => onChangeFormaContacto2(e, 'numeroDocumento')} required autoFocus className={classNames({ 'p-invalid': submitted2 && !formaContacto.numeroDocumento })} />
                         {submitted2 && !formaContacto.numeroDocumento && <small className="p-error">La numeroDocumento es requerida .</small>}

                  <label htmlFor='numeroTelefono'> Telefono </label>
                  <InputNumber
                    id='numeroTelefono'
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
                                 <RadioButton inputId="category1" name="idTipoDocumentoIdentidad"
                                  value={{id:'1' ,nombreDocumento:'DNI' }}  onChange={(e)=>onChangeFormaContacto1(e,"idTipoDocumentoIdentidad")} checked={formaContacto?.idTipoDocumentoIdentidad.nombreDocumento === 'DNI'} 
                                  className={classNames({
                      'p-invalid': submitted2 && !formaContacto.idTipoDocumentoIdentidad
                    })}
                                   />
                                 <label htmlFor="category1">Dni</label>
                             </div>
                             <div className="field-radiobutton col-6">
                                 <RadioButton inputId="category2" name="idTipoDocumentoIdentidad"  value={{id:'2' ,nombreDocumento:'extrangero' }}  onChange={(e)=>onChangeFormaContacto1(e,"idTipoDocumentoIdentidad")} checked={formaContacto.idTipoDocumentoIdentidad.nombreDocumento === 'extrangero'} 
 className={classNames({
                      'p-invalid': submitted2 && !formaContacto.idTipoDocumentoIdentidad
                    })}

                                 />
                                 <label htmlFor="category2">Extrangero</label>
                             </div>
                             
                         </div>
                     </div>

                    <Button label="Agregar Contacto" onClick={(e)=>AgregarFormaDecontactoEstudiante(e)}/>
                </div>


            </div>
            </div>
    )

}
}

const estudianteDialogFooter = ()=>{
 
    return (<React.Fragment>



{estado.step==1 && !estudiante.id?
           <Button  label="Guardar" icon="pi pi-check" className="p-button-text" onClick={(e)=>GuardarEstudiante(e)} />
           :""
       }

            {estado.step==1 && estudiante.id?
          
           
                <Button onClick={(e)=>nextStep(e)} label="Siguiente"  > </Button>
             
              
         :""   }

         {estado.step==2?
           <>
                {' '}
                <Button label="Retroceder" onClick={(e)=>prevStep(e)} > </Button>
                </>
:""
            }


       {estado.step==2?
           <Button  label="Guardar" icon="pi pi-check" className="p-button-text" onClick={(e)=>GuardarEstudiante(e)} />
           :""
       }
       </React.Fragment>)
   }


const onInputChange = (e, name)=>{
    const val = (e.target && e.target.value) || '';
    let _product = {...estudiante};

    _product[`${name}`] = val;

    setEstudiante(_product);
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
                <div className="field-radiobutton col-6">
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
<DataTable  onColReorder={onColReorder}  reorderableColumns   style={{zIndex:"5" ,width:"95%" }} ref={dt} value={renderizadorEstudiantes} selection={selectedEstudiantes} onSelectionChange={(e) => setSelectedEstudiantes(e.value)}
                    dataKey="id" paginator rows={1} rowsPerPageOptions={[1,5, 10, 25,50,100,150,200]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Desde {first} a {last} del total de {totalRecords} estudiantes "
                     header={header} responsiveLayout="scroll">

<Column rowReorder selectionMode="multiple" headerStyle={{ width: '1rem',background:"#1E2E86"}} exportable={false}></Column>
<Column field="id" header="Id" sortable style={{ width: '1rem', background:"#1E2E86",color:"#FEFEFE"   }}></Column>
<Column field="correo" header="Correo" sortable style={{ width: '1rem' , background:"#1E2E86" ,color:"#FEFEFE"  }}></Column>
<Column field="nombre" header="Nombre" sortable style={{ width: '1rem' ,background:"#1E2E86" ,color:"#FEFEFE"  }}></Column>
<Column field="numeroDocumento" header="Numero Documento" sortable style={{ width: '1rem' ,background:"#1E2E86",color:"#FEFEFE" }}></Column>
<Column field="action" style={{ width: '1rem' ,background:"#1E2E86" ,color:"#FEFEFE"}} header="Acciones" body={MostrarOpciones}></Column>
</DataTable>

</div>
   <Dialog visible={eliminarEstudiantesDialog} style={{ width: '450px' }} header="Eliminar estudiantes" modal footer={deleteEstudiantesDialogFooter} onHide={hideDeleteEstudiantesDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem'}} />
                    <span>¿Estas seguro que quieres eliminar los usuarios seleccionados ? </span>
                </div>
            </Dialog>


            <Dialog visible={estudianteDialog} style={{ width: `${tamañoDialog}` }} header="Detalles de estudiante" modal className="p-fluid" onHide={()=>ocultarDialog()} footer={estudianteDialogFooter()}  >
{estudianteFormulario()}

               

            </Dialog>
         

</>}

</Fragment>

)

}