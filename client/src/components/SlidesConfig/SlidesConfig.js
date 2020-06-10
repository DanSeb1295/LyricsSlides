import React, { Component } from 'react';
import './SlidesConfig.css';
import SongItem from './SongItem';

class SlidesConfig extends Component {  
  render () {
    const { songList, addNewSong } = this.props;

    return (
      <div className="row">
        <div className="song-list column">
          <div className="slides-config-container">
            Song List
          </div>

          <div className="song-list-container column">
            { songList &&
              songList.map(songItem => 
                <SongItem key={songItem.key} songItem={songItem} {...this.props} />
              )
            }
          </div>

          <div className="add-button" onClick={addNewSong}>
            +
          </div>
        </div>
      </div>
    )
  }
}

export default SlidesConfig;