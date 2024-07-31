import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import Cabecera from '../Paginas_Presentacion/Complemets/Cabecera';
import { Suelo } from '../Paginas_Presentacion/Complemets/Suelo';
import { useEffect, useLayoutEffect } from 'react';
export default function PublicRoute(){

  


        const { pathname } = useLocation();
      
        useLayoutEffect(() => {
            const handleScrollToTop = () => {
              window.scrollTo(0, 0);
            };
        
            handleScrollToTop(); 
        

          }, [pathname]);
      
     

      



return(
<>
<Cabecera   />
<Outlet/>
<Suelo/>
</>

)
}


