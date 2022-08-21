import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFileCircleCheck,
  faMagnifyingGlass
} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
export const MesaPartes = () => {


    const styles = {
        hoverStyle: {
          color: 'rgba(47, 0, 255,0.6)',
          '&:hover': { color: 'white' },textDecoration:"none"
        }
      };

  return (
    <div className='todo'>
      <div className='MesaPartes cuerpo'>
        <div className='cabecera'></div>
        <div className='contenido'>
        <div className=' cabecera2'> <p>INICIA TU SOLICITUD AQUI. </p> 
        <p style={{fontSize:"20px" ,fontWeight:"100"}}>Selecciona una opción:


</p>
        </div>
          <div
            className='carta subCarta'
            style={{ marginRight: '20%', marginLeft: '10%' }}
          >
           <Link className='subCarta' style={styles.hoverStyle} to='/MesaPartes/Formulario'><div style={{width:"100%",height:"100%",padding:"2%" ,textDecoration:"none"}}>
           <FontAwesomeIcon style={{width:"100px" ,height:"150px"}} icon={faFileCircleCheck}/>
           
           <div>REALIZA TU SOLICITUD </div></div> </Link>
          </div>
          <div className='carta'><Link style={{textDecoration:"none"}} to='/MesaPartes/Busqueda-Solicitud'  ><div  style={{width:"100%",height:"100%",padding:"2%" ,textDecoration:"none"}}><FontAwesomeIcon  style={{width:"100px" ,height:"150px"}} icon={faMagnifyingGlass}/>  <div >BUSCA TU SOLICITUD</div></div> </Link></div>
          <div className='pie-carta'>
            {' '}
            En cumplimiento de lo dispuesto por la Ley N° 29733, Ley de Protección de Datos Personales, le informamos que los datos personales que usted nos proporcione serán utilizados y/o tratados por el centro educativo (por sí mismo o a través de terceros), estricta y únicamente para la atención de las solicitudes de los servicios prestados por nuestra institución, pudiendo ser incorporados en un banco de datos personales de titularidad del Circulo a1 school . Se informa que Circulo a1 school podría compartir y/o usar y /o almacenar y/o transferir dicha información a terceras personas, estrictamente con el objeto de realizar las actividades antes mencionadas. Usted podrá ejercer sus derechos de información, acceso, rectificación, cancelación y oposición de sus datos personales, en cualquier momento, a través de las mesas de partes del centro educativo .
          </div>
        </div>
        <div className='pie'></div>
      </div>
    </div>
  )
}
