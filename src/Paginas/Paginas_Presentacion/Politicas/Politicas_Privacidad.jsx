import { Fragment } from "react";
import Loading from "../../ControladorPage/Loading";
import  Cabecera  from "../Complemets/Cabecera";
import { Suelo } from "../Complemets/Suelo";
import { useState } from "react";
import { useEffect } from "react";
import banner from "../Nosotros/banner-nosotros.png";
export default function Politicas_Privacidad (){

    
 const [loading ,setLoading]=useState(false);

 const cambiarEstado=()=>{
    setLoading(true);
    setTimeout(()=>{

        setLoading(false);
    },0)
}

useEffect(()=>{
    return cambiarEstado()
}, [])

    return (<Fragment>
<Cabecera  />
<div className="fotoNosotros">
            <div className="fondobanner">
              <img src={banner}></img> 
              <div className="fondo_container_banner">
                  <div  className="linea"></div>
                  <div >
                      <p>Politicas de Privacidad</p>
                  </div>
              </div>
            </div>
          </div>
<div style={{padding:"5rem"}}>
    <div>
        <h5 style={{fontWeight:"bold"}}>INTRODUCCION</h5>
        <p>La presente Politica de proteccion de Datos Personales Circulo A1 School , describe el tratamiento que nuestra institucion (en adelante CIRCULO A1 SCHOOL ) brinda a los datos personales que recopila de los usuarios en su portal web.Dicha politica se ajusta a las disposiciones contenidas en la Ley de Proyeccion de Datos personales , Ley N° 29733 , su reglamento y normas complementarias , adoptando para ello las medidas tecnicasy organizativas necesarias para evitar la perdida , mal uso, alteracion ,acceso no autorizado y robo de datos personales facilitados por los titulados por los titulares de datos personales.</p>
    </div>
    <div>
        <h5 style={{fontWeight:"bold"}}>DEFINICIONES</h5>
        <p>De acuerdo con la Ley N° 29733 - Ley de proteccion de Datos Personales y su Reglamento , aprobado por el Decreto Supremo N° 003-2013-JUS , se define lo siguiente :</p>
    <ul>
        <li>
            <p>{"a)"} Datos personales : toda informacion sobre una persona natural que la identifica o hace identificable o hace identificale a traves de medios que puedas ser razonablesmente utilizados </p>
        </li>
        <li>
            <p>{"b)"} Tratamiento de datos personales: cualquier operacion o procedimiento tecnico , automatizado o no , que permite la recopilacion , comunicacion por trasferencia o por difusion o cualquier otra forma de procesamiento que facilite el acceso , correlacion o interconexion de los datos personales.</p>
        </li>
    </ul>
    </div>
    <div>
        <h5 style={{fontWeight:"bold"}}>CONSENTIMIENTO DEL USUARIO</h5>
        <p>Circulo A1 School se obliga a que de los datos personales obtenidos a traves de formularios del portal web , cuenten previamente con el consentimiento expreso del titular para recopilar su informacion , los cuales seran tratados unica y especificamente para la finaldiad solicitada . </p>
    </div>
    <div>
        <h5 style={{fontWeight:"bold"}}>TRATAMIENTOS DE DATOS PERSONALES</h5>
        <p>Los datos personales facilitados por el Usuario se almacenaran en los bancos de datos que forman parte del sistema de informacion de Circulo A1 School y seran tratados para poder llevar a cabo sus finalidades.</p>
        <p>Circulo A1 School no empleara los datos personales del Usuario para ninguna finalidad distinta a la que fueron suministrados , a no ser que se trate de una finalidad expresamente permitaida o exigida por la normativa vigente aplicable , por orden judicial o una  autoridad competente</p>
    </div>
    <div>
        <h5 style={{fontWeight:"bold"}}>MEDIDAS DE SEGURIDAD</h5>
        <p>Circulo A1 School se compromete a brindar todas las medidas tecnicas , legales y administrativas necesarias para garantizar la seguridad y confidencialidad de los datos personaels ; los cuales seran tratados considerando los principios de legalidad , consentimiento , proporcionalidad , calidad , seguridad y los demas presentes en al normativa vigente referente a proteccion de datos personales, evitando que estos sean filtrados , difundidos o cualquier accion que ponga en peligro su informacion personal . </p>
    </div>
    <div>
        <h5 style={{fontWeight:"bold"}}>RESPONSABILIDADES</h5>
        <p>Circulo A1 School asume que los datos personales proporcionados por el Usuario deben ser verdaderos , completos , exactos , vigentes y , corresponder a su verdadera identidad.Para cualquier modificacion, el Usuario sera respondable de comunicar inmediatamente a Circulo A1 School </p>
    <p>El Usuario asumira las responsabilidades por los daños y perjuicios , directo o indirecto que genere a Circulo A1 school y/o terceros por incumplir total o parcialmente lo señalado en el punto anterior.EJERCICIO DE LOS DERECHOS DE ACCESO , RECTIFICACION , CANCELACION Y OPOSICION {"(ARCO)"} </p>
    <p>Circulo A1 School debe garantizar la atencion de los derechos protegidos que pueda ejercer el Titular de los Datos Personales para lo cual debera mantener disponibles canales , procedimientos e informacion  para antender las solicitudes en los plazos establecidos por las Normas de Proteccion de Datos Personales.</p>
    <p>El Usuario pordara ejercitar sus derechos de informacion , Acceso, Rectificacion, Cancelacion , Oposicion,  etc . {"(ARCO)"} al uso de sus datos personales , de conformidad con la Ley de Proyeccion de Datos Personales , Ley N° 29733.En ese sentido , el Usuario tiene derecho , entre otros a acceder a su informacion personal, a solicitar la rectificacion de datos inexactos y a revocar su consentimiento para el tratamiento de la misma ; asimismo , podra solicitar la spresion de sus datos u oponerse al tratamiento de los mimos , incluso  cuando estos ya no resulten necesarios para los fines que motivaron su recopilacion</p>
    <p>El ejercicio de estos derechos es gratuito .Para ello , puede dirigirse por correo electronico a datos AtencionCliente@circuloa1school.org  adjuntadno su solicitud y copia del documento de identidad {"(DNI/CE/Pasaporte)"} que acredite su titularidad sobre los datos personales respecto de los cuales ejercera su derecho .Tambien podra hacefrlo en cualquiera de nuestras oficionas ubidadas en el pais .Si utiliza un representante legal, este debera acreditarse como tal.</p>
    <p>La atencion de la solicitud sera efectuada de acuerdo a los plazos previstos en la normatividad de proteccion de datos personales</p>
    </div>
    <div>
        <h5 style={{fontWeight:"bold"}}>CAMBIOS DE POLITICA DE PRIVACIDAD</h5>
        <p>Circulo A1 School se reserva el derecho de modificaar y/o actualizar la presente Politica de Privacidad con fines de mejora , ya sea para adaptarla a futuros cambios que pueda requerir el marco normativo vigente brindar una mejor calidad de servicio o comunicar nuevas alternativas relacionadas a la presente politica .Es responsabilidad del Usuario mantenerse informado sobre los cambio que se introduzcan a esta Politica de Privacidad publicando en este Sitio la version actualizada o modificada de la misma.</p>
    </div>
</div>

{loading ? <Loading/>:<div>

</div>

}

<Suelo/> 
    </Fragment>)
}