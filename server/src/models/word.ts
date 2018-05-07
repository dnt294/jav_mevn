import mongoose from 'mongoose';
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
  },
  note: {
    type: String,
  },
  lesson: {
    type: Schema.Types.ObjectId,
    ref: 'Lesson'
  }
})

export default mongoose.model('Word', WordSchema);
