import React, { Component } from 'react';
import './SlidesConfig.css';

class SlidesConfig extends Component {
  state = {
    songlist : []
  }
  
  render () {
    return (
      <div className="row">
        <div className="slides-config-container">
          Song List
        </div>
      </div>
    )
  }
}

export default SlidesConfig;