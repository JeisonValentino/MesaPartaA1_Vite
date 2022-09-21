import { Dropdown } from "primereact/dropdown"
import { Fragment, useEffect, useRef, useState } from "react"
import { Cabecera } from "./ExtencionesCompartidas/Cabecera"

import { Service } from "./Service"
import './Perfil.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-solid-svg-icons"
import axios from "axios"
import { Toast } from 'primereact/toast';
import Loading from "../../../ControladorPage/Loading"
import useSound from 'use-sound'
import notificacionAprob from './Modulos/notificacionAprob.mp3'
import fallo from './Modulos/fallo.mp3'
export default function Perfil(){
    const toast = useRef(null);
let Datos_Empletado={

apellidoMaterno: "",
apellidoPaterno: "",
conocimientoInformatico: "",
contraseña: "",
correo: "",
direccion: "",
estadoCivil: "",
fechaRegistro: "" ,
file: "",
gradoInstruccion: "",
id: "",
idEmpleado: "",
idSede: "",
idTipoDocumentoIdentidad: '',
nombre: "",
numeroDocumento: "",
role: "",
telefono: "",
userId: ""
}

    const[empleado,setEmpleado]=useState(Datos_Empletado)
    const[empleado3,setEmpleado3]=useState()
    const [_empleado2 ,setEmpleado2]=useState()
    const [loading,setLoading]=useState(true);
    const [playSound] = useSound(notificacionAprob)
    const [fallosonund]=useSound(fallo)
    const [files, setFiles] = useState({
        files: null })
       
        
        useEffect(() => {
        obtenerSession()
        }, []);



const dataTipoDocumento=[{name:'DNI',code:'1'},{name:'Extrangero',code:'2'}]
      const ingresarStado=(e)=>{
        setEmpleado  ({...empleado,[e.target.name]: e.target.value })
     }
    
     const ingresarStado2= (e, name)=>{
        const val = (e.target && e.target.value) || '';
        const val2=(e.value);
    
    
  
     
    
        let _product = {...empleado};
        _product[`${name}`] = val.code;
        console.log(val.code)
        console.log(val2)
        setEmpleado2(val2)
        setEmpleado(_product);
     }



     const onsubmitForm = async(e)=>{
      let error= false;
      e.preventDefault();
        const formData = new FormData()
    console.log(empleado)
        var fileTosave2 = new Blob([JSON.stringify(empleado)], {
          type: 'application/json'
        })
    
        formData.append('obj', fileTosave2)
    
        formData.append('files',files.files)
    

     await Service.ActualizarPerfil(formData).catch(res =>{
      console.log(res.response.data.message)
error=true
      toast.current.show({ severity: 'error', summary: 'Algo salio mal', detail: `${res.response.data.message}`, life: 4000 });
      fallosonund()
     })
     if(!error){
      obtenerSession()
      
      playSound()
      ActualizarDialog()
     }
     
    return true;
 }

const obtenerSession=async ()=>{

  const valor= await Service.retornarPerfl().then(response =>{
    return response
})
setEmpleado(valor)
setLoading(false)




}


const contructorValor = ()=>{

    let code
    console.log(empleado.idTipoDocumentoIdentidad)
    if(empleado.idTipoDocumentoIdentidad==1){
 code = {name:'DNI',code:'1'}
    return code
}else{
    code = {name:'Extrangero',code:'2'}
    return code 
}
}

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


      const imageHandler = e => { let base64String =''
      let _product={...empleado3}
        var reader = new FileReader();
        console.log("next");
          
        reader.onload = function () {
            base64String = reader.result.replace("data:", "")
                .replace(/^.+,/, "");
      
           
      
            // alert(imageBase64Stringsep);
            _product['fotoCliente']=(base64String);
            setEmpleado3(_product)
        }
        console.log(e.target.files[0])
       setFiles({files:e.target.files[0]})
        reader.readAsDataURL(e.target.files[0]);
      }


      const ActualizarDialog = () => {
        toast.current.show({ severity: 'success', summary: 'Operacion Exitosa', detail: 'Sus datos fueron actualizados', life: 4000 });
    }

    const ingresarStado3=(e,name)=>{
      console.log(e.target.value)
      setEmpleado  ({...empleado,[`${name}`]: e.target.value })
   }


return(

<Fragment>
<Toast ref={toast} />
<Cabecera/>



<div className="card" >

            <div  className="container-sm">
            {loading ? (<div style={{marginTop:"20%"}}><Loading /></div>):(
            <form className=" row g-3 was-validated" onSubmit={onsubmitForm}>
            <h5 style={{marginTop:"15%",marginLeft:"45%",letterSpacing:"5px"}}>PERFIL</h5>

            <div className="CabeceraPerfil">
{  empleado3?.fotoCliente ?  (
    <img style={{width:"20%",height:"10%"}} src={onchangeImage(empleado3.fotoCliente)} />

):( 
<>{empleado.photo ?(
    
    <img style={{width:"20%",height:"10%"}} src={onchangeImage(empleado.photo)} />
    
    ) :(<FontAwesomeIcon style={{width:"20%",height:"10%"}} icon={faUser}/>)}</>
)}
<input style={{marginTop:"15px"}}
                    type='file'
                    accept='image/*'
                    name='files'
                    id='files'
                    onChange={e => imageHandler(e)}
                    className='form-control'
                  />

</div>
            <div className="col-6">
    <label  className="form-label">Correo</label>
    <div className="input-group has-validation">
      <span className="input-group-text" id="inputGroupPrepend">@</span>
      <input onChange={(e)=>ingresarStado(e)} value={empleado?.correo} type="text" className="form-control" id="validationCustomUsername" name= 'correo' aria-describedby="inputGroupPrepend" required/>
      <div className="invalid-feedback">
       por favor escoge tu correo 
      </div>
    </div>
  </div>

  <div className="col-6">
    <label  className="form-label">Contraseña</label>
    <input onChange={(e)=>ingresarStado(e)} value={empleado?.contraseña} type="password" className="form-control" id="validationCustom01" name="contraseña" required

    />
    <div className="valid-feedback">
      Looks good!
    </div>
  </div>

  <div className="col-6">
    <label  className="form-label">Nombre</label>
    <input onChange={(e)=>ingresarStado(e)} value={empleado?.nombre} type="text" className="form-control" id="validationCustom02" name="nombre" required/>
    <div className="valid-feedback">
      Looks good!
    </div>
  </div>
  <div className="col-6">
    <label  className="form-label">Apellido paterno</label>
    <input type="text" onChange={(e)=>ingresarStado(e)} value={empleado.apellidoPaterno} name="apellidoPaterno" className="form-control" id="validationCustom03"  required/>
    <div className="valid-feedback">
      Looks good!
    </div>
  </div>
  <div className="col-6">
    <label  className="form-label">Apellido Materno</label>
    <input type="text" onChange={(e)=>ingresarStado(e)} value={empleado?.apellidoMaterno} name="apellidoMaterno" className="form-control" id="validationCustom04"  required/>
    <div className="valid-feedback">
      Looks good!
    </div>
  </div>
  <div className="col-1 "  >
    <label  className="form-label"> Tipo</label>
  <Dropdown  options={dataTipoDocumento}  value={contructorValor()}
                onChange={(e)=>ingresarStado2(e, 'idTipoDocumentoIdentidad')} optionLabel="name" name="idTipoDocumentoIdentidad" 
                    /></div>

  <div className="col-3" style={{marginLeft:"85px"}}>
    <label  className="form-label">Numero Documento</label>
    <input type="text" onChange={(e)=>ingresarStado3(e,'numeroDocumento')} value={empleado?.numeroDocumento} name="numeroDocumento" className="form-control" id="validationCustom06"  required/>
    <div className="valid-feedback">
      Looks good!
    </div>
  </div>
  <div className="col-6">
    <label  className="form-label">Direccion</label>
    <input type="text" onChange={(e)=>ingresarStado(e)} value={empleado?.direccion} name="direccion" className="form-control" id="validationCustom07"        required/>
    <div className="valid-feedback">
      Looks good!
    </div>
  </div>
 
  <div className="col-6">
    <label  className="form-label">Estado Civil</label>
    <input onChange={(e)=>ingresarStado(e)} value={empleado?.estadoCivil} name="estadoCivil" type="text" className="form-control" id="validationCustom08" required/>
    <div className="invalid-feedback">
      Please provide a valid city.
    </div>
  </div>
 
  <div className="col-6">
    <label  className="form-label">grado Intruccion</label>
    <input type="text"  onChange={(e)=>ingresarStado(e)} value={empleado?.gradoInstruccion}  name="gradoInstruccion" className="form-control" id="validationCustom09" required/>
    <div className="invalid-feedback">
      Please provide a valid zip.
    </div>
  </div>

  <div className="col-6">
    <label className="form-label">Conocimiento Informatico</label>
    <input type="text"  onChange={(e)=>ingresarStado(e)} value={empleado?.conocimientoInformatico}  name="conocimientoInformatico" className="form-control" id="validationCustom10" required/>
    <div className="invalid-feedback">
      Please provide a valid zip.
    </div>
  </div>

 

 
  <div className="col-12">
    <button className="btn btn-primary" type="submit">Actualizar datos</button>
  </div>
</form>)}
            </div>
       
</div>


</Fragment>

)

}