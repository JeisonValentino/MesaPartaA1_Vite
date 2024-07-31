import { Fragment, useEffect, useState } from "react";
import Loading from "../../ControladorPage/Loading";
import Notas from "./Notas";
import "./noticias.css"
import banner from "../Nosotros/banner-nosotros.png"
import Paginacion_componentes from "../../Paginas_Login_panel/Paginas/pagesLogin/Modulos/Paginacion_Components/Paginacion_componentes";
import useNoteStore, { initNote } from "../../Paginas_Login_panel/ConfigurationAuthenticacion/reducer/useNoteStore"
 const  Noticias=()=>{
    const {notes,loading,error}=useNoteStore((state)=>({
      notes:state.notes,
      error:state.error,
      loading:state.loading
    }))


    useEffect(() => {
      if(!notes.length && !loading && !error){
        initNote()();
     }
    }, [loading])

  

  

    
    return(
        <Fragment>
      <div className="fotoNosotros">
            <div className="fondobanner">
              <img src={banner}></img> 
              <div className="fondo_container_banner">
                  <div  className="linea"></div>
                  <div >
                      <p>Blog</p>
                  </div>
              </div>
            </div>
          </div>
 
    {loading ? <Loading/>:
  <>{notes.length==0 ? "No hay datos." :
  <Paginacion_componentes  style={"grid"} itemsPerPage={5}>
{notes.map((item, index) => (
         
          <Notas key={index} imagen={item.imagen} titulo={item.titulo} contenido={item.contenido}/>
      
        ))}
</Paginacion_componentes>}


</>
    }

    </Fragment>
)

}

export default Noticias;