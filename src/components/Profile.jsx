import React from 'react';

const Profile = ({ user, transactions }) => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-8">User Profile</h2>
      <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl">
        <div className="flex items-center space-x-6 mb-8">
          <div className="w-24 h-24 bg-gradient-to-r from-violet-600 to-pink-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
            {user.name.charAt(0)}
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800">{user.name}</h3>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-600">Username</p>
            <p className="text-lg font-semibold text-gray-800">{user.username}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-600">Member Since</p>
            <p className="text-lg font-semibold text-gray-800">December 2024</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-600">Total Transactions</p>
            <p className="text-lg font-semibold text-gray-800">{transactions.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;