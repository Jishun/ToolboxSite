import common from './common'
import home from './home'

import { combineReducers } from 'redux'
import { routerStateReducer} from 'redux-router';

const rootReducer = combineReducers({
  routerStateReducer,
  common,
  home
})

export default rootReducer
