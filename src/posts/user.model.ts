import * as mongoose from 'mongoose';
import User from './user.interface';
 
 
const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true
    },
    post: [
      {
        ref: 'Post',
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    number: Number,
    date: Date,
    boolean: Boolean,
    mixed : mongoose.Schema.Types.Mixed,
    decimal : mongoose.Schema.Types.Decimal128
  });
 
const userModel = mongoose.model<User & mongoose.Document>('User', userSchema);
 
export default userModel;