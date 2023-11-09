import { Fragment, useEffect, useState } from 'react'
import Loading from '../../ControladorPage/Loading'
import  Cabecera  from '../Complemets/Cabecera'
import { Suelo } from '../Complemets/Suelo'
import banner from "../Nosotros/banner-nosotros.png"

const Admision_page = () => {
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
      <Cabecera  />
      {loading ? (
        <Loading />
      ) : (
        <div>
        <div className="fotoNosotros">
    <div className="fondobanner"><img src={banner}></img>  <div className="linea"></div><p>Admision</p></div>
</div>

<div style={{textAlign:"center"}}> 
<h3>INFORMACION GENERALss</h3>

</div>

          
          
     
        </div> 
      )}
      <Suelo/>
    </Fragment>
  )
}

export default Admision_page
