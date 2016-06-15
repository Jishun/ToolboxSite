import {error, success} from './common'
import {pushState} from 'redux-router';

export const USER_LOGGEDIN = 'USER_LOGGEDIN'

export function logoutAsync(){
  return (dispatch, state) => {
    firebase.unauth();
    dispatch({type:LOGGED_OUT})
    dispatch(pushState(null, '/login'))
  }
}
