import { FileUpload } from "primereact/fileupload";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { RadioButton } from "primereact/radiobutton";
import { classNames } from "primereact/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFileAlt, faFilePdf, faFileWord, faFileZipper, faMagnifyingGlass, faUnlink } from "@fortawesome/free-solid-svg-icons"
import { Button } from "primereact/button"
import React,{ Fragment } from "react";

export const CertificadoEstudios = (props)=>{

const {onchangeRadioButon,quejaFormulario,enviarFormulario,invoiceUploadHandler ,file,onchangeImage ,EliminarFile,validarArchivo,consultarApi2}=props;


return (

<Fragment>

<div className="card" style={{marginTop:"3%",padding:"2%"}}>
<label>IDENTIFICACION DEL ESTUDIANTE </label>
<hr/>
<div className="row">
<div className="col-4">
<label>Nombre : </label>
<InputText  disabled={true} value={quejaFormulario.nombreEstudiante} onChange={(e)=>onchangeRadioButon(e.target.value,'nombreEstudiante')} required
                          autoFocus className={classNames({ 'p-invalid': !quejaFormulario.nombreEstudiante && enviarFormulario })} />
 


 {!quejaFormulario.nombreEstudiante && enviarFormulario &&  (
                          <label className={classNames({ 'p-error': !quejaFormulario.nombreEstudiante && enviarFormulario  })}>
                            El nombre del estudiante  es invalido .
                          </label>
                        )}   </div>
<div className="col-4">
<label>Apellido Materno :</label>
<InputText disabled={true} value={quejaFormulario.apellidoMaternoEstudiante} onChange={(e)=>onchangeRadioButon(e.target.value,'apellidoMaternoEstudiante')} required
                          autoFocus className={classNames({ 'p-invalid': !quejaFormulario.apellidoMaternoEstudiante && enviarFormulario  })} />
 


 {!quejaFormulario.apellidoMaternoEstudiante && enviarFormulario &&  (
                          <label className={classNames({ 'p-error': !quejaFormulario.apellidoMaternoEstudiante && enviarFormulario  })}>
                            El apellido Materno  del estudiante  es invalido .
                          </label>
                        )}  </div>
<div className="col">
<label>Apellido paterno :</label>
<InputText disabled={true} value={quejaFormulario.apellidoPaternoEstudiante} onChange={(e)=>onchangeRadioButon(e.target.value,'apellidoPaternoEstudiante')} required
                          autoFocus className={classNames({ 'p-invalid': !quejaFormulario.apellidoPaternoEstudiante && enviarFormulario  })} />
 


 {!quejaFormulario.apellidoPaternoEstudiante && enviarFormulario &&  (
                          <label className={classNames({ 'p-error': !quejaFormulario.apellidoPaternoEstudiante && enviarFormulario  })}>
                            El apellido Paterno  del estudiante  es invalido .
                          </label>
                        )}   </div>
</div>
  <br/>
<div className="row">
<div className="col-4">
    <label className="form-label"  style={{marginRight:"5%"}}>Tipo Documento : </label>
    <div className="btn-group " >
    <label style={{marginRight:"10%"}} >DNI</label>
                    <RadioButton  style={{marginRight:"10%"}}  name="tipoDocumentoEstudiante" value="dni" onChange={(e) => onchangeRadioButon(e.value,'tipoDocumentoEstudiante')} checked={quejaFormulario.tipoDocumentoEstudiante === 'dni'} required
                          autoFocus className={classNames({ 'p-invalid': !quejaFormulario.tipoDocumentoEstudiante && enviarFormulario })} />
                   
             
                    <label  style={{marginRight:"10%"}}>Extrangero</label>
                    <RadioButton name="tipoDni" value="extrangero" onChange={(e) => onchangeRadioButon(e.value,'tipoDocumentoEstudiante')} checked={quejaFormulario.tipoDocumentoEstudiante === 'extrangero'}  required
                          autoFocus className={classNames({ 'p-invalid': !quejaFormulario.tipoDocumentoEstudiante && enviarFormulario  })} />
 


 {!quejaFormulario.tipoDocumentoEstudiante && enviarFormulario &&  (
                          <label className={classNames({ 'p-error': !quejaFormulario.tipoDocumentoEstudiante && enviarFormulario  })}>
                            El tipo Documento  del estudiante  es invalido .
                          </label>
                        )}



                    </div>
                
  </div>
<div className="col-6">
<label className="form-label">Nº documento : </label>
    <InputText  maxLength={8} useGrouping={false} style={{marginLeft:"1%",width:"50%"}} value={quejaFormulario.numeroDocumentoEstudiante} onChange={(e) => onchangeRadioButon(e.target.value,'numeroDocumentoEstudiante')} onKeyPress={(event) => {
        if (!/[0-9]/.test(event.key)) {
          event.preventDefault();
        }
      }} required
                          autoFocus className={classNames({ 'p-invalid': !quejaFormulario.numeroDocumentoEstudiante && enviarFormulario })} />
 
 <Button onClick={()=>consultarApi2()}  style={{marginLeft:"5%"}} label={<FontAwesomeIcon icon={faMagnifyingGlass}/>}/>

 {!quejaFormulario.numeroDocumentoEstudiante && enviarFormulario &&  (
                          <label className={classNames({ 'p-error': !quejaFormulario.numeroDocumentoEstudiante && enviarFormulario })}>
                            El numero Documento  del estudiante  es invalido .
                          </label>
                        )}
</div>

<div className="row" style={{padding:"2%"}} >

<div className="card" style={{padding:"2%",maxHeight:"500px" }}>
                <h5>Lista de documento Requeridos </h5>
                {Array.from(file).length>=5 ?  (
                          <label className={classNames({ 'p-error': Array.from(file).length>=5 })}>
                            Solo se puede subir 5 archivos.
                          </label>
                        ):""}
                <label for="file-upload" className={ validarArchivo()}>
    <i className="fa fa-cloud-upload"></i> Subir Archivos
</label>
<input id="file-upload" type="file" disabled={(Array.from(file).length>=5)} onChange={(e)=>invoiceUploadHandler(e)}/>
<div className="fotosDiv" >
{Array.from(file).map((e,i)=>{
  return( 
<div className="hijosFotos">  
<div className="hijosFotosNumeracion" key={i}>{i+1}</div> 
<div  ><p className="hijosFotosName">{e.name}</p></div>
<div className="hijosFotosType"><p>{e.type}</p></div>
<div className="hijosFotosData"> 
{((e.type)==='image/png')||(e.type)==='image/jpeg' ?  ( 
 <img  style={{width:"100%"}} src={onchangeImage(e.data)}  />
 ) : <> 
 
 {(e.type)==='application/pdf' ? <FontAwesomeIcon style={{height:"100%"}} icon={faFilePdf}/> :<>

 {(e.type)==='application/x-zip-compressed' ? <FontAwesomeIcon style={{height:"100%"}} icon={faFileZipper}/> :<>
 
 {(e.type)==='application/vnd.openxmlformats-officedocument.wordprocessingml.document' ? <FontAwesomeIcon style={{height:"100%"}} icon={faFileWord}/> :<>
  
 <FontAwesomeIcon style={{height:"100%"}} icon={faUnlink}/>
      
 </>} 

    
 </>} 


 </>} 
 
 </>  
 
 }

</div>

<div><Button onClick={()=>EliminarFile(e)} /></div>

</div>
  )
})}</div>
                    </div>

</div>

</div>
</div>


</Fragment>


)


}