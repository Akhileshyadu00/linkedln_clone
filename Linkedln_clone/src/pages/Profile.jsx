// src/pages/Profile.jsx
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  // Fetch user posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4001/api/post/user/${user.id}`,
          {
            headers: {
              Authorization: `JWT ${token}`,
            },
            withCredentials: true,
          }
        );
        setUserPosts(res.data.posts);
      } catch (err) {
        console.error('Failed to load user posts:', err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) fetchPosts();
  }, [user, token]);

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Profile Info */}
        <div className="bg-white shadow p-6 rounded-lg md:col-span-1">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Profile</h2>
          <div className="space-y-2">
            <p className="text-gray-600"><span className="font-semibold">Name:</span> {user.userName}</p>
            <p className="text-gray-600"><span className="font-semibold">Email:</span> {user.email}</p>
          </div>
        </div>

        {/* Right Column: User Posts */}
        <div className="md:col-span-2 space-y-6">
          <h3 className="text-xl font-semibold text-gray-800">Your Posts</h3>
          {loading ? (
            <p className="text-gray-500">Loading posts...</p>
          ) : userPosts.length > 0 ? (
            userPosts.map(post => (
              <div key={post._id} className="bg-white shadow p-5 rounded-lg">
                <p className="text-gray-700">{post.content}</p>
                <p className="text-sm text-gray-400 mt-2">
                  {new Date(post.createdAt).toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">You haven't posted anything yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
