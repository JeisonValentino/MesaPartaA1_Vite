import  FormularioLogin  from "./FormularioLogin.jsx";
import setAuchToken from "../ConfigurationAuthenticacion/setAuchToken";
import store from '../ConfigurationAuthenticacion/store';
import {SET_CURRENT_USER }from '../ConfigurationAuthenticacion/types';

import axios from 'axios';
import jwt_decode from "jwt-decode";



export const loginUser = (userData)=> dispatch=>{
    return new Promise((resolve,reject)=>{
        console.log(userData)
       axios.post('http://localhost:8080/users/login', userData, {
  
        headers:{'Accept':'application/json','Content-type':'application/json'}
       }).then(response => {
           const{authorization,userId}=response.headers;
  
        
  
  
  
  
           localStorage.setItem('jwtToken',authorization);
           setAuchToken(authorization);
            const decoded= jwt_decode (authorization);
           
            dispatch(setCurrentUser({user:decoded,loggedIn:true}))
  
  
            
           
  resolve(response)      
  
  }).catch(error =>{
  
    
    console.log(error)
        reject(error);
       })
    });
  }


  export const  checkToken =() => {
          
    if(localStorage.jwtToken){
    setAuchToken(localStorage.jwtToken);
    const decoded=jwt_decode (localStorage.jwtToken);
    
        store.dispatch(setCurrentUser({

        user:decoded,loggedIn:true

  
    }));
    const currentTime=Math.floor(Date.now()/1000);
    if(decoded.exp < currentTime){
        store.dispatch(logoutUser());
        window.location.href="/Login";
    }

    }
   
    }

export const Login = () =>  {




    

      const IngresarLogintodo = ingresar => {
        console.log(ingresar)
         
                loginUser(ingresar);
    
      }
    
      
      
  


return (
    
    <div style={{   margin:"0" , padding:"0" , border:"0" ,height:"100%",width:"100%"}}> 

 <div className="formaLogin"><div className="fotoFondo"></div>
<div   >
<FormularioLogin IngresarLogintodo={IngresarLogintodo} /></div> </div>

</div>
)

}


export const logoutUser=() => dispatch=> {
    localStorage.removeItem('jwtToken')
    setAuchToken(false);
    
    dispatch(setCurrentUser({
    
        user:{},loggedIn:false
    }));
    
            }
  
  export const setCurrentUser=({user , loggedIn}) =>{
    return {  
        type:SET_CURRENT_USER,
        payload:{user,loggedIn}
      
    };
   
        }