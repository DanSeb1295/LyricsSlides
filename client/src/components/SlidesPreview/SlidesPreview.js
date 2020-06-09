import React, { Component } from 'react';
import './SlidesPreview.css';
import RTFPanel from './RTFPanel';
import BackgroundPanel from './BackgroundPanel';

class SlidesPreview extends Component {
  render () {
    return (
      <div className="preview-container row">
        <div className="rtf row">
          <div className="rtf-container">
            <RTFPanel />
          </div>
        </div>
        
        <div className="slide-preview row">
          <div className="slide-preview-container">
            PREVIEW
          </div>
        </div>
        
        <div className="background row">
          <div className="background-container">
            <BackgroundPanel />
          </div>
        </div>
      </div>
    )
  }
}

export default SlidesPreview;