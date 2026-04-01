import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Building2, Briefcase, UserPlus } from 'lucide-react'; // Icons

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Function to simulate demo login
  const handleDemoLogin = () => {
    setEmail('alex@talentsync.ai');
    setPassword('demo_password_123');
    // Simulate successful login/redirect for demo purposes
    console.log('Logging in as demo user...');
    // Replace with actual login logic/routing
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log('Logging in with:', email, password, rememberMe);
    // Replace with actual login logic
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex font-sans">
      {/* Left Side: Form Area */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 md:p-16">
        <div className="w-full max-w-md">
          {/* Logo/Title */}
          <div className="flex items-center gap-3 mb-10 justify-center md:justify-start">
            <Building2 className="w-10 h-10 text-cyan-400" />
            <h1 className="text-4xl font-bold tracking-tight">Talent<span className="text-cyan-400">Sync</span> AI</h1>
          </div>

          <h2 className="text-2xl font-semibold mb-6">Recruiter Login</h2>
          <p className="text-gray-400 mb-8">Access your personalized neuro-symbolic hiring workspace.</p>

          {/* Login Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-6">
            <div className="relative">
              <label htmlFor="email" className="block text-sm font-medium mb-1 text-gray-300">Work Email Address</label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 placeholder-gray-600"
                  required
                />
              </div>
            </div>

            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium mb-1 text-gray-300">Password</label>
              <div className="relative flex items-center">
                <Lock className="absolute left-3 w-5 h-5 text-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 placeholder-gray-600"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 focus:outline-none"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-5 h-5 text-gray-500" /> : <Eye className="w-5 h-5 text-gray-500" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-700 rounded bg-gray-800"
                />
                <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-300">Remember Me</label>
              </div>
              <a href="#" className="text-sm text-cyan-400 hover:text-cyan-300 font-medium">Forgot Password?</a>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-cyan-600 hover:bg-cyan-500 text-gray-950 font-semibold rounded-md transition duration-200"
            >
              Log In securely
            </button>
          </form>

          {/* Single Sign-On */}
          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <p className="text-sm text-gray-400 mb-5">Or sign in with corporate account</p>
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 py-2 px-4 border border-gray-700 rounded-md hover:bg-gray-800">
                <img src="https://authjs.dev/img/providers/google.svg" alt="Google" className="h-5 w-5" />
                Google Workspace
              </button>
              <button className="flex items-center justify-center gap-2 py-2 px-4 border border-gray-700 rounded-md hover:bg-gray-800">
                <img src="https://authjs.dev/img/providers/linkedin.svg" alt="LinkedIn" className="h-5 w-5" />
                LinkedIn
              </button>
            </div>
          </div>

          {/* Prominent Demo Login Button */}
          <div className="mt-10 pt-10 border-t border-gray-800 text-center">
            <button
              onClick={handleDemoLogin}
              className="w-full py-3 px-6 bg-gray-100 hover:bg-gray-200 text-gray-950 font-bold rounded-lg transition duration-200 flex items-center justify-center gap-3 text-lg"
            >
              <Briefcase className="w-6 h-6" />
              Login as Demo Recruiter (Guest)
            </button>
          </div>

          <p className="mt-8 text-sm text-gray-400 text-center">
            Don't have an account? <a href="#" className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1 justify-center mt-2"><UserPlus className='w-4 h-4' /> Sign up for TalentSync AI</a>
          </p>

        </div>
      </div>

      {/* Right Side: Visual/USP Area (Visible on md+) */}
      <div className="hidden md:flex flex-1 flex-col justify-center items-center bg-gray-950 p-16 text-center">
        <div className="w-full max-w-lg space-y-8">
          <div className="relative aspect-square border-4 border-dashed border-gray-800 rounded-3xl p-10 flex items-center justify-center">
              {/* Replace with your animated Radar Chart component or a clean image/GIF representation */}
              <div className='w-full h-full bg-gray-800 rounded-2xl flex items-center justify-center text-gray-600 font-mono'>[Neuro-Symbolic Radar Chart Visual Here]</div>
              <div className="absolute top-6 right-6 flex items-center gap-1 bg-cyan-900 border border-cyan-700 text-cyan-200 px-3 py-1 rounded-full text-xs font-semibold">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div> Local Processing
              </div>
          </div>
          <h2 className="text-5xl font-extrabold tracking-tighter text-white">Stop guessing. <span className="text-cyan-400">Start hiring.</span></h2>
          <p className="text-2xl font-light text-gray-300">
            Automate technical screening with explainable AI. <br />
            Validate competency 95% faster.
          </p>
          <div className="grid grid-cols-2 gap-6 text-sm text-gray-400 pt-8 border-t border-gray-800">
              <div className='p-4 bg-gray-800 rounded-xl'>🧠 Symbolically Expanded <br/>Skills</div>
              <div className='p-4 bg-gray-800 rounded-xl'>Verified Chatbot <br/>Validation</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;