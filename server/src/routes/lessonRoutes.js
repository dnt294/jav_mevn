import express from 'express';
const app = express();
const lessonRoutes = express.Router();

import lesson from '../models/lesson';

lessonRoutes.route('/').get((req, res) => {
  res.json({
    status: 'ok'
  })
});

lessonRoutes.route('/').post((req, res) => {

});

module.exports = lessonRoutes;
