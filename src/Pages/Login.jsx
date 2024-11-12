import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import { useFirebase } from '../context/Firebase';
import { toast } from 'react-toastify';

const Login = () => {


// ___________________________State

  const navigate = useNavigate();
  const {signInWithGoogle, signInUserWithEmailAndPassword, user, loading, error} = useFirebase();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(null);



// ___________________________Google SignIn

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      if (result) {
        console.log("Google sign-in successful");
        navigate('/');
      }
    } catch (err) {
      console.error('Google sign-in error:', err);
      toast.error(err.message, {position: 'top-center'});
    }
  };




// ___________________________Email SignIn


  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    setLoginError(null);
    try {
      const result = await signInUserWithEmailAndPassword(email, password);
      if (result) {
        console.log("Email sign-in successful");
        navigate('/');
        toast.success('Sign in successful!', {position: 'top-left'});
      }
    } catch (err) {
      setLoginError(err.message);
      toast.error(err.message, {position: 'top-center'});
      console.error('Email sign-in error:', err);
    }
  };



// ___________________________Return




  return (
    <div className="min-h-screen flex justify-center items-start bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white rounded-xl shadow-lg p-8 ">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Welcome back! Please sign in to continue.
          </p>
        </div>
        
        <div className="mt-8 space-y-6">
          {/* Email/Password Form */}
          <form onSubmit={handleEmailSignIn} className="space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
            
            {loginError && (
              <div className="text-red-500 text-sm text-center">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">Or continue with</span>
            </div>
          </div>

          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
          >
            <FcGoogle className="h-5 w-5 mr-2" />
            Sign in with Google
          </button>
          
          <div className="text-sm text-center">
            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
              Need help signing in?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;