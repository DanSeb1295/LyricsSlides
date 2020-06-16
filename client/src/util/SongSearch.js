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

  // 3. Check AZLyrics

  // 4. Check Lyrics.ovh
  const endpoint = `${HOST}/${artist.trim()}/${title.trim()}`
  console.log(endpoint);

  return new Promise((resolve, reject) => {
    axios.get(endpoint)
        .then(res => { resolve(res.data.lyrics) })
        .catch(err => { reject() })
  })
}

export default songSearch;