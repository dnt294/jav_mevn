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

const SortByLessonAggregation = [
  {
    $lookup: {
      from: "lessons",
      localField: "lesson",
      foreignField: "_id",
      as: "lesson"
    }
  },
  { $unwind: { path: "$lesson" } },
  {
    $group: {
      _id: "$lesson", words: { $push: "$$ROOT" }
    },
  },
  {
    $project: {
      _id: "$_id._id",
      bookName: "$_id.bookName",
      index: "$_id.index",
      words: 1
    }
  },
  {
    $sort: { "_id": 1 }
  }];


export const VerbsAggregation = [
  { $match: { "tags.text": "Động từ" } },
  ...SortByLessonAggregation
];

export const SurusAggregation = [
  { $match: { "tags.text": "Suru Verb" } },
  ...SortByLessonAggregation
];

export const ElsesAggregation = [
  { $match: { "tags.text": { $in: ["Expression", "Adverb", "Suffix"] } } },
  ...SortByLessonAggregation
];

export const AdjsAggregation = [
  { $match: { "tags.text": "Tính từ" } },
  {
    $lookup: {
      from: "lessons",
      localField: "lesson",
      foreignField: "_id",
      as: "lesson"
    }
  },
  { $unwind: { path: "$lesson" } },
  {
    $group: {
      _id: "$lesson",
      iAdjs: {
        $push: { $cond: [{ $eq: ["$$ROOT.adjType", "イ"] }, "$$ROOT", "$noval"] } // $noval is just fake column so nothing added to result.
      },
      naAdjs: {
        $push: { $cond: [{ $eq: ["$$ROOT.adjType", "ナ"] }, "$$ROOT", "$noval"] }
      }
    },
  },
  {
    $project: {
      _id: "$_id._id",
      bookName: "$_id.bookName",
      index: "$_id.index",
      iAdjs: 1,
      naAdjs: 1,
      maxRow: { $max: [{ $size: "$iAdjs" }, { $size: "$naAdjs" }] }
    }
  },
  {
    $sort: { "_id": 1 }
  }
];

export const searchFields = (keyword) => {
  const regExp = new RegExp(keyword);
  return {
    $or: [
      { hirakata: regExp },
      { kanji: regExp }
    ]
  };
};

export default mongoose.model('Word', WordSchema);
