import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import { Fragment } from "react"
import { Button } from 'primereact/button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function DataTables(props){
    const toast = useRef(null);
    const dt = useRef(null);
    const onColReorder = () => {
        toast.current.show({severity:'success', summary: 'Columna reordenada exitoso ', life: 3000});
    }
const {textoBuscar,selectedData,tablaFiltrada, busquedaGlobal,setBusquedaGlobal,setSelectedData,titulo,editElement,confirmDeleteElement,observer,observerDialogElement,agregar,funcionAgregarElementos,AccionesModificables,funcion_AgregarElemetos_Acciones}=props






const MostrarOpciones =(rowData)=>{
    return(
        <>
{AccionesModificables?(<>


{funcion_AgregarElemetos_Acciones(rowData)}


</>):(<>       {observer?<Button icon="pi pi-search" className="p-button-rounded p-button-info" style={{height:"10%",margin:"5px",padding:"0"}} onClick={() => observerDialogElement(rowData)} /> :<></>}

<Button icon="pi pi-pencil" style={{height:"10%",margin:"5px",padding:"0"}} className="p-button-rounded p-button-success" onClick={() => editElement(rowData)} />

<Button icon="pi pi-trash" className="p-button-rounded  p-button-warning" style={{height:"10%",margin:"5px",padding:"0"}} onClick={() => confirmDeleteElement(rowData)} /> </>)}

        
       

                

        </>
    )
}

// Cabecera para buscar Datos
const header = (
    <div className="table-header">
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}} >
    <div style={{display:"inline-block"}}>
        <h5 className="mx-0 my-1">Buscar {textoBuscar}</h5>
        <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText  type="search" value={busquedaGlobal} onInput={(e) => setBusquedaGlobal(e.target.value) } placeholder="Buscar..." />
            
        </span>
        </div>

        <div style={{width:"20%",display:"inline-block",height:"100%"}}>
        <div style={{display:"flex",justifyContent:"center"}}>
        {agregar?<><Button  label={<FontAwesomeIcon style={{width:"100%",height:"30px"}}  icon={faPlus}/>} className="p-sidebar-icon p-link" style={{margin:"5px",padding:"0",width:"100%",height:"100%"}} onClick={() => funcionAgregarElementos()} ></Button></>:<></>}
        </div>
        </div>
    </div>

   </div>
);

    return (
        <Fragment>
         <Toast ref={toast} />
   <DataTable  onColReorder={onColReorder} reorderableColumns   style={{zIndex:"5" }} ref={dt} value={tablaFiltrada} 
   selection={selectedData} onSelectionChange={(e) => setSelectedData(e.value)}
                         dataKey="id" paginator rows={5} rowsPerPageOptions={[5, 10, 25,50,100,150,200]}
                         paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                         currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                          header={header} responsiveLayout="scroll">
  <Column rowReorder selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}></Column>
  {Array.from(titulo).map((data,id) =>{
    return(
     
        <Column key={id} className='TablaTr' field={`${data}`} header={`${data}`}  sortable style={{ minWidth: '2rem' }}></Column>
   
    )
  })}

  <Column field="action" style={{ width: '15rem' ,background:"#1E2E86" ,color:"#FEFEFE"}}  header="Acciones" body={MostrarOpciones}></Column>
</DataTable>

        </Fragment>
    )
}