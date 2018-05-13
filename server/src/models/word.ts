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

export default mongoose.model('Word', WordSchema);
