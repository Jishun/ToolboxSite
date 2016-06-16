import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ReactMarkdown from 'react-markdown'
import {getReadMeData} from '../actions/home'

@connect(state => ({home: state.home}))
export default class Home extends Component {

  componentWillMount(){
    //if (!this.props.home.readme) {
      this.props.dispatch(getReadMeData());
    //}
  }

  render () {
    return (
      <ReactMarkdown source={this.props.home.readme} />
    );
  }
}
