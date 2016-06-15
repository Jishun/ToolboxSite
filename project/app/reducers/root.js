import common from './common'

import { combineReducers } from 'redux'
import { routerStateReducer} from 'redux-router';

const rootReducer = combineReducers({
  routerStateReducer,
  common
})

export default rootReducer
