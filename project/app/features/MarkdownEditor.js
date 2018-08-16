import React, { Component, PropTypes } from 'react'
import {Grid, Row, Col, Column, Table} from 'react-bootstrap'
import Input from 'react-validated-input'
import ReactMarkdown from 'react-markdown'

export default class MarkdownEditor extends Component {

  constructor(props){
    super(props)
    this.state={inputData: ''};
  }

  onInputChange(e){
    let lines = e.target.value.split('\n');
    let outputData = 'INSERT INTO [TABLE] ([' + lines[0].replace(/\t/g, '], [') + '])\n'
    for (var i = 1; i < lines.length; i++) {
      outputData += ((i == 1 ? 'SELECT ' : 'UNION ALL SELECT ') + lines[i].split('\t').map(a => a.toUpperCase() != 'NULL' ? `'${a.replace(new RegExp("'", 'g'), "''")}'` : 'NULL').join(', ') + '\n')
    }
    this.setState({inputData: e.target.value })
  }

  render () {
      return (
      <Grid>
        <br/>
        <p>This little tool takes the raw <a href="https://help.github.com/articles/basic-writing-and-formatting-syntax/">markdown</a> string and display the rendered results</p>

        <Row>
          <Col md={6}>
            <Input type="textarea" placeholder={"Type your markdown"} style={{height: 600}} instance={this.state} propertyKey="inputData" onChange={this.onInputChange.bind(this)}></Input>
          </Col>
          <Col md={6}>
            <ReactMarkdown source={this.state.inputData} />
          </Col>
        </Row>
      </Grid>
    );
  }
}
