import express from 'express';
import bodyParser from 'body-parser';
import cors  from 'cors'
import morgan from 'morgan'

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
