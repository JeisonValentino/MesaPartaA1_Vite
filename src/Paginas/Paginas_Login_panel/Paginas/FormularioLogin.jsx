import { Fragment ,useEffect,useRef,useState} from "react"
import PropTypes from 'prop-types';
import { loginUser } from "./Login";
import { useDispatch, useSelector } from "react-redux";
import { isObjEmpty } from "../ConfigurationAuthenticacion/helpers/helpers";
import { useNavigate } from "react-router-dom";
import { Toast } from 'primereact/toast';
 const  FormularioLogin = ({IngresarLogintodo}) => {
const dispatch=useDispatch();
    const [ingresar, setIngresar]=useState({correo:'',contraseña:''});
    const toast = useRef(null);
    const toast2 = useRef(null);
    const ingresarStado = e =>{
    
        setIngresar({...ingresar,[e.target.name]: e.target.value })
    }
    const {correo,contraseña}=ingresar;
    const [ errors, actualizarError ] = useState({})
    const navegate = useNavigate();
    const loggedIn=useSelector(state =>state.auth.loggedIn);
    const showSuccess = () => {
        toast.current.show({severity:'info', summary: 'El correo no puede estar vacios ', detail:'Message Content', life: 2000});
    }

    const showSuccess2 = () => {
        toast2.current.show({severity:'info', summary: 'la contraseña no puede estar vacio ', detail:'Message Content', life: 2000});
    }
    
    
    const showSuccess3 = (a) => {
        toast.current.show({severity:'error', summary:"Error : Tus credenciales estan incorrectas ", detail:'Message Content', life: 3000});
    }
useEffect(()=>{
    if(loggedIn){
       
        navegate('/Entrada')
      
 }
})
    const sumitLogin = e =>{
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

    if(!isObjEmpty(errors)){
        actualizarError(errors)
       
        
    
        return ;
      
    }

 

    dispatch(loginUser(ingresar)).then(response =>{}).catch(err =>{

        console.log("aqui 3")
        actualizarError({ auth :"no se puede iniciar sesion con esas credenciales"});
        showSuccess3(errors.auth)
   
    });
  
    setIngresar({correo:'',contraseña:''})
    }
  

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
)
} 
FormularioLogin.prototype={
    IngresarLogintodo:PropTypes.func.isRequired
}
export default FormularioLogin;