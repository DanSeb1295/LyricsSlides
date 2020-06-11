import axios from 'axios';

const HOST = 'https://api.lyrics.ovh/v1'

const songSearch = async (artist, title) => {
  const endpoint = `${HOST}/${artist.trim()}/${title.trim()}`
  console.log(endpoint);

  return new Promise((resolve, reject) => {
    axios.get(endpoint)
        .then(res => { resolve(res.data.lyrics) })
        .catch(err => { reject() })
  })
}

export default songSearch;