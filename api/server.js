
const express = require('express');
const server = express();

const actionRouter = require('./actions/actions-router')
const projectRouter = require('./projects/projects-router')

server.use(express.json())
server.use('./api/actions', actionRouter)
server.use('./api/projects', projectRouter)

server.use((err, req, res, next) => {
    res.status(500).json({
        message: err.message,
        stack: err.stack
    })
})

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

module.exports = server;
