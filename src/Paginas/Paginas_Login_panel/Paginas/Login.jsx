import  FormularioLogin  from "./FormularioLogin.jsx";
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

let [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)


let [user, setUser] = useState(()=> localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)

export const loginUser = (userData)=>{

    let response =  axios.post('http://127.0.0.1:8000/api/token/',userData, {
        headers:{
            'Content-Type':'application/json'
        },
       
    })

    let data =  response.json()

    if(response.status === 200){
        setAuthTokens(data)
        setUser(jwt_decode(data.access))
        localStorage.setItem('authTokens', JSON.stringify(data))

       
    }else{
        alert('Something went wrong!')
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
