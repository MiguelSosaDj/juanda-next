'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RouteInterceptorProps {
  children: React.ReactNode;
  onClose?: () => void;
}

export default function RouteInterceptor({ children, onClose }: RouteInterceptorProps) {
  const overlay = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const onDismiss = useCallback(() => {
    if (onClose) {
      onClose();
    } else {
      router.back();
    }
  }, [onClose, router]);

  const onClick = useCallback((e: React.MouseEvent) => {
    if (e.target === overlay.current || e.target === wrapper.current) {
      onDismiss();
    }
  }, [onDismiss, overlay, wrapper]);

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onDismiss();
  }, [onDismiss]);

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown]);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50">
        <motion.div
          ref={overlay}
          className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClick}
        />
        <motion.div
          ref={wrapper}
          className="fixed inset-y-0 right-0 w-full sm:max-w-xl bg-gray-800 p-6 overflow-y-auto"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 20 }}
        >
          {children}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}