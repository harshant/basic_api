import * as mongoose from 'mongoose';
import Post from './posts.interface';
 
const postSchema = new mongoose.Schema({
  user: [
    {
      ref: 'User',
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
  title: {
    type: String,
    required: true,
    unique: true
  },
  content: String,
  number: Number,
  date: Date,
  boolean: Boolean,
  mixed : mongoose.Schema.Types.Mixed,
  decimal : mongoose.Schema.Types.Decimal128
});
 
const postModel = mongoose.model<Post & mongoose.Document>('Post', postSchema);
 
export default postModel;