import React , { Fragment, useState } from "react"
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { classNames } from "primereact/utils";
import { Dropdown } from 'primereact/dropdown';
import 'primeicons/primeicons.css'
import { Tag } from 'primereact/tag';
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.css'
import PlacesAutocomplete from "react-places-autocomplete/dist/PlacesAutocomplete";
import { geocodeByAddress } from "react-places-autocomplete";
import { getLatLng } from "react-places-autocomplete";
import { QuejasReclamos } from "./QUEJAS_RECLAMOS/QuejasReclamos";
import { Dialog } from 'primereact/dialog';
import { Matricula } from "./QUEJAS_RECLAMOS/Matricula";
import { CertificadoEstudios } from "./QUEJAS_RECLAMOS/CertificadoEstudios";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCircleCheck, faPersonWalkingArrowLoopLeft } from "@fortawesome/free-solid-svg-icons";




export   const QuejaFormulario = () =>{

  const [files2,setFiles]=useState([])
  const [displayPosition, setDisplayPosition] = useState(false);
const [quejaFormulario,setQuejaFormulario] = useState({
id:'',sede:'',contacto:'' ,numeroDocumento:'' ,tipoDni:'', correoPersonal:'',nombre:'',apellidoPaterno:'',apellidoMaterno:'',domicilio:'',Apoderado:'',correoCorporativo:'',FormaContacto:'',tipoBienContratado:'',clasificacion:'',asunto:'',tipoReclamo:'',detalle:'',pedido:'',nombreEstudiante:'',apellidoMaternoEstudiante:'',apellidoPaternoEstudiante:'',numeroDocumentoEstudiante:'',tipoDocumentoEstudiante:'' ,tipoMatricula:''})

const [extendible,setExtendible]=useState({extendible1:'',extendible2:''});
const [enviarFormulario, setEnviarFormulario]=useState(false)
const [displayBasic, setDisplayBasic] = useState(false)


const onHide2 = () => {
  setDisplayBasic(false);
  setQuejaFormulario['id']=''
}


let opcionesHoja = [
    {name:'SALAMANCA' ,code:1},  {name:'CARABAYLLO' ,code:2}
]

let opcionesHoja2 = [
    {name:'QUEJA' ,code:1},{name:'CERTIFICADOS',code:2} ,{name:'TRAMITE DE TRASLADO',code:3},{name:'MATRICULA',code:6}
]

let opcionesHoja3 =[{name:'COLEGIO VIRTUAL',code:1},{name:'COLEGIO SEMIPRESENCIAL',code:'2'},{name:'CIRCULO DE REFORZAMIENTO',code:3},{name:'ACADEMIA',code:4}]

const onHide = () => {
  setDisplayPosition(false);
}

const {File} =files2;


const generateUniqSerial = ()=>  {  
  return 'xxxx-xxxxx'.replace(/[x]/g, (c) => {  
      const r = Math.floor(Math.random() * 16);  
      return r.toString(16) ;  
});  
}

const enviarPost = ()=>{
  setDisplayBasic(true)
quejaFormulario.id = "SO-"+generateUniqSerial()
const formData = new FormData()


for (var i = 0; i < files2.files.length; i++) {
console.log(files2.files[i])
formData.append('files',files2.files[i])
}

var fileTosave2 = new Blob([JSON.stringify(quejaFormulario)], {
  type: 'application/json'
})
formData.append('obj', fileTosave2)
axios({
  method: 'POST',
  url: 'http://localhost:8080/solicitud/GuardarSolicitud',
  data: formData,
  headers: { 'Content-Type': 'multipart/form-data' }
})


    setEnviarFormulario(false)  

}

const onChangeFormulario = () => {

setEnviarFormulario(true)



if(quejaFormulario.nombre !=='' && quejaFormulario.apellidoMaterno !=='' && quejaFormulario.apellidoPaterno !=='' && quejaFormulario.numeroDocumento !=='' && quejaFormulario.correoPersonal !=='' && quejaFormulario.tipoDni !=='' && quejaFormulario.domicilio !==''&& quejaFormulario.sede !== '' ){

  if(quejaFormulario.tipoReclamo ==='QUEJA' ){
    if((quejaFormulario.detalle !== '') && (quejaFormulario.pedido  !== '')){

enviarPost()}
}else if(quejaFormulario.tipoReclamo ==='CERTIFICADOS'){
  
  if(quejaFormulario.nombreEstudiante !== '' && quejaFormulario.apellidoMaternoEstudiante !=='' && quejaFormulario.apellidoPaternoEstudiante !== '' && quejaFormulario.tipoDocumentoEstudiante !=='' && quejaFormulario.numeroDocumentoEstudiante !== '' && quejaFormulario.tipoMatricula !==''){

    enviarPost()}

}else if(quejaFormulario.tipoReclamo ==='MATRICULA'){

  if(quejaFormulario.nombreEstudiante !== '' && quejaFormulario.apellidoMaternoEstudiante !=='' && quejaFormulario.apellidoPaternoEstudiante !== '' && quejaFormulario.tipoDocumentoEstudiante !=='' && quejaFormulario.numeroDocumentoEstudiante !== '' && quejaFormulario.tipoMatricula !==''){

  enviarPost()}
}



}


}

 console.log(files2.length)
const selectecDireccion =async value =>{

    const results=await geocodeByAddress(value)
    const ll =await getLatLng(results
       [0] );

       let _Product={...quejaFormulario}
       _Product['domicilio']=value
       setQuejaFormulario(_Product); 
 }
const dirreccionAplicado = (e) =>{

  
    let _Product={...quejaFormulario}
    _Product['domicilio']=e
    setQuejaFormulario(_Product);

}

const invoiceUploadHandler = ({files}) => {





setFiles({...files2, files})

  const fileReader = new FileReader();

  fileReader.onload = (e) => {



  };
  
};


const GuardarImagenes = (file, props) => {



  return (
<div className="flex align-items-center flex-wrap">
                <div className="flex align-items-center" style={{width: '40%'}}>
                    <img alt={file.name} role="presentation" src={file.objectURL} width={100} />
                    <span className="flex flex-column text-left ml-3">
                        {file.name}
                        <small>{new Date().toLocaleDateString()}</small>
                    </span>
                </div>
                <Tag value={props.formatSize} severity="warning" className="px-3 py-2" />
                <Button type="button" icon="pi pi-times" className="p-button-outlined p-button-rounded p-button-danger ml-auto" onClick={() => onTemplateRemove(file, props.onRemove)} />
            </div>
)



}
const [totalSize, setTotalSize] = useState(0);

const onTemplateRemove = (file, callback) => {
  
  setTotalSize(totalSize - file.size);


  var file3= Array.from(files2.files).filter( item => item.name !== file.name )
  setFiles({...files2 , file3})
console.log(file3)
  callback();
}


const onchangeRadioButon = (e,name)=> {

   let _quejaFormulario = {...quejaFormulario}

   _quejaFormulario[`${name}`]=e
 
   setQuejaFormulario(_quejaFormulario)
   console.log(e)
}


const onchangeRadioButon2 = (e,name,name2)=> {

  let _quejaFormulario = {...quejaFormulario}
let _extendible = {...extendible}
  _quejaFormulario[`${name}`]=e.name
  if(e.name ==='MATRICULA'){
   setDisplayPosition(true)

  }





  _extendible[`${name2}`]=e
  setExtendible(_extendible)

  _quejaFormulario['correoCorporativo']=''
  _quejaFormulario['tipoBienContratado']=''
  _quejaFormulario['asunto']=''
  _quejaFormulario['detalle']=''
  _quejaFormulario['pedido']=''
  _quejaFormulario['nombreEstudiante']=''
  _quejaFormulario['apellidoMaternoEstudiante']=''
  _quejaFormulario['apellidoPaternoEstudiante']=''
  _quejaFormulario['numeroDocumentoEstudiante']=''
  _quejaFormulario['tipoDocumentoEstudiante']=''
  _quejaFormulario['numeroDocumentoEstudiante']=''
  setQuejaFormulario(_quejaFormulario)
  
  
  console.log(e)
}

console.log(extendible.extendible1)

function validarEmail(valor) {
    if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(valor)){
   return(true);
    } else {
        return(false);
    }
  }

const funcionTipoDocumento= ()=>{


 
if(quejaFormulario.tipoReclamo === 'MATRICULA'){

 


return(

  
<Matricula  invoiceUploadHandler ={invoiceUploadHandler} GuardarImagenes ={GuardarImagenes} quejaFormulario={quejaFormulario} onchangeRadioButon={onchangeRadioButon} enviarFormulario={enviarFormulario} />

)

}else if(quejaFormulario.tipoReclamo === 'QUEJA'){

return(
  <QuejasReclamos enviarFormulario={enviarFormulario} quejaFormulario={quejaFormulario} onchangeRadioButon={onchangeRadioButon} invoiceUploadHandler={invoiceUploadHandler} GuardarImagenes={GuardarImagenes} />
)
  
}else if (quejaFormulario.tipoReclamo === 'CERTIFICADOS'){
  
  return(

<CertificadoEstudios onchangeRadioButon={onchangeRadioButon} quejaFormulario={quejaFormulario} enviarFormulario={enviarFormulario} invoiceUploadHandler={invoiceUploadHandler}  GuardarImagenes={GuardarImagenes} />
  )}



}

return(
    <Fragment>
    <Dialog header={<h5 style={{textAlign:"center"}} >SE HA GENERADO EL SIGUIENTE CODIGO DE SOLICITUD</h5>} visible={displayBasic} style={{ width: '50vw' }}  onHide={() => onHide2()}>
                    <h1 style={{textAlign:"center",color:"black"}}>{quejaFormulario.id}</h1>
                </Dialog>

          <Dialog header="GUIA DE MATRICULA" visible={displayPosition} position={'top'} modal style={{ width: '50vw' }}  onHide={() => onHide()}
                    draggable={false} resizable={false}>
                    <div style={{background:"rgba(26, 4, 133, 0.92)",color:"white"}} >
                   <h5>ORIENTACIONES Y REQUISITOS DE MATRÍCULA.
 
 </h5>
                   <ol  className="list-group list-group-numbered">
  <li style={{background:"rgba(26, 4, 133, 0.92)"}} className="list-group-item"> 
  <label style={{color:"white"}}>Requisitos a presentar </label>
  <ol className="list-group list-group-numbered">
  <li  className="list-group-item" style={{color:" rgba(44, 2, 255, 0.92)"}}>Rellenar los campos del formulario  de "IDENTIFICACION DEL ESTUDIANTE " </li>
  <li className="list-group-item" style={{color:" rgba(44, 2, 255, 0.92)"}}>Foto dni de estudiante y padres  ambos lados</li>
  <li className="list-group-item" style={{color:" rgba(44, 2, 255, 0.92)"}}>Foto reporte   o constancia logros de notas del estudiante debe indicar código modular del local de la i.e ó i.e.p</li>
  <li className="list-group-item" style={{color:" rgba(44, 2, 255, 0.92)"}}>Voucher de cancelación matrícula</li>
  <li className="list-group-item" style={{color:" rgba(44, 2, 255, 0.92)"}}>Enviar la solicitud </li>
  </ol>

  
  
  </li>
  <li style={{background:"rgba(26, 4, 133, 0.92)"}} className="list-group-item">
  <label style={{color:" white"}} >Entrega del correo institucional </label>
  <ol className="list-group list-group-numbered">
  <li className="list-group-item" style={{color:" rgba(44, 2, 255, 0.92)"}} >Si ya cumplió  con el paso uno (1) el colegio le envía  un correo y contraseña donde podrá acceder a  todas las clases vía meet. con sus profesores </li>
 
  </ol>

  </li>
  <li style={{background:"rgba(26, 4, 133, 0.92)"}} className="list-group-item">  <label style={{color:"white"}}> Horario de clases y calendario google </label>
  <ol className="list-group list-group-numbered">
  <li className="list-group-item" style={{color:" rgba(44, 2, 255, 0.92)"}}>El horario de clases virtual , semipresencial y presencial es el mismo de 8:00 am a 12:00am  de lunes a viernes </li>
  <li className="list-group-item" style={{color:" rgba(44, 2, 255, 0.92)"}}>Las clases son sincrónicas con cada  profesor y el estudiante  </li>
  <li className="list-group-item" style={{color:" rgba(44, 2, 255, 0.92)"}}>Orientaciones a padres se realizan  al terminar el día 12:00m    con cada padre y el profesor de turno vía  meet., consultar con el docente en el momento. </li>
  <li className="list-group-item" style={{color:" rgba(44, 2, 255, 0.92)"}} >Todas las clases están en el calendario desde allí debe ingresar el estudiante.  </li>
  </ol></li>

  <li  style={{background:"rgba(26, 4, 133, 0.92)"}} className="list-group-item">
<label style={{color:"white"}} >CUBICOL </label>
  <ol className="list-group list-group-numbered">
  <li style={{color:" rgba(44, 2, 255, 0.92)"}} className="list-group-item"> En la   plataforma educativa se envía a su correo institucional usuario y contraseña, aquí se encuentran el  sílabo del trimestre y todo lo que se trabajará en clase con cada profesor. s </li>
 
  </ol>
  </li>

  <li style={{background:"rgba(26, 4, 133, 0.92)"}} className="list-group-item">
<label style={{color:"white"}}>Constancia de vacante </label>
  <ol className="list-group list-group-numbered">
  <li className="list-group-item" style={{color:" rgba(44, 2, 255, 0.92)"}}>  Le entregamos en el correo institucional en un plazo de cinco ( 5) días hábiles para que entregue  a la i,e ó i.e.p que el niño ha sido traslado.  </li>
 
  </ol>
  </li>
</ol>

<label style={{marginLeft:"25%",marginTop:"5%",color:"white",marginBottom:"5%"}}>Lic. Maria Ortiz : Coordinación académica 
</label>
</div>
                </Dialog>
<div style={{width:"100%",padding:"2rem",margin:"2%"}} >

<div className="card" style={{marginTop:"3%",padding:"2%"}}>
<div
            className='carta subCarta2 '
            style={{width:"300px"  }}
          >
           <Link className='subCarta'  to='/MesaPartes' style={{textDecoration:"none"}}><div style={{width:"100%",height:"100%",padding:"2%" ,textDecoration:"none"}}>
           <FontAwesomeIcon style={{width:"20px" ,height:"20px",marginRight:"5px"}} icon={faPersonWalkingArrowLoopLeft}/>
           
           REGRESAR A OPCIONES </div> </Link>
          </div>

<label>MESA DE PARTES  </label>
<hr/>
<div className="row">
<div className="col" style={{width:"50rem"}}>
<label  className="form-label">Sede:  </label>
<Dropdown style={{width:"80%",marginLeft:"2%"}} value={quejaFormulario.sede} options={opcionesHoja} onChange={(e)=> onchangeRadioButon(e.value,'sede')} optionLabel="name" placeholder="Select a City" required
                          autoFocus className={classNames({ 'p-invalid': !quejaFormulario.sede  && enviarFormulario })} />
 


 {!quejaFormulario.sede && enviarFormulario &&  (
                          <label className={classNames({ 'p-error': !quejaFormulario.sede && enviarFormulario  })}>
                            La sede es invalido .
                          </label>
                        )}
</div>
<div className="col-7">
    <h5 style={{fontSize:"220%",letterSpacing:"5px"}}>CIRCULO A1 SCHOOL </h5>
</div>
</div>
</div>
<div className="card" style={{marginTop:"3%",padding:"2%"}}>
<label>IDENTIFICACION DEL SOLICITANTE </label>
<hr/>

<div className="row">
<div className="col-md-4">
    <label className="form-label">Nombre : </label>
    <InputText value={quejaFormulario.nombre} onChange={(e)=>onchangeRadioButon(e.target.value,'nombre')} required
                          autoFocus className={classNames({ 'p-invalid': !quejaFormulario.nombre && enviarFormulario  })} />
 


 {!quejaFormulario.nombre && enviarFormulario &&  (
                          <label className={classNames({ 'p-error': !quejaFormulario.nombre && enviarFormulario  })}>
                            El nombre es invalido .
                          </label>
                        )}
  </div>
  <div className="col-md-4">
    <label  className="form-label">Apellido Materno: </label>
    <InputText value={quejaFormulario.apellidoMaterno}  onChange={(e) => onchangeRadioButon(e.target.value,'apellidoMaterno')} required
                          autoFocus className={classNames({ 'p-invalid': !quejaFormulario.apellidoMaterno && enviarFormulario  })} />
 


 {!quejaFormulario.apellidoMaterno && enviarFormulario &&  (
                          <label className={classNames({ 'p-error': !quejaFormulario.apellidoMaterno && enviarFormulario })}>
                            El apellido Paterno es invalido .
                          </label>
                        )}
  </div>
  <div className="col-md-4">
    <label  className="form-label">Apellido Paterno : </label>
    <InputText value={quejaFormulario.apellidoPaterno}  onChange={(e) => onchangeRadioButon( e.target.value ,'apellidoPaterno')} required
                          autoFocus className={classNames({ 'p-invalid': !quejaFormulario.apellidoPaterno && enviarFormulario  })} />
 


 {!quejaFormulario.apellidoPaterno && enviarFormulario &&  (
                          <label className={classNames({ 'p-error': !quejaFormulario.apellidoPaterno && enviarFormulario })}>
                            El apellido Paterno es invalido .
                          </label>
                        )}
  </div>
  </div>
  <br/>
<div className="row">
  <div className="col-4">
    <label  className="form-label"  style={{marginRight:"5%"}}>Tipo Documento : </label>
    <div className="btn-group " >
    <label style={{marginRight:"10%"}} >DNI</label>
                    <RadioButton  style={{marginRight:"10%"}}  name="tipoDni" value="dni" onChange={(e) => onchangeRadioButon(e.value,'tipoDni')} checked={quejaFormulario.tipoDni === 'dni'} required
                          autoFocus className={classNames({ 'p-invalid': !quejaFormulario.tipoDni && enviarFormulario  })} />
                   
             
                    <label  style={{marginRight:"10%"}}>Extrangero</label>
                    <RadioButton name="tipoDni" value="extrangero" onChange={(e) => onchangeRadioButon(e.value,'tipoDni')} checked={quejaFormulario.tipoDni === 'extrangero'} required
                          autoFocus className={classNames({ 'p-invalid': !quejaFormulario.tipoDni && enviarFormulario  })} />
 


 {!quejaFormulario.tipoDni && enviarFormulario && (
                          <label className={classNames({ 'p-error': !quejaFormulario.tipoDni && enviarFormulario  })}>
                            El tipo Dni es invalido .
                          </label>
                        )}
                    </div>
                
  </div>
  <div className="col-5">
  <label className="form-label">Nº documento : </label>
    <InputNumber mode="decimal" useGrouping={false} style={{marginLeft:"1%",width:"70%"}} value={quejaFormulario.numeroDocumento} onChange={(e)=>onchangeRadioButon(e.value,'numeroDocumento')} required
                          autoFocus className={classNames({ 'p-invalid': !quejaFormulario.numeroDocumento  && enviarFormulario })} />
 


 {!quejaFormulario.numeroDocumento && enviarFormulario &&  (
                          <label className={classNames({ 'p-error': !quejaFormulario.numeroDocumento && enviarFormulario  })}>
                            El numeroDocumento es invalido .
                          </label>
                        )}
  </div>

  </div>
  <br/>
  <div className="row">
  <div className="col-md-5">
    <label  >Correo Personal  : </label>

    <InputText value={quejaFormulario.correoPersonal} onChange={(e)=>onchangeRadioButon(e.target.value,'correoPersonal')} required
                          autoFocus className={classNames({ 'p-invalid': !validarEmail(quejaFormulario.correoPersonal) && enviarFormulario  })} />
 


 {!validarEmail(quejaFormulario.correoPersonal) && enviarFormulario &&  (
                          <label className={classNames({ 'p-error': !validarEmail(quejaFormulario.correoPersonal) && enviarFormulario  })}>
                            El correo es invalido .
                          </label>
                        )}
   
  </div>
  
<div className="col-7">
                       <PlacesAutocomplete 
        value={quejaFormulario.domicilio}
        onChange={dirreccionAplicado}
        onSelect={selectecDireccion}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div key={suggestions.description} >
          <label  >Dirreccion domicilio : </label>
            <InputText
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })   }  
              required
                          autoFocus className={classNames({ 'p-invalid': !quejaFormulario.domicilio && enviarFormulario })} />
 


 {!quejaFormulario.domicilio && enviarFormulario &&  (
                          <label className={classNames({ 'p-error': !quejaFormulario.domicilio && enviarFormulario  })}>
                            El domicilio  es invalido .
                          </label>
                        )}
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: 'rgba(60,60,60,0.8)', cursor: 'pointer',color:'white' }
                  : { backgroundColor: 'rgba(225,225,225,1)', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
  
  </div>
</div>



</div>




<div className="card" style={{marginTop:"3%",padding:"2%"}}>
<label>DETALLE DE LA SOLICITUD  </label>
<hr/>
<div className="row">
<div className="col-6">
<label >Tipo de solicitud :  </label>
<Dropdown style={{width:"30%",marginLeft:"2%"}} value={extendible.extendible1} options={opcionesHoja2} onChange={(e)=> onchangeRadioButon2(e.value,'tipoReclamo','extendible1')} optionLabel="name" placeholder="Select a City" required
                          autoFocus className={classNames({ 'p-invalid': !quejaFormulario.tipoReclamo && enviarFormulario  })} />
 


 {!quejaFormulario.tipoReclamo && enviarFormulario &&  (
                          <label className={classNames({ 'p-error': !quejaFormulario.tipoReclamo && enviarFormulario  })}>
                            El tipo de solicitud es invalido .
                          </label>
                        )}
</div>

<div className="col-4">

{
quejaFormulario.tipoReclamo ==='MATRICULA' ? (<div> <label >Tipo de matricula :  </label>
<Dropdown style={{width:"45%",marginLeft:"2%"}} value={extendible.extendible2} options={opcionesHoja3} onChange={(e)=> onchangeRadioButon2(e.value,'tipoMatricula','extendible2')} optionLabel="name" placeholder="Selecciona una sede " required
                          autoFocus className={classNames({ 'p-invalid': !quejaFormulario.tipoReclamo && enviarFormulario  })} /> </div>) :("")

}
</div>
</div>


<div className="row">
{funcionTipoDocumento()}

</div>
</div>



<Button style={{width:"100%",margin:"2%",marginLeft:"0"}} onClick={onChangeFormulario} label="Enviar" />
</div>





      
    </Fragment>
)

}

