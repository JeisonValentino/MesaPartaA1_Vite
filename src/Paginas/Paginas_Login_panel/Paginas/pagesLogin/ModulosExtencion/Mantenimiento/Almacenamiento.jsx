import { useCallback, useEffect, useMemo, useRef } from 'react'
import { useState } from 'react'
import { Fragment } from 'react'
import Loading from '../../../../../ControladorPage/Loading'
import { Cabecera } from '../../ExtencionesCompartidas/Cabecera'
import DataTables from '../../Modulos/DataTables'
import TablesEdit from '../../Modulos/TablesEdit'
import { Service } from '../../Service'
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faLock, faSquare, faUser } from '@fortawesome/free-solid-svg-icons'
import '../../Modulos/EstilesComponents/estilosDialog.css'
import { onchangeImage } from '../../Modulos/funcionesCompartidas'
import { InputText } from 'primereact/inputtext'
import { classNames } from 'primereact/utils'
import InputSelect from '../../Modulos/InputSelect'
import QRCode from "qrcode.react";
import Video_Detecte_Qr from '../../Modulos/Video_Detecte_Qr'
export default function Almacenamiento () {
  let id_filesLet ={
    id:''
    ,name:'',
    type:''
    ,data:''
  }
  let marcaLet={
    id:'',nombre:'',direccion:''
  }
  let articuloLet={
    id:'',nombre:'',id_files:id_filesLet,seccion:'',marcaId:marcaLet
    }

  const [AlmacenamientoData, setAlmacenamientoData] = useState()
  const [selectedData, setSelectedData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [errorConexion, SetErrorConexion] = useState(false)
  const [abrirToolBar, setAbrirToolBar] = useState(false)
const [Marca,setMarca]=useState([]);
const [loadingMarca,setLoadingMarca]=useState(false);
const [ArticuloDialog,setArticuloDialog]=useState(false);
const [submittedArticulo,setSubmittedArticulo]=useState(false);
const [loadingFotoArticulo, setLoadingFotoArticulo]=useState(false);
const [articuloEntity,setArticuloEntity]=useState(articuloLet)
const {id_files}=articuloEntity;
const [deleteArticuloDialog,setDeleteArticuloDialog]=useState(false);
const [ArticuloDialoglista,setArticuloDialoglista]=useState(false)

//dialog lista almacenada  
const [loadingListaTable,setLoadingListaTable]=useState(false)
const [selectedDataLista, setSelectedDataLista] = useState(null)
const [busquedaGlobalLista, setBusquedaGlobalLista] = useState('')
const [AlmacenamientoDataLista,setAlmacenamientoDataLista]=useState()
const [submittedItemArticulo,setSubmittedItemArticulo]=useState(false);
const [ArticuloItemDialog_Estados,setArticuloItemDialog_Estados]=useState(false);
const [paginasItem_Estados,setPaginasItem_Estados]=useState(1)
let itemArticuloLet={id:'',estadoArticulo:'',articuloid:''} 
const [articuloItemEntity,setArticuloItemEntity]=useState(itemArticuloLet)
const [dialogComprobarQr,setDialogComprobarQr]=useState(false)

const obtenerDataAlmacenLista = async()=>{
  setLoadingListaTable(false)
  const data = await Service.ObtenerListaArticuloPorId(articuloEntity.id)
    .then(res => {
      return res
    })
    console.log(data)
    setAlmacenamientoDataLista(data);
    setLoadingListaTable(true)
}


useEffect(()=>{
  console.log(ArticuloDialoglista)
  if(ArticuloDialoglista){
    obtenerDataAlmacenLista();
  }
  },[ArticuloDialoglista])

  let tablaFiltradaLista =[]

  if (!busquedaGlobalLista.length >= 1) {
    tablaFiltradaLista = AlmacenamientoDataLista
  } else {
    tablaFiltradaLista = AlmacenamientoDataLista.filter(elemento => {
      if (
        elemento.id
          .toString()
          .toLowerCase()
          .includes(busquedaGlobalLista.toLowerCase()) 
      ) {
        return elemento
      }
    })
  }


function contenidoListaAlmacenada (){




  return(
    <div style={{width:"100%"}}>

{loadingListaTable ? (<>
        <DataTables
          textoBuscar={'Lista Almacenada'}
          selectedData={selectedDataLista}
          setSelectedData={setSelectedDataLista}
          tablaFiltrada={tablaFiltradaLista}
          busquedaGlobal={busquedaGlobalLista}
          setBusquedaGlobal={setBusquedaGlobalLista}
          titulo={["id","estadoArticulo"]}
          observer={false}
          agregar={true}
          funcionAgregarElementos={agregarItemArticulo}
          AccionesModificables={true}
          funcion_AgregarElemetos_Acciones={(function(data){

return(

  <> 
  {data?.estadoArticulo==='Disponible-No verificado'?(<>
    <Button onClick={()=>{cambiarPaginas_ItemEstadosFiltrado(1,data)}} label={<FontAwesomeIcon icon={faLock}/>}/>
  </>):(<>

{data?.estadoArticulo==='Disponible-Verificado'?
(<>
  <Button label={<FontAwesomeIcon icon={faSquare}/>}/>

</>):(<></>)
}

  </>)}
  
  
   </>
)

          })}
        />
        </>
      ) : (
        <Loading />
      )}

</div>
  )
}



const agregarItemArticulo = async()=>{
  setSubmittedItemArticulo(true)
let errorV=false

if(articuloItemEntity.id){
  articuloItemEntity.articuloid=articuloEntity;

  await Service.ModificarItemArticulo(articuloItemEntity).then(res => {
    return res
  })
  .catch(error => {
    errorV = true
  })

}else{
  articuloItemEntity.articuloid=articuloEntity;
  console.log(articuloItemEntity)
  await Service.CrearItemArticulo(articuloItemEntity).then(res => {
  return res
})
.catch(error => {
  errorV = true
})
}

if(!errorV){
  obtenerDataAlmacenLista()
}


}






let dataSelectSeccion = [
  {id:'Libros',name:'Libros',label:'libros',data:'Libros'}]



  const obtenerDataMarca = async () => {
    setLoadingMarca(false)
    const data = await Service.ObtenerListaMarcas()
      .then(res => {
        return res
      })
      setMarca(data)
      setLoadingMarca(true)
  }

const obtenervalor = async ()=>{
  let data = Marca.map((data,id)=>{
    return { id:data.id , name:data.nombre ,label:data.nombre,data:data }})

    setListarFormulario(listaFormulario.map((dataList)=>(
      dataList.id === 3? {...dataList,["data"]:data}:dataList
    )))
   
}

const [listaFormulario,setListarFormulario] =useState([
  {id:1,titulo:"Nombre del Articulo", identidad:"nombre",advertencia:'El nombre es requerido',type:'text',data:''} , 
  {id:2,titulo:"Elige la Seccion", identidad:"seccion",advertencia:'La  Seccion es requerida',type:'select',data:dataSelectSeccion,object:false},
  {id:3,titulo:"Elige la Marca", identidad:"marcaId",advertencia:'La  Marca es requerida',type:'select',data:[],object:true

}])

useEffect(()=>{
  obtenervalor()
 
},[Marca])




 

  const CrearListaMarca = async (marcaLista)=>{
 
await Service.CrearListaMarca(marcaLista).then(res=>console.log(res))
obtenerDataMarca()
  }

  const EliminarColumnaMarca= async (id)=>{

    await Service.EliminarColumnaMarca(id).then(res=>console.log(res))
    obtenerDataMarca()
  }

  const contenidoToolBar = () => {
    let columnas = [
      {
        id: 1,
        titulo: 'Nombre',
        identidad: 'nombre'
      },
      {
        id: 2,
        titulo: 'Direccion',
        identidad: 'direccion'
      }
    ]


    return (
      <div >
     <Button label="Nuevo Articulo"  style={{width:"100%",marginTop:"10px"}}  onClick={()=>{setArticuloDialog(true)}}/>

     <Button label="Borrar Articulo" style={{width:"100%",marginTop:"10px"}} onClick={()=>{}}/>
       <div>
      
       </div> 


        <div>
        {loadingMarca?(<TablesEdit columnas={columnas} data={Marca} CrearLista={CrearListaMarca} EliminarColumnaMarca={EliminarColumnaMarca}  />):(<><Loading /></>)}
        </div>



        
      </div>
    )
  }

  const onInputChange = (e) => {
    const { name, value } = e.target
    setArticuloEntity({...articuloEntity, [name]:value} )
    console.log(articuloEntity)
  }

  let tablaFiltrada = []

  useEffect(() => {
    obtenerDataMarca();
  }, [])

  useEffect(() => {
    obtenerDataAlmacen()

  }, [])

  const [busquedaGlobal, setBusquedaGlobal] = useState('')

  if (!busquedaGlobal.length >= 1) {
    tablaFiltrada = AlmacenamientoData
  } else {
    tablaFiltrada = AlmacenamientoData.filter(elemento => {
      if (
        elemento.nombre
          .toString()
          .toLowerCase()
          .includes(busquedaGlobal.toLowerCase()) 
      ) {
        return elemento
      }
    })
  }







  const obtenerDataAlmacen = async () => {
    let errorV = false
    const data = await Service.ObtenerListaArticulo()
      .then(res => {
        console.log(res)
        return res
      })
      .catch(error => {
        errorV = true
        SetErrorConexion(true)
        console.log(error)
      })

    if (!errorV) {
      setLoading(true)
      console.log(data)
      setAlmacenamientoData(data)
    }
    

  }

 

    const imageHandler = async ( e )=> {      
      setLoadingFotoArticulo(true)
      let base64String =''
    var reader = new FileReader();
    reader.onload = function () {
        base64String = reader.result.replace("data:", "")
            .replace(/^.+,/, "");
        id_files.data=(base64String);
        setLoadingFotoArticulo(false)
    }
    id_files.name=e.target.files[0].name
    id_files.type=e.target.files[0].type
    setArticuloEntity({...articuloEntity,id_files : id_files})
    reader.readAsDataURL(e.target.files[0]);
  }


  const productDialogFooter = (
    <Fragment>
        <Button  label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={()=>{hideDialogArticulo()}} />
        <Button  label="Guardar" icon="pi pi-check" className="p-button-text" onClick={()=>{GuardarArticuloDialog()}} />
    </Fragment>
);

const GuardarArticuloDialog= async()=>{
  setSubmittedArticulo(true)
let errorV=false
if(articuloEntity.Marca!==''&& articuloEntity.Seccion!=='' && articuloEntity.nombre!==''){
if(articuloEntity.id){
  await Service.ModificarArticulo(articuloEntity).then(res => {
    return res
  })
  .catch(error => {
    errorV = true
  })
}else{
  await Service.CrearArticulo(articuloEntity).then(res => {
  return res
})
.catch(error => {
  errorV = true
})
}

if(!errorV){
  hideDialogArticulo()
  obtenerDataAlmacen()
}

}




}

const EliminarArticulo = async (valor)=>{
  let errorV=false
  console.log(valor)
  await Service.EliminarArticulo(valor.id).then(res => {
    return res
  })
  .catch(error => {
    errorV = true
  })


  if(!errorV){
    hideDeleteArticuloDialog()
    obtenerDataAlmacen()
  }
  
}

const hideDeleteArticuloDialog = ()=>{
setDeleteArticuloDialog(false)
setArticuloEntity(articuloLet)
}

const hideDialog_ArticuloItemDialog_Estados = ()=>{
  setArticuloItemDialog_Estados(false)
  setArticuloItemEntity(itemArticuloLet)
}
const hideDialogArticuloLista= ()=>{
setArticuloDialoglista(false)
  setArticuloEntity(articuloLet)
}

const cambiarPaginas_ItemEstadosFiltrado = (page,data)=>{
  setPaginasItem_Estados(page);
  setArticuloItemEntity(data)
  setArticuloItemDialog_Estados(true)
}
const cambiarPaginas_ItemEstados_Next = ()=>{
  setPaginasItem_Estados(paginasItem_Estados+1)
}
const cambiarPaginas_ItemEstados_Pass = ()=>{
  setPaginasItem_Estados(paginasItem_Estados-1)
}

const deleteArticuloDialogFooter = ()=>{
  return(
  <Fragment>
      <Button label="No" icon="pi pi-times" className="p-button-text"
       onClick={()=> hideDeleteArticuloDialog()} />
      <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={()=>EliminarArticulo(articuloEntity)} />
    
  </Fragment>
  )
};
const hideDialogArticulo = () => {
  setSubmittedArticulo(false);
  setArticuloDialog(false);
  setArticuloEntity(articuloLet)
}

const EliminarElemento = async (valor)=>{
setDeleteArticuloDialog(true)
setArticuloEntity(valor)
}

const EditarElemento = (valor)=>{
  setArticuloEntity(valor)
  setArticuloDialog(true);
}
const observerDialogElement= (valor)=>{
  setArticuloEntity(valor)
setArticuloDialoglista(true)
}
const contenido_ItemDialogEstados= ()=>{
  switch(paginasItem_Estados){
    case 1: 
    return (<>
<div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
<div style={{width:"13rem",height:"20%",textAlign:"center",display:"block"}}>
<QRCode
   id="qrCodeEl"
    style={{ height: "auto", width: "100%" }}
    value={articuloItemEntity?.id}
    viewBox={`0 0 256 256`}
/>
<label  style={{ height: "auto", fontSize: "100%", width: "100%" }}>Codigo : {articuloItemEntity?.id}</label>

<div style={{display:"block",marginTop:"2rem"}}>
<Button onClick={()=>{DescargarQr()}} label={<> Descargar <FontAwesomeIcon icon={faArrowDown}/> </>} />
</div>
<div style={{display:"block",marginTop:"1rem"}}>
<Button onClick={()=>{cambiarPaginas_ItemEstados_Next() }} label='comprobar'/>
</div>
</div>
</div>
  
    </>)
    case 2: 
    return (<>
     <div>
     <Video_Detecte_Qr delay={300} onScan={comprobarQr} onError={(e)=>console.log(e)} />
     </div>
    </>)
    case 3: 
    return (<>

    </>)
  }
}

const comprobarQr= (e)=>{
  console.log(e)

}

const DescargarQr =async ()=>{
  var qrCodeURL = document.getElementById("qrCodeEl")
  const canvas = qrCodeURL
  var url = canvas.toDataURL();
  let downloadLink = document.createElement("a");
  downloadLink.href = url;
  downloadLink.download = `QR.png`;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}

  return (
    <Fragment>
      <Cabecera
        abrirToolBar={abrirToolBar}
        setAbrirToolBar={setAbrirToolBar}
        contenidoToolBar={contenidoToolBar}
      />
      {errorConexion ? (
        <div className='alert alert-warning' role='alert'>
          A Ocurrido un Error
        </div>
      ) : (
        <></>
      )}

      {loading ? (
        <DataTables
          textoBuscar={'Lista Almacenada'}
          selectedData={selectedData}
          setSelectedData={setSelectedData}
          tablaFiltrada={tablaFiltrada}
          busquedaGlobal={busquedaGlobal}
          setBusquedaGlobal={setBusquedaGlobal}
          titulo={["id","nombre","seccion"]}
          confirmDeleteElement={EliminarElemento}
          editElement={EditarElemento}
          observer={true}
          observerDialogElement={observerDialogElement}
        />
      ) : (
        <Loading />
      )}

      <Dialog visible={ArticuloItemDialog_Estados} style={{ width: '900px' }} header="lista de articulos  " modal 
                  onHide={hideDialog_ArticuloItemDialog_Estados}>
<Fragment>
{
contenido_ItemDialogEstados()

}

</Fragment>
                 </Dialog>


      <Dialog visible={deleteArticuloDialog} style={{ width: '450px' }} header="Confirm" modal footer={()=>deleteArticuloDialogFooter()} onHide={()=>hideDeleteArticuloDialog()}>
                     <div className="confirmation-content">
                         <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem'}} />
                         {articuloEntity && <span>¿Estas seguro que quieres eliminarlo ?  <b>{articuloEntity.nombre}</b></span>}
                     </div>
                 </Dialog>

                 <Dialog visible={ArticuloDialoglista} style={{ width: '900px' }} header="lista de articulos  " modal 
                  onHide={hideDialogArticuloLista}>
<Fragment>

{contenidoListaAlmacenada()}

</Fragment>
                 </Dialog>



      <Dialog visible={ArticuloDialog} style={{ width: '450px' }} header="Articulo " modal className="p-fluid" footer={productDialogFooter} onHide={hideDialogArticulo}>
      <div className='imagen_Cabecera'>
      <div className='contenedores_Imagen'  >
      <>{id_files?.data ?(

    <img className='caracteristicas_Imagen' src={onchangeImage(id_files)} />
  
    ) :(
      <FontAwesomeIcon  className='caracteristicas_Imagen' icon={faUser}/>)}</>
    <input style={{marginTop:"15px"}}
                    type='file'
                    accept='image/*'
                    name='files'
                    id='files'
                    onChange={e => imageHandler(e)}
                    className='form-control'
                   />
                </div>
    </div>
    <div className="field" style={{marginTop:"5rem"}}>
                         

                         {listaFormulario?.map((data,id )=>{
                          return(
<>
{data.type==="text"?(<div style={{marginTop:"1rem"}}><label >{data.titulo}</label>
<InputText key={id} name={`${data.identidad}`} value={eval(`articuloEntity.${data.identidad}`)} onChange={(e) => onInputChange(e)} required autoFocus className={classNames({ 'p-invalid': submittedArticulo && eval(`!articuloEntity.${data.identidad}`) })} 
                         />
                         {submittedArticulo && eval(`!articuloEntity.${data.identidad}`) && <small className="p-error">{data.advertencia}</small>}</div>
                         
                         ):(<> {data.type==="select"?(<div key={id} style={{marginTop:"1rem"}}>
        
  <label >{data.titulo}</label>
  
<InputSelect id={id} data={data?.data} object={data?.object} value={eval(`articuloEntity?.${data?.identidad}`)}   name={`${data?.identidad}`}
onChange={(e) => onInputChange(e)}  className={(submittedArticulo && eval(`!articuloEntity.${data?.identidad}`))} 

  />
  
   {submittedArticulo && eval(`!articuloEntity.${data.identidad.nombre}`) && <small className="p-error">{data.advertencia}</small>}

</div>):(<>no existe</>) } </>)}

</>
                          )
                         })}
                     

                         </div>
      </Dialog>


 

    </Fragment>
  )
}
