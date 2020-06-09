import React, { Component } from 'react';

class CloseModalButton extends Component {
  render() {
    const { text, onClick, className } = this.props;

    return (
      <div className={className} onClick={onClick}>
        { text } 
      </div>
    )
  }
}

export default CloseModalButton;