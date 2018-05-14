import mongoose from 'mongoose';

import { TagSchema } from './tag';

var Schema = mongoose.Schema;

var WordSchema = new Schema({
  hirakata: {
    type: String,
    required: true,
  },
  kanji: {
    type: String,
  },
  imi: {
    type: String,
    required: true,
  },
  note: {
    type: String,
  },
  lesson: {
    type: Schema.Types.ObjectId,
    ref: 'Lesson'
  },
  tags: [TagSchema],
  // Verb attributes
  verbType: { type: Number, min: 1, max: 3 },
  masuForm: String,
  teForm: String,
  taForm: String,
  naiForm: String,
  // Adj attributes
  adjType: {
    type: String,
    enum: ['ナ', 'イ']
  }
})

export const VerbsAggregation = [
  { "$match": { "tags.text": "Động từ" } },
  {
    "$lookup": {
      "from": "lessons",
      "localField": "lesson",
      "foreignField": "_id",
      "as": "lesson"
    }
  },
  { "$unwind": { "path": "$lesson" } },
  {
    "$group": {
      "_id": "$lesson", "words": { $push: "$$ROOT" }
    },
  },
  {
    "$project": {
      "_id": "$_id._id",
      "bookName": "$_id.bookName",
      "index": "$_id.index",
      "words": 1
    }
  },
  {
    "$sort": { "_id": 1 }
  }];

export default mongoose.model('Word', WordSchema);
