import React, { Component, Fragment } from 'react';
import './RTFPanel.css';
import boldIcon from '../../assets/bold.png';
import italicsIcon from '../../assets/italics.png';
import underlineIcon from '../../assets/underline.png';
import alignLeft from '../../assets/align_left.png';
import alignCentre from '../../assets/align_centre.png';
import alignRight from '../../assets/align_right.png';

class RTFPanel extends Component {
  render() {
    const { bold, italics, underline, fontFamily, fontSize, fontColour, textAlignment, toggleBold, toggleItalics, toggleUnderline, changeAlignment } = this.props;

    return (
      <Fragment>
        <div className={`bold icon ${bold ? 'selected' : ''}`} onClick={toggleBold} >
          <img src={boldIcon} alt="Bold Text"/>
        </div>

        <div className={`italics icon ${italics ? 'selected' : ''}`} onClick={toggleItalics} >
          <img src={italicsIcon} alt="Italics Text"/>
        </div>

        <div className={`underline icon ${underline ? 'selected' : ''}`} onClick={toggleUnderline} >
          <img src={underlineIcon} alt="Underline Text"/>
        </div>

        <input className="font-selector" value={fontFamily} />

        <input className="size-selector" value={fontSize} />

        <div className="text-colour icon">
          <div>A</div>
          <div className="colour-bar">A</div>
        </div>

        <div className={`align-left icon ${textAlignment === 'left' ? 'selected' : ''}`} onClick={() => {changeAlignment('left')}} >
          <img src={alignLeft} alt="Left Align Text"/>
        </div>

        <div className={`align-left icon ${textAlignment === 'center' ? 'selected' : ''}`} onClick={() => {changeAlignment('center')}} >
          <img src={alignCentre} alt="Centre Align Text"/>
        </div>

        <div className={`align-right icon ${textAlignment === 'right' ? 'selected' : ''}`} onClick={() => {changeAlignment('right')}} >
          <img src={alignRight} alt="Right Align Text"/>
        </div>        
      </Fragment>
    )
  }
}

export default RTFPanel;