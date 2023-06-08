const express = require('express');
// const https = require('https');
// const path = require('path');
const ejs = require('ejs');
const { google } = require('googleapis');
const { log } = require('console');

const app = express();
const sheets = google.sheets('v4');

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use('/public/css', express.static(__dirname + '/public/css'));

const driverNames = ['Verstappen', 'Perez', 'Alonso', 'Hamilton', 'Russell', 'Stroll']

app.get('/', (req, res) => {
  // const indexPath = path.join(__dirname, 'index.html');
  // res.sendFile(indexPath);
  res.render('home', {
    drivers: driverNames
  });
});

app.post('/', (req, res) => {
  const answer = req.body.drivers;
  console.log(answer);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
