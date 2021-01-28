import routes from './base/routes'
import rootReducer from './reducers/root'
import React from 'react'
import Router from 'react-router'
import { render } from 'react-dom'
import { Provider, connect } from 'react-redux'
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools';
import {reduxReactRouter, ReduxRouter, pushState} from 'redux-router';
//import createHistory from 'history/lib/createBrowserHistory';
import { createHashHistory } from 'history'
import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'

import {initValidationSettings} from './base/validation'

import './css/bootstrap.min.css'
import './css/site.css'

initValidationSettings();

const initialState = {};

const middleware = applyMiddleware(thunk, createLogger());
let createHistory = createHashHistory;
let createStoreWithMiddleware = compose(
     middleware
     ,reduxReactRouter({routes, createHistory})
   );
const store = createStoreWithMiddleware(createStore)(rootReducer, initialState);

render((<Provider store={store}>
            <Router>{routes}</Router>
          </Provider>),
  document.getElementById('app_host')
);
