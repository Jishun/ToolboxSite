import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
import {Nav, NavItem, Grid, Row, Col, Table, Glyphicon, Button} from 'react-bootstrap'

export default class DataTools extends Component {

  render(){
    let subRoutes = this.props.route.childRoutes;
    let {login} = this.props;
    return (
      <Grid>
      {this.props.children}
      </Grid>
    );
  }
}
