import { Page, Document, StyleSheet, View, Text, Image } from "@react-pdf/renderer";
import React from "react";



export default function PDF_Queja (prop){


    const{quejaFormulario}=prop
console.log(quejaFormulario)
    const paginaDesign =StyleSheet.create({
        margen:{border:3 , borderColor: "black",margin:10 ,width:"97%" ,height:"90%"}
    })

    const fecha = new Date();
    const añoActual = fecha.getFullYear();
    const mesActual = fecha.getMonth() + 1; 
    const diaActual =fecha.getDate();
    const stylesCabecera = StyleSheet.create({
    
        cabecera:{}
        
        ,TablaFila:{},
        TablaColumna:{width:"40%",backgroundColor:"white"},

        fechaColumna:{width:62.5,borderRight:2 ,borderColor:"black",padding:0,height:'100%',display:"flex", justifyContent:"center",alignItems:"center"}
    
    })

return(
<Document>
    <Page size="A4">
<View style={paginaDesign.margen}>
<View style={{display:"flex" ,flexDirection:"row"}}>
    <View style={stylesCabecera.TablaColumna } >

    <View style={stylesCabecera.TablaFila} >
<View style={{backgroundColor:"blue",height:30,display:"flex" ,justifyContent:"center",alignItems:"center" , borderBottom:2 , borderRight:2,borderColor:"black" ,margin:0 ,padding:0}}>
<Text style={{fontSize:14,textAlign:"center"}}>LIBRO DE RECLAMACIONES</Text>
</View>

</View>


    <View style={stylesCabecera.TablaFila} >

    <View style={{height:30,  borderRight:2,borderColor:"black",display:"flex" ,flexDirection:"row",margin:0 ,padding:0}}>


    <View style={stylesCabecera.fechaColumna}>
<Text style={{fontSize:12,textAlign:"center"}}>FECHA:</Text>
</View>

<View style={stylesCabecera.fechaColumna}>
<Text style={{fontSize:12,textAlign:"center"}}>{diaActual}</Text>
</View>
<View style={stylesCabecera.fechaColumna}>
<Text style={{fontSize:12,textAlign:"center"}}>{mesActual}</Text>
</View>
<View style={{width:62.5,borderColor:"black",padding:0,height:'100%',display:"flex", justifyContent:"center",alignItems:"center"}}>
<Text style={{fontSize:12,textAlign:"center"}}>{añoActual}</Text>
</View>

</View>
    </View>


    <View style={stylesCabecera.TablaFila} >

    <View style={{backgroundColor:"blue",height:60,display:"flex" ,justifyContent:"center",alignItems:"center" , borderBottom:2 , borderRight:2,borderColor:"black" ,margin:0 ,padding:0,borderTop:2}}>
<Text style={{fontSize:14,textAlign:"center"}}>COLEGIO EDUCATIVO CIRCULO A1 SCHOOL S.A.C. </Text>
</View>

    </View>



    </View>



    <View style={{width:"61%"}}>
    <View style={stylesCabecera.TablaFila} >
<View style={{height:62,display:"flex" ,justifyContent:"center",alignItems:"center" , borderBottom:2 ,borderColor:"black" , flexDirection:"column",margin:0 ,padding:0}}>
<Text style={{fontSize:14,textAlign:"center"}}>HOJA DE QUEJA</Text>
<Text style={{fontSize:14,textAlign:"center",paddingTop:10,color:"red"}}>N.° 000001</Text>
</View>

</View>
   <View style={stylesCabecera.TablaFila} >
<View style={{height:58,display:"flex" ,justifyContent:"center",alignItems:"center" , borderBottom:2 ,borderColor:"black" , flexDirection:"column",margin:0 ,padding:0}}>
<Text style={{fontSize:12,textAlign:"center",paddingLeft:20,paddingRight:20}}
>
{quejaFormulario.sede.name==='SALAMANCA'?(<>Avenida Circunvalación 3175 Salamanca Salamanca Municipalidad Metropolitana de Lima, LIMA 03</>):(<></>)}
{quejaFormulario.sede.name==='SAN JUAN'?(<>Calle Físicos cruce con Calle Médicos 15438 San Juan de Lurigancho, Peru</>):(<></>)}
</Text>
</View>

</View>
</View>
    </View>
 
<View style={{width:"100%",backgroundColor:"blue",height:"3%",display:"flex",justifyContent:"center",borderBottom:2,borderColor:"black"}}>
    <Text style={{fontSize:14,textAlign:"left",marginLeft:"8"}} >1.IDENTIFIACION DEL CONSUMIDOR </Text>
</View>
<View style={{width:"100%",height:"3%",display:"flex",justifyContent:"center",borderBottom:2,borderColor:"black"}}>
    <Text style={{fontSize:12,textAlign:"left",marginLeft:"8"}} >NOMBRE: {quejaFormulario.nombre} </Text>
</View>
<View style={{width:"100%",height:"3%",display:"flex",justifyContent:"center",borderBottom:2,borderColor:"black"}}>
    <Text style={{fontSize:12,textAlign:"left",marginLeft:"8"}} >APELLIDO: {quejaFormulario.apellidoPaterno} </Text>
</View>
<View style={{width:"100%",height:"3%",display:"flex",justifyContent:"center",borderBottom:2,borderColor:"black"}}>
    <Text style={{fontSize:12,textAlign:"left",marginLeft:"8"}} >DOMICILIO: {quejaFormulario.domicilio}</Text>
</View>


<View style={{display:"flex",flexDirection:"row",height:"3%",width:"100%"}}>
<View style={{width:"20%",display:"flex",justifyContent:"center",borderBottom:2,borderColor:"black" ,borderRight:2}}>
    <Text style={{fontSize:12,textAlign:"left",marginLeft:"8"}} >{quejaFormulario.tipoDni}: {quejaFormulario.numeroDocumento} </Text>
</View>

<View style={{width:"90%",display:"flex",justifyContent:"center",borderBottom:2,borderColor:"black"}}>
    <Text style={{fontSize:12,textAlign:"left",marginLeft:"8"}} >TELEFONO / EMAIL: {quejaFormulario.telefono} - {quejaFormulario.correoPersonal} </Text>
</View>
</View>


<View style={{width:"100%",height:"3%",display:"flex",justifyContent:"center",borderBottom:2,borderColor:"black"}}>
    <Text style={{fontSize:12,textAlign:"left",marginLeft:"8"}} >PADRE O MADRE: {quejaFormulario.Apoderado} </Text>
</View>
<View style={{width:"100%",backgroundColor:"blue",height:"3%",display:"flex",justifyContent:"center",borderBottom:2,borderColor:"black"}}>
    <Text style={{fontSize:14,textAlign:"left",marginLeft:"8"}} >2. IDENTIFICACION DEL BIEN CONTRATADO  </Text>
</View>


<View style={{height:60,width:"100%",display:"flex"  , borderBottom:2 ,borderColor:"black" ,flexDirection:"row",margin:0 ,padding:0}}>
<View style={{width:"30%" ,borderRight:2 ,borderColor:"black", display:"flex",justifyContent:"center",alignItems:"center"}}>


<View style={{display:"flex",flexDirection:"row" ,justifyContent:"center",alignItems:"center" ,borderBottom:2,borderColor:"black",width:"100%"}}>


<View style={{paddingRight:15,borderRight:2,borderColor:"black",paddingTop:"5%"}}>
<Text style={{fontSize:12,paddingBottom:10}} >
SERVICIO:
</Text>
</View>

<View>
<Text style={{fontSize:12,left:20}} >
{quejaFormulario.tipoBienContratado==='SERVICIO'?(<>X</>):(<></>)}
</Text>
</View>



</View>

<View style={{display:"flex",flexDirection:"row" ,justifyContent:"center",alignItems:"center" ,borderColor:"black",width:"100%"}}>


<View style={{paddingRight:15,borderRight:2,borderColor:"black",paddingTop:"5%"}}>
<Text style={{fontSize:12,paddingBottom:10}} >
PRODUCTO:
</Text>
</View>

<View style={{paddingLeft:11}}>
<Text style={{fontSize:12,textAlign:"center",left:10}} >
{quejaFormulario.tipoBienContratado==='PRODUCTO'?(<>X</>):(<></>)}
</Text>
</View>



</View>
</View>
<View style={{width:"70%"}}>


<View  style={{padding:10 ,display:"flex",flexDirection:"row"}}>
<Text style={{fontSize:12 }} >
MONTO RECLAMADO:
</Text>
<Text style={{fontSize:12 }} >
S./ {quejaFormulario.montoReclamado}
</Text>
</View>

<View  style={{padding:10,display:"flex",flexDirection:"row"}}>
<Text style={{fontSize:12 }} >
DESCRIPCION: {quejaFormulario.DescripcionProducto}
</Text>
</View>
</View>

</View>
<View style={{width:"100%",height:"3.3%",display:"flex",alignItems:"center",borderBottom:2,borderColor:"black",flexDirection:"row"}}>
    <Text style={{fontSize:13,textAlign:"right",borderRight:2,paddingLeft:3 , borderColor:"black",backgroundColor:"blue" ,paddingTop:5.2,paddingBottom:3}} >3. DETALLE DE LA RECLAMACION Y PEDIDO DEL CONSUMIDOR  </Text>
  <Text style={{fontSize:12,textAlign:"left",marginLeft:3,borderRight:2,borderColor:"black",paddingTop:5.2,paddingBottom:3}} >RECLAMO  </Text>
    <Text style={{fontSize:12,textAlign:"left",marginLeft:3,borderRight:2,borderColor:"black",paddingTop:5.2,paddingBottom:3}} >{false?<>X</>:<></>}    </Text>
    <Text style={{fontSize:12,textAlign:"left",marginLeft:3,borderRight:2,borderColor:"black",paddingTop:5.2,paddingBottom:3}} >QUEJA  </Text>
    <Text style={{fontSize:12,textAlign:"left",marginLeft:3,borderColor:"black"}} >X  </Text>
</View>

<View style={{borderBottom:2 , borderColor:"black" ,height:"28%"}}>
<Text style={{marginTop:15,marginLeft:10 ,fontSize:12 ,marginRight:10}}>
    DETALLE: {quejaFormulario.detalle}
  
</Text>
</View>
<Text style={{marginTop:15,marginLeft:10,fontSize:12,marginRight:10}}>
    PEDIDO: {quejaFormulario.pedido}
</Text>
</View>
<Text style={{fontSize:10,marginLeft:10,marginRight:8}}>
*.La formulación del reclamo no impide acudir a otras vías de solución de controversias ni es requisito previo para interponer una
denuncia ante el INDECOPI.
</Text>

<Text style={{fontSize:10,marginLeft:10,marginRight:8}}>
* El proveedor deberá dar respuesta al reclamo en un plazo no mayor a treinta (30) días calendario, pudiendo ampliar el plazo
hasta por treinta (30) días más, previa comunicación al consumido
</Text>
    </Page>
</Document>

)

}