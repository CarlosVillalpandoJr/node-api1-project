// implement your API here

const db = require('./data/db');
const express = require('express');
const server = express();

server.use(express.json()); // needed to parse JSON from the body

server.get('/', (req, res) => {
    res.send({ api: 'up and running, yea!...' })
})

// GET request that returns array of all user objects: /api/users
server.get('/api/users', (req, res) => {
    db.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(error => {
            console.log('Error in the GET /api/users')
            res
                .status(500)
                .json( {errorMessage: 'The users information could not be retrieved.'} )
        })
})

const port = 4001;
server.listen(port, () => console.log(`!!API RUNNING ON PORT ${port} OH YEAH!!`))