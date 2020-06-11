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
            <h1>Data Notice</h1>
            <span>This website collects data about all songs searched on this platform.</span>
          </div>
          <CloseModalButton className="primary-modal-button accept-button" text={'I Understand'} onClick={onClick} />
        </div>
      </div>
    )
  }
}

export default EntryModal;