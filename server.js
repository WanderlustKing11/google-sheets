const express = require('express');
const https = require('https');
const path = require('path');
const ejs = require('ejs');
const { google } = require('googleapis');
const { log } = require('console');

const app = express();
const sheets = google.sheets('v4');

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use('/public/css', express.static(__dirname + '/public/css'));

// Google Auth //

// const auth = new google.auth.GoogleAuth({
//   keyFile: 'credentials.json',
//   scopes: ['https://www.googleapis.com/auth/spreadsheets'],
// });
// google.options({ auth });
// console.log(auth);

// GLOBALS //

// const driverNames = [
//   'Verstappen',
//   'Perez',
//   'Alonso',
//   'Hamilton',
//   'Russell',
//   'Stroll',
// ];

// const wankerMessage = "is a total wanker!";
// const goatMessage = "is the GOAT!";

app.get('/', async (req, res) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: 'credentials.json',
    scopes: 'https://www.googleapis.com/auth/spreadsheets',
  });

  // Creat client instance for auth
  const client = await auth.getClient();

  // Instance of Google Sheets API
  const googleSheets = google.sheets({ version: 'v4', auth: client });
  // const spreadsheetId = '... spreadsheetID';

  // Get metadata about spreadsheet
  const metaData = await googleSheets.spreadsheets.get({
    auth,
    spreadsheetId
  });

  res.send(metaData);
  // res.render('home', {
  //   driver: null, 
  //   message: null,
  // });
});

// app.post('/', (req, res) => {
//   const typedName = req.body.drivers;
//   let driverFound = driverNames.includes(typedName);

//   if (driverFound) {
//     res.redirect('/wanker?driver=' + typedName);
//   } else {
//     res.render('home', {
//       driver: null,
//       message: 'Sorry, no match found!',
//     });
//   }
// });

// app.get('/wanker', (req, res) => {
//   const driver = req.query.driver;
//   if (!driver) {
//     res.redirect('/');
//   } else {
//     res.render('wanker', {
//       driver: driver,
//       message: null,
//     });
//   }
// });

// app.post('/submit', (req, res) => {
//   const selectedDriver = req.body.driver;
//   const wankerStatus = req.body.wankerStatus;

//   console.log('Selected Driver:', selectedDriver);
//   console.log('Wanker Status:', wankerStatus);

//   if (wankerStatus === 'yes') {
//     res.render('success', {
//       driver: selectedDriver,
//       message: wankerMessage,
//     });
//   } else if (wankerStatus === 'no') {
//     res.render('success', {
//       driver: selectedDriver,
//       message: goatMessage,
//     });
//   }
// });

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
