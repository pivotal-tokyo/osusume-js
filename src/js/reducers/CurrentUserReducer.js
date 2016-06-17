import * as types from '../constants/ActionTypes';

export function currentUser(state, action) {
  if (state == undefined) {
    state = JSON.parse(localStorage.getItem('user'))
  }
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return {token: action.user.token, name: action.user.name, id: action.user.id}
    case types.LOGOUT_SUCCESS:
      return null
    default:
      return state
  }
}
