import React, { Component, Fragment } from 'react';
import './RTFPanel.css';
import bold from '../../assets/bold.png';
import italics from '../../assets/italics.png';
import underline from '../../assets/underline.png';
import alignLeft from '../../assets/align_left.png';
import alignCentre from '../../assets/align_centre.png';
import alignRight from '../../assets/align_right.png';

class RTFPanel extends Component {
  render() {
    return (
      <Fragment>
        <div className="bold icon">
          <img src={bold} alt="Bold Text"/>
        </div>

        <div className="italics icon">
          <img src={italics} alt="Italics Text"/>
        </div>

        <div className="underline icon">
          <img src={underline} alt="Underline Text"/>
        </div>

        <input className="font-selector" />

        <input className="size-selector" />

        <div className="text-colour icon">
          <div>A</div>
          <div className="colour-bar">A</div>
        </div>

        <div className="align-left icon">
          <img src={alignLeft} alt="Left Align Text"/>
        </div>

        <div className="align-centre icon">
          <img src={alignCentre} alt="Centre Align Text"/>
        </div>

        <div className="align-right icon">
          <img src={alignRight} alt="Right Align Text"/>
        </div>        
      </Fragment>
    )
  }
}

export default RTFPanel;