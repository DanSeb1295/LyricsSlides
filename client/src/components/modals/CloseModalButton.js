import React, { Component } from 'react';

class CloseModalButton extends Component {
  render() {
    const { text, onClick } = this.props;

    return (
      <div className="close-modal-button" onClick={onClick}>
        { text } 
      </div>
    )
  }
}

export default CloseModalButton;