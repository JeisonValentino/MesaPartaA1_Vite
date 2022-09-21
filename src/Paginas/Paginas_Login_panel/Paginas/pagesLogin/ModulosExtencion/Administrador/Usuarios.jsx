import React, { useEffect, useRef } from "react";
import { Fragment, useState } from "react";
import Loading from "../../../../../ControladorPage/Loading";
import { Cabecera } from "../../ExtencionesCompartidas/Cabecera";
import { Service } from "../../Service";
import { DataTable } from 'primereact/datatable'
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Sidebar } from "primereact/sidebar";
import { RadioButton } from "primereact/radiobutton";
import { SelectButton } from "primereact/selectbutton";
import { Dialog } from "primereact/dialog";
import { classNames } from "primereact/utils";
import { Dropdown } from "primereact/dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel } from "@fortawesome/free-regular-svg-icons";
import useSound from "use-sound";
import notificacionAprob from './../../Modulos/notificacionAprob.mp3'
import fallo from './../../Modulos/fallo.mp3'

export default function  Usuarios (){
    const [loading, setLoading]=useState(false);
    const dt = useRef(null);
const[users,setDataUsers]=useState([]);
const[renderizaUsers,setRenderizaUsers]=useState();
const [selectedData, setSelectedData] = useState(null);
const [listRole,setListRole]=useState();
let emptyProduct = {
    id:null,
     correo: '',contraseña:'',idEmpleado:'',estado:'',role:''
 
 };
 let emptyEmpleado={
   name:'',code:null
 }
const [productDialog, setProductDialog] = useState(false);
const [deleteProductDialog, setDeleteProductDialog] = useState(false);
const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
const [product, setProduct] = useState(emptyProduct);
const[empleado,setEmpleado]= useState(emptyEmpleado);
const [selectedProducts, setSelectedProducts] = useState(null);
const [submitted, setSubmitted] = useState(false);
const [globalFilter, setGlobalFilter] = useState(null);
const toast = useRef(null);
const [count, setCount] = useState(0);
const [visibleCustomToolbar, setVisibleCustomToolbar] = useState(false);
const [valorFiltro, setValorFiltro] = useState([]);
const[estadoFil,setEstadoFil]=useState('')
const [arrayCorreos,setArrayCorreos]=useState()
const [playSound] = useSound(notificacionAprob)
const [fallosonund]=useSound(fallo)

const obtenerLista= async ()=>{
    const data = await Service.ListarUsuario().then(res=>{
       
        return res;
    })
   
    setDataUsers(data);
    setLoading(true);   
}

useEffect(()=>{

    obtenerLista()
window.addEventListener('load',obtenerLista)
    return()=>{

        window.removeEventListener('load',obtenerLista)
    }
},[])






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

const ValidarCaracteres = ()=>{
    if(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    .test(product.correo)){
        
return true
    }else{
        console.log(true)
        return false
    }
}


const saveProduct =async (e) => {
    e.preventDefault();
    
    setSubmitted(true);
    setCount(count + 1)
    let error= false;
    if(product.id){
   
        console.log("paso por el id")
        await  Service.ModificarUser(product).catch(res=>{
            error=true;
            console.log(res.response.data.message)
            toast.current.show({ severity: 'error', summary: 'Ocurrio un error inesperado', detail: `${res.response.data.message}`, life: 3000 });
            fallosonund()
        })
        

        if(!error){
            console.log("no hay error")
    setProduct(emptyProduct);
        listarRoles()
        obtenerLista()
        setProductDialog(false);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Usuario Actualizado2', life: 3000 });
        playSound()
        }

    }else{
    if ( !validacionEmail() && ValidarCaracteres()&& !(product.contraseña.length<4) && !(product.role=='') && !product.idEmpleado=='' ) {

       
       

          
    
        
       
            console.log("no paso por el id")
          
          
   
            await EnviarUsuarioCreado(product);
            setProduct(emptyProduct);
            setEmpleado(emptyEmpleado)
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Usuario Creado', life: 3000 });
        
listarRoles()
        obtenerLista()
        setProductDialog(false);
        playSound()
       
    }
}}

const EnviarUsuarioCreado =  (product)=>{
     Service.CrearUsuario(product);
}




const editProduct = (product) => {
    setProduct({...product});
    setProductDialog(true);
}

const confirmDeleteProduct = (product) => {
    setProduct(product);
    setDeleteProductDialog(true);
}




const deleteProduct = async () => {
   

     await Service.EliminarUsuario(product).catch((res)=>{
        console.log(res)
     })
   
     listarRoles()
     obtenerLista() 

    setDeleteProductDialog(false);
    setProduct(emptyProduct);
    playSound()
    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Usuario Eliminado', life: 3000 });
   
}

const deleteSelectedProducts = () => {
   
    
   
    productService.eliminarListaDeusuarioSeleccionados(selectedProducts)
    let _products = products.filter(val => !selectedProducts.includes(val));
   
   
    

    setDeleteProductsDialog(false);
    setSelectedProducts(null);
  
    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    
}

const onCategoryChange = (e) => {
    let _product = {...product};
    _product['role'] = e.value;
    setProduct(_product);
}

const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || '';
    let _product = {...product};
    _product[`${name}`] = val;

    setProduct(_product);
}
const onChangeSelectButton= (e, name)=>{
  const val = (e.target && e.target.value) || '';
  let _product = {...product};
  _product[`${name}`] = val;

  setProduct(_product);
}
const onEmpleadoChange = (e, name)=>{
 
  const val = (e.target && e.target.value) || '';
  const val2=(e.value);
  let _empleado={...empleado};

  let _product = {...product};
  _product[`${name}`] = val.code;
  _empleado['name']= val2;
setEmpleado(_empleado)
  setProduct(_product);
  
}




const leftToolbarTemplate = () => {
    return (
        <React.Fragment >
        
          <div >
          <button style={{width:"100%"}} onClick={(e)=>console.log(e)} className="p-sidebar-icon p-link mr-1">
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
        <h5 className="mx-0 my-1">Buscar usuario</h5>
        <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText type="search" onInput={(e) => aww(e) } placeholder="Search..." />
            
        </span>
        
        
    </div>

   </div>
);

const aww = (e) =>{
    setGlobalFilter(e.target.value)
    filtrar(e.target.value,valorFiltro)
   
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
        <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={()=>deleteProduct()} />
    </React.Fragment>
);
const deleteProductsDialogFooter = (
    <React.Fragment>
        <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductsDialog} />
        <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedProducts} />
      
    </React.Fragment>
);

const onColReorder = () => {
    toast.current.show({severity:'success', summary: 'Columna reordenada exitoso ', life: 3000});
}




const validacionEmail = ()=>{
  
 
  const valor = users.find(res=>res.correo===product.correo)
  if(valor){
return true
  }else{
    return false
  }
  
}

const listarRoles=async()=>{
const data = await Service.listarRoles().then(res=>{
    return res
})
setListRole(data);
}
useEffect(()=>{

    listarRoles();
},[])



function reenderizarDataUsers (){
    
    let data= users?  users.map((e) => e):[]  ;
    
    setRenderizaUsers(data);
  
}
useEffect(()=>{
    reenderizarDataUsers();
},[users])






const filtrar=(terminoBuscado,valorfilfilRole)=>{

    const valor1=valorfilfilRole.includes(1) ? "ADMIN":""
const valor2=valorfilfilRole.includes(2)? "ventas":""
const valor3 =valorfilfilRole.includes(3)? "soporte":""
let valorRoletodos="";
if(valor1 ==="" && valor2 === "" && valor3 === ""){
    
     valorRoletodos="todos";
}

var resultadoBusqueda=users.filter((elemento) => {


   if(valorRoletodos!=="todos"){
if (((elemento.correo.toString().toLowerCase().includes(terminoBuscado.toLowerCase())   )  && (elemento.role.toString() === valor1 ) )|| ((elemento.correo.toString().toLowerCase().includes(terminoBuscado.toLowerCase())   )  && (elemento.role.toString() === valor2 ))  || ((elemento.correo.toString().toLowerCase().includes(terminoBuscado.toLowerCase())   )  && (elemento.role.toString() === valor3 )   )  ) {
    return elemento

}
   }else{

    if (((elemento.correo.toString().toLowerCase().includes(terminoBuscado.toLowerCase())   )   )|| ((elemento.correo.toString().toLowerCase().includes(terminoBuscado.toLowerCase())   ) )  || ((elemento.correo.toString().toLowerCase().includes(terminoBuscado.toLowerCase()))   )  ) {
        return elemento
    
    }
   }


})
console.log(resultadoBusqueda)
setRenderizaUsers(resultadoBusqueda)


}


function pruebaConsole(valor){
    setVisibleCustomToolbar(valor)
}



const datosRole = [
    {name: 'ADMIN', value: 1},
    {name: 'Gerente', value: 2},
    {name: 'Soporte', value: 3}
    ,{name: 'ventas', value: 4}
];

return (
<Fragment>
<Cabecera pruebaConsole={pruebaConsole}  visibleCustomToolbar2={visibleCustomToolbar}/>
<div>
    
    {loading ?
    
    
     <Fragment>
     { users ? (<>
        <div>

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

            <div style={{display:"flex" ,justifyContent:"center",alignContent:"center"}}>

                    <h3>Filtros Avanzados </h3>
                    </div>
                    <div className='container-sm'>

                    <div className="row">
    <div className="col-12 " >
  
                <div className="col-12 " >
                <h5>Tipo de roles </h5>
                <SelectButton value={valorFiltro} options={datosRole} onChange={(e) => setValorFiltro(e.value)} optionLabel="name" multiple />
                </div>
    </div>
    
  </div>

                    </div>
                </Sidebar>
               
            <div className="card" >
            
                <DataTable id="tableUser" onColReorder={onColReorder} reorderableColumns   style={{zIndex:"5" }} ref={dt} value={renderizaUsers} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                    dataKey="id" paginator rows={1} rowsPerPageOptions={[1,5, 10, 25,50,100,150,200]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                     header={header} responsiveLayout="scroll">
               
                 <Column rowReorder selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}></Column>
                    <Column field="id" header="Id" sortable style={{ minWidth: '2rem' }}></Column>
                    <Column field="correo" header="Correo" sortable style={{ minWidth: '10rem' }}></Column>
                    <Column field="role" header="Role" sortable style={{ minWidth: '6rem' }}></Column>
                    <Column field="action" body={actionBodyTemplate} sortable exportable={false} style={{ minWidth: '10rem' }} header="Acciones"></Column>
                    
                </DataTable>
            
            </div>

            <Dialog visible={productDialog} style={{ width: '450px' }} header="Product Details" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                {product.image && <img src={`images/product/${product.image}`} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={product.image} className="product-image block m-auto pb-3" />}
                <div className="field">
                    <label htmlFor="correo">Correo</label>
                    <InputText id="correo" value={product.correo} onChange={(e) => onInputChange(e, 'correo')} required autoFocus className={classNames({ 'p-invalid': submitted &&  !product.correo  || submitted && !ValidarCaracteres()})} />

                    {submitted &&  !product.correo  || submitted && !ValidarCaracteres() ? <small className="p-error">El correo es requerido.</small>:""} 
{validacionEmail() && !product.id?<small className="p-error">
El correo ya existe
</small>:""}





</div>
<div className="field">
                    <label htmlFor="contraseña">Contraseña</label>
                    <InputText id="contraseña" value={product.contraseña} onChange={(e) => onInputChange(e, 'contraseña')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.contraseña })} />
                    {submitted && !product.contraseña && <small className="p-error">La contraseña es requerida .</small>}

                    {submitted &&product.contraseña.length<4 &&<small className="p-error">La contraseña debe tener almenos 4 caracteres .</small>}
                </div>
             
<hr/>
{submitted &&!product.role &&<small className="p-error">Debe existir el rol .</small>}
                <div className="field">
              

                    <label className="mb-3">Roles</label>
                    <div className="formgrid grid ">
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category1" name="role" value="ADMIN" onChange={onCategoryChange} checked={product.role === 'ADMIN'} 
required autoFocus className={classNames({ 'p-invalid': submitted && !product.role })}

                            />
                            <label htmlFor="category1">Admin</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category2" name="role" value="soporte" onChange={onCategoryChange} checked={product.role === 'soporte'} required autoFocus className={classNames({ 'p-invalid': submitted && !product.role })} />
                            <label htmlFor="category2">Soporte</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category3" name="role" value="gerente" onChange={onCategoryChange} checked={product.role === 'gerente'} required autoFocus className={classNames({ 'p-invalid': submitted && !product.role })} />
                            <label htmlFor="category3">Gerente</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category4" name="role" value="ventas" onChange={onCategoryChange} checked={product.role === 'ventas'} required autoFocus className={classNames({ 'p-invalid': submitted && !product.role })} />
                            <label htmlFor="category4">Ejecutivo de ventas</label>
                        </div>
                    </div>
                </div>
                <hr/>
                
                {submitted && !product.idEmpleado &&<small className="p-error">Debe existir un empleado para registrar un usuario</small>}
                {!product.id?( <div className="field">
               
                <label className="mb-3">Seleccion de empleados</label>
                <div className="formgrid grid card">
               
                <Dropdown value={empleado.name} options={listRole} 
                onChange={(e)=>onEmpleadoChange(e, 'idEmpleado')} optionLabel="name" filter showClear filterBy="name" placeholder="Selecciona un empleado" required autoFocus className={classNames({ 'p-invalid': submitted && !product.idEmpleado })} 
                    />
               
</div>

</div> ):""

}


            </Dialog>

            <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem'}} />
                    {product && <span>¿Estas seguro que quieres eliminar el usuario ?  :   <b>{product.name}</b>?</span>}
                </div>
            </Dialog>

            <Dialog visible={deleteProductsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem'}} />
                    {product && <span>¿Estas seguro que quieres eliminar los usuarios seleccionados ? </span>}
                </div>
            </Dialog>
         
        </div>


    </div>
  </>):(<>OCURRIO UN ERROR, CONTACTARSE CON EL DESARROLADOR DEL SISTEMA </>)}
    </Fragment>:<Loading/>}
</div>





</Fragment>
)
}