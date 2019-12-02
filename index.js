// implement your API here

const db = require('./data/db');
const express = require('express');
const server = express();

server.use(express.json()); // needed to parse JSON from the body

server.get('/', (req, res) => {
    res.send({ api: 'up and running, yea!...' })
})

const port = 4001;
server.listen(port, () => console.log(`!!API RUNNING ON PORT ${port} OH YEAH!!`))