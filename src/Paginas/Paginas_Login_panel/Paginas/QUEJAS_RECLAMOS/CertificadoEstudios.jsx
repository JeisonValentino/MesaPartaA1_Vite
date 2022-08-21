import { FileUpload } from "primereact/fileupload";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { RadioButton } from "primereact/radiobutton";
import { classNames } from "primereact/utils";
import React,{ Fragment } from "react";

export const CertificadoEstudios = (props)=>{

const {onchangeRadioButon,quejaFormulario,enviarFormulario,invoiceUploadHandler,GuardarImagenes}=props;

return (

<Fragment>

<div className="card" style={{marginTop:"3%",padding:"2%"}}>
<label>IDENTIFICACION DEL ESTUDIANTE </label>
<hr/>
<div className="row">
<div className="col-4">
<label>Nombre : </label>
<InputText value={quejaFormulario.nombreEstudiante} onChange={(e)=>onchangeRadioButon(e.target.value,'nombreEstudiante')} required
                          autoFocus className={classNames({ 'p-invalid': !quejaFormulario.nombreEstudiante && enviarFormulario })} />
 


 {!quejaFormulario.nombreEstudiante && enviarFormulario &&  (
                          <label className={classNames({ 'p-error': !quejaFormulario.nombreEstudiante && enviarFormulario  })}>
                            El nombre del estudiante  es invalido .
                          </label>
                        )}   </div>
<div className="col-4">
<label>Apellido Materno :</label>
<InputText value={quejaFormulario.apellidoMaternoEstudiante} onChange={(e)=>onchangeRadioButon(e.target.value,'apellidoMaternoEstudiante')} required
                          autoFocus className={classNames({ 'p-invalid': !quejaFormulario.apellidoMaternoEstudiante && enviarFormulario  })} />
 


 {!quejaFormulario.apellidoMaternoEstudiante && enviarFormulario &&  (
                          <label className={classNames({ 'p-error': !quejaFormulario.apellidoMaternoEstudiante && enviarFormulario  })}>
                            El apellido Materno  del estudiante  es invalido .
                          </label>
                        )}  </div>
<div className="col">
<label>Apellido paterno :</label>
<InputText value={quejaFormulario.apellidoPaternoEstudiante} onChange={(e)=>onchangeRadioButon(e.target.value,'apellidoPaternoEstudiante')} required
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
<div className="col-4">
<label className="form-label">Nº documento : </label>
    <InputNumber mode="decimal" useGrouping={false} style={{marginLeft:"1%",width:"70%"}} value={quejaFormulario.numeroDocumentoEstudiante} onChange={(e) => onchangeRadioButon(e.value,'numeroDocumentoEstudiante')} required
                          autoFocus className={classNames({ 'p-invalid': !quejaFormulario.numeroDocumentoEstudiante && enviarFormulario })} />
 


 {!quejaFormulario.numeroDocumentoEstudiante && enviarFormulario &&  (
                          <label className={classNames({ 'p-error': !quejaFormulario.numeroDocumentoEstudiante && enviarFormulario })}>
                            El numero Documento  del estudiante  es invalido .
                          </label>
                        )}
</div>

<div className="row" style={{padding:"2%"}} >

<div className="card" style={{padding:"2%"}}>
                <h5>Lista de documento Requeridos </h5>
                <FileUpload name="demo[]" uploadHandler={invoiceUploadHandler } multiple accept="image/*" itemTemplate={GuardarImagenes} maxFileSize={1000000} customUpload={true} auto={true}
                />

                    </div>

</div>

</div>
</div>


</Fragment>


)


}