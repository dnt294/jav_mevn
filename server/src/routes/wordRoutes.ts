import express from 'express';
const wordRoutes = express.Router();

import Word, { VerbsAggregation, SurusAggregation, AdjsAggregation, ElsesAggregation, searchFields } from '@models/word';
import removeNullEntries from '@functions/removeNullEntries';
import word from '@models/word';

wordRoutes.route('/').get((req, res) => {
  Word.find({ lesson: req.query.lessonId }, (err, words) => {
    res.json(words);
  });
});

wordRoutes.route('/').post((req, res) => {
  const word = new Word(removeNullEntries(req.body));
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
  Word.findByIdAndUpdate(req.params['id'], removeNullEntries(req.body), { new: true }, (err, word) => {
    if (!!err) {
      res.status(400).json(err.errors);
    } else {
      res.json(word);
    }
  })
});

wordRoutes.route('/verbs').get((req, res) => {
  Word.aggregate(VerbsAggregation, function (err, words) {
    res.json(words);
  });
});

wordRoutes.route('/surus').get((req, res) => {
  Word.aggregate(SurusAggregation, function (err, words) {
    res.json(words);
  });
});

wordRoutes.route('/adjs').get((req, res) => {
  Word.aggregate(AdjsAggregation, function (err, words) {
    res.json(words);
  });
});

wordRoutes.route('/elses').get((req, res) => {
  Word.aggregate(ElsesAggregation, function (err, words) {
    res.json(words);
  });
});

wordRoutes.route('/search').get((req, res) => {
  const keyword = req.query.keyword;
  Word.find(searchFields(keyword)).exec((err, results) => {
    res.json(results);
  });
});

export default wordRoutes;
