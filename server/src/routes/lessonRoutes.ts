import express from 'express';
const lessonRoutes = express.Router();

import Lesson from '@models/lesson';

lessonRoutes.route('/').get((req, res) => {
  Lesson.find({}, (err, lessons) => {
    res.json(lessons);
  });
});

lessonRoutes.route('/').post((req, res) => {
  const lesson = new Lesson(req.body);
  Lesson.create(lesson, (err, lesson) => {
    if (!!err) {
      res.status(400).json(err.errors);
    } else {
      res.status(201).json(lesson);
    }
  });
});

lessonRoutes.route('/:id').delete((req, res) => {
  Lesson.findByIdAndRemove(req.params['id'], (err, lesson) => {
    if (!!err) {
      res.status(400).json(err.errors);
    } else {
      res.json(lesson);
    }
  });
});

lessonRoutes.route('/:id').patch((req, res) => {
  Lesson.findByIdAndUpdate(req.params['id'], req.body, { new: true }, (err, lesson) => {
    if (!!err) {
      res.status(400).json(err.errors);
    } else {
      res.json(lesson);
    }
  })
})

export default lessonRoutes;
