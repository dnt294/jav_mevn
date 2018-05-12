import express from 'express';
const tagRoutes = express.Router();

import Tag from '@models/tag';

tagRoutes.route('/').get((req, res) => {
  Tag.find({}, (err, tags) => {
    res.json(tags);
  });
});

tagRoutes.route('/').post((req, res) => {
  const tag = new Tag(req.body);
  Tag.create(tag, (err, tag) => {
    if (!!err) {
      res.status(400).json(err.errors);
    } else {
      res.status(201).json(tag);
    }
  });
});

tagRoutes.route('/:id').delete((req, res) => {
  Tag.findByIdAndRemove(req.params['id'], (err, tag) => {
    if (!!err) {
      res.status(400).json(err.errors);
    } else {
      res.json(tag);
    }
  });
});

tagRoutes.route('/:id').patch((req, res) => {
  Tag.findByIdAndUpdate(req.params['id'], req.body, { new: true }, (err, tag) => {
    if (!!err) {
      res.status(400).json(err.errors);
    } else {
      res.json(tag);
    }
  })
})

export default tagRoutes;
