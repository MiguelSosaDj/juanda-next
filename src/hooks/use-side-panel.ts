'use client';

import { useState, useCallback } from 'react';

export function useSidePanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<React.ReactNode | null>(null);
  const [title, setTitle] = useState('');

  const open = useCallback((title: string, content: React.ReactNode) => {
    setTitle(title);
    setContent(content);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => {
      setContent(null);
      setTitle('');
    }, 300); // Match animation duration
  }, []);

  return {
    isOpen,
    content,
    title,
    open,
    close,
  };
}