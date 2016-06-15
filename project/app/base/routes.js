import Encoding from '../containers/Encoding'
import SqlCopy from '../containers/SqlCopy'
import DataTools from '../containers/DataTools'
import Home from '../containers/home'
import App from './container'

import React from 'react'
import {Route, IndexRoute} from 'react-router'

const routes = (<Route path='/' component={App}>
        <IndexRoute component={Home}/>
        <Route name="Home" path="/home" component={Home}/>
        <Route name="DataTools" path="/sqlcopy" component={DataTools}>
          <IndexRoute component={SqlCopy}/>
          <Route name="Sql small data copy" path="/sqlcopy" component={SqlCopy}/>
        </Route>
        <Route name="Encoding&decoding" path="/encoding" component={Encoding}/>
    </Route>);

export default routes
