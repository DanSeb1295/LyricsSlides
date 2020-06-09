import React, { Component } from 'react';
import './SlidesPreview.css';
import RTFPanel from './RTFPanel';
import BackgroundPanel from './BackgroundPanel';
import { ImageUploadModal } from '../modals';

class SlidesPreview extends Component {
  render () {
    const { openModal, fileHandler, toggleModal, textAlignment, bold, italics, underline, backgroundImage } = this.props

    const previewStyle = {
      textAlign: textAlignment,
      fontStyle: italics ? 'italic' : '',
      textDecoration: underline ? 'underline' : '',
      fontWeight: bold ? 'bold' : '',
      backgroundImage: backgroundImage ? `url(${backgroundImage})` : '',
      backgroundSize: backgroundImage ? '100% 100%' : ''
    }

    return (
      <div className="preview-container row">
        <div className="rtf row">
          <div className="rtf-container">
            <RTFPanel {...this.props} />
          </div>
        </div>
        
        <div className="slide-preview row">
          <div className="slide-preview-container" style={previewStyle}>
            <p>This is how your slides are going to look like</p>
            <p>Adjust slide aesthetics here</p>
            <p>Add, edit and rearrange songs below</p>
          </div>
        </div>
        
        <div className="background row">
          <div className="background-container">
            <BackgroundPanel toggleModal={toggleModal} />
          </div>
        </div>

        { openModal && <ImageUploadModal fileType="image" handleDrop={fileHandler} onClose={toggleModal}/> }
      </div>
    )
  }
}

export default SlidesPreview;