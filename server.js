const express = require('express')
const Promise = require('bluebird')
const bodyParser = require('body-parser')
const app = express()

app.use(express.static('public'))
app.use(bodyParser.json())

const html = `
<!doctype html>
<html class="no-js" lang="">
  <head>
    <meta charset="utf-8">
    <title>Hackathon TAM</title>
    <link rel="stylesheet" href="bootstrap.min.css" />
  </head>
  <body>
    <div id="main">
      
    </div>
    <script src="page.js"></script>
    <script src="app.js"></script>
  </body>
</html>`

app.get('*', (req, res) => {
  res.send(html)
  res.end()
})

app.listen(8000)
