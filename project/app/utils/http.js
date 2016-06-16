import fetch from 'isomorphic-fetch'
import {LOADING, LOADED} from '../utils/mReact'

const http = {
  get(url, action, isJson = true){
    return (dispatch,state) => {
      dispatch({type: LOADING})
      fetch(url).then((response) => {
          if (response.status >= 400) {
            throw new Error("Bad response from server");
          }
          return isJson ? response.json() : response.text();
        }).then(data => {
          dispatchCallback(dispatch, action, data);
        })
    }
  },
  post(url, data, action, isJson = true){
    return (dispatch,state) => {
      dispatch({type: LOADING})
      fetch(url, {
          method: 'post',
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          },
          body: data
        }).then((response) => {
            if (response.status >= 400) {
              throw new Error("Bad response from server");
            }
            return isJson ? response.json() : response.text();
        }).then(data => {
          dispatchCallback(dispatch, action, data);
        })
    }
  }
}

function dispatchCallback(dispatch, action, payload){
  dispatch({type: LOADED})
  if (action) {
      if (typeof(action) == 'string') {
        dispatch({type: action, payload})
      }else if(typeof(action) == 'function'){
        dispatch(action(payload));
      }else {
        dispatch(action);
      }
  }
}

export default http
