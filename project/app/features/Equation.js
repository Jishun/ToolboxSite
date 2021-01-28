import React, { Component, PropTypes } from 'react'
import {Grid, Row, Col, Column, Table} from 'react-bootstrap'
import Input from 'react-validated-input'
import equation from '../utils/equationParser/index'

export default class Encode extends Component {

  constructor(props){
    super(props)
    this.state={inputData: '', outputData: ''};
  }


  onInputChange(e){
  	let outputData = equation.loadTemplate(e.target.value);
    this.setState({inputData : e.target.value, outputData });
  }

  render () {
    let inputHolder = ''
    let outputHolder = ''
    return (
      <Grid>
        <br/>
        <h3>Common simple escape encodings, html encoding as first supported for now</h3>
        <p>Input in the teax area on the left side and get encoded result at the right, or do the opposite.</p>

        <Row>
          <Col md={6}>
            <Input type="textarea" placeholder={inputHolder} style={{height: 300}} instance={this.state} propertyKey="inputData" onChange={this.onInputChange.bind(this)}></Input>
          </Col>
          <Col md={6}>
            <Input disabled type="textarea" placeholder={outputHolder} style={{height: 300}} instance={this.state} propertyKey="outputData" ></Input>
          </Col>
        </Row>
      </Grid>
    );
  }
}
