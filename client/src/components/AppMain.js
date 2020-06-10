import React, { Component } from 'react';
import './AppMain.css';
import SlidesPreview from './SlidesPreview';
import SlidesConfig from './SlidesConfig';
import Footer from './Footer';

class AppMain extends Component {
  state = {
    bold: false,
    italics: false,
    underline: false,
    fontFamily: 'Calibri',
    lastFontFamily: 'Calibri',
    fontSize: 18,
    lastFontSize: 18,
    fontColor: '#FFF',
    textAlignment: 'center',
    backgroundImage: null,
    backgroundColor: '#000',
    textContent: [],
    imageUploadModal: false,
    infoModal: false
  }

  handleTextChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleFontColorChange = color => {
    this.setState({ fontColor: color.hex })
  }

  handleBGColorChange = color => {
    this.setState({ 
      backgroundColor: color.hex,
      backgroundImage: null
    })
  }

  toggleImageUploadModal = () => {
    this.setState( prevState => {
    return {
      imageUploadModal: !prevState.imageUploadModal
    }})
  }

  handleFile = imageFiles => {
    this.setState({ 
      backgroundImage: URL.createObjectURL(imageFiles[0]),
      backgroundColor: ''
    })
  }

  changeAlignment = textAlignment => {
    this.setState({ textAlignment })
  }

  toggleBold = () => {
    this.setState( prevState => {
    return {
      bold: !prevState.bold
    }})
  }

  toggleItalics = () => {
    this.setState( prevState => {
    return {
      italics: !prevState.italics
    }})
  }

  toggleUnderline = () => {
    this.setState( prevState => {
    return {
      underline: !prevState.underline
    }})
  }

  render () {
    const {
      imageUploadModal,
      infoModal,
      bold,
      italics,
      underline,
      fontFamily,
      lastFontFamily,
      fontSize,
      lastFontSize,
      fontColor,
      textAlignment,
      backgroundImage,
      backgroundColor
    } = this.state;

    const SlidesPreviewProps = {
      bold,
      italics,
      underline,
      fontFamily,
      lastFontFamily,
      fontSize,
      lastFontSize,
      fontColor,
      textAlignment,
      backgroundImage,
      backgroundColor,
      openModal: imageUploadModal,
      handleTextChange: this.handleTextChange,
      handleFontColorChange: this.handleFontColorChange,
      handleBGColorChange: this.handleBGColorChange,
      toggleBold: this.toggleBold,
      toggleItalics: this.toggleItalics,
      toggleUnderline: this.toggleUnderline,
      changeAlignment: this.changeAlignment,
      fileHandler: this.handleFile,
      toggleModal: this.toggleImageUploadModal
    }

    const SlidesConfigProps = {
      openModal: infoModal
    }

    return (
      <div className="app-main">
        <AppHeader />
        <SlidesPreview {...SlidesPreviewProps} />
        <SlidesConfig {...SlidesConfigProps} />
        <Footer />
      </div>
    )
  }
}

const AppHeader = () => {
  return(
    <div className="row">
      <div className="app-header-container">
        <p className="welcome-text">Welcome To</p>
        <p className="app-title"><b>Lyrics Slides Generator</b></p>
      </div>
    </div>
  )
}

export default AppMain;