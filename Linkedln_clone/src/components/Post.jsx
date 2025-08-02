// src/pages/Post.jsx
import React, { useState } from 'react';

function Post() {
  const [content, setContent] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!content.trim()) return alert('Post cannot be empty!');
    alert(`Post submitted: ${content}`);
    setContent('');
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
      </form>
    </div>
  );
}

export default Post;
