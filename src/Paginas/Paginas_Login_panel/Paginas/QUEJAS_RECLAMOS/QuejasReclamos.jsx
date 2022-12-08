import { FileUpload } from "primereact/fileupload";
import { InputTextarea } from "primereact/inputtextarea"
import { classNames } from "primereact/utils"
import { Fragment } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFileAlt, faFilePdf, faFileWord, faFileZipper, faUnlink } from "@fortawesome/free-solid-svg-icons"
import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";

export const QuejasReclamos = (props)=>{


const {enviarFormulario,quejaFormulario,onchangeRadioButon,invoiceUploadHandler ,file,onchangeImage ,EliminarFile,validarArchivo} =props;


return(

<Fragment>
<div className="card" style={{marginTop:"3%",padding:"2%"}}>
<label className="form-label" >Identificacion del bien contratado </label>
<div className="col-6">
 
  <label className="form-label" >Monto reclamado </label>
  <InputText   value={quejaFormulario.montoReclamado} onChange={(e)=>onchangeRadioButon(e.target.value,'montoReclamado')} required onKeyPress={(event) => {
        if (!/[0-9]/.test(event.key)) {
          event.preventDefault();
        }
      }} 
                          autoFocus className={classNames({ 'p-invalid': !quejaFormulario.montoReclamado && enviarFormulario  })}/>
</div>
<div className="col-12">
<label className="form-label" >Descripcion del bien contratado </label>
  <InputText  value={quejaFormulario.DescripcionProducto} onChange={(e)=>onchangeRadioButon(e.target.value,'DescripcionProducto')} required
                          autoFocus className={classNames({ 'p-invalid': !quejaFormulario.DescripcionProducto && enviarFormulario  })}/>
</div>
</div>

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
</Fragment>


)


}