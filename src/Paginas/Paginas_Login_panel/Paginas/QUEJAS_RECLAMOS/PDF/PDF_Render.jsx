import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer"
import { useEffect } from "react";
import { useState } from "react"
import PDF_Certificado from "./PDF_Certificado";
import PDF_Queja from "./PDF_Queja"

export const  PDF_Render = ()=>{
const [recargar,setRecargar]=useState(false);

useEffect(()=>{


 setRecargar(false)
},[recargar])

return(
    <>

    <PDFDownloadLink document={<PDF_Certificado />}>
    <button > Descargar </button>
    </PDFDownloadLink>
    


    {recargar?<></> : <>
    <PDFViewer style={{width:"100%",height:"90vh"}}>

<PDF_Certificado/>
</PDFViewer></>}


    </>
)

}