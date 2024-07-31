import { Dialog } from "primereact/dialog";
import { Fragment, createContext, useContext } from "react";
import useStoreDialog from "../reducer/dialog_reducer";
import ComponenteEscolaridad from "./componets_dialog/dialog_info_/ComponentEscolaridad";
import ComponentAcademia from "./componets_dialog/dialog_info_/ComponentAcademia";
import ComponentExtracurriculares from "./componets_dialog/dialog_info_/ComponentExtracurriculares";
import ComponentArte from "./componets_dialog/dialog_info_/extracurriculares/ComponentArte";
import ComponentFutbol from "./componets_dialog/dialog_info_/extracurriculares/ComponentFutbol";
import ComponentRealidadVirtual from "./componets_dialog/dialog_info_/extracurriculares/ComponentRealidadVirtual";
import ComponentRobotica from "./componets_dialog/dialog_info_/extracurriculares/ComponentRobotica";

 const Store_Provider_component=()=>{
    const { visible, setVisible,header,tipo_componente,cuerpo } = useStoreDialog();
  
    let content = null;
    if (visible) {
      if (tipo_componente === 'ComponenteEscolaridad') {
        content = <ComponenteEscolaridad cuerpo={cuerpo} />;
      } else if (tipo_componente === 'ComponentAcademia') {
        content = <ComponentAcademia cuerpo={cuerpo} />;
      }else if (tipo_componente==='ComponentExtracurriculares'){
        content = <ComponentExtracurriculares cuerpo={cuerpo} />;
      }else if(tipo_componente==='ComponentArte'){
        content=<ComponentArte cuerpo={cuerpo}/>
      }else if(tipo_componente==='ComponentFutbol'){
        content=<ComponentFutbol cuerpo={cuerpo}/>

      }else if(tipo_componente==='ComponentRealidadVirtual'){
        content=<ComponentRealidadVirtual cuerpo={cuerpo}/>

      }else if(tipo_componente==='ComponentRobotica'){
        content=<ComponentRobotica cuerpo={cuerpo}/>

      }
      // Puedes agregar más condiciones según sea necesario
    }
  
  return(
    
<Dialog header={header} visible={visible} style={{ width: '50vw' }} onHide={() => {if (!visible) return; setVisible(false); }}>
{content}
</Dialog>
    )
}

export default Store_Provider_component;