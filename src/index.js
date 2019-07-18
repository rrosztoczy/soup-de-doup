// require libraries
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();
const port = process.env.PORT || "8000";

// temp db
const tempDb = [
    {title: 'Hello, world (again)!'}
  ];

//   configure app
app.use(bodyParser.json())
app.use(cors())
app.use(helmet())
app.use(morgan('combined'))


app.get('/', (req, res) => {
    res.status(200).send(tempDb);
});

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`)
})