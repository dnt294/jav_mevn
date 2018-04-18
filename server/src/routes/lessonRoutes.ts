import express from 'express';
const lessonRoutes = express.Router();

import lesson from '@models/lesson';

lessonRoutes.route('/').get((req, res) => {
  res.json({
    status: 'ok fine'
  })
});

lessonRoutes.route('/').post((req, res) => {

});

export default lessonRoutes;
