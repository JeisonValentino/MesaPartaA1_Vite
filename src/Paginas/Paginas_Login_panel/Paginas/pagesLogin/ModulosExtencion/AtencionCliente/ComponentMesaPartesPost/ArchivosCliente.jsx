import { faChevronLeft, faChevronRight, faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TableHead } from "@mui/material";
import { useEffect, useState } from "react";
import { Buffer } from 'buffer';
const ArchivosCliente= (props)=>{

    const{pdfData}=props
const [itemSeleccionado,setItemSeleccionado]=useState(0);


const onchangeImage= (dat,type,name)=>{
console.log(name)
    var reader =new FileReader();
    
    const byteCharacters =Buffer.from(dat ,'base64').toString('binary');
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    
    const blob = new Blob([byteArray], {type: type });
    var fileactual = new File([blob], name, { lastModified: new Date().getTime(), type: type})

    reader.addEventListener("load", function () {
        
        return reader.result
    })
    if(fileactual){
    
    
    reader.readAsDataURL(fileactual)
    return URL.createObjectURL(fileactual)
    }else{
        return ""
    }
    
    
    
    }
    
    
    
    

    const Avanzar = ()=>{

if((Array.from(pdfData).length-1)!==itemSeleccionado){

setItemSeleccionado(itemSeleccionado+1)
    }}
  
const Retroceder =()=>{
    if(itemSeleccionado>0){
    
        setItemSeleccionado(itemSeleccionado-1)
            }
}
let dataFile='';
let typeFile='';
let filename=''
useEffect(()=>{

    setItemSeleccionado(0)
  
     dataFile=(Array.from(pdfData)[itemSeleccionado]?.data);
 typeFile=(Array.from(pdfData)[itemSeleccionado]?.type);
    filename=(Array.from(pdfData)[itemSeleccionado]?.name);
  
},[])



return( 
<div style={{display:"block",width:"100%"}}>
<div style={{width:"100%",height:"10%",marginBottom:"30px",display:"flex",alignItems:"center",justifyContent:"center"}}>
<table style={{width:"100%",textAlign:"center"}}><thead>
    <tr><th>Nombre del archivo</th>
    <th>Tipo de archivo</th>
    <th>Descargar archivo</th>
    <th>Posicion</th>
    </tr>
</thead>
<tbody>
    <tr>
        <td>{Array.from(pdfData)[itemSeleccionado]?.name}</td>
        <td>{Array.from(pdfData)[itemSeleccionado]?.type}</td>
        <td><a href={onchangeImage((Array.from(pdfData)[itemSeleccionado]?.data),(Array.from(pdfData)[itemSeleccionado]?.type),(Array.from(pdfData)[itemSeleccionado]?.name))} target="_blank" download><FontAwesomeIcon icon={faDownload} /></a></td>
        <td>{itemSeleccionado+1}/{Array.from(pdfData).length}</td>
    </tr>
</tbody>
</table>
</div>
<div style={{width:"100%",height:"100%" ,overflow:"hidden"}}>
{Array.from(pdfData)[itemSeleccionado]?.type==='image/jpeg'||Array.from(pdfData)[itemSeleccionado]?.type==='image/png'?(
    <>
    <div style={{display:"flex",width:"100%",justifyContent:"center"}}>
<img style={{width:"600px",height:"100%"}} src={onchangeImage((Array.from(pdfData)[itemSeleccionado]?.data),(Array.from(pdfData)[itemSeleccionado]?.type),(Array.from(pdfData)[itemSeleccionado]?.name))}></img></div></>):(

<>{Array.from(pdfData)[itemSeleccionado]?.type==='application/pdf'?( 
    <div style={{display:"flex",width:"100%",height:"100%",justifyContent:"center"}}>
     <iframe
       style={{width:"100%" ,height:"100%",overflow:"hidden",marginLeft:"2%"}} 
        title="PdfFrame"
        src={onchangeImage((Array.from(pdfData)[itemSeleccionado]?.data),(Array.from(pdfData)[itemSeleccionado]?.type),(Array.from(pdfData)[itemSeleccionado]?.name))}
        frameborder="0"
        type="application/pdf"
      ></iframe></div>):(<>no se puede mostrar el contenido de este archivo</>)}
</>
      )}
<div   style={{display:"flex",justifyContent:"space-between",width:"100%"}}>
    <div   onClick={()=>Retroceder()} style={{top:"50%",position:"absolute"}} > <FontAwesomeIcon  icon={faChevronLeft}/> </div>
    
    <div onClick={()=>Avanzar()}   style={{top:"50%",left:"95%",position:"absolute"}} > <FontAwesomeIcon icon={faChevronRight}/> </div>
</div>

</div>
</div>)
}

export default ArchivosCliente;