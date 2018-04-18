import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var LessonSchema = new Schema({
  index: Number,
  bookName: String
})

export default mongoose.model('Lesson', LessonSchema);
