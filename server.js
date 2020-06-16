const express = require('express');
const mongoose = require('mongoose')

const app = express();
app.use(express.json({limit: '50mb', extended: true})); // support json encoded bodies
app.use(express.urlencoded({limit: '50mb', extended: true}));

/* -------------------- APIs -------------------- */
// app.get('/', (req, res) => {
//   res.send('Hi!')
// })

/* -------------------- Run Server -------------------- */
const port = process.env.PORT || 5000;
if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

app.listen(port, () => console.log(`Listening on port ${port}`));