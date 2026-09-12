import React, { useEffect } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Toaster() {
  const { state, dispatch } = useSimulation();
  
  // Only show the latest 4 toasts so they don't take up the whole screen
  const visibleToasts = (state.toasts || []).slice(-4);

  // Auto-dismiss logic
  useEffect(() => {
    if (state.toasts.length > 0) {
      const latestToast = state.toasts[state.toasts.length - 1];
      const timer = setTimeout(() => {
        dispatch({ type: 'REMOVE_TOAST', payload: latestToast.id });
      }, 4000); // 4 seconds
      return () => clearTimeout(timer);
    }
  }, [state.toasts, dispatch]);

  return (
    <div className="fixed top-20 right-6 z-[9999] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {visibleToasts.map(t => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-lg border min-w-[300px] max-w-sm ${
              t.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' :
              t.type === 'error' ? 'bg-red-50 border-red-200 text-red-800' :
              'bg-blue-50 border-blue-200 text-blue-800'
            }`}
          >
            <div className="mt-0.5">
              {t.type === 'success' && <CheckCircle2 size={18} />}
              {t.type === 'error' && <AlertTriangle size={18} />}
              {t.type === 'info' && <Info size={18} />}
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-sm">{t.title}</h4>
              {t.message && <p className="text-xs mt-1 opacity-80 leading-relaxed">{t.message}</p>}
            </div>
            <button onClick={() => dispatch({ type: 'REMOVE_TOAST', payload: t.id })} className="opacity-50 hover:opacity-100 shrink-0">
              <X size={16} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
