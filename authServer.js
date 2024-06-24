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

// TO TEST REST API
// Install "Rest Client" extension in Vscode.
// You can use file with extension ".rest" or ".http" to send requests.

import express from 'express'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

// EXPRESS
const app = express()
app.use(express.json())

app.post('/login', (req, res) => {
    const username = req.body.username
    const user = { name: username }
    const accessToken = generateAccessToken(user)
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    refreshTokens.push(refreshToken)
    res.json({ accessToken: accessToken, refreshToken: refreshToken })
})

let refreshTokens = []

app.post('/token', (req, res) => {
    const refreshToken = req.body.token
    console.log(refreshToken)
    if (refreshToken == null) return res.sendStatus(401)
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        const accessToken = generateAccessToken({ name: user.name })
        res.json({ accessToken: accessToken })
    })
})

app.delete('/logout', (req, res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token)
    res.sendStatus(204)
})

// MIDDLEWARE
function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' })
}

// LISTEN
app.listen(3000, () => console.log('authServer Started'))