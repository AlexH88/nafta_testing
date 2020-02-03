import {AUTH_LOGOUT, AUTH_SUCCESS} from '../actions/actionTypes';

const initialState = {
  token: null,
  login: '',
  name: '',
  surname: '',
  role: '',
}


export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state, token: action.token, login: action.login, name: action.name, surname: action.surname, role: action.role
      }
    case AUTH_LOGOUT:
      return {
        ...state, token: null
      }
    default:
      return state
  }
}