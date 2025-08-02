// src/pages/Feeds.jsx
import React from 'react';

function Feeds() {
  // Dummy posts
  const posts = [
    {
      id: 1,
      author: 'Jane Doe',
      content: 'Excited to start my new role at TechCorp!',
      time: '2 hours ago',
    },
    {
      id: 2,
      author: 'John Smith',
      content: 'Anyone going to the dev meetup this weekend?',
      time: '5 hours ago',
    },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Feeds</h1>
      <div className="space-y-6">
        {posts.map(post => (
          <div key={post.id} className="bg-white shadow p-5 rounded-lg">
            <h2 className="font-semibold text-lg text-blue-600">{post.author}</h2>
            <p className="mt-2 text-gray-700">{post.content}</p>
            <p className="text-sm text-gray-400 mt-2">{post.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Feeds;
