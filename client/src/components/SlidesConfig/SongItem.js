import React, { Component } from 'react';
import axios from 'axios';
import './SongItem.css';
import deleteIcon from '../../assets/delete.png'
import successIcon from '../../assets/success.png';
import viewIcon from '../../assets/view.png';
import songSearch from '../../util/SongSearch';
import Loader from 'react-loader-spinner';

class SongItem extends Component {  
  state = {
    viewLyrics: false
  }

  searchMode = () => {
    const { updateSong, songItem } = this.props;
    let newSongItem = {...songItem};
    newSongItem.mode = 'search';
    updateSong(newSongItem);
  }

  customMode = () => {
    const { updateSong, songItem } = this.props;
    let newSongItem = {...songItem};
    newSongItem.mode = 'custom';
    updateSong(newSongItem);
    this.setState({ viewLyrics: false })
  }

  onTextChange = event => {
    const { updateSong, songItem } = this.props;
    let newSongItem = {...songItem};
    newSongItem[event.target.name] = event.target.value;
    newSongItem.status = null;
    updateSong(newSongItem);
  }

  onDone = async () => {
    const { updateSong, songItem } = this.props;
    const { artist, title } = songItem;
    if (!artist || !title) { return };
    
    let newSongItem = {...songItem};
    newSongItem.status = 'searching'
    updateSong(newSongItem);

    let lyrics = await songSearch(artist, title)
      .then(res => {
        axios
          .post('/api/songs', { artist, title, result: 'success' })
          .catch(err => '')
        return res
      })
      .catch(err => {
        axios
          .post('/api/songs', { artist, title, result: 'failed' })
          .catch(err => '')
      });

    newSongItem.content = lyrics ? lyrics.trim() : lyrics;

    if (lyrics) {
      newSongItem.status = 'success'
    } else {
      newSongItem.status = 'failed'
    };

    updateSong(newSongItem);
  }

  onViewLyrics = () => {
    this.setState({ viewLyrics: true })
  }

  onCloseLyrics = () => {
    this.setState({ viewLyrics: false })
  }

  onErrorMessage = () => {
    this.setState({ viewError: true })
  }

  closeErrorMessage = () => {
    this.setState({ viewError: false }) 
  }

  render () {
    const { viewLyrics, viewError } = this.state;
    const { songItem, deleteSong } = this.props;
    const {
      mode,
      artist,
      title,
      content,
      status,
      id
    } = songItem
    
    const activeStyle = {
      backgroundColor: '#65768E',
      color: 'white'
    }
    
    return (
      <div className="song-container column">
        <div className="song-configs row">
          <div className="mode-select row">
            <div className="search-button" onClick={this.searchMode} style={ mode === 'search' ? activeStyle : null }>
              Search
            </div>
            <div className="custom-button" onClick={this.customMode} style={ mode === 'custom' ? activeStyle : null }>
              Custom
            </div>
          </div>
          <div className="status-panel row">
            { mode === 'search' && status === null &&
              <div className="done-button" onClick={this.onDone}>Done</div>
            }
            {
              mode === 'search' && status === 'searching' &&
              <Loader type="TailSpin" height={20} width={20} color={'#909DAD'} />
            }
            {
              mode === 'search' && status === 'success' &&
              <div>
                <div className="view-icon-container" onMouseOver={this.onViewLyrics}>
                  <img src={viewIcon} alt="View Icon" className="view-icon"/>
                  {
                    viewLyrics === true &&
                    <div className="lyrics-preview-container" onMouseOut={this.onCloseLyrics} onClick={this.customMode} >
                      <h3>{title.toUpperCase()}</h3>
                      {content}
                      <div className="click-to-edit">
                        Click Text To Edit
                      </div>
                    </div>
                  }
                </div>
                <img className="success-icon" src={successIcon} alt="Success Icon"/>
              </div>
            }
            {
              mode === 'search' && status === 'failed' &&
              <div className="error-container">
                {
                  viewError || true &&
                  <span className="error-message">Please ensure Artist & Title are accurate
                    <br /> (e.g. "Live" in the title, Bethel MUSIC, Elevation WORSHIP).
                  </span>
                }
                <div className="failed-icon" onMouseOver={this.onErrorMessage} onMouseOut={this.closeErrorMessage}>
                  !
                </div>
              </div>
            }
          </div>
        </div>
        <div className="delete-button" onClick={() => deleteSong(id)}>
          <img src={deleteIcon} alt="Delete Button"/>
        </div>
        
        { mode === 'search' &&
          <div className="song-inputs row">
            <div className="artist-column">
              <input 
                type="text" 
                className="artist-input" 
                name="artist" 
                value={artist} 
                placeholder="Enter Name of Artist"
                onChange={this.onTextChange}
                />
              <div className="artist-subtitle">Artist</div>
            </div>
            <div className="song-title-column">
              <input 
                type="text" 
                className="song-title-input" 
                name="title" 
                value={title}  
                placeholder="Enter Song Title"
                onChange={this.onTextChange}
              />
              <div className="song-title-subtitle">Song Title</div>
            </div>
          </div>
        }

        { mode === 'custom' &&
          <textarea
            type="text" 
            className="custom-text-input"
            name="content"
            placeholder="Enter Custom Text"
            value={content}
            onChange={this.onTextChange}
          />
        }

      </div>
    )
  }
}

export default SongItem;