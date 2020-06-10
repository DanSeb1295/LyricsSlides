import React, { Component } from 'react';
import './AppMain.css';
import SlidesPreview from './SlidesPreview';
import SlidesConfig from './SlidesConfig';
import Footer from './Footer';
import { SongSchema } from '../config/config';

let songID = 0;

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
    imageUploadModal: false,
    infoModal: false,
    songList: [ {...SongSchema, key: songID, id: ++songID} ]
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

  addNewSong = () => {
    this.setState(prevState => {
      let newSong = { ...SongSchema, key: songID, id: ++songID };
      return {
        songList: [...prevState.songList, newSong]
      };
    });
  }

  updateSong = song => {
    this.setState((state, props) => {
      const songList = state.songList;
      for (let i = 0; i < songList.length; i++) {
        if (songList[i].id === song.id) {
          songList[i] = song;
          return { songList: songList };
        }
      }
    });
  }

  deleteSong = id => {
    this.setState(prevState => {
      let songList = prevState.songList;
      songList = songList.filter(songItem => songItem.id !== id)
      
      if (songList.length === 0) {
        songList.push({...SongSchema, key: songID, id: ++songID})
      }
      
      return { songList }
    })
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
      backgroundColor,
      songList
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
      songList,
      openModal: infoModal,
      addNewSong: this.addNewSong,
      updateSong: this.updateSong,
      deleteSong: this.deleteSong
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