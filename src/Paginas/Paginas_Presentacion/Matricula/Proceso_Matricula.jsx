import { Fragment, useEffect, useState } from 'react'
import Loading from '../../ControladorPage/Loading'
import  Cabecera  from '../Complemets/Cabecera'
import { Suelo } from '../Complemets/Suelo'
import banner from "../Nosotros/banner-nosotros.png"

const Proceso_Matricula = () => {
  const [loading, setLoading] = useState(false)

  const cambiarEstado = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }

  useEffect(() => {
    return cambiarEstado()
  }, [])

  return (
    <Fragment>
    
      {loading ? (
        <Loading />
      ) : (
        <div>
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



<div> 
<div><img src=""  /></div>
<div>

</div>
</div>

          
          
     
        </div> 
      )}
      
    </Fragment>
  )
}

export default Proceso_Matricula
