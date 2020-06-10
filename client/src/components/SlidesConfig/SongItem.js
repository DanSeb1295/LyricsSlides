import React, { Component } from 'react';
import './SongItem.css';
import deleteIcon from '../../assets/delete.png'

class SongItem extends Component {  
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
  }

  render () {
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
            <div className="done-button">Done</div>
          </div>
        </div>
        <div className="delete-button" onClick={() => deleteSong(id)}>
          <img src={deleteIcon} alt="Delete Button"/>
        </div>
        
        { mode === 'search' &&
          <div className="song-inputs row">
            <div className="artist-column">
              <input type="text" className="artist-input" placeholder="Enter Name of Artist" />
              <div className="artist-subtitle">Artist</div>
            </div>
            <div className="song-title-column">
              <input type="text" className="song-title-input" placeholder="Enter Song Title" />
              <div className="song-title-subtitle">Song Title</div>
            </div>
          </div>
        }

        { mode === 'custom' &&
          <textarea type="text" className="custom-text-input" placeholder="Enter Custom Text" />
        }

      </div>
    )
  }
}

export default SongItem;