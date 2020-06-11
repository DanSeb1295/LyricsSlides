import axios from 'axios';

const HOST = 'https://api.lyrics.ovh/v1'

const songSearch = async (artist, title) => {
  artist = artist.trim();
  title = title.trim();
  const endpoint = `${HOST}/${artist}/${title}`

  return new Promise((resolve, reject) => {
    axios.get(endpoint)
        .then(res => { resolve(res.data.lyrics) })
        .catch(err => { reject() })
  })
}

export default songSearch;