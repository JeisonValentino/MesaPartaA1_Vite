import { Fragment, useState } from "react"
import "./paginacion_componente.css"

const Paginacion_componentes =  ({children,itemsPerPage,style})=>{
    
    const totalPages = Math.ceil(children.length / itemsPerPage);
    const [currentPage, setCurrentPage] = useState(1);
  
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  
    const onPageChange = (pageNumber) => {
      if (pageNumber >= 1 && pageNumber <= totalPages) {
        setCurrentPage(pageNumber);
      }
    };
  
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = children.slice(indexOfFirstItem, indexOfLastItem);
  
    
    return(  <Fragment>
         <div className={`contenedor_notas ${style}`}>
          {currentItems}
        </div>
  
        <nav>
          <ul className="pagination pagination-lg">
            <li className={`page-item ${currentPage === 1?"disabled":""}`} >
         <span className={`page-link`}  onClick={() => onPageChange(currentPage - 1)} >Anterior</span>
            </li>
            {pageNumbers.map((number) => (
              <li key={number} className={`page-item  ${currentPage === number ? "active" : ""}`} aria-current="page">
             
                <span onClick={() => onPageChange(number)} className="page-link number"> {number}</span>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages?"disabled":""}`}>
               <span className={`page-link`}  onClick={() => onPageChange(currentPage + 1)} >Siguiente</span>
            </li>
          </ul>
        </nav>
      </Fragment>)
}

export default Paginacion_componentes;