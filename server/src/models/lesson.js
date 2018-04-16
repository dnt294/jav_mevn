import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var LessonSchema = new Schema({
  index: number,
  bookName: string
})

module.exports = mongoose.model('Lesson', LessonSchema);
