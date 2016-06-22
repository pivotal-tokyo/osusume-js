import {hashHistory} from "react-router"
import fetch from "isomorphic-fetch"
import {authorizationConfig} from './Authorization'
import * as types from '../constants/ActionTypes'

function receiveUser(json) {
  return {
    type: types.LOGIN_SUCCESS,
    user: json
  }
}

function logoutComplete() {
  return {
    type: types.LOGOUT_SUCCESS
  }
}

export function login(email, password) {
  let config = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({email: email, password: password})
  }

  return dispatch => {
    return fetch(`${process.env.API_SERVER}/session`, config)
      .then(response => response.json())
      .then((json) => {
        dispatch(receiveUser(json))
      })
  }
}

export function logout() {
  return function(dispatch, getState) {
    return dispatch(logoutWithCurrentUser(getState().currentUser))
  }
}

function logoutWithCurrentUser(currentUser) {
  let config = Object.assign({}, authorizationConfig(currentUser),
    {
      method: 'DELETE',
      body: JSON.stringify({token: currentUser.get('token')})
    }
  )

  return dispatch => {
    return fetch(`${process.env.API_SERVER}/session`, config)
      .then(response => {
        dispatch(logoutComplete())
      })
  }
}
