import * as mongoose from 'mongoose';
import User from './user.interface';
 
 
const userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [
      {
        ref: 'Post',
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
  });
 
const userModel = mongoose.model<User & mongoose.Document>('User', userSchema);
 
export default userModel;