import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const success = await login(email, password);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Invalid email or password');
    }
  };

  const quickLogin = async (userEmail: string) => {
    setEmail(userEmail);
    setPassword('demo123');
    const success = await login(userEmail, 'demo123');
    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-merkle-primary via-merkle-accent to-merkle-secondary p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-block"
          >
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-2xl">
              <span className="text-4xl font-bold text-gradient">M</span>
            </div>
          </motion.div>
          <h1 className="text-4xl font-display font-bold text-white mb-2">
            Merkle AI Platform
          </h1>
          <p className="text-white/80 text-lg">
            Your Collaborative Workspace for the Future
          </p>
        </div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-2xl p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="label">
                <Mail className="inline-block w-4 h-4 mr-2" />
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="you@merkle.com"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="label">
                <Lock className="inline-block w-4 h-4 mr-2" />
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="••••••••"
                required
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="mr-2 w-4 h-4 text-merkle-primary focus:ring-2 focus:ring-merkle-primary rounded"
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-sm text-merkle-primary hover:underline">
                Forgot password?
              </a>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm"
              >
                {error}
              </motion.div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span>Signing in...</span>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>

          {/* SSO Options */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <button
                type="button"
                className="btn-secondary text-sm py-3"
                onClick={() => setError('SSO is not available in demo mode')}
              >
                <svg className="w-5 h-5 inline-block mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M23.5 12.3c0-.9-.1-1.7-.2-2.5H12v4.5h6.5c-.3 1.4-1.1 2.6-2.4 3.4v3h3.9c2.3-2.1 3.5-5.2 3.5-8.4z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 24c3.2 0 6-1.1 8-2.9l-3.9-3c-1.1.7-2.5 1.2-4.1 1.2-3.1 0-5.8-2.1-6.7-5H1.2v3.1C3.1 21.1 7.2 24 12 24z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.3 14.3c-.2-.7-.4-1.5-.4-2.3s.1-1.6.4-2.3V6.6H1.2C.4 8.2 0 10 0 12s.4 3.8 1.2 5.4l4.1-3.1z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 4.8c1.8 0 3.4.6 4.6 1.8l3.5-3.5C18 1.1 15.2 0 12 0 7.2 0 3.1 2.9 1.2 7.1l4.1 3.1c.9-2.9 3.6-5 6.7-5.4z"
                  />
                </svg>
                Google
              </button>
              <button
                type="button"
                className="btn-secondary text-sm py-3"
                onClick={() => setError('SSO is not available in demo mode')}
              >
                <svg className="w-5 h-5 inline-block mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M23.64 11.28c0-.66-.05-1.3-.15-1.92H12v3.62h6.52c-.28 1.5-1.13 2.77-2.4 3.62v2.96h3.88c2.27-2.09 3.58-5.17 3.58-8.82z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 24c3.24 0 5.95-1.07 7.93-2.91l-3.88-3.01c-1.07.72-2.44 1.15-4.05 1.15-3.11 0-5.74-2.1-6.68-4.92H1.23v3.11C3.19 21.11 7.26 24 12 24z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.32 14.31c-.24-.72-.38-1.49-.38-2.31s.14-1.59.38-2.31V6.58H1.23C.44 8.16 0 9.96 0 12s.44 3.84 1.23 5.42l4.09-3.11z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 4.77c1.75 0 3.32.6 4.55 1.79l3.41-3.41C17.95 1.19 15.24 0 12 0 7.26 0 3.19 2.89 1.23 7.11l4.09 3.11C6.26 6.88 8.89 4.77 12 4.77z"
                  />
                </svg>
                Microsoft
              </button>
            </div>
          </div>

          {/* Demo Accounts */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center mb-4">
              Quick Login (Demo Accounts)
            </p>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => quickLogin('pm@merkle.com')}
                className="w-full text-sm py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Project Manager
              </button>
              <button
                type="button"
                onClick={() => quickLogin('dev@merkle.com')}
                className="w-full text-sm py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Developer
              </button>
              <button
                type="button"
                onClick={() => quickLogin('ba@merkle.com')}
                className="w-full text-sm py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Business Analyst
              </button>
              <button
                type="button"
                onClick={() => quickLogin('alexandra.morgan@merkle.com')}
                className="w-full text-sm py-2 px-4 bg-gradient-to-r from-purple-100 to-blue-100 hover:from-purple-200 hover:to-blue-200 rounded-lg transition-colors font-medium text-purple-900"
              >
                Strategist 🎯
              </button>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <p className="text-center text-white/60 text-sm mt-8">
          &copy; 2024 Merkle - A dentsu company. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
