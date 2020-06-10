import React, { Component, Fragment } from 'react';
import './BackgroundPanel.css';
import image from '../../assets/image.png';
import { ChromePicker } from 'react-color';

class BackgroundPanel extends Component {
  state = {
    BGColorPickerOpen: false
  }

  toggleColorPicker = () => {
    this.setState( prevState => { 
      return {
        BGColorPickerOpen: !prevState.BGColorPickerOpen
      }
    })
  }

  closeColorPicker = () => {
    this.setState({ BGColorPickerOpen: false })
  }

  render () {
    const { toggleModal, backgroundColor, handleBGColorChange } = this.props;
    const { BGColorPickerOpen } = this.state;
    
    return (
      <Fragment>
        <div className="image-upload-container row" onClick={toggleModal}>
          <div className="image-column column">
            <div className="image-container">
              <img src={image} alt="Upload Icon"/>
            </div>
            Set Background Image
          </div>
        </div>

        <div className="background-color-container row" >
          <div className="background-color column">
            <div className="bg-color-bar" onClick={this.toggleColorPicker} style={{backgroundColor: backgroundColor}} />
            Set Background Color
          </div>
        </div>
        { BGColorPickerOpen &&
          <div className="bg-color-picker-container">
            <div className="cover" onClick={this.closeColorPicker} />
            <ChromePicker
                disableAlpha={true} 
                color={backgroundColor}
                onChange={handleBGColorChange}
              />
          </div>
        }
      </Fragment>
    )
  }
}

export default BackgroundPanel;