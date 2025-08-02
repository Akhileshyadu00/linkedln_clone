import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('https://linkedln-clone-1.onrender.com/api/post/all');
        setPosts(res.data.posts);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch posts.');
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">All Posts</h1>

      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : posts.length === 0 ? (
        <p className="text-gray-600">No posts available.</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} className="bg-white shadow rounded-lg p-6 mb-4">
            <div className="flex justify-between items-center mb-2">
              <p className="text-gray-800 font-semibold">
                {post.author?.userName || 'Unknown User'}
              </p>
              <p className="text-sm text-gray-400">
                {new Date(post.createdAt).toLocaleString()}
              </p>
            </div>
            <p className="text-gray-700">{post.content}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;
