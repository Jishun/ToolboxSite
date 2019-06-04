import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
import {Nav, NavItem, Grid, Row, Col, Table, Glyphicon, Button} from 'react-bootstrap'

export default class Calculators extends Component {

  render(){
    return (
      <Grid>
      {this.props.children}
      </Grid>
    );
  }
}
