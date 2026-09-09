import React from 'react';
import { useShop } from '../../context/ShopContext';
import { CheckCircle2, AlertCircle, Info, X, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useShop();

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none px-4">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 350, damping: 24 }}
            className="pointer-events-auto flex items-start gap-3 p-4 rounded-2xl shadow-2xl border bg-[#1C3A27]/90 backdrop-blur-xl border-amber-300/30 text-amber-50 overflow-hidden relative"
          >
            {/* Color Accent Bar */}
            <div
              className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                toast.type === 'success'
                  ? 'bg-[#C59B27]'
                  : toast.type === 'error'
                  ? 'bg-rose-500'
                  : toast.type === 'warning'
                  ? 'bg-amber-400'
                  : 'bg-emerald-400'
              }`}
            />

            <div className="mt-0.5 shrink-0 pl-1">
              {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-[#C59B27]" />}
              {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-400" />}
              {toast.type === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-400" />}
              {toast.type === 'info' && <Info className="w-5 h-5 text-emerald-400" />}
            </div>

            <div className="flex-1 min-w-0 pr-2">
              <h4 className="text-sm font-semibold text-white font-serif tracking-wide">{toast.title}</h4>
              {toast.description && (
                <p className="text-xs text-amber-100/80 mt-0.5 line-clamp-2 leading-relaxed">
                  {toast.description}
                </p>
              )}
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-amber-200/60 hover:text-white p-1 rounded-lg hover:bg-emerald-800/40 transition-colors shrink-0"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
