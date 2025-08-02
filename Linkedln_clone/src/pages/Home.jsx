import React from 'react';

function Home() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-12 bg-gray-50 min-h-screen">
      {/* Left Section - Text & Buttons */}
      <div className="flex-1 max-w-xl space-y-8">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
          Welcome to Our Community
        </h2>

        {/* Sign In Options */}
        <div className="space-y-4">
          <button className="w-full bg-white border border-gray-300 shadow-sm text-gray-800 font-medium py-3 px-6 rounded-md hover:bg-gray-100 transition-all duration-300">
            Sign in with Google
          </button>
          <button className="w-full bg-blue-600 text-white font-medium py-3 px-6 rounded-md hover:bg-blue-700 transition-all duration-300">
            Sign in with Email
          </button>
        </div>

        {/* Terms and Conditions */}
        <p className="text-sm text-gray-600">
          By clicking Continue to join or sign in, you agree to LinkedIn’s{' '}
          <span className="text-blue-600 hover:underline cursor-pointer">
            User Agreement
          </span>,{' '}
          <span className="text-blue-600 hover:underline cursor-pointer">
            Privacy Policy
          </span>, and{' '}
          <span className="text-blue-600 hover:underline cursor-pointer">
            Cookie Policy
          </span>.
        </p>

        {/* Sign Up Prompt */}
        <p className="text-md text-gray-700">
          New to LinkedIn?{' '}
          <span className="text-blue-600 font-semibold hover:underline cursor-pointer">
            Join Now
          </span>
        </p>
      </div>

      {/* Right Section - Image */}
      <div className="flex-1 mt-10 md:mt-0 flex justify-center">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU5ZDrjOyq6vWv8I43JL3ZpctdAF8snKA2ztFSm2PedyP9dOIKVBpLsItB7IrR9hfx-Z8&usqp=CAU"
          alt="Community"
          className="w-full max-w-md rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
}

export default Home;
