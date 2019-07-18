// require libraries
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const {startDatabase} = require('./database/mongo');
const {deleteAd, updateAd, insertAd, getAds} = require('./database/ads');

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
    const newAd = req.body;
    await insertAd(newAd)
    res.send({message: `New ad ${newAd} inserted`});
});

app.put('/:id', async (req, res) => {
    adToUpdate = req.params.id
    adBody = req.body
    await updateAd(adToUpdate, adBody)
    res.send({message: `ad ${adToUpdate} with body ${adBody} updated`});
});

app.delete('/:id', async (req, res) => {
    adToDelete = req.params.id;
    await deleteAd(adToDelete)
    res.send({message: `ad ${adToDelete} deleted`});
});

//   start in memory db
startDatabase().then(async () => {
await insertAd({title: 'Hello, now from the in-memory database!'});

// start the server
app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`)
});
});

