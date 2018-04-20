import express from 'express';
const lessonRoutes = express.Router();

import Lesson from '@models/lesson';

lessonRoutes.route('/').get((req, res) => {
  Lesson.find({}, (err, lessons) => {
    res.json(lessons);
  });
});

lessonRoutes.route('/').post((req, res) => {
  const lesson = new Lesson(req.body.lesson);
  Lesson.create(req.body.lesson, (err, lesson) => {
    res.json(lesson);
  });
});

export default lessonRoutes;
