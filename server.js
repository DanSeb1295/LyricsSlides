const express = require('express');
const MongoClient = require('mongodb').MongoClient
const cheerio = require('cheerio');
const request = require('request')

const app = express();
app.use(express.json({limit: '50mb', extended: true})); // support json encoded bodies
app.use(express.urlencoded({limit: '50mb', extended: true}));

/* -------------------- Connect MongoDB -------------------- */
const mongoPW = process.env.MONGO_PW
const mongoUser = process.env.MONGO_USER
const url = `mongodb+srv://${mongoUser}:${mongoPW}@lyricsslides.xlmpb.mongodb.net/LyricsSlides?retryWrites=true&w=majority`

/* -------------------- APIs -------------------- */
app.post('/api/songs', async (req, res) => {
  MongoClient
  .connect(url, (err, db) => {
    if (err) throw err;
    console.log("MongoDB Connected...")

    const { body: { artist, title, result }} = req;
    const dbo = db.db('LyricsSlides');
    dbo.collection("SearchedSongs")
      .insertOne({ artist, title, result }, (err, dbRes) => {
        if (err) {
          console.log(err);
          return
        };

        const { insertedId } = dbRes;
        res.send({ insertedId });
      });

    db.close();
  })
})

app.post('/api/searchMetro', async (req, res) => {
  const lyrics = await searchMetro(req, res)
  if (!lyrics.length) res.status(400).send();
  res.send(lyrics)
})

const searchMetro = (req, res) => {
  return new Promise((resolve, reject) => {
    const { body: { artist, title }} = req;
    const url = `https://www.metrolyrics.com/${title.trim().replace('(', '').replace(')', '').split(' ').join('-')}-lyrics-${artist.trim().replace('(', '').replace(')', '').split(' ').join('-')}.html`;

    request(
      url,
      (err, resp, body) => {
        if (err) throw err;
        let paras = []

        const $ = cheerio.load(body);
        $('#lyrics-body-text p.verse ').each((i, para) => {
          $(this).find('br').removeAttr('clear');
          let lines = para.children
            .slice(1, para.children.length)
            .filter(x => x.data !== undefined
              && !x.data.toLowerCase().includes('verse')
              && !x.data.toLowerCase().includes('chorus')
              && !x.data.toLowerCase().includes('bridge'))
            .map(lineObj => lineObj.data);
          
          paras.push(lines.join('') + '\n')
        })

        return resolve(paras.join(''))
      })
  })
}

app.post('/api/searchAZ', async (req, res) => {
  const lyrics = await searchAZ(req, res)
  if (!lyrics.length) res.status(400).send();
  res.send(lyrics)
})

const searchAZ = (req, res) => {
  return new Promise((resolve, reject) => {
    const { body: { artist, title }} = req;
    const url = `https://www.azlyrics.com/lyrics/${artist.trim().replace('(', '').replace(')', '').split(' ').join('')}/${title.trim().replace('(', '').replace(')', '').split(' ').join('')}.html`
    
    request(
      url,
      (err, resp, body) => {
        if (err) throw err;
        let paras = []

        const $ = cheerio.load(body);
        $('div.ringtone').next().next().next().next().each((i, para) => {
          console.log(para)
          // $(this).find('br').removeAttr('clear');
          let lines = para.children
            .slice(2, para.children.length)
            .filter(x => x.data !== undefined
              && !x.data.toLowerCase().includes('verse')
              && !x.data.toLowerCase().includes('chorus')
              && !x.data.toLowerCase().includes('bridge'))
            .map(lineObj => lineObj.data);
          
          paras.push(lines.join(''))
        })

        return resolve(paras.join(''))
      })
  })
}

/* -------------------- Run Server -------------------- */
const port = process.env.PORT || 5000;
if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

app.listen(port, () => console.log(`Listening on port ${port}`));