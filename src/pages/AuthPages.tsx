import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { TOOLS_DATA } from '../data/toolsData';
import {
  Lock, Mail, User, ArrowRight, CheckCircle2, ShieldCheck,
  AlertCircle, Heart, LogOut, Edit3, Sparkles
} from 'lucide-react';

interface AuthPageProps {
  mode: 'login' | 'signup' | 'forgot' | 'dashboard';
  onNavigate: (path: string) => void;
}

export const AuthPages: React.FC<AuthPageProps> = ({ mode, onNavigate }) => {
  const { currentUser, login, loginWithGoogle, signup, forgotPassword, logout, updateProfile, toggleSavedTool } = useAuth();

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // Profile editing state
  const [editName, setEditName] = useState(currentUser?.displayName || '');
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    try {
      if (mode === 'login') {
        if (!email) {
          setErrorMsg('Please enter your email address');
          setLoading(false);
          return;
        }
        await login(email, password);
        onNavigate('/dashboard');
      } else if (mode === 'signup') {
        if (!name || !email) {
          setErrorMsg('Please enter your full name and email address');
          setLoading(false);
          return;
        }
        await signup(name, email, password);
        onNavigate('/dashboard');
      } else if (mode === 'forgot') {
        if (!email) {
          setErrorMsg('Please enter your email address to reset password');
          setLoading(false);
          return;
        }
        const res = await forgotPassword(email);
        setSuccessMsg(res.message);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Authentication failed. Please try again.';
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await loginWithGoogle();
      onNavigate('/dashboard');
    } catch {
      setErrorMsg('Google login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Dashboard Mode
  if (mode === 'dashboard') {
    if (!currentUser) {
      return (
        <div className="mx-auto max-w-lg px-4 py-16 text-center">
          <div className="rounded-2xl bg-white p-8 border border-slate-200 shadow-sm">
            <Lock className="mx-auto h-12 w-12 text-slate-300 mb-4" />
            <h2 className="text-xl font-bold text-slate-900">Login Required</h2>
            <p className="mt-2 text-xs text-slate-500">
              Please sign in to access your saved tools, recent activity, and profile settings.
            </p>
            <button
              onClick={() => onNavigate('/login')}
              className="mt-6 w-full rounded-xl bg-blue-600 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-blue-700"
            >
              Go to Login
            </button>
          </div>
        </div>
      );
    }

    const savedToolsList = TOOLS_DATA.filter((t) => currentUser.savedTools.includes(t.id));

    return (
      <div className="mx-auto max-w-5xl px-4 py-10">
        {/* User Card */}
        <div className="rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 p-6 md:p-8 text-white shadow-lg">
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
              <img
                src={currentUser.photoURL || 'https://api.dicebear.com/7.x/initials/svg?seed=Aspirant'}
                alt={currentUser.displayName}
                className="h-20 w-20 rounded-2xl border-2 border-white/20 object-cover shadow-md"
              />
              <div>
                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  <h1 className="text-2xl font-black">{currentUser.displayName}</h1>
                  <span className="rounded-md bg-amber-400/20 px-2 py-0.5 text-[10px] font-bold text-amber-300 border border-amber-300/30">
                    Candidate Pro
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-1">{currentUser.email}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Member since: {currentUser.createdAt}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="inline-flex items-center gap-1.5 rounded-xl bg-white/10 px-3.5 py-2 text-xs font-semibold text-white hover:bg-white/20 transition-colors"
              >
                <Edit3 className="h-3.5 w-3.5" />
                <span>Edit Name</span>
              </button>
              <button
                onClick={() => {
                  logout();
                  onNavigate('/');
                }}
                className="inline-flex items-center gap-1.5 rounded-xl bg-rose-600/80 px-3.5 py-2 text-xs font-semibold text-white hover:bg-rose-600 transition-colors"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Logout</span>
              </button>
            </div>
          </div>

          {/* Quick Edit Name Drawer */}
          {isEditing && (
            <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-2 max-w-sm">
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="rounded-lg bg-white/10 border border-white/20 px-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-hidden w-full"
                placeholder="Enter new display name"
              />
              <button
                onClick={() => {
                  if (editName.trim()) {
                    updateProfile({ displayName: editName.trim() });
                    setIsEditing(false);
                  }
                }}
                className="rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-bold text-slate-900 hover:bg-amber-400"
              >
                Save
              </button>
            </div>
          )}
        </div>

        {/* Stats Row */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="rounded-xl bg-white p-4 border border-slate-200 shadow-2xs">
            <span className="text-xs text-slate-500 block">Processed Files</span>
            <span className="text-2xl font-black text-slate-900 mt-1 block">
              {currentUser.recentFilesCount || 0}
            </span>
            <span className="text-[10px] text-emerald-600 font-medium">100% Free & Private</span>
          </div>

          <div className="rounded-xl bg-white p-4 border border-slate-200 shadow-2xs">
            <span className="text-xs text-slate-500 block">Saved Favorite Tools</span>
            <span className="text-2xl font-black text-slate-900 mt-1 block">
              {currentUser.savedTools.length}
            </span>
            <span className="text-[10px] text-blue-600 font-medium">Quick Access Shortcuts</span>
          </div>

          <div className="col-span-2 sm:col-span-1 rounded-xl bg-white p-4 border border-slate-200 shadow-2xs">
            <span className="text-xs text-slate-500 block">Account Security Status</span>
            <span className="text-2xl font-black text-emerald-600 mt-1 flex items-center gap-1">
              <ShieldCheck className="h-6 w-6" /> Active
            </span>
            <span className="text-[10px] text-slate-400">Client-Side Encrypted</span>
          </div>
        </div>

        {/* Saved Favorite Tools */}
        <div className="mt-8 rounded-2xl bg-white border border-slate-200 p-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Heart className="h-4 w-4 text-rose-500 fill-rose-500" />
                Your Saved Tools (Quick Shortcuts)
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Tools you use regularly are pinned here for instant access
              </p>
            </div>
            <button
              onClick={() => onNavigate('/')}
              className="text-xs font-bold text-blue-600 hover:underline"
            >
              + Browse All Tools
            </button>
          </div>

          {savedToolsList.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400">
              No tools saved yet. Pin tools to your dashboard for quick 1-click access.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {savedToolsList.map((tool) => (
                <div
                  key={tool.id}
                  className="flex items-center justify-between rounded-xl bg-slate-50 p-3 border border-slate-200 hover:border-blue-300 transition-colors"
                >
                  <div
                    onClick={() => onNavigate(tool.slug)}
                    className="cursor-pointer truncate"
                  >
                    <div className="text-xs font-bold text-slate-900 truncate">{tool.title}</div>
                    <div className="text-[10px] text-slate-500">{tool.titleHindi}</div>
                  </div>
                  <button
                    onClick={() => toggleSavedTool(tool.id)}
                    className="p-1 text-rose-500 hover:text-slate-400"
                    title="Remove from favorites"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Shortcuts */}
        <div className="mt-6 rounded-2xl bg-amber-50/60 border border-amber-200 p-6">
          <h3 className="text-sm font-bold text-amber-900 mb-2">
            Quick Examination Shortcuts
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <button
              onClick={() => onNavigate('/sarkari-form-tracker')}
              className="rounded-lg bg-white p-2.5 font-bold text-slate-800 shadow-2xs hover:bg-amber-100/60 text-left border border-amber-200"
            >
              SSC & Railway Forms
            </button>
            <button
              onClick={() => onNavigate('/photo-resizer')}
              className="rounded-lg bg-white p-2.5 font-bold text-slate-800 shadow-2xs hover:bg-amber-100/60 text-left border border-amber-200"
            >
              20KB - 50KB Photo Resizer
            </button>
            <button
              onClick={() => onNavigate('/pdf-merge')}
              className="rounded-lg bg-white p-2.5 font-bold text-slate-800 shadow-2xs hover:bg-amber-100/60 text-left border border-amber-200"
            >
              Merge Marksheets PDF
            </button>
            <button
              onClick={() => onNavigate('/ignou-date')}
              className="rounded-lg bg-white p-2.5 font-bold text-slate-800 shadow-2xs hover:bg-amber-100/60 text-left border border-amber-200"
            >
              IGNOU Deadlines
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Auth Form Layout (Login / Signup / Forgot Password)
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 border border-slate-200 shadow-lg">
        {/* Brand Heading */}
        <div className="text-center mb-6">
          <div
            onClick={() => onNavigate('/')}
            className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-600 to-indigo-900 text-white font-black text-2xl shadow-sm cursor-pointer mb-3"
          >
            D
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            {mode === 'login' && 'Login to Your Account'}
            {mode === 'signup' && 'Create an Account (Sign Up)'}
            {mode === 'forgot' && 'Reset Your Password'}
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            {mode === 'login' && 'Access your saved tools and candidate utilities on All Tools'}
            {mode === 'signup' && 'Register for free and access unlimited photo and PDF utilities'}
            {mode === 'forgot' && 'Enter your email address to receive password reset instructions'}
          </p>
        </div>

        {/* Error / Success Messages */}
        {errorMsg && (
          <div className="mb-4 flex items-center gap-2 rounded-xl bg-rose-50 p-3 text-xs font-semibold text-rose-700 border border-rose-200">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-4 flex items-center gap-2 rounded-xl bg-emerald-50 p-3 text-xs font-semibold text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Full Name:
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-9 pr-3 text-xs text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-hidden"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Email Address:
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-9 pr-3 text-xs text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-hidden"
              />
            </div>
          </div>

          {mode !== 'forgot' && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-slate-700">
                  Password:
                </label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => onNavigate('/forgot-password')}
                    className="text-[11px] font-semibold text-blue-600 hover:underline"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-9 pr-3 text-xs text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-hidden"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-xs font-bold text-white shadow-md hover:bg-blue-700 active:scale-95 transition-all disabled:opacity-50"
          >
            {loading ? 'Processing...' : mode === 'login' ? 'Login' : mode === 'signup' ? 'Sign Up' : 'Send Reset Link'}
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        {/* 1-Click Quick Demo Login */}
        {mode === 'login' && (
          <div className="mt-3">
            <button
              type="button"
              onClick={() => {
                setEmail('aspirant.demo@alltools.com');
                setPassword('password123');
                login('aspirant.demo@alltools.com');
                onNavigate('/dashboard');
              }}
              className="w-full rounded-xl bg-amber-50 border border-amber-200 py-2 text-xs font-bold text-amber-800 hover:bg-amber-100 transition-colors flex items-center justify-center gap-1.5"
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-600" />
              <span>1-Click Quick Demo Login</span>
            </button>
          </div>
        )}

        {/* Social / Google Login */}
        <div className="mt-6 border-t border-slate-100 pt-5">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-2.5 text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-50 transition-colors"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span>Continue with Google</span>
          </button>
        </div>

        {/* Footer Switch */}
        <div className="mt-6 text-center text-xs text-slate-500">
          {mode === 'login' && (
            <p>
              Don't have an account?{' '}
              <button
                onClick={() => onNavigate('/signup')}
                className="font-bold text-blue-600 hover:underline"
              >
                Sign Up for Free
              </button>
            </p>
          )}

          {mode === 'signup' && (
            <p>
              Already have an account?{' '}
              <button
                onClick={() => onNavigate('/login')}
                className="font-bold text-blue-600 hover:underline"
              >
                Log In
              </button>
            </p>
          )}

          {mode === 'forgot' && (
            <p>
              Remember your password?{' '}
              <button
                onClick={() => onNavigate('/login')}
                className="font-bold text-blue-600 hover:underline"
              >
                Back to Login
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
