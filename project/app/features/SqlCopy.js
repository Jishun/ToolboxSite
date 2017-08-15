import React, { Component, PropTypes } from 'react'
import {Grid, Row, Col, Column, Table} from 'react-bootstrap'
import Input from 'react-validated-input'

export default class SqlCopy extends Component {

  constructor(props){
    super(props)
    this.state={inputData: '', outputData: '', lines : [], rows : 0, columns: 0};
  }

  onInputChange(e){
    let lines = e.target.value.split('\n');
    let outputData = 'INSERT INTO [TABLE] ([' + lines[0].replace(/\t/g, '], [') + '])\n'
    for (var i = 1; i < lines.length; i++) {
      outputData += ((i == 1 ? 'SELECT ' : 'UNION ALL SELECT ') + lines[i].split('\t').map(a => a.toUpperCase() != 'NULL' ? `'${a}'` : a.replace("'", "''")).join(', ') + '\n')
    }
    this.setState({lines, outputData })
  }

  render () {
    let inputHolder = 'To use it, execute a SELECT statement in SQLServer management studio, right click on the result window, select "Copy with Headers", then paste it here'
    let outputHolder = 'If you paste a standard output WITH headers from the SQLServer management studio result, you will get an INSERT statement here'
    return (
      <Grid>
        <br/>
        <p>This little tool takes a string copied from the SELECT output window of SQLServer management studio, and converts it into an SQL INSERT statement</p>

        <Row>
          <Col md={6}>
            <Input type="textarea" placeholder={inputHolder} style={{height: 300}} instance={this.state} propertyKey="inputData" onChange={this.onInputChange.bind(this)}></Input>
          </Col>
          <Col md={6}>
            <Input type="textarea" placeholder={outputHolder} style={{height: 300}} instance={this.state} propertyKey="outputData"></Input>
          </Col>
        </Row>
        <Table>
          <thead>
            <tr>
              {this.state.lines.length > 0 ? this.state.lines[0].split('\t').map((a, i)=> <td key={i}>{a}</td>) : null}
            </tr>
          </thead>
          <tbody>
            {this.state.lines.map((a, i)=> i == 0 ? null : <tr key={i}>
              {a.split('\t').map((aa, ii)=> <td key={ii}>{aa}</td>)}
            </tr>)}
          </tbody>
        </Table>
      </Grid>
    );
  }
}
