
import '../Tablas.css'
import $ from 'jquery';
import React, { useEffect, useState } from 'react';
import { TableEditor } from 'react-table-editor'

  



 export const TablaSeleccionable = (props)=> {
   

  const [codValidacion , setCodValidacion]=useState({

    id:null , chekt:''
  })
    let tabla=[]

    const [validacion,setValidacion]=useState(tabla)
   

  
    const {dataHead,dataUser ,dataBody} =props

  




const seleccionar = (e, p)=>{
   
const cambiarEstado = validacion.map( (dat)=>{

if(dat.id === p ){
    return {
        ...dat, chekt:!validacion[p].chekt
    }
}
return dat
}) ;
setValidacion(cambiarEstado)
console.log(validacion)
  }


const convertir = (p)=>{
if(validacion ===undefined){return true

}else{
  return validacion[p]?.chekt ?'other-clic':'ActivarFila'; 
}


}



     
    
 const Block = ({ type, data,value })=> {
    switch (type) {
      case "header":
        const Element = "th"
        return <Element>{data.text}</Element>;
    case "table":
       const Element2="td"
    
    
return<Element2    align={`${data.position}`} valign="bottom" >{eval(`value.${data.text}`)} </Element2>

      default:
        console.log("Unknown block type", type);
        return null;
    }
  }



const Recolectar = ()=>{

 
    let VAL=[]
setValidacion(validacion,[])



console.log(validacion)
for(var i =0 ; Array.from(dataUser).length>i; i++){

    let array = { id: i  , chekt: true }
    VAL.push(array)
    
}
setValidacion(VAL)


}

useEffect(()=>{

    Recolectar()
},[])

const handleKeyDown = (event) => {
    // We replaced the native event with the synthetic keyboard event
    const key = event.code; 
    switch (key) {
      case 'KeyW':
console.log(key)
        break;
      case 'KeyA':
        console.log(key)
        break;
      case 'KeyS':
        console.log(key)
        break;
      case 'ShiftLeft':
     
        break;
      default:
      //custom logic  
    }

    console.log(key)
  }


return(

<div onKeyDown={(e)=>handleKeyDown(e)} tabIndex="0">

<table id="TheTable" border="1" className="ExcelTable2007" >
		<tbody>
		<tr>
		  	<th >   </th>

	     {dataHead?.map((block , a )=>{
         
            return(
<Block key={a} {...block} />
         )})}
		</tr>

        {Array.from(dataUser)?.map((value ,p)=> 
    
        { 
          
             return (<tr key={p}   className={'cabeceraTabla '+convertir(p)} onClick={(e)=> seleccionar(e,p)} >
			<td className="heading">{p+1}</td>

            
{dataBody.map((block , i )=>(
<Block key={i} {...block} value={value} />

         ))}
  
            </tr>
            )})}

		
	</tbody>
</table>
</div>
) 
 }