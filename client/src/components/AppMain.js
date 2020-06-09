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
    fontFamily: 'calibri',
    fontSize: 18,
    fontColour: '#FFF',
    align: 'center',
    backgroundImage: null,
    backgroundColour: '#000',
    textContent: []
  }

  render () {
    return (
      <div className="app-main">
        <AppHeader />
        <SlidesPreview />
        <SlidesConfig />
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