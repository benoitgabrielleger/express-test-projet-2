// GUIDE
// Guide Title: JWT Authentication Tutorial - Node.js
// Guide Link: https://www.youtube.com/watch?v=mbsmsi7l3r4

// PREREQUISITES
// npm init
// npm install express jsonwebtoken
// npm install --save-dev dotenv nodemon

// NOTE
// nodemon will allow to refresh our server every time we make changes without having to manually end it and restart it.
// mongoose simplifies the interaction with MongoDB.

// RUN
// npm run devStart
// npm run devStartAuth

// TO TEST REST API
// Install "Rest Client" extension in Vscode.
// You can use file with extension ".rest" or ".http" to send requests.

require('dotenv').config()
const express = require('express')
const jwt = require('jsonwebtoken')


// EXPRESS
const app = express()
app.use(express.json())

const posts = [
    {
        username: 'Kyle',
        title: 'Post 1'
    },
    {
        username: 'Jim',
        title: 'Post 2'
    }
]

// ROUTES
app.get('/posts', authenticateToken, (req, res) => {
    res.json(posts.filter(post => post.username === req.user.name))
})

// MIDDLEWARE
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

// LISTEN
app.listen(4000, () => console.log('Server Started'))