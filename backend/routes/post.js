import express from 'express';
import { createPost, getPostsByUser,getAllPosts } from '../controllers/postController.js';
import { authentication } from '../authentication/authentication.js';

const router = express.Router();

router.post('/createPost',authentication, createPost);          // Specific route first
router.get('/user/:userId', getPostsByUser);    // Parameterized route after

router.get('/all', getAllPosts);

export default router;
