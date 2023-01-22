import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { classNames } from 'primereact/utils'
import React, { Fragment, useEffect, useState } from 'react'
import { Cabecera } from '../../../ExtencionesCompartidas/Cabecera'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Toast } from 'primereact/toast'
import { useRef } from 'react'
import { Dialog } from 'primereact/dialog'
import descarga from './../../../../../../../Imagenes/descarga.jpg'
import { InputNumber } from 'primereact/inputnumber'
import axios from 'axios'
import { faFile, faFilePdf, faFileWord, faFileZipper, faMagnifyingGlass, faPlus, faUnlink } from '@fortawesome/free-solid-svg-icons'
import { RadioButton } from 'primereact/radiobutton'
import { InputTextarea } from 'primereact/inputtextarea'
import { FileUpload } from 'primereact/fileupload'
import { Tag } from 'primereact/tag'
import Loading from './../../../../../../ControladorPage/Loading'
import { debounce } from "debounce";
import { Service } from './../../../Service'
import { Document, Page, PDFViewer } from '@react-pdf/renderer'
import { Buffer } from 'buffer';
import ArchivosCliente from './ArchivosCliente'
export const MesaPartes_Post = () => {
  const toast = useRef(null)
  const [displayBasic2, setDisplayBasic2] = useState(false)
  const [displayBasic3, setDisplayBasic3] = useState(false)
  const [solicitud, setSolicitudes] = useState()
const [dataUser ,setDataUser]=useState([]);
const dt = useRef(null);
const [loadingFile,setLoadingFile]=useState(false)
const def=useRef(null);
const [loading, setLoading]=useState(false);
const[post ,setPost]=useState([])
const [selectedData, setSelectedData] = useState(null);
let fildeDto=[]
  const [solicitar, setSolicitar] = useState({
    id: '',
    titulo: '',
    concepto: '',
    mensaje: '',
    idSolicitud: '',file:fildeDto
  })
  const [files2, setFiles] = useState([])
  const [submitted, setSubmitted] = useState()

  const [validacion, setValidacion] = useState("todos")
  const [value1, setValue1] = useState(10)

  const [DisplayBasic4,setDisplayBasic4]=useState(false)
  const [DisplayBasic5,setDisplayBasic5]=useState(false)
const [contador,setContador]=useState([])
const {file}=solicitar;
  const onHide = () => {
    setDisplayBasic2(false)

    
    setSolicitar({
        id: '', 
        titulo: '',
        mensaje: '',
        concepto: '',
        idSolicitud: ''
        ,file:[]
      })
      setContador([])
  }
  const onCategoryChange = e => {
    setValidacion(e.value)
    console.log(e.value)
 
  }

  const onchangeSolicitud = (e, name) => {
    const val = (e.target && e.target.value) || ''
    let _product = { ...solicitar }
    _product[`${name}`] = val

    setSolicitar(_product)
  }

  const onHide2 = () => {
    setDisplayBasic3(false)

    setSolicitar({
      id: '',
      titulo: '',
      mensaje: '',
      concepto: ''
      ,file:[]
    })
  }

const onHide5=()=>{
  setDisplayBasic5(false)
}

useEffect(()=>{
  setLoadingFile(false)
},[loadingFile])

  const onHide3 = () => {
  
    setDisplayBasic4(false)
 
  }

  const [totalSize, setTotalSize] = useState(0)

 
  const onSaveResponse = () => {
    if (
      (solicitar.concepto !== '') &
      (solicitar.mensaje !== '') &
      (solicitar.titulo !== '')
    ) {
      setSubmitted(false)

  

   

      

      axios({
        method: 'POST',
        url: 'http://localhost:8080/respuesta/CrearPost',
        data: solicitar
      })
      
    
      onHide2()
    }
   
    setSubmitted(true)
    setLoading(false);
    onHide3()
    showData();
  }
  const [expandedRows, setExpandedRows] = useState(null)
  const isMounted = useRef(false)






  const invoiceUploadHandler =  (e) => {
console.log("subiendo")
 
    let archivo={ 
      name:"" , type:"",data:""
    }
    let base64String =''
    var reader = new FileReader();
    console.log(e.target.files[0])
    reader.readAsDataURL(e.target.files[0])
          reader.onload = function () {
  
              base64String = reader.result.replace("data:", "")
                  .replace(/^.+,/, "");
                  archivo.data=(base64String);
        
           
          }
   
          for (var i = 0; i < file.length; i++) {
         
           
          if(e.target.files[0].name===file[i].name){

    
         let valor=contador.map((res,id)=>{
          console.log(res.name)
          console.log(e.target.files[0].name)
          console.log(res.name===e.target.files[0].name)
      if(res.name===e.target.files[0].name){
        archivo.name= res.cuenta+e.target.files[0].name
        res.cuenta=res.cuenta+1
   return res
      }else{
        return res
      }
    })
    console.log(valor)
        setContador(valor)
            break;
          }else{
      
            archivo.name=e.target.files[0].name
       setContador(  [...contador , {name:e.target.files[0].name,cuenta:1}])
          }
          }
       
  
  if(file.length===0){
    archivo.name=e.target.files[0].name
   contador.push({name:e.target.files[0].name,cuenta:1})
  }

  
          archivo.type=e.target.files[0].type
          setLoadingFile(true)
          file.push(archivo)
          console.log("subido")
       
  };

  const globalFilterOnchange = e => {
   debounceFn(e.target.value)
  }
  console.log(contador)
  function filter (e) {
  console.log(e)
    var resultadoBusqueda = !e ? dataUser:  dataUser.filter(elemento => {
      console.log(validacion)

      if (validacion === 'todos') {
        if (
          elemento.nombreCompleto
            .toString()
            .toLowerCase()
            .includes(e.toLowerCase()) ||
          elemento.numeroDocumento
            .toString()
            .toLowerCase()
            .includes(e.toLowerCase()) ||
          elemento.id
            .toString()
            .toLowerCase()
            .includes(e.toLowerCase()) ||
          elemento.correoPersonal
            .toString()
            .toLowerCase()
            .includes(e.toLowerCase())
        ) {
          return elemento
        }
      } else {

    
        if (
          ((elemento.nombreCompleto
            .toString()
            .toLowerCase()
            .includes(e.toLowerCase())) &&
            ((elemento.tipoReclamo?.toString() || '') === (validacion))) ||
          ((elemento.numeroDocumento
            .toString()
            .toLowerCase()
            .includes(e.toLowerCase())) &&
            ((elemento.tipoReclamo?.toString() || '') === (validacion))) ||
          (((elemento.id
            .toString()
            .toLowerCase()
            .includes(e.toLowerCase())) &&(
            (elemento.tipoReclamo?.toString() || '') === (validacion)))) ||
          ((elemento.correoPersonal
            .toString()
            .toLowerCase()
            .includes(e.toLowerCase())) &&
            ((elemento.tipoReclamo?.toString() || '') === (validacion)))
        ) {
            console.log(elemento)
          return elemento
        }
      }
    })
    console.log(resultadoBusqueda)
  
setSolicitudes(resultadoBusqueda)

  }

const renderFooter2 = name => {
    return (
      <div>
        <Button
          label='Cancelar'
          icon='pi pi-times'
          onClick={() => onHide2(name)}
          className='p-button-text'
        />
        <Button
          label='Guardar'
          icon='pi pi-check'
          onClick={() => onSaveResponse(name)}
          autoFocus
        />
      </div>
    )
  }
  const setDisplayBasicClick = (valor, data) => {
    setDisplayBasic3(valor)
    let Product = { ...solicitar }
    Product['idSolicitud'] = data.id
    setSolicitar(Product)
  }

const[parametroStyle ,setParametroStyle]=useState()
  const onClickDetaller = (e) =>{
     
      setParametroStyle(post.nombreCompleto)
      setSolicitar(e)
    setDisplayBasic2(true)
  }

const MostrarData=(rowData)=>{

    return(
<Fragment>
                <Button
                  label='Mostrar detalle '
                  onClick={() => onClickDetaller(rowData) }
                />
              </Fragment>

    )
}

const rowExpansionTemplate = rowData => {

  

    return (
      <div className='orders-subtable'>

                
                <React.Fragment>
                <Button icon={<>
               <FontAwesomeIcon icon={faFile}/></>} className="p-button-rounded " onClick={() => MostrarPosts(rowData)} />

                <Button icon={<>
                  <FontAwesomeIcon icon={faMagnifyingGlass}/></>} className="p-button-rounded " onClick={() => MonstrarPDF(rowData)} />
            </React.Fragment>
            

        
      </div>
    )
  }

  const onchangeImage= (dat,type,name)=>{
        var reader =new FileReader();
        const byteCharacters =Buffer.from(dat ,'base64').toString('binary');
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], {type: type });
        var fileactual = new File([blob], name, { lastModified: new Date().getTime(), type: type})
        reader.addEventListener("load", function () {
            return reader.result
        })
        if(fileactual){
        reader.readAsDataURL(fileactual)
        return URL.createObjectURL(fileactual)
        }else{
            return ""
        }
        }

async function showData(){
let response = await Service.ListaMesaPartes().then(response =>{
return response
})
setDataUser( response);
setLoading(true);
}

let debounceFn = debounce(filter, 500);

  useEffect(() => {

    showData()
    
    
        
  }, [])
  function renderizaValor (){
    let newState = dataUser.map((e) => e); // map your state here
   
   
setSolicitudes(newState)
}

  useEffect(() => {

renderizaValor();
  },[dataUser])

const [pdfData,setPdfDate]=useState([])

const MonstrarPDF=(daw)=>{
  setDisplayBasic5(true)

  setPdfDate(daw.filerest)
}

 const  MostrarPosts =(daw)=>{
  setDisplayBasic4(true)

  showDataPost(daw.id)


  }

  function validarArchivo (){

    if(Array.from(file).length>=5){
      return "custom-file-upload failed"
    }else{
      return "custom-file-upload"
    }
  
  }


  const EliminarFile = (dat)=>{
    console.log(dat)
    var file3= Array.from(file).filter( item => item.name !== dat.name )
  let _product={...solicitar}
  _product['file']=file3
    setSolicitar(_product)
  }  
  const showDataPost = async (value)=>{

  

  
    const response =await Service.ConsultarPost(value).then(response =>{
      console.log(response)
      return response
      })
      setPost( response);
  }




  return (
    <Fragment>
      <Toast ref={toast} />

      <Dialog
     visible={DisplayBasic5}
        onHide={() => onHide5()}

        style={{width:"90%",height:"90%",overflow:"hidden"}}
        
     
     >
<div style={{width:"95%",height:"90%",overflow:"hidden",display:"flex",justifyContent:"center"}}>
{pdfData?<ArchivosCliente pdfData={pdfData} />:<>no hay nada que mostrar,contactar con el administrador del sistema</>}

</div>


     </Dialog>



     <Dialog
     visible={DisplayBasic4}
        onHide={() => onHide3()}
     
     >

     <h5>Orden de respuestas de {post?.nombreCompleto}</h5>
        <Button
          label={
            <>
              <FontAwesomeIcon icon={faPlus} /> Crear Respuesta{' '}
            </>
          }
          onClick={() => setDisplayBasicClick(true, post)}
        />
        
        <DataTable   value={post.post} dataKey="id" responsiveLayout="scroll" >
        <Column field="titulo" header="titulo "></Column>
        <Column field="cargo" header="cargo "></Column>
        <Column field="nombreEmpleado" header="Nombre de empleado "></Column>

     <Column body={MostrarData}></Column>
        </DataTable>

     </Dialog>



      <Dialog
        header={<div>{parametroStyle}</div>}
        visible={displayBasic2}
        style={{ width: '50vw' }}
  
        onHide={() => onHide('displayBasic2')}
      ><div>
<div className='DataMuestra' > <h5>Titulo : {solicitar.titulo}</h5> </div>

<div className='DataMuestra' > <h5>Concepto : {solicitar.concepto}</h5> </div>

<div className='DataMuestra' > <h5>Mensaje : {solicitar.mensaje}</h5> </div>

{  file?.map((data,i)=> (
<div className="DataMuestra" key={i} >

{data.type==='image/png'||data.type==='image/jpeg'?<img style={{width:"100%",height:"100%"}} src={onchangeImage(data.data,data.type,data.name)} />:
<>
{data.type==='application/pdf'?
<iframe
       style={{width:"100%" ,height:"100%",overflow:"hidden"}} 
        title="PdfFrame"
        src={onchangeImage((data?.data),(data?.type),(data?.name))}
        frameborder="0"
        type="application/pdf"
      ></iframe>:<> no se puede mostrar el contenido de este archivo</>}


</>}

  </div>)) 
}
</div>
      </Dialog>

      <Dialog
        header='Crear Respuesta'
        visible={displayBasic3}
        style={{ width: '50vw' }}
        onHide={() => onHide2('displayBasic3')}
        footer={renderFooter2('displayBasic3')}
      >
        <div className='field'>
          <label style={{ marginRight: '5px', display: 'inline-block' }}>
            Titulo :{' '}
          </label>
          <InputText
            value={solicitar.titulo}
            onChange={e => onchangeSolicitud(e, 'titulo')}
            style={{ display: 'inline-block', width: '86%' }}
            required
            autoFocus
            className={classNames({
              'p-invalid': submitted && !solicitar.titulo
            })}
          />

          {submitted && !solicitar.titulo && (
            <small className='p-error'>El titulo es requerido .</small>
          )}
        </div>
        <div className='field'>
          <label style={{ marginRight: '5px', display: 'inline-block' }}>
            Concepto :{' '}
          </label>
          <InputText
            value={solicitar.concepto}
            onChange={e => onchangeSolicitud(e, 'concepto')}
            style={{ display: 'inline-block', width: '81%' }}
            required
            autoFocus
            className={classNames({
              'p-invalid': submitted && !solicitar.concepto
            })}
          />
        </div>
        {submitted && !solicitar.concepto && (
          <small className='p-error'>El concepto es requerido .</small>
        )}

        <div className='field'>
          <label style={{ marginRight: '5px', display: 'inline-block' }}>
            Mensaje :{' '}
          </label>
          <InputTextarea
            value={solicitar.mensaje}
            onChange={e => onchangeSolicitud(e, 'mensaje')}
            style={{ display: 'inline-block', width: '82%' }}
            required
            autoFocus
            className={classNames({
              'p-invalid': submitted && !solicitar.mensaje
            })}
          />

          {submitted && !solicitar.mensaje && (
            <small className='p-error'>El mensaje es requerido .</small>
          )}
        </div>



        <div style={{ padding: '2%', marginTop: '10px' }}>
          <div className="card" style={{padding:"2%",maxHeight:"800px" }}>
                <h5>Lista de documento Requeridos </h5>
                {Array.from(file)?.length>=5 ?  (
                          <label className={classNames({ 'p-error': Array.from(file)?.length>=5 })}>
                            Solo se puede subir 5 archivos.
                          </label>
                        ):""}

                <label for="file-upload" className={ validarArchivo()}>
    <i className="fa fa-cloud-upload"></i> Subir Archivos
</label>

<input id="file-upload" type="file" disabled={(Array.from(file)?.length>=5)} onChange={(e)=>invoiceUploadHandler(e)}/>
<div className="fotosDiv" style={{display:"flex",justifyContent:"center",alignContent:"center"}}>
<table style={{textAlign:"center", cellspacing:"2" }}>
<thead>
<tr>
<th style={{width:"80px"}}>Id</th>
<th  style={{width:"50%"}}>Nombre</th>
<th  style={{width:"50%"}}>Tipo</th>
<th  style={{width:"80px"}}>Imagen</th>


</tr>
</thead>
<tbody>{Array.from(file)?.map((e,i)=>{
  return(  

    <tr key={i}>
    <td  > {i+1}</td>
    <td>{e.name}</td>
    <td>{e.type}</td>
    <td > {((e.type)==='image/png')||(e.type)==='image/jpeg' ?  ( 
 <img  style={{width:"100px",height:"40px"}} src={onchangeImage(e.data,e.type,e.name)}  />
 ) : <> 
 
 {(e.type)==='application/pdf' ? <FontAwesomeIcon style={{height:"80px"}} icon={faFilePdf}/> :<>

 {(e.type)==='application/x-zip-compressed' ? <FontAwesomeIcon style={{height:"100%"}} icon={faFileZipper}/> :<>
 
 {(e.type)==='application/vnd.openxmlformats-officedocument.wordprocessingml.document' ? <FontAwesomeIcon style={{height:"80px"}} icon={faFileWord}/> :<>
  
 <FontAwesomeIcon style={{height:"80px"}} icon={faUnlink}/>
      
 </>} 

    
 </>} 


 </>} 
 
 </>  
  
 }</td>
    <td  style={{width:"50%",paddingLeft:"50PX"}}><div style={{display:"flex",justifyContent:"center",alignContent:"center"}}>
    
    <Button onClick={()=>EliminarFile(e)} /></div></td>
    </tr>
  )
})}</tbody>
</table> </div> 
                    </div>
        </div>

    


        <hr />
      </Dialog>
      <Cabecera />
      <div className='cuerpo-post-mesa'>
        <div className='navIma'>
          <img src={descarga} style={{ width: '100%', height: '100%' }} />
        </div>
        <div className='Cabecera-table'>
          <div className='tableComponent'>
            <h5 style={{ display: 'inline-block', marginRight: '0.5rem' }}>
              Buscar cliente{' '}
            </h5>
            <span
              className='p-input-icon-left'
              style={{ display: 'inline-block' }}
            >
              <i className='pi pi-search' />
              <InputText
                placeholder='busca aqui'
                onChange={e => globalFilterOnchange(e)}
              />
            </span>
            <div className='field'>
              <label className='mb-3'>Validar</label>
              <div className='cuerpoRadio '>
                <div className='radioButtonMesaPartes'>
                  <RadioButton
                    inputId='category1'
                    name='role'
                    value='QUEJA'
                    onChange={onCategoryChange}
                    checked={validacion === 'QUEJA'}
                  />
                  <label htmlFor='category1'>QUEJA</label>
                </div>
                <div className='radioButtonMesaPartes'>
                  <RadioButton
                    inputId='category2'
                    name='role'
                    value='CERTIFICADOS'
                    onChange={onCategoryChange}
                    checked={validacion === 'CERTIFICADOS'}
                  />
                  <label htmlFor='category2'>CERTIFICADOS</label>
                </div>
                <div className='radioButtonMesaPartes'>
                  <RadioButton
                    inputId='category3'
                    name='role'
                    value='TRAMITE DE TRASLADO'
                    onChange={onCategoryChange}
                    checked={validacion === 'TRAMITE DE TRASLADO'}
                  />
                  <label htmlFor='category3'>TRASLADO</label>
                </div>
                <div className='radioButtonMesaPartes'>
                  <RadioButton
                    inputId='category4'
                    name='role'
                    value='MATRICULA'
                    onChange={onCategoryChange}
                    checked={validacion === 'MATRICULA'}
                  />
                  <label htmlFor='category4'>MATRICULA</label>
                </div>
                <div className='radioButtonMesaPartes'>
                  <RadioButton
                    inputId='category4'
                    name='role'
                    value='todos'
                    onChange={onCategoryChange}
                    checked={validacion === 'todos'}
                  />
                  <label htmlFor='category4'>TODOS</label>
                </div>
              </div>
            </div>
          </div>
     

          <div className="excel2007">
<p>Tabla de quejas </p>

{loading ? <Fragment>

  <DataTable ref={dt} value={solicitud} selection={selectedData} onSelectionChange={(e) => setSelectedData(e.value)}
                    dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} dataUser"
                      responsiveLayout="scroll">
                    
                    <Column field="id" header="Codigo de solicitud" sortable style={{ minWidth: '12rem',color:"white" }}></Column>
                    <Column field="nombreCompleto" header="Nombre Reclamante" sortable style={{ minWidth: '12rem' ,color:"white" }}></Column>
                    <Column field="tipoReclamo" header="tipo de Reclamo" sortable style={{ minWidth: '12rem',color:"white" }}></Column>
                    <Column body={rowExpansionTemplate} exportable={false} style={{ minWidth: '8rem' ,color:"white"}}></Column>
                </DataTable></Fragment>
:<Loading/>}
</div>

        </div>{' '}
        <div className='navIma'>
          <img src={descarga} style={{ width: '100%', height: '100%' }} />
        </div>
      </div>
    </Fragment>
  )
}
