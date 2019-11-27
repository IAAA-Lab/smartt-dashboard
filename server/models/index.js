const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/poblacion/mujeres16', db.getMujeres16)
app.get('/poblacion/hombres16', db.getHombres16)

app.get('/poblacion/mujeres17', db.getMujeres17)
app.get('/poblacion/hombres17', db.getHombres17)

app.get('/poblacion/mujeres18', db.getMujeres18)
app.get('/poblacion/hombres18', db.getHombres18)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
