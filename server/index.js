const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const models = require('./models/Dataset')
const app = express()
const port = 3000
const server = http.createServer(app);

const router = require('./routes/index');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

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





if(!module.parent){ app.listen(port); }

module.exports = server;
