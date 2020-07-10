import axios from 'axios';
import searchNCC from './ncc';

const HOST = 'https://api.lyrics.ovh/v1'

const songSearch = async (artist, title) => {
  artist = artist.toLowerCase().trim();
  title = title.toLowerCase().trim();
  
  // 1. Check NCC
  if (artist.includes('ncc') || artist.includes('new creation')) {
    return searchNCC(title);
  }

  // 2. Check MetroLyrics
  return await axios
    .post('/api/searchMetro', { artist, title })
    .then(res => { return res.data })
    .catch(err => {
      
      // 3. Check AZLyrics
      return axios
        .post('/api/searchAZ', { artist, title })
        .then(res => { return res.data })
        .catch(err => {
          
          // 4. Check Lyrics.ovh
          return searchAPI(artist, title);
        })
    })
}

const searchAPI = (artist, title) => {
  const endpoint = `${HOST}/${artist.trim()}/${title.trim()}`

  return new Promise((resolve, reject) => {
    axios.get(endpoint)
        .then(res => { 
          axios.post('/api/songs', { artist, title, result: 'success' })
          resolve(res.data.lyrics)
        })
        .catch(err => { 
          axios.post('/api/songs', { artist, title, result: 'failed' })
          reject()
        })
  })
}

export default songSearch;