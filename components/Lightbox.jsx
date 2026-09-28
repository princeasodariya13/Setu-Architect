"use client";

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Tag, AlignLeft } from 'lucide-react';

export default function Lightbox({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-md p-4 sm:p-6 overflow-y-auto"
        onClick={onClose}
      >
        {/* Close Button */}
        <button
          className="fixed top-5 right-5 z-[210] p-3 text-stone-700 hover:text-stone-900 bg-white/90 hover:bg-white border border-stone-300 rounded-full transition-all duration-200 shadow-xl group cursor-pointer"
          onClick={onClose}
          aria-label="Close preview"
        >
          <X className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </button>

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 16 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-3xl bg-white border border-stone-200/90 rounded-2xl overflow-hidden shadow-2xl my-auto"
          onClick={(event) => event.stopPropagation()}
        >
          {/* Top Gradient Accent Bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600" />

          {/* Image Container */}
          <div className="relative w-full bg-stone-100 flex items-center justify-center min-h-[260px] max-h-[55vh] overflow-hidden border-b border-stone-200/80">
            <img
              src={project.img}
              alt={project.name || 'Project Image'}
              className="max-h-[55vh] w-full object-contain"
            />
          </div>

          {/* Details Body */}
          <div className="p-6 md:p-8 space-y-4">
            {/* Header: Category & Title */}
            <div>
              {project.category && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/10 border border-amber-500/30 text-amber-700 mb-2.5">
                  <Tag className="w-3.5 h-3.5" />
                  {project.category}
                </span>
              )}
              <h2 className="text-2xl md:text-3xl font-display font-bold uppercase tracking-wide text-stone-900 leading-tight">
                {project.name}
              </h2>
            </div>

            {/* Description */}
            <div className="pt-3 border-t border-stone-200/80">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-700 mb-2">
                <AlignLeft className="w-3.5 h-3.5" />
                Project Details & Description
              </div>
              <p className="text-sm md:text-base text-stone-700 leading-relaxed font-normal">
                {project.description || 'No detailed description available for this project.'}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}


