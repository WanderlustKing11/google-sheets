const express = require('express');
const app = express();
const https = require('https');
const path = require('path');
const { google } = require('googleapis');
const sheets = google.sheets('v4');

app.use('/public/css', express.static(__dirname + '/public/css'));

const url = 'https://docs.google.com/spreadsheets/d/';
const ssid = '...';
const route1 = '...';

app.get('/', (req, res) => {
  const indexPath = path.join(__dirname, 'index.html');
  res.sendFile(indexPath);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});