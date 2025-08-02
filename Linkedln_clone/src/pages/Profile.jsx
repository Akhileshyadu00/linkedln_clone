// src/pages/Profile.jsx
import React from 'react';

function Profile() {
  // Dummy user data
  const user = {
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
  };

  // Dummy user posts
  const userPosts = [
    {
      id: 1,
      content: 'Just finished building my React project!',
      time: '1 hour ago',
    },
    {
      id: 2,
      content: 'Excited to join TechNova!',
      time: '1 day ago',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Column: Profile Info */}
        <div className="bg-white shadow p-6 rounded-lg md:col-span-1">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Profile</h2>
          <div className="space-y-2">
            <p className="text-gray-600"><span className="font-semibold">Name:</span> {user.name}</p>
            <p className="text-gray-600"><span className="font-semibold">Email:</span> {user.email}</p>
          </div>
        </div>

        {/* Right Column: User Posts */}
        <div className="md:col-span-2 space-y-6">
          <h3 className="text-xl font-semibold text-gray-800">Your Posts</h3>
          {userPosts.length > 0 ? (
            userPosts.map(post => (
              <div key={post.id} className="bg-white shadow p-5 rounded-lg">
                
                <p className="text-gray-700">{post.content}</p>
                <p className="text-sm text-gray-400 mt-2">{post.time}</p>
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
