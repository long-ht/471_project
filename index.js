const express = require('express');
const bodyParser = require('body-parser');
const workerRouter = require('./api/workerRouter/workerRouter');
const managerRouter = require('./api/managerRouter/managerRouter');

require('dotenv').config()

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());

app.use('/worker', workerRouter);
app.use('/manager', managerRouter);

app.listen(PORT, () => {
    console.log('listening on ' + PORT);
});