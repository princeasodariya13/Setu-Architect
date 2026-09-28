'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, LogIn, Eye, EyeOff, ShieldCheck, AlertCircle } from 'lucide-react';
import { useAdminAuth } from '@/context/AdminAuthContext';
import Image from 'next/image';

export default function AdminLoginModal({ isOpen, onClose }) {
  const { login, loginWithCredentials } = useAdminAuth();
  const router = useRouter();
  
  const [email, setEmail]           = useState('');
  const [password, setPassword]     = useState('');
  const [showPass, setShowPass]     = useState(false);
  const [error, setError]           = useState('');
  const [credsLoading, setCredsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [success, setSuccess]       = useState(false);

  // Reset loading states if user returns to the tab (e.g. cancels Google sign-in)
  useEffect(() => {
    const handleFocus = () => {
      setGoogleLoading(false);
      setCredsLoading(false);
    };
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  // Check for Access Denied or OAuth error when modal opens
  useEffect(() => {
    if (isOpen) {
      setGoogleLoading(false);
      setCredsLoading(false);
      const params = new URLSearchParams(window.location.search);
      const errParam = params.get('error');
      if (errParam) {
        if (errParam === 'AccessDenied') {
          setError('Access Denied: This Google account is not registered or authorized as an Admin.');
        } else if (errParam === 'OAuthCallback' || errParam === 'OAuthSignin') {
          setError('Google Sign-in failed or was cancelled. Please try again.');
        } else if (errParam === 'CredentialsSignin') {
          setError('Invalid credentials: Email or password incorrect or account not found.');
        } else {
          setError('Authentication Error: Unauthorized account or invalid credentials.');
        }
        // Clean up URL so error doesn't persist
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    } else {
      // Clear error when closing
      setError('');
      setGoogleLoading(false);
      setCredsLoading(false);
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (googleLoading) return; // prevent double submit
    setError('');
    setCredsLoading(true);
    
    // Call next-auth credentials provider
    const result = await loginWithCredentials(email, password);
    
    if (result?.ok && !result?.error) {
      setSuccess(true);
      // Show success briefly, then redirect to admin dashboard
      setTimeout(() => {
        onClose();
        router.push('/admin');
      }, 1000);
    } else {
      setError('Invalid credentials: Email or password is incorrect or user not found.');
    }
    setCredsLoading(false);
  };

  const handleGoogleLogin = () => {
    if (credsLoading) return; // prevent double submit
    setGoogleLoading(true);
    login(); // This calls NextAuth signIn('google')
  };

  const handleClose = () => {
    if (credsLoading || googleLoading) return;
    onClose();
    setEmail('');
    setPassword('');
    setError('');
    setSuccess(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={handleClose}
            className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm"
          />

          {/* Modal Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="fixed inset-0 z-[201] flex items-center justify-center p-4"
            aria-modal="true"
            role="dialog"
            aria-labelledby="admin-login-title"
          >
            <div className="relative w-full max-w-md">
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-br from-amber-500/30 via-amber-600/10 to-transparent rounded-2xl blur-xl pointer-events-none" />

              {/* Card */}
              <div className="relative bg-neutral-950 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">

                {/* Top gradient bar */}
                <div className="h-1 w-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600" />

                {/* Close button */}
                <button
                  onClick={handleClose}
                  disabled={credsLoading || googleLoading}
                  className="absolute top-4 right-4 p-1.5 text-neutral-500 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                  aria-label="Close admin login"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="px-8 pt-8 pb-10">
                  {/* Header */}
                  <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4">
                      <ShieldCheck className="w-8 h-8 text-amber-400" />
                    </div>
                    <h2 id="admin-login-title" className="text-xl font-bold text-white tracking-tight">
                      Admin Access
                    </h2>
                    <p className="text-neutral-500 text-sm mt-1">
                      Sign in to manage your portfolio
                    </p>
                  </div>

                  {/* Success state */}
                  <AnimatePresence>
                    {success && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center gap-3 py-6"
                      >
                        <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                          <ShieldCheck className="w-7 h-7 text-emerald-400" />
                        </div>
                        <p className="text-emerald-400 font-semibold text-sm">Welcome, Admin!</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Forms */}
                  {!success && (
                    <div className="space-y-6">
                      <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email */}
                        <div className="space-y-1.5">
                          <label htmlFor="admin-email" className="text-xs font-semibold text-neutral-400 uppercase tracking-widest">
                            Email
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                            <input
                              id="admin-email"
                              type="email"
                              value={email}
                              onChange={(e) => { setEmail(e.target.value); setError(''); }}
                              placeholder="setuarchitect@gmail.com"
                              required
                              autoComplete="email"
                              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-amber-500/50 focus:bg-white/8 transition-all"
                            />
                          </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-1.5">
                          <label htmlFor="admin-password" className="text-xs font-semibold text-neutral-400 uppercase tracking-widest">
                            Password
                          </label>
                          <div className="relative">
                            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                            <input
                              id="admin-password"
                              type={showPass ? 'text' : 'password'}
                              value={password}
                              onChange={(e) => { setPassword(e.target.value); setError(''); }}
                              placeholder="••••••••••"
                              required
                              autoComplete="current-password"
                              className="w-full pl-10 pr-10 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-amber-500/50 focus:bg-white/8 transition-all"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPass(!showPass)}
                              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 transition-colors"
                              aria-label={showPass ? 'Hide password' : 'Show password'}
                            >
                              {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>

                        {/* Error */}
                        <AnimatePresence>
                          {error && (
                            <motion.div
                              initial={{ opacity: 0, y: -8 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              className="flex items-center gap-2 px-3 py-2.5 bg-red-500/10 border border-red-500/20 rounded-lg"
                            >
                              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                              <p className="text-red-400 text-xs">{error}</p>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Submit */}
                        <button
                          type="submit"
                          disabled={credsLoading || googleLoading}
                          id="admin-login-submit"
                          className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-sm rounded-xl transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 active:scale-[0.98]"
                        >
                          {credsLoading ? (
                            <>
                              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                              </svg>
                              Authenticating...
                            </>
                          ) : (
                            <>
                              <LogIn className="w-4 h-4" />
                              Sign In as Admin
                            </>
                          )}
                        </button>
                      </form>

                      {/* Divider */}
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-white/10"></div>
                        </div>
                        <div className="relative flex justify-center text-xs">
                          <span className="bg-neutral-950 px-2 text-neutral-500 uppercase tracking-wider">Or</span>
                        </div>
                      </div>

                      {/* Google Auth Button */}
                      <button
                        onClick={handleGoogleLogin}
                        disabled={credsLoading || googleLoading}
                        type="button"
                        id="admin-login-google"
                        className="w-full flex items-center justify-center gap-3 py-3.5 bg-white hover:bg-neutral-100 text-black font-semibold text-sm rounded-xl transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg active:scale-[0.98]"
                      >
                        {googleLoading ? (
                          <>
                            <svg className="animate-spin w-5 h-5 text-neutral-600" viewBox="0 0 24 24" fill="none">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                            </svg>
                            Connecting to Google...
                          </>
                        ) : (
                          <>
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                            </svg>
                            Sign in with Google
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
