
export const ERROR = 'ERROR'
export const INFO = 'INFO'
export const SUCCESS = 'SUCCESS'
export const WARNING = 'WARNING'
export const CLEAR_MESSAGE = 'CLEAR_MESSAGE'

export function warning(dispatch, message, actionType = WARNING){
  return dispatchMessage(dispatch, message, actionType)
}

export function success(dispatch, message, actionType = SUCCESS){
  return dispatchMessage(dispatch, message, actionType)
}

export function error(dispatch, message, actionType = ERROR){
  return dispatchMessage(dispatch, message, actionType)
}

export function info(dispatch, message, actionType = INFO){
  return dispatchMessage(dispatch, message, actionType)
}

function dispatchMessage(dispatch, message, actionType){
    return dispatch({type: actionType, payload: message})
}
