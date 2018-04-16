import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var LessonSchema = new Schema({
  index: Number,
  bookName: String
})

module.exports = mongoose.model('Lesson', LessonSchema);
