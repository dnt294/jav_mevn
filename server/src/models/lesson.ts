import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var LessonSchema = new Schema({
  index: {
    type: Number,
    required: true,
  },
  bookName: {
    type: String,
    required: true,
  },
})

export default mongoose.model('Lesson', LessonSchema);
