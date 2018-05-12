import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'
import morgan from 'morgan'

require('dotenv').config()

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

import mongoose from 'mongoose';

const mongoDBHost = (app.get('env') === 'development') ? 'mongodb://localhost:27017/jav_mevn' : process.env.MONGODB;

mongoose.connect(mongoDBHost)
  .then(connection => console.log('Connected to MongoDB'))
  .catch(error => console.log(error.message));
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection mongo error'));
db.once('open', function (callback) {
  console.log('connection mongo succeeded');
})

// Routing

import lessonRoutes from './routes/lessonRoutes';
import wordRoutes from './routes/wordRoutes';
import tagRoutes from './routes/tagRoutes';

app.use('/lessons', lessonRoutes);
app.use('/words', wordRoutes);
app.use('/tags', tagRoutes);

//Run app

const port = process.env.PORT || 8081;
app.listen(port, function () {
  console.log('Lestening on port ' + port);
})
