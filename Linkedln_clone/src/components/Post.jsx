// src/pages/Post.jsx
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function Post() {
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');
  const { token, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!content.trim()) {
      setMessage('Post cannot be empty.');
      return;
    }

    try {
      const res = await axios.post(
        'http://localhost:4001/api/post/createPost',
        { content },
        {
          headers: {
            Authorization: `JWT ${token}`,
          },
          withCredentials: true,
        }
      );
      console.log(res);
      
      setContent('');
      setMessage('Post created successfully!');
      setTimeout(() => navigate('/profile'), 1000);
    } catch (err) {
      console.error('Post creation error:', err);
      if (err.response?.data?.message) {
        setMessage(err.response.data.message);
      } else {
        setMessage('Something went wrong. Try again.');
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Create a Post</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4">
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full h-32 border border-gray-300 p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md"
        >
          Post
        </button>

        {message && (
          <p className={`text-center text-sm mt-2 ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
}

export default Post;
