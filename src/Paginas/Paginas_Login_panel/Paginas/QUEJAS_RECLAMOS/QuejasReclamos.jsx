import { FileUpload } from "primereact/fileupload";
import { InputTextarea } from "primereact/inputtextarea"
import { classNames } from "primereact/utils"
import { Fragment } from "react"


export const QuejasReclamos = (props)=>{


const {enviarFormulario,quejaFormulario,onchangeRadioButon,invoiceUploadHandler,GuardarImagenes} =props;


return(

<Fragment>

<div className="col-12">
<label style={{position:"relative", marginRight:"2%",top:"-5rem"}} className="form-label">Detalle de lo acontensido :  </label><InputTextarea style={{width:"75%" ,marginTop:"2%"}} value={quejaFormulario.detalle} onChange={(e) => onchangeRadioButon(e.target.value,'detalle')} rows={5} cols={30} required
                          autoFocus className={classNames({ 'p-invalid': !quejaFormulario.detalle && enviarFormulario  })} />
 


 {!quejaFormulario.detalle && enviarFormulario && (
                          <label className={classNames({ 'p-error': !quejaFormulario.detalle && enviarFormulario})}>
                            El detalle del estudiante  es invalido .
                          </label>
                        )}
</div>


<div className="row">

<div className="col-12">
<label  style={{position:"relative",top:"-38%" , marginRight:"2%"}} className="form-label">Detalle del pedido :  </label><InputTextarea style={{width:"80%" ,marginTop:"2%"}} value={quejaFormulario.pedido} onChange={(e) => onchangeRadioButon(e.target.value,'pedido')} rows={5} cols={30} required
                          autoFocus className={classNames({ 'p-invalid': !quejaFormulario.pedido && enviarFormulario})} />
 


 {!quejaFormulario.pedido && enviarFormulario &&  (
                          <label className={classNames({ 'p-error': !quejaFormulario.pedido && enviarFormulario })}>
                            El pedido del estudiante  es invalido .
                          </label>
                        )}
</div>
</div>

<div className="row" style={{padding:"2%"}} >

<div className="card" style={{padding:"2%"}}>
                <h5>Lista de documento Requeridos </h5>
                <FileUpload name="demo[]" uploadHandler={invoiceUploadHandler } multiple accept="image/*" itemTemplate={GuardarImagenes} maxFileSize={1000000} customUpload={true} auto={true}
                />

                    </div>

</div>
</Fragment>


)


}