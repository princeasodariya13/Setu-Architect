'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Plus, Trash2, LogOut, ShieldCheck,
  FolderOpen, Image as ImageIcon, Tag, AlignLeft,
  X, Save, Building2, CheckCircle2, AlertCircle, Eye,
  Sun, Moon
} from 'lucide-react';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { useProjects } from '@/context/ProjectsContext';
import Link from 'next/link';
import Image from 'next/image';

/* ─── Default seed projects (will merge with localStorage) ─── */
const SEED_PROJECTS = [
  { id: 1, name: 'ITC Narmada', category: 'Commercial', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800', description: 'Luxury commercial development in Ahmedabad.' },
  { id: 2, name: 'Titanium Square', category: 'High Rise', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800', description: 'State-of-the-art corporate tower.' },
  { id: 3, name: 'Shivalik Curv', category: 'Residence', img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800', description: 'A striking architectural masterpiece.' },
];

const CATEGORIES = ['Commercial', 'High Rise', 'Residence', 'Industrial', 'Institutional', 'Hospital', 'Public'];
const STORAGE_KEY = 'setu_admin_projects';

/* ─── Stat Card ─────────────────────────────────────────────── */
function StatCard({ icon: Icon, label, value, color, isDark }) {
  return (
    <div className={`border rounded-2xl p-5 flex items-center gap-4 transition-colors ${
      isDark ? 'bg-neutral-900 border-white/8' : 'bg-white border-stone-200/80 shadow-sm'
    }`}>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-stone-900'}`}>{value}</p>
        <p className={`text-xs mt-0.5 ${isDark ? 'text-neutral-500' : 'text-stone-500'}`}>{label}</p>
      </div>
    </div>
  );
}

/* ─── Project Card ──────────────────────────────────────────── */
function ProjectCard({ project, onDelete, isDark }) {
  const [confirm, setConfirm] = useState(false);
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`border rounded-2xl overflow-hidden group transition-colors ${
        isDark ? 'bg-neutral-900 border-white/8' : 'bg-white border-stone-200/80 shadow-sm'
      }`}
    >
      <div className="relative h-44 overflow-hidden">
        <img
          src={project.img}
          alt={project.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <span className="absolute bottom-3 left-3 text-xs font-semibold bg-amber-500 text-black px-2.5 py-1 rounded-full shadow-sm">
          {project.category}
        </span>
      </div>
      <div className="p-4">
        <h3 className={`font-semibold text-sm truncate ${isDark ? 'text-white' : 'text-stone-900'}`}>{project.name}</h3>
        {project.description && (
          <p className={`text-xs mt-1 line-clamp-2 ${isDark ? 'text-neutral-500' : 'text-stone-600'}`}>{project.description}</p>
        )}
        <div className="mt-3 flex justify-end">
          {confirm ? (
            <div className="flex items-center gap-2">
              <span className={`text-xs ${isDark ? 'text-neutral-400' : 'text-stone-500'}`}>Sure?</span>
              <button
                onClick={() => onDelete(project.id)}
                className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-colors ${
                  isDark ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' : 'bg-red-100 text-red-600 hover:bg-red-200'
                }`}
              >Yes</button>
              <button
                onClick={() => setConfirm(false)}
                className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-colors ${
                  isDark ? 'bg-white/5 text-neutral-400 hover:bg-white/10' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >No</button>
            </div>
          ) : (
            <button
              onClick={() => setConfirm(true)}
              className={`flex items-center gap-1.5 text-xs transition-colors px-2 py-1 rounded-lg ${
                isDark ? 'text-neutral-500 hover:text-red-400 hover:bg-red-500/10' : 'text-stone-500 hover:text-red-600 hover:bg-red-50'
              }`}
            >
              <Trash2 className="w-3.5 h-3.5" />
              Remove
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Add Project Modal ─────────────────────────────────────── */
const AddProjectModal = ({ isOpen, onClose, onAdd, isDark }) => {
  const [form, setForm] = useState({ name: '', category: '', img: '', description: '' });
  const [toast, setToast] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setToast('Please upload a valid image file.');
      setTimeout(() => setToast(''), 3000);
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const imgElement = new window.Image();
      imgElement.src = event.target.result;
      imgElement.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;
        let width = imgElement.width;
        let height = imgElement.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(imgElement, 0, 0, width, height);

        // Compress and convert to base64
        const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
        setForm(p => ({ ...p, img: dataUrl }));
        setIsUploading(false);
      };
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.category.trim() || !form.img) {
      setToast('Name, Category, and Image are required.');
      setTimeout(() => setToast(''), 3000);
      return;
    }
    setIsSubmitting(true);
    try {
      await onAdd(form);
      setForm({ name: '', category: '', img: '', description: '' });
      onClose();
    } catch (err) {
      setToast('Failed to add project.');
      setTimeout(() => setToast(''), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className={`fixed inset-0 z-[300] backdrop-blur-sm ${isDark ? 'bg-black/70' : 'bg-black/40'}`}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-[301] flex items-center justify-center p-4"
          >
            <div className={`w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl transition-colors border ${
              isDark ? 'bg-neutral-950 border-white/10 text-white' : 'bg-white border-stone-200 text-stone-900'
            }`}>
              <div className="h-1 bg-gradient-to-r from-amber-500 to-amber-600" />
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-stone-900'}`}>Add New Project</h3>
                  <button onClick={onClose} className={`p-1.5 rounded-lg transition-colors ${
                    isDark ? 'text-neutral-500 hover:text-white hover:bg-white/5' : 'text-stone-400 hover:text-stone-900 hover:bg-stone-100'
                  }`}>
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className={`text-xs font-semibold uppercase tracking-widest block mb-1.5 ${isDark ? 'text-neutral-400' : 'text-stone-600'}`}>Project Name *</label>
                    <div className="relative">
                      <Building2 className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-neutral-500' : 'text-stone-400'}`} />
                      <input
                        type="text" required
                        value={form.name}
                        onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                        placeholder="e.g. Skyline Tower"
                        className={`w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:border-amber-500 transition-all ${
                          isDark ? 'bg-white/5 border-white/10 text-white placeholder-neutral-600' : 'bg-stone-50 border-stone-300 text-stone-900 placeholder-stone-400 focus:bg-white'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Category */}
                  <div>
                    <label className={`text-xs font-semibold uppercase tracking-widest block mb-1.5 ${isDark ? 'text-neutral-400' : 'text-stone-600'}`}>Category *</label>
                    <input
                      type="text" required
                      value={form.category}
                      onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
                      placeholder="e.g. Commercial, Residence, Hospital"
                      className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:border-amber-500 transition-all ${
                        isDark ? 'bg-white/5 border-white/10 text-white placeholder-neutral-600' : 'bg-stone-50 border-stone-300 text-stone-900 placeholder-stone-400 focus:bg-white'
                      }`}
                    />
                  </div>

                  {/* Project Image */}
                  <div>
                    <label className={`text-xs font-semibold uppercase tracking-widest block mb-1.5 ${isDark ? 'text-neutral-400' : 'text-stone-600'}`}>Project Image *</label>
                    <div className="relative">
                      <ImageIcon className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-neutral-500' : 'text-stone-400'}`} />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className={`w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:border-amber-500 transition-all cursor-pointer ${
                          isDark
                            ? 'bg-white/5 border-white/10 text-neutral-400 file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-amber-500/10 file:text-amber-500 hover:file:bg-amber-500/20'
                            : 'bg-stone-50 border-stone-300 text-stone-600 file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-amber-500/10 file:text-amber-600 hover:file:bg-amber-500/20'
                        }`}
                      />
                    </div>
                    {isUploading && (
                      <p className="text-xs text-amber-500 mt-2 flex items-center gap-2">
                        <svg className="animate-spin w-3 h-3" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg> 
                        Processing image...
                      </p>
                    )}
                    {form.img && !isUploading && (
                      <div className={`mt-3 relative w-32 h-20 rounded-lg overflow-hidden border ${isDark ? 'border-white/10' : 'border-stone-300'}`}>
                        <img src={form.img} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <div>
                    <label className={`text-xs font-semibold uppercase tracking-widest block mb-1.5 ${isDark ? 'text-neutral-400' : 'text-stone-600'}`}>Description</label>
                    <div className="relative">
                      <AlignLeft className={`absolute left-3.5 top-3 w-4 h-4 ${isDark ? 'text-neutral-500' : 'text-stone-400'}`} />
                      <textarea
                        value={form.description}
                        onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                        placeholder="Brief project description..."
                        rows={3}
                        className={`w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:border-amber-500 transition-all resize-none ${
                          isDark ? 'bg-white/5 border-white/10 text-white placeholder-neutral-600' : 'bg-stone-50 border-stone-300 text-stone-900 placeholder-stone-400 focus:bg-white'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Error */}
                  {toast && (
                    <div className="flex items-center gap-2 px-3 py-2.5 bg-red-500/10 border border-red-500/20 rounded-lg">
                      <AlertCircle className="w-4 h-4 text-red-500" />
                      <span className="text-red-500 text-xs">{toast}</span>
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isUploading || isSubmitting}
                    className="flex-1 w-full bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold py-2.5 rounded-xl text-sm transition-all shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Adding...' : 'Add Project'}
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ─── Logout Confirmation Modal ────────────────────────────── */
const LogoutConfirmModal = ({ isOpen, onClose, onConfirm, isLoggingOut, isDark }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className={`fixed inset-0 z-[300] backdrop-blur-sm ${isDark ? 'bg-black/70' : 'bg-black/40'}`}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-[301] flex items-center justify-center p-4"
          >
            <div className={`w-full max-w-sm border rounded-2xl overflow-hidden shadow-2xl p-6 text-center transition-colors ${
              isDark ? 'bg-neutral-950 border-white/10 text-white' : 'bg-white border-stone-200 text-stone-900'
            }`}>
              <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
                <LogOut className="w-7 h-7 text-red-500" />
              </div>
              <h3 className={`font-bold text-lg mb-1 ${isDark ? 'text-white' : 'text-stone-900'}`}>Confirm Logout</h3>
              <p className={`text-xs mb-6 ${isDark ? 'text-neutral-400' : 'text-stone-600'}`}>
                Are you sure you want to log out of the Admin Panel?
              </p>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isLoggingOut}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition-colors disabled:opacity-50 ${
                    isDark ? 'bg-white/5 hover:bg-white/10 text-neutral-300' : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  id="confirm-logout-yes"
                  onClick={onConfirm}
                  disabled={isLoggingOut}
                  className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl text-xs transition-all shadow-lg shadow-red-500/20 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-1.5"
                >
                  {isLoggingOut ? (
                    <>
                      <svg className="animate-spin w-3.5 h-3.5" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>
                      Logging out...
                    </>
                  ) : (
                    'Yes, Logout'
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

/* ─── Admin Dashboard Page ──────────────────────────────────── */
export default function AdminPage() {
  const router = useRouter();
  const { isAdmin, isLoading, logout } = useAdminAuth();
  const { projects, addProject, removeProject } = useProjects();
  
  const [theme, setTheme] = useState('dark');
  const [showAdd, setShowAdd] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [toast, setToast] = useState({ msg: '', type: '' });

  /* Load theme preference */
  useEffect(() => {
    const savedTheme = localStorage.getItem('setu_admin_theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      setTheme(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('setu_admin_theme', nextTheme);
  };

  const isDark = theme === 'dark';

  /* Redirect if not admin */
  useEffect(() => {
    if (!isLoading && !isAdmin) router.replace('/');
  }, [isAdmin, isLoading, router]);

  const handleAdd = (project) => {
    addProject(project);
    showToast('Project added successfully!', 'success');
  };

  const handleDelete = (id) => {
    removeProject(id);
    showToast('Project removed.', 'info');
  };

  const showToast = (msg, type) => {
    setToast({ msg, type });
    setTimeout(() => setToast({ msg: '', type: '' }), 3000);
  };

  const handleConfirmLogout = async () => {
    setIsLoggingOut(true);
    await logout();
  };

  if (isLoading || !isAdmin) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-neutral-950' : 'bg-stone-50'}`}>
        <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const categories = [...new Set(projects.map(p => p.category))];

  return (
    <div className={`min-h-screen transition-colors duration-200 ${isDark ? 'bg-neutral-950 text-white' : 'bg-stone-50 text-stone-900'}`}>

      {/* ── Header ── */}
      <header className={`sticky top-0 z-50 backdrop-blur transition-colors duration-200 ${
        isDark ? 'bg-neutral-950/95 border-b border-white/8' : 'bg-white/95 border-b border-stone-200 shadow-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center group mr-2">
              <Image
                src={isDark ? "/images/setu-logo-white.png" : "/images/setu-logo.png"}
                alt="Setu Architects Logo"
                width={90}
                height={72}
                className="w-auto h-12 sm:h-14 object-contain transition-all"
              />
            </Link>
            <div className={`border-l pl-6 ${isDark ? 'border-white/20' : 'border-stone-300'}`}>
              <p className={`text-sm font-bold leading-none ${isDark ? 'text-white' : 'text-stone-900'}`}>Admin Panel</p>
              <p className={`text-xs leading-none mt-1.5 ${isDark ? 'text-neutral-500' : 'text-stone-500'}`}>Setu Architects</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              id="admin-theme-toggle"
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                isDark
                  ? 'bg-white/5 border-white/10 text-neutral-300 hover:text-white hover:bg-white/10 hover:border-white/20'
                  : 'bg-stone-100 border-stone-300 text-stone-700 hover:text-stone-900 hover:bg-stone-200/80'
              }`}
              title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
            >
              {isDark ? (
                <>
                  <Moon className="w-3.5 h-3.5 text-amber-400" />
                  <span>Dark</span>
                </>
              ) : (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-600" />
                  <span>Light</span>
                </>
              )}
            </button>

            <Link
              href="/"
              className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-colors ${
                isDark
                  ? 'text-neutral-400 hover:text-white hover:bg-white/5'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              View Site
            </Link>
            <button
              onClick={() => setShowLogoutModal(true)}
              id="admin-page-logout"
              className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-colors ${
                isDark
                  ? 'text-neutral-400 hover:text-red-400 hover:bg-red-500/10'
                  : 'text-stone-600 hover:text-red-600 hover:bg-red-50'
              }`}
            >
              <LogOut className="w-3.5 h-3.5" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* ── Content ── */}
      <main className="max-w-7xl mx-auto px-6 py-10">

        {/* Welcome Banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-10 p-6 rounded-2xl border transition-colors ${
            isDark
              ? 'bg-gradient-to-br from-amber-500/10 via-amber-600/5 to-transparent border-amber-500/20'
              : 'bg-gradient-to-br from-amber-500/10 via-amber-50 to-amber-100/30 border-amber-400/40 shadow-sm'
          }`}
        >
          <div className="flex items-center gap-3 mb-1">
            <CheckCircle2 className={`w-5 h-5 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />
            <h1 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-stone-900'}`}>Welcome, Admin!</h1>
          </div>
          <p className={`text-sm ${isDark ? 'text-neutral-400' : 'text-stone-600'}`}>You have full access to manage your Setu Architects portfolio.</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <StatCard icon={FolderOpen}    label="Total Projects"    value={projects.length}       color={isDark ? "bg-amber-500/10 text-amber-400" : "bg-amber-100 text-amber-700"} isDark={isDark} />
          <StatCard icon={Tag}           label="Categories"         value={categories.length}      color={isDark ? "bg-blue-500/10 text-blue-400" : "bg-blue-100 text-blue-700"} isDark={isDark} />
          <StatCard icon={Building2}     label="Latest Added"       value={projects[0]?.category || '—'} color={isDark ? "bg-emerald-500/10 text-emerald-400" : "bg-emerald-100 text-emerald-700"} isDark={isDark} />
          <StatCard icon={LayoutDashboard} label="Admin Status"    value="Active"                 color={isDark ? "bg-purple-500/10 text-purple-400" : "bg-purple-100 text-purple-700"} isDark={isDark} />
        </div>

        {/* Projects Section */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-stone-900'}`}>Projects</h2>
            <p className={`text-sm mt-0.5 ${isDark ? 'text-neutral-500' : 'text-stone-500'}`}>{projects.length} project{projects.length !== 1 ? 's' : ''} in portfolio</p>
          </div>
          <button
            id="add-project-btn"
            onClick={() => setShowAdd(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-sm rounded-xl transition-all shadow-lg shadow-amber-500/20 active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            Add Project
          </button>
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          <AnimatePresence>
            {projects.map(project => (
              <ProjectCard key={project.id} project={project} onDelete={handleDelete} isDark={isDark} />
            ))}
          </AnimatePresence>
        </motion.div>

        {projects.length === 0 && (
          <div className={`text-center py-20 ${isDark ? 'text-neutral-600' : 'text-stone-400'}`}>
            <FolderOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">No projects yet. Add your first one!</p>
          </div>
        )}
      </main>

      {/* Add Project Modal */}
      <AddProjectModal isOpen={showAdd} onClose={() => setShowAdd(false)} onAdd={handleAdd} isDark={isDark} />

      {/* Logout Confirmation Modal */}
      <LogoutConfirmModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleConfirmLogout}
        isLoggingOut={isLoggingOut}
        isDark={isDark}
      />

      {/* Toast Notification */}
      <AnimatePresence>
        {toast.msg && (
          <motion.div
            initial={{ opacity: 0, y: 20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 10, x: '-50%' }}
            className={`fixed bottom-6 left-1/2 z-[500] flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium shadow-xl ${
              toast.type === 'success'
                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                : 'bg-blue-500/10 border-blue-500/20 text-blue-400'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

