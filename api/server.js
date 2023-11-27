
const express = require('express');
const server = express();

const actionRouter = require('./actions/actions-router')
const projectRouter = require('./projects/projects-router')


server.use(express.json())
server.use('/api/actions', actionRouter)
server.use('/api/projects', projectRouter)

server.use('/welcome', (req, res) => {
    res.send(`<h1>WElCOME</h1>`)
})

server.use('*', (req, res) => {
 res.status(404).json({
    message:`cant find ${req.method} on ${req.originalUrl}`
 })
})

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

module.exports = server;
