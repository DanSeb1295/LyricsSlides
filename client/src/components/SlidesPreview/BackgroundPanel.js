import React, { Component, Fragment } from 'react';
import './BackgroundPanel.css';
import image from '../../assets/image.png';

class BackgroundPanel extends Component {
  render () {
    return (
      <Fragment>
        <div className="image-upload-container row">
          <div className="image-column column">
            <div className="image-container">
              <img src={image} alt="Upload Icon"/>
            </div>
            Set Background Image
          </div>
        </div>

        <div className="background-colour-container row">
          <div className="background-colour column">
            <div className="rgb">RGB</div>
            <input type="text" placeholder="20, 20, 20"/>
            Set Background Colour
          </div>
        </div>
      </Fragment>
    )
  }
}

export default BackgroundPanel;