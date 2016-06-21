import React, { Component, PropTypes } from 'react'
import {Nav, NavItem} from 'react-bootstrap'

const externalResources = [{
  link: 'https://text-compare.com/',
  name: 'TextCompare',
  description: null
}
]

export default class Encoding extends Component {

  constructor(props){
      super(props)
      this.state = {tabIndex : '0'}
  }

  onTabSelect(key){
    this.setState({tabIndex: key})
  }

  render () {
    let target = externalResources[this.state.tabIndex];
    return (<div>
          <h3>Links to external resources -- Load external site resource only for convenience </h3>
          <Nav bsStyle="tabs" activeKey={this.state.tabIndex} onSelect={this.onTabSelect.bind(this)}>
              {externalResources.map((e,i) => <NavItem key={i} eventKey={i}>{e.name}</NavItem>)}
         </Nav>
         <p>{target.description || (<span>This tool is a product of others, loaded from <a href={target.link}>{target.link}</a></span>)}</p>
         <iframe src={target.link} frameborder="0" style={{width: '100%', height: '100%', minHeight: 600}}></iframe>
      </div>)
  }
}
