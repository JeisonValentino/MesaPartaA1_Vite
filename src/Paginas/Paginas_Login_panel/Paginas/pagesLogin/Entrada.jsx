import React, {Fragment} from 'react';
import { Cabecera } from './ExtencionesCompartidas/Cabecera';
import FondoNiños from './../../../../Imagenes/FondoNiños.jpg'
export const  Entrada = ()=>{

return(
<Fragment>
<Cabecera/>

<div >
<img className="fondoEntrada" src={FondoNiños} style={{width:"100%",height:"100%"}} />

</div>

</Fragment>

)

}