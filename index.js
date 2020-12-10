const express = require('express');
const bodyParser = require('body-parser');
const workerRouter = require('./api/workerRouter/workerRouter');
const managerRouter = require('./api/managerRouter/managerRouter');
const db = require('./api/database/database');

require('dotenv').config();

db.serialize(() => {
    db.run(`PRAGMA foreign_keys = ON`);
})

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());

//bypass CORS policy for testing
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

app.use('/worker', workerRouter);
app.use('/manager', managerRouter);

app.listen(PORT, () => {
    console.log('listening on ' + PORT);
});