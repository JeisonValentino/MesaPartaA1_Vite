import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import PropTypes from 'prop-types'
import setAuchToken from "../Paginas_Login_panel/ConfigurationAuthenticacion/setAuchToken";
import { setCurrentUser } from "../Paginas_Login_panel/Paginas/FormularioLogin";
import store from "../Paginas_Login_panel/ConfigurationAuthenticacion/store";
import { Navigate, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useSelector } from 'react-redux';





export const  checkToken2 =() => {

  

    if(localStorage.jwtToken){
    setAuchToken(localStorage.jwtToken);
    const decoded=jwt_decode (localStorage.jwtToken);
    
        store.dispatch(setCurrentUser({

        user:decoded,loggedIn:true

       
    }));
    
    const currentTime=Math.floor(Date.now()/1000);
    if(decoded.exp < currentTime){
        


       
        store.dispatch(logout());
          
        
      
        
    }

    }
   
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
        


       
        store.dispatch(logout());
          
        window.location.href="/Login";
      
        
    }

    }
   
    }

    export const logout =() =>dispatch=>{
        localStorage.removeItem("jwtToken")
        localStorage.removeItem("jwtToken-Refresh")
        
        dispatch(setCurrentUser({
        
            user:{},loggedIn:false
        }));
        console.log("salir logout")
    setAuchToken(false);
 
    }