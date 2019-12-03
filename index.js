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

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id
    db.findById(id)
        .then(id => {
            if(id) {
                res.status(200).json(id)
            } else {
                res.status(404)
                .json( {message:'The user with the specified ID does not exist'})
            }
        })
        .catch(error => {
            console.log('Error in the GET /api/users/:id')
            res
                .status(500)
                .json( {error: 'The user information could not be retrieved.'} )
        })
})



// POST request that creates user using the info sent in req body
server.post('/api/users', (req, res) => {
    const userData = req.body;
    if(userData.name && userData.bio) {
        db.insert(userData)
        .then(user => {
            res.status(201).json({...user, ...userData})
        })
    } else {
        res.status(400).json({ errorMessage: 'Provide name and bio for user' })
    }
})

// DELETE request 
server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id
    db.remove(id)
        .then(id => {
            if(id) {
                res.status(200).json({ message: `user was removed`})
            } else {
                res
                    .status(404)
                    .json({ message: 'The user with the specified ID does not exist.'})
            }
        })
        .catch(error => {
            res.status(500).json({ error: 'The user could not be removed'})
        })
})

// PUT request
server.put('/api/users/:id', (req, res) => {
    const id = req.params.id
    const userData = req.body
    if(userData.name && userData.bio) {
        db.update(id, userData)
        .then(id => {
            if(id) {
                res.status(200).json({...id, ...userData})
            } else {
                res.status(404).json({ message: 'The user with the specified ID does not exist.'})
            }
        })
        .catch(error => {
            res.status(500).json({ error: 'The user information could not be modified'})
        })
    } else {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    }
})


const port = 4001;
server.listen(port, () => console.log(`!!API RUNNING ON PORT ${port} OH YEAH!!`))