import {RECEIVED_README} from '../actions/home'

export default function home(state = {readme : ''}, action){
  switch (action.type) {
    case RECEIVED_README:
      return Object.assign({}, state, {readme: action.payload});
    default:
      return state;
  }
}
