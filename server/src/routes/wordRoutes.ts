import express from 'express';
const wordRoutes = express.Router();

import Word from '@models/word';

wordRoutes.route('/').get((req, res) => {
  Word.find({ lesson: req.query.lessonId }, (err, words) => {
    res.json(words);
  });
});

wordRoutes.route('/').post((req, res) => {
  const word = new Word(req.body);
  Word.create(word, (err, word) => {
    if (!!err) {
      res.status(400).json(err.errors);
    } else {
      res.status(201).json(word);
    }
  });
});

wordRoutes.route('/:id').delete((req, res) => {
  Word.findByIdAndRemove(req.params['id'], (err, word) => {
    if (!!err) {
      res.status(400).json(err.errors);
    } else {
      res.json(word);
    }
  });
});

wordRoutes.route('/:id').patch((req, res) => {
  Word.findByIdAndUpdate(req.params['id'], req.body, { new: true }, (err, word) => {
    if (!!err) {
      res.status(400).json(err.errors);
    } else {
      res.json(word);
    }
  })
})

export default wordRoutes;
