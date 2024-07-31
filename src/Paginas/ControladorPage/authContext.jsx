import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import PropTypes from 'prop-types'
import setAuchToken from '../Paginas_Login_panel/ConfigurationAuthenticacion/setAuchToken'
import { setCurrentUser } from '../Paginas_Login_panel/Paginas/FormularioLogin'
import store from '../Paginas_Login_panel/ConfigurationAuthenticacion/store'
import { Navigate, useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { Service } from '../Paginas_Login_panel/Paginas/pagesLogin/Service'
import { updateTimeRemaining } from '../Paginas_Login_panel/ConfigurationAuthenticacion/types'



export const checkToken= () => dispatch => {
  if (localStorage.jwtToken) {
    setAuchToken(localStorage.jwtToken)
    const decoded = jwt_decode(localStorage.jwtToken)

    dispatch(
      setCurrentUser({
        user: decoded,
        loggedIn: true
      })
    )
    var dateConvert = new Date(decoded.exp * 1000);
    var horaToken = dateConvert.getHours()
    var minutoToken = dateConvert.getMinutes()
    var segundoToken = dateConvert.getSeconds()
    console.log(" hora : "+ horaToken + " minuto : "+ minutoToken + "  segundo : "+ segundoToken)
    const currentTime = Math.floor(Date.now() / 1000)
  const navigate = useNavigate()

    if (decoded.exp < currentTime) {
      console.log(decoded.exp)
      dispatch(logout())
  
      setTimeout(() => {
        navigate('/Login');
      }, 2000);

    }
  }
}

export const logout = () => dispatch => {

  localStorage.removeItem('jwtToken')
  localStorage.removeItem('jwtToken-Refresh')

  dispatch(
    setCurrentUser({
      user: {},
      loggedIn: false
    })
  )
  console.log('salir logout')
  setAuchToken(false)
  
}

export const reloadToken = () => async (dispatch)=> {
  try {
  let data = await Service.refresToken()
 let response = data.data
 console.log(response)
if(data.status === 200){
console.log(response)
  localStorage.setItem('jwtToken','Bearer '+response.data["token"])
  localStorage.setItem('jwtToken-Refresh', response ? 'Bearer '+response.data['refrest_token'] : '')
  setAuchToken('Bearer '+response.data["token"])
  const decoded = jwt_decode('Bearer '+response.data["token"])
  dispatch(updateTimeRemaining(0));
  dispatch(setCurrentUser({ user: decoded, loggedIn: true }))
}else{

 dispatch(logout())}


} catch (error) {
  console.error("Error recargando el token: ", error);
  // Despachar la acción para cerrar sesión en caso de error
  dispatch(logout());
}
}