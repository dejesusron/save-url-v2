import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name value'],
    },
    birthday: {
      type: Date,
      required: [true, 'Please add a birthday value'],
    },
    email: {
      type: String,
      required: [true, 'Please add a email value'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password value'],
    },
    role: {
      type: String,
      enum: ['user', 'editor', 'admin'],
      default: 'user',
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
