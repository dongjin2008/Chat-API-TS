import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  username: String
})

const User = mongoose.model('userModel', userSchema)