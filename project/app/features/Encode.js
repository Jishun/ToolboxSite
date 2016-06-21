import React, { Component, PropTypes } from 'react'
import {Grid, Row, Col, Column, Table} from 'react-bootstrap'
import Input from 'react-validated-input'

export default class Encode extends Component {

  constructor(props){
    super(props)
    this.state={inputData: '', outputData: ''};
  }

  htmlEncode( html ) {
  	if ((html || '') == '') {return ''}
    return document.createElement('div')
		.appendChild(document.createTextNode(html))
		.parentNode.innerHTML;
  }

  htmlDecode( html ) {
  	if ((html || '') == '') {return ''}
    let element = document.createElement('textarea')
    element.innerHTML = html
    return element.value;
  }

  onInputChange(e){
  	let outputData = this.htmlEncode(e.target.value)
    this.setState({inputData : e.target.value, outputData })
  }

  onOutputChange(e){
  	let inputData = this.htmlDecode(e.target.value)
    this.setState({inputData : inputData, outputData: e.target.value })
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
            <Input type="textarea" placeholder={outputHolder} style={{height: 300}} instance={this.state} propertyKey="outputData" onChange={this.onOutputChange.bind(this)}></Input>
          </Col>
        </Row>
      </Grid>
    );
  }
}
