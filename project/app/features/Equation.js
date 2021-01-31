import React, { Component, PropTypes } from 'react'
import {Grid, Row, Col, Button} from 'react-bootstrap'
import {create, all} from 'mathjs'
import Input from 'react-validated-input'
import equation from '../utils/equationParser/index'
import Seekable from '../utils/seekableString'

export default class Equation extends Component {

  constructor(props){
    super(props)
    this.state={inputData: '', lines: [], vars: {}};
  }

  componentDidUpdate(){
    MathJax.typeset();
  }

  newVersion(){
    this.renderEquations(this.state.inputData, false);
  }

  onInputChange(e){
      this.renderEquations(e.target.value);
  }

  renderEquations(input, useDefault = true){
    let inputJson = equation.loadTemplate(input);
    if(!inputJson){
        return;
    }
    var vars = this.GetVariables(inputJson, useDefault);
    var {statement, answer} = inputJson;
    for(var key in vars){
        statement = statement.replaceAll(`$${key}`, vars[key].toLatex ? vars[key].toLatex() : vars[key]);
        answer = answer.replaceAll(`$${key}`, vars[key].toLatex ? vars[key].toLatex() : vars[key]);
    }
    this.setState({inputData : input, 
        statement: statement.replaceAll(' ', '&nbsp;')
                    .replaceAll('\r\n', '\n')
                    .replaceAll('\r', '\n')
                    .replaceAll('\n', '<br/>'),
        answer, 
        vars
    });
  }

  GetVariables(input, useDefault = true){
    var vars = {};
    var context = create(all, {
        number: 'Fraction'
      }).parser();
    for(var key in input.where){
        vars[key] = input.where[key].default;
        if(vars[key] == undefined || !useDefault){
            vars[key] = this.EavluateVariable(input.where[key], context);
        }
        context.evaluate(`${key} = ${vars[key]}`);
    }
    return vars;
  }

  EavluateVariable(obj, context){
    var ret;
    for(var key in obj){
        switch(key){
            case 'math':
                ret = context.evaluate(obj[key]);
                break;
            case 'js':
                ret = eval(obj[key]);
                break;
        }
    }
    if(ret == undefined){
        ret = obj['default'];
    }
    return ret;
  }

  render () {
    let inputHolder = ''
    return (
      <Grid>
        <br/>
        <p>Input in template content to get the parsed result at right</p>

        <Row>
          <Col md={6}>
            <Input type="textarea" placeholder={inputHolder} style={{height: 300}} instance={this.state} propertyKey="inputData" onChange={this.onInputChange.bind(this)}></Input>
          </Col>
          <Col md={6}>
              {/* {this.state.lines.map((item) => {
                  if(item instanceof Array){
                    return <div>{item.map(i => <span dangerouslySetInnerHTML={{__html:  i}}></span>)}</div>
                  }
                  return <div dangerouslySetInnerHTML={{__html:  item}}></div>
              })}
              <h5>Answer:</h5>
              <div dangerouslySetInnerHTML={{__html:  this.state.answer}}></div>
              <h5>Variables:</h5>
              {Object.keys(this.state.vars).map(key => <div>    ${key}:     {this.state.vars[key]}</div>)}*/}
              <p dangerouslySetInnerHTML={{__html:  this.state.statement}}></p> 
              {this.state.answer ? <h5>Answer:</h5> : null}
              <div dangerouslySetInnerHTML={{__html:  this.state.answer}}></div>
              {/* <h5>Variables:</h5> */}
              {
                // Object.keys(this.state.vars).map((key, i) => 
                //         <p key={i}>    ${key}:     {
                //         this.state.vars[key].toLatex ?
                //             `\\(${this.state.vars[key].toLatex()}\\)`
                //             : this.state.vars[key]}</p>
                //     )
              }
              {this.state.inputData ? <Button variant="outline-primary" onClick={this.newVersion.bind(this)}>Get me a new Version</Button> : null}
          </Col>
        </Row>
      </Grid>
    );
  }
}
