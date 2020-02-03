import axios from 'axios'
import {AUTH_LOGOUT, AUTH_SUCCESS} from './actionTypes';

export function auth(login, password, isLogin) {
  return async dispatch => {
    const authData = {
      login, password
    }

    let url = 'http://localhost:3001/api/signin'

    const response = await axios.post(url, authData)
    const data = response.data

    const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000)

    localStorage.setItem('token', data.token)
    localStorage.setItem('userId', data._id)
    localStorage.setItem('name', data.name)
    localStorage.setItem('surname', data.surname)
    localStorage.setItem('login', data.login)
    localStorage.setItem('role', data.role)
    localStorage.setItem('expirationDate', expirationDate)

    dispatch(authSuccess(data.token, data.name, data.surname, data.login, data.role))
    dispatch(autoLogout(data.expiresIn))
  }
}

export function registration(user){
  return async dispatch => {
    let url = 'http://localhost:3001/api/signup'
    const response = await axios.post(url, user)

    if(response.status === 200) {
      dispatch(auth(user.login, user.password, true))
    }

  }
}

export function autoLogout(time) {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout())
    }, time * 1000)
  }
}

export function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  localStorage.removeItem('expirationDate')
  localStorage.removeItem('name')
  localStorage.removeItem('surname')
  localStorage.removeItem('login')
  localStorage.removeItem('role')
  return {
    type: AUTH_LOGOUT
  }
}


export function autoLogin() {
  return dispatch => {
    const token = localStorage.getItem('token')
    const name = localStorage.getItem('name')
    const surname = localStorage.getItem('surname')
    const login = localStorage.getItem('login')
    const role = localStorage.getItem('role')

    if (!token) {
      dispatch(logout())
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'))
      if (expirationDate <= new Date()) {
        dispatch(logout())
      } else {
        dispatch(authSuccess(token, name, surname, login, role))
        dispatch(autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000))
      }
    }
  }
}

export function authSuccess(token, name, surname, login, role) {
  return {
    type: AUTH_SUCCESS,
    token,
    name,
    surname,
    login,
    role
  }
}