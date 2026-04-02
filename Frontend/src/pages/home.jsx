import React from 'react';
import { 
  BrainCircuit, 
  FileSearch, 
  MessageSquareCheck, 
  ArrowRight, 
  PlayCircle, 
  CheckCircle2, 
  Network
} from 'lucide-react';
import { Link } from 'react-router';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans selection:bg-cyan-900 selection:text-cyan-100">
      
      {/* Navigation Bar */}
      <nav className="border-b border-gray-800 bg-gray-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="bg-cyan-500/10 p-2 rounded-lg">
              <BrainCircuit className="w-6 h-6 text-cyan-400" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Talent<span className="text-cyan-400">Sync</span> AI
            </span>
          </div>

          {/* Center Links (Hidden on Mobile) */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <a href="#how-it-works" className="hover:text-cyan-400 transition-colors">How it Works</a>
            <a href="#xai-scorecards" className="hover:text-cyan-400 transition-colors">XAI Scorecards</a>
          </div>

          {/* Auth Gateway (Top Right) */}
          <div className="flex items-center gap-4">
            <button className="text-sm font-medium text-gray-300 hover:text-white transition-colors hidden sm:block">
              <Link to='/login'>Log In</Link>
            </button>
            <button className="bg-cyan-600 hover:bg-cyan-500 text-gray-950 text-sm font-semibold py-2.5 px-5 rounded-lg transition-all duration-200 shadow-[0_0_15px_rgba(8,145,178,0.3)] hover:shadow-[0_0_25px_rgba(8,145,178,0.5)]">
              <Link to='/signup'>Sign Up</Link>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 pt-20 pb-24 md:pt-32 md:pb-40 flex flex-col-reverse md:flex-row items-center gap-16">
        
        {/* Left Side: Copy & CTAs */}
        <div className="flex-1 flex flex-col items-start text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/50 border border-cyan-800/50 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-6">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            Internal Recruiter Portal
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
            Hire smarter,<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              not harder.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-xl leading-relaxed">
            Your AI assistant for instant, verified technical screening. Skip the keyword guessing and instantly surface top tech talent with explainable precision.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-gray-950 hover:bg-gray-100 font-bold py-3.5 px-8 rounded-lg transition-colors text-lg">
              Start New Screening
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-transparent text-white border border-gray-700 hover:border-gray-500 hover:bg-gray-800 font-semibold py-3.5 px-8 rounded-lg transition-colors text-lg">
              <PlayCircle className="w-5 h-5 text-gray-400" />
              View Scorecard Example
            </button>
          </div>
        </div>

        {/* Right Side: Abstract Visual */}
        <div className="flex-1 w-full relative flex justify-center items-center">
          {/* Decorative glowing background blobs */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-cyan-600/20 rounded-full blur-[80px]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-blue-600/20 rounded-full blur-[60px]"></div>
          
          {/* Abstract Resume Verification Card */}
          <div className="relative z-10 bg-gray-800/80 backdrop-blur-xl border border-gray-700 p-8 rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-start justify-between mb-8">
              <div className="w-16 h-16 bg-gray-900 rounded-xl border border-gray-700 flex items-center justify-center shadow-inner">
                <Network className="w-8 h-8 text-cyan-400" />
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs font-bold text-gray-500 uppercase">Match Score</span>
                <span className="text-3xl font-extrabold text-white">96<span className="text-cyan-400">%</span></span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="h-3 w-3/4 bg-gray-700 rounded-full"></div>
              <div className="h-3 w-1/2 bg-gray-700 rounded-full"></div>
              <div className="h-3 w-5/6 bg-gray-700 rounded-full"></div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-700/50">
              <div className="flex items-center gap-3 text-emerald-400 bg-emerald-400/10 py-2.5 px-4 rounded-lg border border-emerald-400/20">
                <CheckCircle2 className="w-5 h-5" />
                <span className="text-sm font-semibold">Micro-Interview Verified</span>
              </div>
            </div>
          </div>
        </div>

      </main>

      {/* Recruiter Workflow Grid (Core Features) */}
      <section className="border-t border-gray-800 bg-gray-950 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Screening, completely upgraded.</h2>
            <p className="text-gray-400 text-lg">Designed specifically to accelerate the recruiter workflow.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-900 border border-gray-800 p-8 rounded-2xl hover:border-cyan-500/50 transition-colors group">
              <div className="bg-gray-800 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:bg-cyan-900/30 transition-colors">
                <BrainCircuit className="w-7 h-7 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Smart JD Matching</h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                The AI automatically expands your job requirements. If you ask for React, we know to look for Next.js too, eliminating manual keyword guessing.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-900 border border-gray-800 p-8 rounded-2xl hover:border-cyan-500/50 transition-colors group">
              <div className="bg-gray-800 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:bg-cyan-900/30 transition-colors">
                <FileSearch className="w-7 h-7 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Contextual Scoring</h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                Stop losing great candidates to strict ATS filters. We score overall potential and trajectory symmetrically alongside hard technical skills.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-900 border border-gray-800 p-8 rounded-2xl hover:border-cyan-500/50 transition-colors group">
              <div className="bg-gray-800 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:bg-cyan-900/30 transition-colors">
                <MessageSquareCheck className="w-7 h-7 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Chat Verification</h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                Top matches are instantly sent a 3-minute technical chat assessment. They prove their skills before you ever have to schedule a screening call.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;