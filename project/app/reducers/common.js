import {LOADING, LOADED} from '../utils/mReact'
import {ERROR, INFO, SUCCESS, WARNING, CLEAR_MESSAGE} from '../actions/common'
export default function common(state = {loading : false, message: {}}, action){
  switch (action.type) {
    case LOADING:
      return Object.assign({}, state, {loading: true});
    case LOADED:
      return Object.assign({}, state, {loading: false, payload: state.payload});
    case ERROR:
      return Object.assign({}, state, {message:{ level: 'error', text: action.payload}});
    case INFO:
      return Object.assign({}, state, {message:{ level: 'info', text: action.payload}});
    case SUCCESS:
      return Object.assign({}, state, {message:{ level: 'success', text: action.payload}});
    case WARNING:
      return Object.assign({}, state, {message:{ level: 'warning', text: action.payload}});
    case CLEAR_MESSAGE:
      return Object.assign({}, state, {message:{}});
    default:
      return state;
  }
}
