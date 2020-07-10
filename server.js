const express = require('express');
const MongoClient = require('mongodb').MongoClient

const app = express();
app.use(express.json({limit: '50mb', extended: true})); // support json encoded bodies
app.use(express.urlencoded({limit: '50mb', extended: true}));

/* -------------------- Connect MongoDB -------------------- */
const mongoPW = process.env.MONGO_PW
const mongoUser = process.env.MONGO_USER
const url = `mongodb+srv://${mongoUser}:${mongoPW}@lyricsslides.xlmpb.mongodb.net/LyricsSlides?retryWrites=true&w=majority`

/* -------------------- APIs -------------------- */
app.post('/api/search', async (req, res) => {
  MongoClient
  .connect(url, (err, db) => {
    if (err) {
      console.log(err);
      return
    };
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

/* -------------------- Run Server -------------------- */
const port = process.env.PORT || 5000;
if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

app.listen(port, () => console.log(`Listening on port ${port}`));