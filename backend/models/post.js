import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, 'Post content is required'],
      trim: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to your User model
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Users who liked the post
      }
    ],
  },
  {
    timestamps: true, // adds createdAt & updatedAt fields automatically
  }
);

const Post = mongoose.model('Post', postSchema);
export default Post;
