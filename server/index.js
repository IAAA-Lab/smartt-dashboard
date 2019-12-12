const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const models = require('./models/Dataset')
const app = express()
const port = 3000
const server = http.createServer(app);

const router = require('./routes/index');

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use((req, res, next) => {
  req.context = {
    models,
  };
  next();
});

app.use('/api',router);


app.get('/', (req, res) => res.status(200).send({
      message: 'Welcome to the default API route',
    }));

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
