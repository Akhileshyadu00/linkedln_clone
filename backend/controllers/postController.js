import Post from '../models/post.js';
import User from '../models/user.js'; // ✅ Add this line

// Create a new post
export const createPost = async (req, res) => {
  try {
    const { content } = req.body;
    const userId = req.user.id; // from JWT middleware

    const post = await Post.create({
      content,
      author: userId,
    });

    res.status(201).json({ message: 'Post created', post });
  } catch (error) {
    console.error("Create Post Error:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get posts created by a specific user
export const getPostsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ message: 'User not found' });
    }

    const posts = await Post.find({ author: userId })
      .populate('author', 'userName email') // Populate author data
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: `Posts by ${userExists.userName}`,
      count: posts.length,
      posts,
    });
  } catch (error) {
    console.error('Error fetching user posts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

//all post
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'userName email') 
      .sort({ createdAt: -1 });

    res.status(200).json({ message: 'All posts', posts });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching posts' });
  }
};
