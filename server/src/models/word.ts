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
})

export default mongoose.model('Word', WordSchema);
