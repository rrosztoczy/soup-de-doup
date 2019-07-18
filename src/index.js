// require libraries
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const {startDatabase} = require('./database/mongo');
const {deleteAd, insertAd, getAds} = require('./database/ads');

const app = express();
const port = process.env.PORT || "8000";

//   configure app
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));


// Default route gets all ad data for api results
app.get('/', async (req, res) => {
    res.send(await getAds());
});

app.post('/', async (req, res) => {
    res.send(await insertAd());
});

app.put('/:id', async (req, res) => {
    res.send(await updateAd());
});

app.delete('/:id', async (req, res) => {
    res.send(await deleteAd());
});

//   start in memory db
startDatabase().then(async () => {
await insertAd({title: 'Hello, now from the in-memory database!'});

// start the server
app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`)
});
});

