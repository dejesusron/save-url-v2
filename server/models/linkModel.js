import mongoose from 'mongoose';

const linkSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: [true, 'Please add a title value'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description value'],
    },
    url: {
      type: String,
      required: [true, 'Please add a url value'],
    },
    type: {
      type: String,
      required: [true, 'Please add a type value'],
    },
  },
  { timestamps: true }
);

const Link = mongoose.model('Link', linkSchema);

export default Link;
