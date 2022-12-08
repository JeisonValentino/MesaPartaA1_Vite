import { Fragment ,useEffect,useRef,useState} from "react"
import PropTypes, { func } from 'prop-types';
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { Toast } from 'primereact/toast';
import axios from "axios";

import setAuchToken from "../ConfigurationAuthenticacion/setAuchToken";
import { useDispatch } from "react-redux";
import { SET_CURRENT_USER } from "../ConfigurationAuthenticacion/types";
import { Service } from "./pagesLogin/Service";
 const  FormularioLogin = () => {




const redirect  = useNavigate();
    const [ingresar, setIngresar]=useState({correo:'',contraseña:''});
    const toast = useRef(null);
    const toast2 = useRef(null);
    const ingresarStado = e =>{
    
        setIngresar({...ingresar,[e.target.name]: e.target.value })
    }

    const dispatch=useDispatch();

    const {correo,contraseña}=ingresar;
    const [ errors, actualizarError ] = useState({})
const [validaIp , setValidaIp]=useState(false)

const  valida=async () =>{
    let data = await Service.ping() .then(res=>{return res })
    .catch(e=>console.log(e))
    setValidaIp(data)

}
useEffect(()=>{

     
    valida()
     

},[])

    const showSuccess = () => {
        toast.current.show({severity:'info', summary: 'El correo no puede estar vacios ', detail:'Message Content', life: 2000});
    }

    const showSuccess2 = () => {
        toast2.current.show({severity:'info', summary: 'la contraseña no puede estar vacio ', detail:'Message Content', life: 2000});
    }
    
    
    const showSuccess3 = (a) => {
        toast.current.show({severity:'error', summary:"Error : Tus credenciales estan incorrectas ", detail:'Message Content', life: 3000});
    }

    const sumitLogin = async e =>{
        e.preventDefault();
        const errors={};
        actualizarError(errors)
    if(correo.trim() === '' ){
        showSuccess()
        
        errors.correo="El correo no puede estra vacia "
    }

if( contraseña.trim()===''){
           
    showSuccess2()
    errors.contraseña="la contraseña no puede estra vacia "
}


const {data}= await axios.post(`http://localhost:8080/System/login?correo=${ingresar.correo}&contraseña=${ingresar.contraseña}`,{

    withCredentials:true,
        headers:{'Accept':'application/json','Content-type':'application/json'}
    
    }).catch( response =>{

        actualizarError({ auth :"no se puede iniciar sesion con esas credenciales"});
        showSuccess3(errors.auth)
    })



    console.log(data['access_token']);

    localStorage.setItem("jwtToken",'Bearer '+data['access_token']);
    localStorage.setItem("jwtToken-Refresh",'Bearer '+data['refrest_Token']);

    setAuchToken('Bearer '+data['access_token'])
    const decoded= jwt_decode ('Bearer '+data['access_token']);

    dispatch(setCurrentUser({user:decoded,loggedIn:true}))
   
    redirect("/Sistema-Administrador")

 
    }
  
    if(validaIp){
return(

<Fragment>  <Toast ref={toast} 
 />    <Toast ref={toast2} style={{marginTop:"11%"}}  
 /> 

<form  onSubmit={sumitLogin} >

<div className="mb-3" style={{marginLeft:"5%",width:"100%" ,marginTop:"4%"}}><p style={{alignContent:"center",color:"rgb(0,0,0)",marginLeft:"2%",fontSize:"30px",letterSpacing:"10px"}} className="form-label"  > CIRCULO A1 SCHOOL  </p></div>

<div className="mb-3" style={{margin:"30%" , marginLeft:"10%",  marginTop:"0",width:"80%"}}>
<label className="form-label" style={{color:"rgb(0,0,0)",marginTop:"10%"}}>USUARIO</label>
<input type="text" onChange={ingresarStado} name="correo" className="form-control"  value={correo}/>
</div>
<div className="mb-3" style={{margin:"10%" , marginTop:"5%" , width:"80%"}}>
<label className="form-label" style={{color:"rgb(0,0,0)"}} >CONTRASEÑA</label>
<input type="password" onChange={ingresarStado} name="contraseña"  className="form-control" value={contraseña} />
</div>

<button type="submit" style={{width:"80%",marginLeft:"10%" ,marginBottom:"20px"}} className="btn btn-primary">INGRESAR</button>
</form>

</Fragment>
)}
else{

return(

<>

El servidor de servicios APACHE se cayo por favor contactar con soporte de sistema +926695038

</>


)


}
} 

export default FormularioLogin;


export const setCurrentUser=({user , loggedIn}) =>{
    return {  
        type:SET_CURRENT_USER,
        payload:{user,loggedIn}
    }
    };