import React, {Fragment, useEffect} from 'react';
import { Cabecera } from './ExtencionesCompartidas/Cabecera';
import FondoNiños from './../../../../Imagenes/FondoNiños.jpg'

export const  Entrada = ()=>{



 
return(
<Fragment>
<div style={{width:"100%" ,height:"100%" ,position:"absolute"}}>
<Cabecera/>


<img className="" src={FondoNiños} style={{width:"100%",height:"100%" }} />

</div>

</Fragment>

)

}