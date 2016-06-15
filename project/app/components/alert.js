
import {CLEAR_MESSAGE} from '../actions/common'
import {Alert} from 'react-bootstrap'
import React, { Component, PropTypes } from 'react'
import {connect } from 'react-redux'

let instances = [];
let maxPriority = 0;
@connect((state) => ({message: state.common.message}))
export default class MAlert extends Component {

  getPriorityMax(){
    maxPriority = instances.length > 1 ? instances.reduce(function(previousValue, currentValue, currentIndex, array) {
      return Math.max(previousValue.priority || 0 , currentValue.priority || 0);
    }) : instances.length == 1 ? (instances[0].priority || 0): 0;
  }

  componentDidMount(){
    instances.push({alert: this, priority: this.props.priority})
    this.getPriorityMax();
  }

  componentWillUnmount(){
    instances = instances.filter(i => i.alert !== this)
    this.getPriorityMax();
  }

  shouldDisplayAlert(){
    return (this.props.priority || 0) >= maxPriority;
  }

  handleAlertDismiss() {
     this.props.dispatch({type: CLEAR_MESSAGE})
   }

  render(){
    //"success", "warning", "danger", "info"
    let {message} = this.props;
    if (message && message.level && this.shouldDisplayAlert()) {
      let hold = message.level == 'error' || message.level == 'warnning';
      return <Alert bsStyle={message.level == 'error' ? 'danger' : message.level} onDismiss={this.handleAlertDismiss.bind(this)} dismissAfter={hold ? null : 5000}>
           <h4>{message.title}</h4>
           {typeof(message.text) == 'string' ? <p>{message.text}</p> : message.text.map((t,i) => <p key={i}>{t}</p>)}
         </Alert>;
    }
    return null;
  }
}
