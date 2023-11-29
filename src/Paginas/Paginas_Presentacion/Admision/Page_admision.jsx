import { Fragment, useEffect, useState } from 'react'
import Loading from '../../ControladorPage/Loading'
import  Cabecera  from '../Complemets/Cabecera'
import { Suelo } from '../Complemets/Suelo'
import banner from "../Nosotros/banner-nosotros.png"
import { Table } from 'react-bootstrap'
import './estilos.css'
const Page_admision = () => {
  const [loading, setLoading] = useState(true)

  const cambiarEstado = () => {
  
    
      setLoading(false)
       
  }

  useEffect(() => {
  cambiarEstado()
  }, [])

  return (
    <Fragment>
      <Cabecera  />
      {loading ? (
        <Loading />
      ) : (
        <div>
        <div className="fotoNosotros">
    <div className="fondobanner"><img src={banner}></img>  <div className="linea"></div><p>Admision</p></div>
</div>

<div style={{textAlign:"center",marginTop:"5rem"}}> 
<div style={{marginBottom:"4rem"}}>
  <h1 style={{fontWeight:"800",color:"#324088"}}>INFORMACION GENERAL</h1>
  <h3 style={{fontWeight:"800",color:"#324088"}}>VACANTES</h3>
  <p>Contamos con vacantes desde el nivel de educacion</p>
  <div style={{display:"flex",justifyContent:"center"}}>
    <p style={{fontWeight:"bold"}}>Inicial:</p><p>3,4,5</p>
  </div>
  <div style={{display:"flex",justifyContent:"center"}}>
    <p style={{fontWeight:"bold"}}>Primaria:</p><p>Desde el 1er.Grado hasta el 6to. Grado</p>
  </div>
  <div style={{display:"flex",justifyContent:"center"}}>
    <p style={{fontWeight:"bold"}}>Secundaria:</p><p>Todos los grados</p>
  </div>
  
  <p>Edad cumplida al 31 de marzo</p>
</div>
<div style={{display:"flex",justifyContent:"center"}} >
<hr style={{width:"80%"}} />
</div>


<h2 style={{fontWeight:"800",color:"#324088"}}>COSTOS DEL SERVICIO EDUCATIVO</h2>

<h3 style={{fontWeight:"800",color:"#324088"}}>Cuota de ingreso</h3>
<h5>{"(*)"}  No se realiza cobro de cuota de ingreso {"(*)"} </h5> 

<h4>Matricula y Pensiones</h4>
{"(Indicamos como referencia los costos de matricula al 2024 )"}
<Table responsive="sm" variant="light" style={{color:"black"}}>
        <thead>
          <tr>
            <th rowSpan={2}><div style={{textAlign:"center"}}> Nivel </div></th>
            <th colSpan={3}>2024 {"(PRESENCIAL)"}</th> 
          </tr>
          <tr>
           
            <th>M</th>
            <th>PRESENCIAL / DISTANCIA</th>
            <th>CI</th>
     
          </tr>
        </thead>
        <tbody>
     
          <tr>
            <td>INICIAL</td>
            <td>290</td>
            <td>350 </td>
            <td>NO</td>
          </tr>
          <tr>
            <td>PRIMARIA</td>
            <td>330</td>
            <td>450 </td>
            <td>NO</td>
          </tr>
          <tr>
            <td>SECUNDARIA</td>
            <td>350</td>
            <td>480 </td>
            <td>NO</td>
          </tr>
        </tbody>
      </Table>

      <h4>LEYENDA : M = MATRÍCULA     / P= PENSIÓN       / CI =CUOTA INGRESO 
</h4>
</div>
<div style={{display:"flex",justifyContent:"center"}} >
<hr style={{width:"80%"}} />
</div>
<div className="requisitos_admision">

<div className='cabecera'>
  <h4>Proceso de admision 2024</h4>
  <h4> Nivel de educacion Inicial - Primaria y Secundaria</h4>
  <h4>Documentos a presentar </h4>
</div>

<div className="cuerpo">
<div className="componentes">
  <h5>DEL POSTULANTE</h5>
  <ul>
    <li>Copia simple de la libre o constancia de logro de aprendizaje del estudiante año 2023</li>
    <li>Constancia de no adeudo de la Institucion educatica de procedencia</li>
    <li>Certificado de estudios fisico o digital que corresponde a la  Institucion educativa procedencia</li>
    <li>Constancia de matricula SIAGIE 2024 de la institucion educativa o colegio anterior</li>
    <li>Constancia y recomendaciones de salud en caso de enfermendad preexistente.{"(Todos estudiantes)"}</li>
  </ul>
</div>
<div className="componentes">
  <h5>DEL PADRE DE FAMILIA </h5>
<ul>
  <li>Copia simple del DNI del estudiante y padres apoderados </li>
  <li>Captura de pantalla o foto del voucher de pago de matricula {"(Con N° Operacion completa )"}</li>
  <li>Copia Resolucion judicial en caso de tenencia que acredite tal derecho</li>
  <li>Copia Declaracion jurada legalizada notarial {"en original "} en caso el menor cuente con apodera legal</li>
  <li>Copia de carne del seguro y/o certificado de cobertura seguro salud privado de su menor hijo y consignar telefono de la aseguradora</li>
</ul>

</div>
<div className="componentes">
  <h5>PASOS DE INGRESO</h5>
<div>
  <h6>Proceso de admision y matricula  2024 para estudiantes nuevos </h6>
  <ul>
  <li><p>PASO 1 :</p> <p>Juntar la documentacion a presentar del postulante y del padre de familia</p></li>
  <li><p>PASO 2 :</p> <p>Enviar la documentacion al formulario o enviar un correo admision@circuloa1school.org {"(Tambien esta la opcion de dirigirse presencialmente a la institucion educativa)"}</p></li>
  <li><p>PASO 3 :</p> <p>Esperar respuesta de confirmacion </p></li>
  <li><p>PASO 4 :</p> <p>Dirigirse presencialmente a la institucion educativa</p></li>
  <li><p>PASO 5 :</p> <p>Entrevista psicopedagogica a padres y estudiantes</p></li>
    <li><p>PASO 6 : </p>
    <p> firma de la  ficha del estudiante y del contrato por parte de los padres de familia para la matricula   </p></li>
    <li><p>PASO 7 :</p>
    <p>Realizar el formulario de matricula 2024 en la plataforma de la institucion </p></li>
  </ul>
</div>
</div>
</div>
</div>
<div style={{display:"flex",justifyContent:"center"}} >
<hr style={{width:"80%"}} />
</div>

<div>
  <h4 style={{fontWeight:"800",textAlign:"center",color:"#324088"}}>Proceso de Ratificacion de matricula para
  los estudiantes pertenecientes al periodo 2024</h4>

<ul style={{textAlign:"justify",paddingLeft:"3rem",paddingRight:"2rem"}}>
  <li>
    <p style={{display:"inline",fontWeight:"800"}}>PASO 1 :</p>
    <p style={{display:"inline"}}>Dirigirse presencialmente a la institucion educativa</p>
  </li>
  <li>
    <p style={{display:"inline",fontWeight:"800"}}>PASO 2 :</p>
    <p style={{display:"inline"}}>firma de la  ficha del estudiante y del contrato por parte de los padres de familia para la matricula</p>
  </li>
  <li>
    <p style={{display:"inline",fontWeight:"800"}}>PASO 3 :</p>
    <p style={{display:"inline"}}>Realizar el formulario de matricula 2024 en la plataforma de la institucion </p>
  </li>

</ul>

</div>






        </div> 
      )}
      <Suelo/>
    </Fragment>
  )
}

export default Page_admision;
