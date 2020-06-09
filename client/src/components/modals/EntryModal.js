import React, { Component } from 'react';
import CloseModalButton from './CloseModalButton';
import './Modals.css'

class EntryModal extends Component {
  render() {
    const { onClick } = this.props;

    return (
      <div className="modal-bg">
        <div className="modal-container">
          <div className="modal-content-container">
            Entry Modal
          </div>
          <CloseModalButton text={'I accept'} onClick={onClick} />
        </div>
      </div>
    )
  }
}

export default EntryModal;