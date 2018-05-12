import mongoose from 'mongoose';
var Schema = mongoose.Schema;

export var TagSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
})

export default mongoose.model('Tag', TagSchema);
