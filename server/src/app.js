const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/jav_mevn');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection mongo error'));
db.once('open', function(callback) {
  console.log('connection mongo succeeded');
})

const port = process.env.PORT || 8081;
app.listen(port, function() {
  console.log('Lestening on port ' + port);
})
