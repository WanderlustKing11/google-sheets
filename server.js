const express = require('express');
const https = require('https');
const path = require('path');
const ejs = require('ejs');
const { google } = require('googleapis');
const { log } = require('console');

const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true })); // enables us to use forms
app.use('/public/css', express.static(__dirname + '/public/css'));

// Google Auth //
const authenticate = async () => {
  const auth = new google.auth.GoogleAuth({
    keyFile: 'credentials.json',
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  // Create client instance for auth
  const client = await auth.getClient();
  return client;
};

// GLOBALS //

const wankerMessage = "is a total wanker!";
const goatMessage = "is the GOAT!";

app.get('/', async (req, res) => {
  res.render('home', {
    driver: null, 
    message: null,
  });
});

app.post('/', async (req, res) => {
  try {
    // Authenticate and get the client
    const client = await authenticate();

    // Instance of Google Sheets API
    const googleSheets = google.sheets({ version: 'v4', auth: client });
    // const spreadsheetId = '... { Enter your spreadsheetId here }';

    // Read row(s) from spreadsheet
    const getRows = await googleSheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'driver-list!A2:A',
    });

    const typedName = req.body.drivers;
    let driverNames = getRows.data.values.flat();

    if (driverNames.includes(typedName)) {
      res.redirect('/wanker?driver=' + typedName);
    } else {
      res.render('home', {
        driver: null,
        message: 'Sorry, no match found!',
      });
    }
  } catch (error) {
    // Handle any errors that occur during authentication or API requests
    console.error('Error:', error);
    res.status(500).send('An error occured.');
  }
});

app.get('/wanker', (req, res) => {
  const driver = req.query.driver;
  if (!driver) {
    res.redirect('/');
  } else {
    res.render('wanker', {
      driver: driver,
      message: null,
    });
  }
});


app.post('/submit', async (req, res) => {
  try {
    const selectedDriver = req.body.driver;
    const wankerStatus = req.body.wankerStatus;

    // Authenticate and get the client
    const client = await authenticate();

    // Instance of Google Sheets API
    const googleSheets = google.sheets({ version: 'v4', auth: client });
    // const spreadsheetId = '... { Enter your spreadsheetId here }';

    // Read row(s) from spreadsheet
    const getRows = await googleSheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'driver-list!A2:A',
    });

    const driverNames = getRows.data.values.flat();

    // Write row(s) to spreadsheet
    await googleSheets.spreadsheets.values.append({
      spreadsheetId,
      range: `driver-list!E${driverNames.indexOf(selectedDriver) + 2}`,
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [[wankerStatus === 'yes' ? wankerMessage : goatMessage]],
      },
    });

    console.log('Selected Driver:', selectedDriver);
    console.log('Wanker Status:', wankerStatus);

    res.render('success', {
      driver: selectedDriver,
      message: 'Your RSVP has been sent!',
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred.');
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
