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

export const checkToken2 = () => {
  if (localStorage.jwtToken) {
    setAuchToken(localStorage.jwtToken)
    const decoded = jwt_decode(localStorage.jwtToken)

    store.dispatch(
      setCurrentUser({
        user: decoded,
        loggedIn: true
      })
    )

    const currentTime = Math.floor(Date.now() / 1000)
    if (decoded.exp < currentTime) {
      store.dispatch(logout())
    }
  }
}

export const checkToken = () => {
  if (localStorage.jwtToken) {
    setAuchToken(localStorage.jwtToken)
    const decoded = jwt_decode(localStorage.jwtToken)

    store.dispatch(
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

    if (decoded.exp < currentTime) {
      console.log(decoded.exp)
      store.dispatch(logout())
  
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

export const reloadToken =async () => {
  let data = await Service.refresToken()
 let response = data.data
 console.log(response)
if(data.status === 200){

  localStorage.setItem('jwtToken','Bearer '+response["access_token"])
  localStorage.setItem('jwtToken-Refresh', response ? 'Bearer '+response['refrest_Token'] : '')
  setAuchToken('Bearer '+response["access_token"])
  const decoded = jwt_decode('Bearer '+response["access_token"])

  store.dispatch(setCurrentUser({ user: decoded, loggedIn: true }))
}else{

  store.dispatch(logout())}}