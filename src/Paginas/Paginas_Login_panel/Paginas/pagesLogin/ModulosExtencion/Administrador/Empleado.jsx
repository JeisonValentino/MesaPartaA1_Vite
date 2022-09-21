import React, { useState, useEffect, useRef } from 'react';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { RadioButton } from 'primereact/radiobutton';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { SelectButton } from 'primereact/selectbutton';
import { InputNumber } from 'primereact/inputnumber';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { Sidebar } from 'primereact/sidebar';
import { faFileExcel } from '@fortawesome/free-regular-svg-icons';
import { Service } from '../../Service';
import { Cabecera } from '../../ExtencionesCompartidas/Cabecera';
import useSound from 'use-sound';
import notificacionAprob from './../../Modulos/notificacionAprob.mp3'
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Loading from '../../../../../ControladorPage/Loading';
export default function Empleado  (){

  
    let emptyProduct = {
        id:null,
         nombre: '',apellidoPaterno:'',apellidoMaterno:'',numeroDocumento:null,telefono:null,idEstado:'',idTipoDocumentoIdentidad:'',idSede:'',direccion:'',estadoCivil:'',gradoInstruccion:'',conocimientoInformatico:'',photo:'',idRole:''
     
     };
  
     const [products, setProducts] = useState([]);
     const [tablaUsuario,setTablaUsuario]=useState([]);
     
     const [sedes , setSedes]=useState();
     const [productDialog, setProductDialog] = useState(false);
     const [deleteProductDialog, setDeleteProductDialog] = useState(false);
     const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
     const [product, setProduct] = useState(emptyProduct);
     const[empleado,setEmpleado]= useState('');
     const[gradoInstruccion,setGradoInstruccion]=useState('');
     const [conocimientoInformatico,setConocimientoInformatico]=useState('')
     const [selectedProducts, setSelectedProducts] = useState(null);
     const [submitted, setSubmitted] = useState(false);
     const [globalFilter, setGlobalFilter] = useState(null);
     const [playSound] = useSound(notificacionAprob)
     const [files, setFiles] = useState({
         files: null })
     const toast = useRef(null);
     const [empleadophoto,setEmpleadoPhoto]=useState()
     const dt = useRef(null);
     const [count, setCount] = useState(0);
     const isMounted = useRef(false);
     const [visibleCustomToolbar, setVisibleCustomToolbar] = useState(false);
     const [valorFiltro, setValorFiltro] = useState([]);
     const[loading,setLoading]=useState(false)
     
     const[direccion,setDireccion]=useState('');
     const [coordenadas,setCoodenadas]=useState(
         {
             lat:null,lng:null
         }
     )

 let  OpcionesIntruccion=[{name:'Sin-estudios',code:1},{name:'Primarios',code:2},{name:'Secundarios',code:3},{name:'Medio-Superiores',code:4},{name:'Profesionales',code:5},{name:'Superiores',code:6}

 ]
 let conocimientoInformaticoFil=[{name:'Usuario',code:1},{name:'Usuario-Avanzado',code:2},{name:'Nivel-Profesional',code:3},{name:'Medio-Superiores',code:4},{name:'Nivel-Experto',code:5}]

 
     
 
     
     
     const openNew = () => {
         setProduct(emptyProduct);
         setSubmitted(false);
         setProductDialog(true);
         
     }
     
     const hideDialog = () => {
         setSubmitted(false);
         setProductDialog(false);
     }
     
     const hideDeleteProductDialog = () => {
         setDeleteProductDialog(false);
     }
     
     const hideDeleteProductsDialog = () => {
         setDeleteProductsDialog(false);
     }
     
     const imageHandler = e => { let base64String =''
     let _product={...empleadophoto}
       var reader = new FileReader();
       console.log("next");
         
       reader.onload = function () {
           base64String = reader.result.replace("data:", "")
               .replace(/^.+,/, "");
     
          
     
           // alert(imageBase64Stringsep);
           _product['fotoCliente']=(base64String);
           setEmpleadoPhoto(_product)
       }
       console.log(e.target.files[0])
      setFiles({files:e.target.files[0]})
       reader.readAsDataURL(e.target.files[0]);
     }

     const saveProduct =async (e) => {
e.preventDefault();

         setSubmitted(true);
         setCount(count + 1)
         if (product.nombre.trim()) {
          
             let _product = {...product};
             if (product.id) {
        console.log("modifica el empleado")
     const formData = new FormData()
     var fileTosave2 = new Blob([JSON.stringify(product)], {
        type: 'application/json'
      })
      console.log(product)
      formData.append('obj', fileTosave2)
  
      formData.append('files2',files.files)
console.log(files.files)
      await Service.ModificarEmpleado(formData);
         playSound()
         setLoading(false);
         obtenerListaEmpleado()
       
        setLoading(true)
                 toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Empleado Actualizado', life: 3000 });
                 
             }
             else {
                 _product.image = 'product-placeholder.svg';
               
                 console.log(product)
                 const formData = new FormData()
                 var fileTosave2 = new Blob([JSON.stringify(product)], {
                    type: 'application/json'
                  })
                  formData.append('obj', fileTosave2)
                  formData.append('files',files.files)
                 await EnviarUsuarioCreado(formData);
                 playSound()
                 setLoading(false);
         obtenerListaEmpleado()
       
                 toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Empleado Creado', life: 3000 });
             }
     setFiles({})
             setProduct(emptyProduct);
             setProductDialog(false);
          
            
         }
     }
     
     const EnviarUsuarioCreado =  (product)=>{
          Service.CrearEmpleado(product);
     }
     
     
     
     
     const editProduct = (product2) => {
         setProduct({...product2});
         let datoExtra={}
         let datoExtra2={}
let datoExtra3 ={}

if(product2.conocimientoInformatico === 'Usuario'){
    datoExtra3={name:'Usuario',code:1}
}else if(product2.conocimientoInformatico === 'Usuario-Avanzado'){
    datoExtra3={name:'Usuario-Avanzado',code:2}
}else if(product2.conocimientoInformatico === 'Nivel-Profesional'){
    datoExtra3={name:'Nivel-Profesional',code:3}
}else if(product2.conocimientoInformatico === 'Medio-Superiores'){
    datoExtra3={name:'Medio-Superiores',code:4}
}else if(product2.conocimientoInformatico === 'Nivel-Experto'){
    datoExtra3={name:'Nivel-Experto',code:5}
}



      if(product2.idSede === 'Salamanca'){
          datoExtra={
             name:'Salamanca',code:2
         }
        }else if(product2.idSede === 'San juan'){

            datoExtra={
                name:'San juan',code:1
         }
        }

if(product2.gradoInstruccion ==='Sin-estudios'){
    datoExtra2={
        name:'Sin-estudios',code:1
    }

} else if(product2.gradoInstruccion ==='Primarios'){
    datoExtra2={
        name:'Primarios',code:2
    }


}else if(product2.gradoInstruccion ==='Secundarios'){
    datoExtra2={
        name:'Secundarios',code:3
    }


}else if(product2.gradoInstruccion ==='Medio-Superiores'){
    datoExtra2={
        name:'Medio-Superiores',code:4
    }


}else if(product2.gradoInstruccion ==='Profesionales'){
    datoExtra2={
        name:'Profesionales',code:5
    }


}else if(product2.gradoInstruccion ==='Superiores'){
    datoExtra2={
        name:'Superiores',code:6
    }


}

         setEmpleado(datoExtra)
       setGradoInstruccion(datoExtra2)
       setConocimientoInformatico(datoExtra3)
         setProductDialog(true);
     }
     
     const confirmDeleteProduct = (product) => {
         setProduct(product);
         setDeleteProductDialog(true);
     }
     
     
     const EliminarUsuario = (id)=>{
     
         productService.eliminarUsuarioTable(id);
     }
     
     const deleteProduct = () => {
         EliminarUsuario(product.id)
     
         let _products = products.filter(val => val.id !== product.id);
         
         setProducts(_products);
         setDeleteProductDialog(false);
         setProduct(emptyProduct);
         toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Empleado eliminado', life: 3000 });
     }
     
     
     
     
     
     
     const contenido={id:null}
     const [otraCosa,setOtraCosa]=useState({contenido})
     const confirmDeleteSelected = () => {
     
         setDeleteProductsDialog(true);
     
     
         setOtraCosa(...selectedProducts,otraCosa)
     }
     
     
     
     
     const deleteSelectedProducts = () => {
        
         
        
         productService.eliminarListaDeusuarioSeleccionados(selectedProducts)
         let _products = products.filter(val => !selectedProducts.includes(val));
        
        
         setProducts(_products);
     
         setDeleteProductsDialog(false);
         setSelectedProducts(null);
       
         toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Empleado eliminado', life: 3000 });
         
     }
     
     const onCategoryChange = (e) => {
         let _product = {...product};
         _product['idTipoDocumentoIdentidad'] = e.value;
         setProduct(_product);
     }
     
     const onInputChange = (e, name) => {
         const val = (e.target && e.target.value) || '';
         let _product = {...product};
         console.log(val)
         _product[`${name}`] = val;
     
         setProduct(_product);
         
        
     }

     
     const onInputChange2 = (e, name) => {
        const val = e.value
        let _product = {...product};
        console.log(val)
        _product[`${name}`] = val;
    
        setProduct(_product);
        
       
    }
     const onChangeSelectButton= (e, name)=>{
       const val = (e.target && e.target.value) || '';
       let _product = {...product};
       _product[`${name}`] = val;
     
       setProduct(_product);
     }

const onConocmientoInformaticoChange = (e, name)=>{

    const val = (e.target && e.target.value) || '';
    const val2=(e.value);
    
  
    let _product = {...product};
    _product[`${name}`] = val.name;
  
setConocimientoInformatico(val2)
    setProduct(_product);
}

     const onEmpleadoChange = (e, name)=>{
      
       const val = (e.target && e.target.value) || '';
       const val2=(e.value);
       
   console.log(val.name)
       let _product = {...product};
       _product[`${name}`] = val.name;
     
      


     setEmpleado(val2)
       setProduct(_product);
       console.log(val2)
     }

     const onIntruccionChange = (e, name) =>{
        const val = (e.target && e.target.value) || '';
        const val2=(e.value);
        let _product = {...product};
        _product[`${name}`] = val.name;

        setGradoInstruccion(val2)
        setProduct(_product);
     }
     
     
   
     
     const leftToolbarTemplate = () => {
         return (
             <React.Fragment >
             
               <div >
               <button style={{width:"100%"}} onClick={exportPdf} className="p-sidebar-icon p-link mr-1">
               <span className="pi pi-print" /><div style={{marginLeft:"4px"}}>PDF</div> 
                 </button>
                 <button style={{width:"100%"}} className="p-sidebar-icon p-link mr-1">
                 <FontAwesomeIcon icon={faFileExcel}/> <div style={{marginLeft:"4px"}}>Excel</div>
                 </button>
               </div>
             </React.Fragment>
         )
     }
     
     
     
     
     
     const actionBodyTemplate = (rowData) => {
         return (
             <React.Fragment>
                 <Button icon="pi pi-pencil" style={{height:"10%",width:"30%",margin:"0",padding:"0"}} className="p-button-rounded p-button-success mr-2" onClick={() => editProduct(rowData)} />
                 
                 <Button icon="pi pi-trash" className="p-button-rounded  p-button-warning" style={{height:"10%",width:"30%",margin:"0",padding:"0"}} onClick={() => confirmDeleteProduct(rowData)} />
                
             </React.Fragment>
         );
     }
     
     const header = (
         <div className="table-header">
         <div >
             <h5 className="mx-0 my-1">Buscar Empleado</h5>
             <span className="p-input-icon-left">
                 <i className="pi pi-search" />
                 <InputText type="search" onInput={(e) => aww(e) } placeholder="Search..." />
                 
             </span>
             
             
         </div>
     
        </div>
     );
     
     const aww = (e) =>{
         
         filtrar(e.target.value)
        
     }
     
     
     const productDialogFooter = (
         <React.Fragment>
             <Button rowReorder label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
             <Button rowReorder label="Guardar" icon="pi pi-check" className="p-button-text" onClick={saveProduct} />
         </React.Fragment>
     );
     const deleteProductDialogFooter = (
         <React.Fragment>
             <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductDialog} />
             <Button label="Si" icon="pi pi-check" className="p-button-text" onClick={deleteProduct} />
         </React.Fragment>
     );
     const deleteProductsDialogFooter = (
         <React.Fragment>
             <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductsDialog} />
             <Button label="Si" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedProducts} />
           
         </React.Fragment>
     );
     
     const onColReorder = () => {
         toast.current.show({severity:'success', summary: 'Columna reordenada exitoso ', life: 3000});
     }
     
     

const obtenerListaEmpleado= async ()=>{

const data = await Service.ObtenerListaEmpleado().then(res=>{
    return res;
})
console.log(data)
    setProducts(data)
    setLoading(true)
}

     const listarSede= async()=>{
let data =await Service.ListarSedesCode().then(res =>{
    return res
})
console.log(data)
setSedes(data)
     }


     useEffect(() => {
        listarSede()
     }, []);
     
     


     useEffect(()=>{
        obtenerListaEmpleado();
       
     },[])

     const renderizaData=()=>{
        let data = products.map((e)=>e);
        console.log(data)
        setTablaUsuario(data)
     }
     useEffect(()=>{
   let data = products.map((e)=>e);
    setTablaUsuario(data)
     },[products])
  
     
       const cols=[{field:'id',header:'ID'},{field:'NombreTotal',header:'Nombre Total'},{field:'idEstado',header:'ESTADO'},{field:'numeroDocumento',header:'numero Documento'},{field:'telefono',header:'telefono'},{field:'idSede',header:'Sede'},{field:'direccion',header:'direccion'},{field:'estadoCivil',header:'estado Civil'}]
     
       const exportColumns=cols.map(col=>({tittle:col.header,dataKey:col.field}))
       
     const filtrar=(terminoBuscado)=>{
     
        
   
   
     var resultadoBusqueda=products.filter((elemento) => {
     
  
         if((elemento.nombreTotal.toString().toLowerCase().includes(terminoBuscado.toLowerCase())) || (elemento.numeroDocumento.toString().toLowerCase().includes(terminoBuscado.toLowerCase()))){
             return elemento
         }
  
     
     
     })
     console.log(resultadoBusqueda)
     setTablaUsuario(resultadoBusqueda)
     
     
     }
     
       const exportPdf = () => {
         
     
         
     }
     function pruebaConsole2(valor){
         setVisibleCustomToolbar(valor)
     }
     
     
     
     const onchangeImage= (dat)=>{


        
        
        
          var reader =new FileReader();
        
          if(dat !==null){
         
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
 
       return (
         <div>
     <Cabecera pruebaConsole2={pruebaConsole2}  visibleCustomToolbar2={visibleCustomToolbar} />
     <div className="datatable-crud-demo">
                 <Toast ref={toast} />
                 
                 <Sidebar position="right" visible={visibleCustomToolbar} onHide={() => setVisibleCustomToolbar(false)} icons={leftToolbarTemplate}>
                 <div style={{display:"flex" ,justifyContent:"center",alignContent:"center"}}>
                 
                 <h3>Opciones Interactivas </h3></div>
                 <div className='container-sm'>
     
                         <div className="row">
     
                         
                         <Button label="Nuevo Usuario" style={{with:"100%",marginTop:"10px"}} onClick={openNew}/>
                         <Button label="Eliminar Usuarios" style={{with:"100%",marginTop:"10px"}} onClick={() =>setDeleteProductsDialog(true)} />
     
                         </div>
                 </div>
                     </Sidebar>
                    
                 <div className="card" >
                 {loading ?
                     <DataTable id="tableUser" onColReorder={onColReorder} reorderableColumns   style={{zIndex:"5" }} ref={dt} value={tablaUsuario} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                         dataKey="id" paginator rows={1} rowsPerPageOptions={[1,5, 10, 25,50,100,150,200]}
                         paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                         currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                         globalFilter={globalFilter} header={header} responsiveLayout="scroll">
                    
                      <Column rowReorder selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}></Column>
                         <Column field="id" header="Id" sortable style={{ minWidth: '2rem' }}></Column>
                         <Column field="nombreTotal" header="Nombre Total" sortable style={{ minWidth: '10rem' }}></Column>
                       
                         <Column field="numeroDocumento" header="numero  Documento" sortable style={{ minWidth: '6rem' }}></Column>
                         <Column field="telefono" header="Telefono" sortable style={{ minWidth: '6rem' }}></Column>
                         <Column field="idSede" header="Sede" sortable style={{ minWidth: '6rem' }}></Column>
                         <Column field="estadoCivil" header="Estado Civil" sortable style={{ minWidth: '6rem' }}></Column>
                         <Column field="gradoInstruccion" header="Grado de Instruccion" sortable style={{ minWidth: '6rem' }}></Column>
                         <Column field="direccion" header="Direccion" sortable style={{ minWidth: '6rem' }}></Column>
                         <Column field="action" body={actionBodyTemplate} sortable exportable={false} style={{ minWidth: '10rem' }} header="Acciones"></Column>
                         
                     </DataTable>
                    :<Loading></Loading>}
                 </div>
     
                 <Dialog visible={productDialog} style={{ width: '450px' }} header="Detalle Empleado" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                     <div className="field">
{  empleadophoto?.fotoCliente ?  (
    <img style={{width:"20%",height:"10%"}} src={onchangeImage(empleadophoto.fotoCliente)} />

):( 
<>{product.photo ?(
    
    <img style={{width:"20%",height:"10%"}} src={onchangeImage(product.photo)} />
    
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
                     <div className="field">
                         <label htmlFor="nombre">Nombre</label>
                         <InputText id="nombre" value={product.nombre} onChange={(e) => onInputChange(e, 'nombre')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.nombre })} />
                         {submitted && !product.nombre && <small className="p-error">El nombre es requerido.</small>}
     
                         <label htmlFor="apellidoPaterno">Apellido Paterno</label>
                         <InputText id="apellidoPaterno" value={product.apellidoPaterno} onChange={(e) => onInputChange(e, 'apellidoPaterno')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.apellidoPaterno })} />
                         {submitted && !product.apellidoPaterno && <small className="p-error">La apellidoPaterno es requerida .</small>}

                         <label htmlFor="apellidoMaterno">Apellido Materno</label>
                         <InputText id="apellidoMaterno" value={product.apellidoMaterno} onChange={(e) => onInputChange(e, 'apellidoMaterno')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.apellidoMaterno })} />
                         {submitted && !product.apellidoMaterno && <small className="p-error">La apellidoMaterno es requerida .</small>}

                         <label htmlFor="numeroDocumento">Numero Documento</label>
                         <InputNumber id="numeroDocumento" value={product.numeroDocumento} useGrouping={false} mode="decimal"  onChange={(e) => onInputChange2(e, 'numeroDocumento')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.numeroDocumento })} />
                         {submitted && !product.numeroDocumento && <small className="p-error">La numeroDocumento es requerida .</small>}

                         <label htmlFor="telefono">Telefono</label>
                         <InputNumber useGrouping={false} mode="decimal" inputId="withoutgrouping" id="telefono" value={product.telefono} onChange={(e) => onInputChange2(e, 'telefono')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.telefono })} />
                         {submitted && !product.telefono && <small className="p-error">El telefono es requerida .</small>}

                      
                     </div>
                  
     <hr/>
                     <div className="field">
                         <label className="mb-3">Tipo Documento </label>
                         <div className="formgrid grid ">
                             <div className="field-radiobutton col-6">
                                 <RadioButton inputId="category1" name="idTipoDocumentoIdentidad" value="DNI" onChange={onCategoryChange} checked={product.idTipoDocumentoIdentidad === 'DNI'} />
                                 <label htmlFor="category1">Dni</label>
                             </div>
                             <div className="field-radiobutton col-6">
                                 <RadioButton inputId="category2" name="idTipoDocumentoIdentidad" value="extrangero" onChange={onCategoryChange} checked={product.idTipoDocumentoIdentidad === 'extrangero'} />
                                 <label htmlFor="category2">Extrangero</label>
                             </div>
                             
                         </div>
                     </div>
                     <hr/>
                     <div className="field">
                     <label className="mb-3">Seleccion la sede</label>
                     <div className="formgrid grid card">
                    
                     <Dropdown value={empleado} options={sedes} 
                     onChange={(e)=>onEmpleadoChange(e, 'idSede')}   optionLabel="name"
                         />
                       
     </div></div>
     
    
   

     <hr/>
                     <div className="field">
                     <label className="mb-3">Conocimiento Informatico</label>
                     <div className="formgrid grid card">
                    
                     <Dropdown value={conocimientoInformatico} options={conocimientoInformaticoFil} 
                     onChange={(e)=>onConocmientoInformaticoChange(e, 'conocimientoInformatico')}   optionLabel="name"
                         />
                       
     </div></div>


     <hr/>
                     <div className="field">
                     <label className="mb-3">Grado Instruccion</label>
                     <div className="formgrid grid card">
                    
                     <Dropdown value={gradoInstruccion} options={OpcionesIntruccion} 
                     onChange={(e)=>onIntruccionChange(e, 'gradoInstruccion')}   optionLabel="name"
                         />
                       
     </div></div>

     <hr/>
     <div className="field ">
     <label className="mb-3 ">Seleccion de Estado Civil</label>
     <div className="formgrid grid card">
     
     <SelectButton value={product.estadoCivil} options={['Soltero','Casado','Viudo']} onChange={(e) =>onChangeSelectButton(e,'estadoCivil')} />
     </div></div>
                 </Dialog>
     
                 <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                     <div className="confirmation-content">
                         <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem'}} />
                         {product && <span>Are you sure you want to delete <b>{product.name}</b>?</span>}
                     </div>
                 </Dialog>
     
                 <Dialog visible={deleteProductsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                     <div className="confirmation-content">
                         <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem'}} />
                         {product && <span>Are you sure you want to delete the selected products?</span>}
                     </div>
                 </Dialog>
              
             </div>
     
     
         </div>
       )
  

}