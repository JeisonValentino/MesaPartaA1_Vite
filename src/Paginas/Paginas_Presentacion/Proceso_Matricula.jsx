import { Fragment, useEffect, useState } from 'react'
import Loading from '../ControladorPage/Loading'
import  Cabecera  from './Complemets/Cabecera'
import { Suelo } from './Complemets/Suelo'
import AlumnosClase from './Imagenes/AlumnosClase.jpeg'
import './Proceso_Matricula.css'
const Proceso_Matricula = () => {
  const [loading, setLoading] = useState(false)
const [bajarEvento,setBajarEvento]=useState(false)
  const cambiarEstado = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }

  useEffect(() => {
    return cambiarEstado()
  }, [])


 const  bajarEventoEvaluacion=(v1)=>{


    setBajarEvento(v1);
  }


  const [ElevarEvento,setElevarEvento]=useState(true);
  const MostrarEvento=(v1)=>{
      setElevarEvento(v1)
  }


console.log(bajarEvento)

  return (
    <Fragment>
      <Cabecera bajarEventoEvaluacion={bajarEventoEvaluacion} MostrarEvento={MostrarEvento} />
      {loading ? (
        <Loading />
      ) : (


        <div>
        {bajarEvento ?(<> </>):(<>

        {ElevarEvento ? (<>
          <div className='main_Proceso_Matricula'>
            <div className='parrafo1_Proceso_Matricula'>
              PROCESO DE MATRÍCULA
            </div>
            <hr className='small'></hr>
            <div className='contenedor_Proceso_Matricula'>
        
              <div id='parrafo1_Proceso_Matricula'>
                <p style={{ textAlign: 'justify' }}>
                  El proceso de matrícula de todos nuestros alumnos es sumamente
                  importante, por tal motivo, ponemos a su disposición todos los
                  requisitos que establece el MINEDU para hacer efectiva la
                  matrícula.
                </p>

                <p>Requisitos del estudiante:</p>
                <p>
                  El estudiante debe cumplir con la edad mínima requerida según
                  sea el caso, de acuerdo con las disposiciones del Ministerio
                  de Educación, según detalle:
                </p>
                <ul>
                  <li>
                    INICIAL DE 4 AÑOS: Cumplir 4 años hasta el 31 de marzo de
                    2018.
                  </li>
                  <li>
                    INICIAL DE 5 AÑOS: Cumplir 5 años hasta el 31 de marzo de
                    2018.
                  </li>
                  <li>
                    1er GRADO: Cumplir 6 años hasta el 31 de marzo de 2018.
                  </li>
                </ul>

                
              </div>
              
              <div id="parrafo2_Proceso_Matricula"><img style={{with:"100%", height:"100%"}} src={AlumnosClase}></img></div>
            </div>
            <div id="parrafo3_Proceso_Matricula">

            <div>
              <p style={{ textAlign: 'justify' }}>
                  Asimismo, deberá presentar la siguiente documentación del
                  postulante en un folder manila:
                </p>
             
              <ul>
                <li>
                  Copia simple de la partida de nacimiento y copia simple del
                  DNI.
                </li>
                <li>
                  Copia simple de la libreta o Boleta de notas del niño(a) del
                  año 2017.
                </li>
                <li>
                  Fotos tamaño carné (2) (con nombres y apellidos escritos en la
                  parte posterior).
                </li>
                <li>
                  Constancia de no adeudo a I.E. procedencia (solo nuevos).
                </li>
                <li>Acta de Compromiso del PP.FF. 2018.</li>
                <li>Llenar Ficha Informativa del alumno (a) 2018.</li>
                <li>
                  Certificado de estudios visado por UGEL que corresponde a I.E.
                  de procedencia (solo nuevos).
                </li>
                <li>
                  Constancia de matrícula año 2017 de I.E. de procedencia.
                </li>
                <li>Evaluación o informe psicológico (solo nuevos) .</li>
                <li>
                  Certificado o constancia y recomendaciones de salud en caso de
                  enfermedad pre existente.
                </li>
              </ul>
              </div>
              <div className="div">
              <p> Requisitos de los padres del estudiante:</p>

              <ul>
                <li>Copia simple del DNI de ambos padres.</li>
                <li>
                  Si se cuenta con apoderado legal, éste deberá presentar una
                  carta notarial en original que lo identifica como tal y copia
                  simple de su DNI.
                </li>
                <li>
                  Si su menor hijo tiene seguro, informar. Traer copia de carné
                  del seguro, copia de certificado de la cobertura, además,
                  colocar el teléfono de la aseguradora.
                </li>
                <li>
                  En caso de tenencia judicial presentar un documento que
                  acredite tal derecho.
                </li>
              </ul></div>
              </div> 
          </div>

          <Suelo/>
          
          </>):(<></>)}
           </>)}
        </div> 
      )}
    </Fragment>
  )
}

export default Proceso_Matricula
