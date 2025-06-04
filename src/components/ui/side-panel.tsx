'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface SidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function SidePanel({
  isOpen,
  onClose,
  title,
  children,
}: SidePanelProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 20 }}
            className="fixed inset-y-0 right-0 w-full sm:max-w-xl bg-gray-800 border-l border-gray-700 shadow-xl z-50"
          >
            <div className="h-full flex flex-col">
              <div className="px-4 py-6 border-b border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-white">{title}</h2>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <XMarkIcon className="h-6 w-6 text-gray-400" />
                  </button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                {children}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}