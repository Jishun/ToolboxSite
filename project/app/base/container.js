
import {connect } from 'react-redux'
import React,{Component} from 'react'
import {Nav, Navbar, NavItem} from 'react-bootstrap'
import {pushState} from 'redux-router'
import Alert from '../components/alert'
import Loader from 'react-loader-advanced';

@connect((state) => ( {loading: state.common.loading}))
export default class App extends Component {
  constructor(props){
    super(props);
  }

  render () {
    let topRoutes = this.props.route.childRoutes;
    let activeRoute = topRoutes.filter(route => this.props.history.isActive(route.path))[0]
    return (<div>
        <Navbar>
         <Navbar.Header>
           <Navbar.Brand><a href="#">ToolboxSite</a></Navbar.Brand>
         </Navbar.Header>
         <Nav pullRight>
           {topRoutes.map(route =><NavItem key={route.path} href={'#'+ route.path}>{route.name}</NavItem>)}
           <NavItem href="https://github.com/Jishun/ToolboxSite" target="_blank">GitHub</NavItem>
         </Nav>
       </Navbar>
       <div id="content_area" className="container">
         <Nav bsStyle="tabs">
           {activeRoute && activeRoute.childRoutes? activeRoute.childRoutes.map((route, i) => <NavItem key={i} active={this.props.history.isActive(route.path)} href={'#' +route.path}>{route.name}</NavItem>) : null}
        </Nav>
         <Alert></Alert>
           <div>{this.props.children}</div>
       </div>
    </div>);
  }
}
