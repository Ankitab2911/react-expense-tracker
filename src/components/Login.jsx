import React, { useState, useEffect } from 'react';
import { Wallet } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);

  // Demo user
  const demoUser = {
    username: 'demo',
    password: 'demo123',
    name: 'John Doe',
    email: 'john@example.com'
  };

  // Load users from localStorage
  const getUsers = () => {
    return JSON.parse(localStorage.getItem('users')) || [];
  };

  // Save users to localStorage
  const saveUsers = (users) => {
    localStorage.setItem('users', JSON.stringify(users));
  };

  // Login logic
  const handleLogin = () => {
    // Demo login
    if (username === demoUser.username && password === demoUser.password) {
      onLogin(demoUser);
      return;
    }

    const users = getUsers();
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      onLogin(user);
    } else {
      alert('Invalid credentials!');
    }
  };

  // Register logic
  const handleRegister = () => {
    if (!username || !password) {
      alert('Please fill all fields');
      return;
    }

    const users = getUsers();

    const userExists = users.some((u) => u.username === username);
    if (userExists) {
      alert('User already exists!');
      return;
    }

    const newUser = {
      username,
      password,
      name: username,
      email: `${username}@example.com`
    };

    users.push(newUser);
    saveUsers(users);

    alert('Registration successful! You can now login.');
    setIsRegister(false);
    setUsername('');
    setPassword('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      isRegister ? handleRegister() : handleLogin();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-600 via-purple-600 to-pink-600 flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-gradient-to-r from-violet-600 to-pink-600 rounded-2xl mb-4">
            <Wallet className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {isRegister ? 'Register' : 'Expense Tracker'}
          </h1>
          <p className="text-gray-600">
            {isRegister ? 'Create a new account' : 'Manage your finances with ease'}
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-violet-500 outline-none"
              placeholder="Enter username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-violet-500 outline-none"
              placeholder="Enter password"
            />
          </div>

          <button
            onClick={isRegister ? handleRegister : handleLogin}
            className="w-full bg-gradient-to-r from-violet-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:scale-105 transition"
          >
            {isRegister ? 'Register' : 'Login'}
          </button>
        </div>

        {!isRegister && (
          <>
            <div className="mt-6 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or</span>
              </div>
            </div>

            <button
              onClick={() => onLogin(demoUser)}
              className="mt-4 w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200"
            >
              Try Demo Account
            </button>
          </>
        )}

        <p
          className="text-center text-sm text-violet-600 mt-4 cursor-pointer hover:underline"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister
            ? 'Already have an account? Login'
            : 'New user? Register here'}
        </p>

        {!isRegister && (
          <p className="text-center text-sm text-gray-600 mt-2">
            Demo: demo / demo123
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
