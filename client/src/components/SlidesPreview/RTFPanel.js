import React, { Component, Fragment } from 'react';
import './RTFPanel.css';
import { ChromePicker } from 'react-color';
import { FontFaces } from '../../config/config';
import boldIcon from '../../assets/bold.png';
import italicsIcon from '../../assets/italics.png';
import underlineIcon from '../../assets/underline.png';
import alignLeft from '../../assets/align_left.png';
import alignCentre from '../../assets/align_centre.png';
import alignRight from '../../assets/align_right.png';

class RTFPanel extends Component {
  state = {
    fontColorPickerOpen: false
  }

  toggleColorPicker = () => {
    this.setState( prevState => { 
      return {
        fontColorPickerOpen: !prevState.fontColorPickerOpen
      }
    })
  }

  closeColorPicker = () => {
    this.setState({ fontColorPickerOpen: false })
  }

  render() {
    const { 
      bold,
      italics, 
      underline, 
      fontFamily, 
      fontSize, 
      lastFontSize, 
      fontColor,
      textAlignment, 
      toggleBold,
      toggleItalics, 
      toggleUnderline, 
      changeAlignment, 
      handleTextChange, 
      handleFontColorChange
    } = this.props;

    const { fontColorPickerOpen } = this.state;

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

        <select
          className="font-selector"
          value={fontFamily}
          onChange={handleTextChange}
          name="fontFamily"
          >
          {
            FontFaces.map(fontFamilyOption => {
              return(
                <option key={fontFamilyOption} value={fontFamilyOption} style={{ fontFamily: fontFamilyOption }}>
                  {fontFamilyOption}
                </option>
              )
            })
          }
        </select>

        <input 
          className="size-selector"
          value={fontSize}
          onChange={handleTextChange}
          onBlur={() => {
            if (!fontSize) {
              handleTextChange({
                target: {
                  name: 'fontSize',
                  value: lastFontSize
                }
              });
            } else {
              handleTextChange({
                target: {
                  name: 'lastFontSize',
                  value: fontSize
                }
              })
            }
          }
          }
          name="fontSize"
          type="number"
        />

        <div className="text-color icon" onClick={this.toggleColorPicker}>
          <div >A</div>
          <div className="color-bar" style={{backgroundColor: fontColor}} />
        </div>
        { fontColorPickerOpen &&
          <div className="font-color-picker-container">
            <div className="cover" onClick={this.closeColorPicker} />
            <ChromePicker
                disableAlpha={true} 
                color={fontColor}
                onChange={handleFontColorChange}
              />
          </div>
        }

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