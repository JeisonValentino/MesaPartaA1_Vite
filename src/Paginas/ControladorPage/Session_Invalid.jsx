
import { Link } from "react-router-dom"

function Session_Invalid (){

    return(
        <div>

<h1> usted no se encuentra logeado regrese  a la pagina del login </h1>
<Link to="/Login"  style={{textDecoration:"none"}}>   <div className="con">CIRCULO A1 SCHOOL LOGIN </div></Link>
        </div>
    )

} 
export default Session_Invalid;