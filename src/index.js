// require libraries
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const {startDatabase} = require('./database/mongo');
const {insertAd, getAds} = require('./database/ads');

const app = express();
const port = process.env.PORT || "8000";

// temp db
const ads = [
    {title: 'Hello, world (again)!'}
  ];

//   configure app
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));


app.get('/', async (req, res) => {
    res.send(await getAds());
});

//   start in memory db
startDatabase().then(async () => {
await insertAd({title: 'Hello, now from the in-memory database!'});

// start the server
app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`)
});
});

