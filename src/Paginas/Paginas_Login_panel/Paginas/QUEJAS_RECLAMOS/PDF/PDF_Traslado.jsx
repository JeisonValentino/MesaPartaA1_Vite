import { Page, Document, StyleSheet, View, Text, Image } from "@react-pdf/renderer";
import React from "react";

export default function PDF_Traslado (prop){

    const{quejaFormulario}=prop

    const fecha = new Date();
    const añoActual = fecha.getFullYear();
    const mesActual = fecha.getMonth() + 1; 
    const diaActual =fecha.getDate();
    var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");

    const paginaDesign =StyleSheet.create({
        margen:{margin:40 ,width:"85%" ,height:"90%"}
    })

    return(

        <Document>
    <Page size="A4">
    <View style={paginaDesign.margen}>

    <Text style={{fontSize:14,marginTop:15,textAlign:"right"}}>
        SOLICITO: Documentos personales para mi menor hijo
    </Text>
<Text style={{fontSize:14,marginTop:15}}>
SEÑORA DIRECTORA DE LA INSTITUCION EDUCATIVA PARTICULAR CIRCULO A1 SCHOOL SAC
</Text>
<Text style={{fontSize:14,marginTop:15}}>
SRA. DIRECTORA:
</Text>

<Text style={{fontSize:12,marginTop:15,textAlign:"justify"}}>
Yo, {quejaFormulario.nombre +""+ quejaFormulario.apellidoPaterno+""+quejaFormulario.apellidoMaterno} , con {quejaFormulario.tipoDni} N° {quejaFormulario.numeroDocumento}, domiciliado en {quejaFormulario.domicilio}; padre del alumno
{quejaFormulario.nombreEstudiante + ""+ quejaFormulario.apellidoMaternoEstudiante+""+quejaFormulario.apellidoPaternoEstudiante},
{quejaFormulario.tipoDocumentoEstudiante} N° {quejaFormulario.numeroDocumentoEstudiante}, perteneciente en la institución que usted dignamente dirije ,con el debido respeto me presento y expongo:
</Text>


<Text style={{fontSize:12,marginTop:10,textAlign:"justify"}}>
Que, por motivos de índole personal me veo obligado a cambiar decentro educativo a mi menor hijo, de su prestigiosa institución educativa, por loque recurro a su oficina para solicitarle toda la documentación correspondiente,incluido sus
certificados de estudio
requisitos indispensables para su matrícula.
</Text>

<Text style={{fontSize:12,marginTop:15,textAlign:"left"}}>
Por tanto pido a Ud. Acceder a mi pedido.

</Text>
{quejaFormulario.sede.name==='SAN JUAN'?(<Text style={{fontSize:12,marginTop:15,textAlign:"right"}}>
Lurigancho, {diaActual} de {meses[mesActual-1]} del año {añoActual}  
</Text>):(<></>)}
{quejaFormulario.sede.name==='SALAMANCA'?(<Text style={{fontSize:12,marginTop:15,textAlign:"right"}}>
Salamanca, {diaActual} de {meses[mesActual-1]} del año {añoActual}  
</Text>):(<></>)}

    </View>
    </Page>
    </Document>
    )

}