import React, { Component, PropTypes } from 'react'
import {Carousel, CarouselItem, Jumbotron, Button, Image} from 'react-bootstrap'

export default class Encoding extends Component {

  render () {
    return (<div>
          {this.props.children}
      </div>)
  }
}
