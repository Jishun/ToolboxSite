import React from 'react'
import {Route, IndexRoute} from 'react-router'

import Encoding from '../containers/Encoding'
import External from '../containers/External'
import DataTools from '../containers/DataTools'
import Home from '../containers/home'
import App from './container'

import SqlCopy from '../features/SqlCopy'
import MarkdownEditor from '../features/MarkdownEditor'
import Encode from '../features/Encode'


const routes = (<Route path='/' component={App}>
        <IndexRoute component={Home}/>
        <Route name="Home" path="/home" component={Home}/>
        <Route name="DataTools" path="/sqlcopy" component={DataTools}>
          <IndexRoute component={SqlCopy}/>
          <Route name="SqlDataCopy" path="/sqlcopy" component={SqlCopy}/>
        </Route>
        <Route name="Encoding" path="/encode" component={Encoding}>
          <IndexRoute component={Encode}/>
          <Route name="TextEncode" path="/encode" component={Encode}/>
          <Route name="Markdown" path="/markdown" component={MarkdownEditor}/>
        </Route>
        <Route name="External" path="/external" component={External}/>
    </Route>);

export default routes
