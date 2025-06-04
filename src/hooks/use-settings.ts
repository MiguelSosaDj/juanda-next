'use client';

import { useState, useEffect } from 'react';

interface Settings {
  darkMode: boolean;
  language: 'es' | 'en';
  notifications: boolean;
}

const defaultSettings: Settings = {
  darkMode: true,
  language: 'es',
  notifications: true,
};

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedSettings = localStorage.getItem('settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
    setIsLoading(false);
  }, []);

  const updateSettings = (newSettings: Partial<Settings>) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    localStorage.setItem('settings', JSON.stringify(updatedSettings));
    
    if ('darkMode' in newSettings) {
      document.documentElement.classList.toggle('dark', newSettings.darkMode);
    }
  };

  return {
    settings,
    updateSettings,
    isLoading,
  };
}