import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { classNames } from 'primereact/utils'
import { Fragment, useEffect, useState } from 'react'
import { Cabecera } from './Cabecera'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Toast } from 'primereact/toast'
import { useRef } from 'react'
import { Dialog } from 'primereact/dialog'
import descarga from './../../../../../Imagenes/descarga.jpg'
import { InputNumber } from 'primereact/inputnumber'
import axios from 'axios'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { RadioButton } from 'primereact/radiobutton'
import { InputTextarea } from 'primereact/inputtextarea'
import { FileUpload } from 'primereact/fileupload'
import { Tag } from 'primereact/tag'
import {TablaSeleccionable} from '../Modulos/TablaSeleccionable.jsx';
import Loading from '../../../../ControladorPage/Loading'

export const MesaPartes_Post = () => {
  const toast = useRef(null)
  const [displayBasic2, setDisplayBasic2] = useState(false)
  const [displayBasic3, setDisplayBasic3] = useState(false)
  const [solicitud, setSolicitudes] = useState()
const [dataUser ,setDataUser]=useState([]);
const 
  dataHead=[{
    type:"header"
  ,data:{
      text:"Nombre"
  }
  },{
    type:"header"
  ,data:{
      text:"Numero de documento"
  }
  },{
    type:"header"
  ,data:{
      text:"Correo"
  }
  },{
    type:"header"
  ,data:{
      text:"Tipo de reclamo"
  }
  }
  ]



  const 
  dataBody=[{
    type:"table"
  ,data:{
    text:"nombreCompleto",
    position:"right"
  }
  },{
    type:"table"
  ,data:{
    text:"numeroDocumento",
    position:"left"
  }
  },{
   
    type:"table"
  ,data:{
    text:"correoPersonal",
    position:"left"
  }
  },{

    type:"table"
  ,data:{
    text:"tipoReclamo",
    position:"left"
  }
  }
  ]



const [loading, setLoading]=useState(false);
  let file = ([])
  const [solicitar, setSolicitar] = useState({
    id: '',
    titulo: '',
    concepto: '',
    mensaje: '',
    idSolicitud: '',files:file
  })
  const [files2, setFiles] = useState([])
  const [submitted, setSubmitted] = useState()
const {files}=solicitar;
  const [validacion, setValidacion] = useState()
  const [value1, setValue1] = useState(10)
  const onHide = () => {
    setDisplayBasic2(false)
    setSolicitar({
        id: '',
        titulo: '',
        mensaje: '',
        concepto: '',
        idSolicitud: ''
      })
  }
  const onCategoryChange = e => {
    setValidacion(e.value)
    filter(' ')
    filter('')
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
    })
  }
  const [totalSize, setTotalSize] = useState(0)

  const onTemplateRemove = (file, callback) => {
    setTotalSize(totalSize - file.size)

    var file3 = Array.from(files2.files).filter(item => item.name !== file.name)
    setFiles({ ...files2, file3 })
    console.log(file3)
    callback()
  }
 
  const onSaveResponse = () => {
    if (
      (solicitar.concepto !== '') &
      (solicitar.mensaje !== '') &
      (solicitar.titulo !== '')
    ) {
      setSubmitted(false)

      const formData = new FormData()

      var fileTosave2 = new Blob([JSON.stringify(solicitar)], {
        type: 'application/json'
      })
      formData.append('obj', fileTosave2)

      for (var i = 0; i < files2.files.length; i++) {
        console.log(files2.files[i])
        formData.append('files', files2.files[i])
      }
      console.log(fileTosave2)

      axios({
        method: 'POST',
        url: 'http://localhost:8080/respuesta/CrearPost',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      onHide2()
    }

    setSubmitted(true)
  }
  const [expandedRows, setExpandedRows] = useState(null)
  const isMounted = useRef(false)
  const [globalFilterArray, setGlobalFilterArray] = useState([])
  useEffect(() => {
    if (isMounted.current) {
      const summary =
        expandedRows !== null ? 'All Rows Expanded' : 'All Rows Collapsed'
      toast.current.show({
        severity: 'success',
        summary: `${summary}`,
        life: 3000
      })
    }
  }, [expandedRows])
  const onRowExpand = event => {
    toast.current.show({
      severity: 'info',
      summary: 'Product Expanded',
      detail: event.data.name,
      life: 3000
    })
  }

  const onRowCollapse = event => {
    toast.current.show({
      severity: 'success',
      summary: 'Product Collapsed',
      detail: event.data.name,
      life: 3000
    })
  }
  const collapseAll = () => {
    setExpandedRows(null)
  }

  const statusOrderBodyTemplate = rowData => {
    return (
      <span className={`order-badge order-${rowData.status.toLowerCase()}`}>
        {rowData.status}
      </span>
    )
  }
  const GuardarImagenes = (file, props) => {
    return (
      <div className='flex align-items-center flex-wrap'>
        <div className='flex align-items-center' style={{ width: '40%' }}>
          <img
            alt={file.name}
            role='presentation'
            src={file.objectURL}
            width={100}
          />
          <span className='flex flex-column text-left ml-3'>
            {file.name}
            <small>{new Date().toLocaleDateString()}</small>
          </span>
        </div>
        <Tag
          value={props.formatSize}
          severity='warning'
          className='px-3 py-2'
        />
        <Button
          type='button'
          icon='pi pi-times'
          className='p-button-outlined p-button-rounded p-button-danger ml-auto'
          onClick={() => onTemplateRemove(file, props.onRemove)}
        />
      </div>
    )
  }
  const invoiceUploadHandler = ({ files }) => {
    setFiles({ ...files2, files })

    const fileReader = new FileReader()

    fileReader.onload = e => {}
  }

  const globalFilterOnchange = e => {
    filter(e.target.value)
  }

  function filter (e) {
    var resultadoBusqueda = globalFilterArray.filter(elemento => {
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
    setSolicitudes(resultadoBusqueda)
  }

  const renderFooter = name => {
    return (
      <div>
        <Button
          label='No'
          icon='pi pi-times'
          onClick={() => onHide(name)}
          className='p-button-text'
        />
        <Button
          label='Si'
          icon='pi pi-check'
          onClick={() => onHide(name)}
          autoFocus
        />
      </div>
    )
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
    console.log(data.id)
    setDisplayBasic3(valor)
    let Product = { ...solicitar }
    Product['idSolicitud'] = data.id
    setSolicitar(Product)
  }
  const paginatorLeft = (
    <Button type='button' icon='pi pi-refresh' className='p-button-text' />
  )
  const paginatorRight = (
    <InputNumber
      placeholder=''
      size='2'
      className='ml-1'
      value={value1}
      onChange={e => setValue1(e.value)}
    />
  )
const[parametroStyle ,setParametroStyle]=useState()
  const onClickDetaller = (e,d) =>{
      console.log(e.id)
      setParametroStyle(d.nombreCompleto)
      setSolicitar(e)
    setDisplayBasic2(true)
  }

const MostrarData=(rowData,data)=>{

    return(
<Fragment>
                <Button
                  label='Mostrar detalle '
                  onClick={() => onClickDetaller(rowData,data) }
                />
              </Fragment>

    )
}

  const rowExpansionTemplate = data => {
    return (
      <div className='orders-subtable'>
        <h5>Orden de respuestas de {data.nombreCompleto}</h5>
        <Button
          label={
            <>
              <FontAwesomeIcon icon={faPlus} /> Crear Respuesta{' '}
            </>
          }
          onClick={() => setDisplayBasicClick(true, data)}
        />
        <DataTable value={data.post} responsiveLayout='scroll'>
          <Column field='id' header='Id' sortable></Column>
          <Column field='titulo' header='Customer' sortable></Column>
          <Column field='nombreEmpleado' header='Date' sortable></Column>
          <Column field='cargo' header='Date' sortable></Column>
          <Column
            field='action1'
            header=''
            body={(e)=>MostrarData(e,data)
              
            } sortable
          >
            {' '}
          </Column>
        </DataTable>
      </div>
    )
  }
const onchangeImage= (dat)=>{

var reader =new FileReader();

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
if(blob){


reader.readAsDataURL(blob)
return URL.createObjectURL(blob)
}else{
    return ""
}



}



useEffect(()=>{
  const peticionDataUser = async () =>{
   await axios.get('http://localhost:8080/respuesta/ObtenerSolicitud').then(response =>{
    
    setDataUser( response.data);
    setLoading(true);
    })
    }
  peticionDataUser().catch(console.error)
}, [])



  useEffect(() => {
    setSolicitudes(dataUser)
    setGlobalFilterArray(dataUser)
  }, [dataUser])




  return (
    <Fragment>
      <Toast ref={toast} />

     
      <Dialog
        header={<div>{parametroStyle}</div>}
        visible={displayBasic2}
        style={{ width: '50vw' }}
        footer={renderFooter('displayBasic2')}
        onHide={() => onHide('displayBasic2')}
      ><div>
<div className='DataMuestra' > <h5>Titulo : {solicitar.titulo}</h5> </div>

<div className='DataMuestra' > <h5>Concepto : {solicitar.concepto}</h5> </div>

<div className='DataMuestra' > <h5>Mensaje : {solicitar.mensaje}</h5> </div>


{  files?.map((data)=> (
<div className="DataMuestra" key={data.id} >
{data.name}
<img src={onchangeImage(data.data)} />
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
          <h5>Lista de documento Requeridos </h5>
          <FileUpload
            name='demo[]'
            uploadHandler={invoiceUploadHandler}
            multiple
            accept='*/*'
            itemTemplate={GuardarImagenes}
            maxFileSize={1000000}
            customUpload={true}
            auto={true}
          />
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

  <TablaSeleccionable dataHead={dataHead} dataUser={dataUser} dataBody={dataBody} ></TablaSeleccionable> </Fragment>
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
