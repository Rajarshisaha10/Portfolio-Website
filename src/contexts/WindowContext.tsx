import React, { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { type WindowState, APPS } from '@/lib/windowManager';

interface WindowContextType {
  windows: WindowState[];
  openApp: (appId: string) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  updatePosition: (id: string, pos: { x: number; y: number }) => void;
  activeWindowId: string | null;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  startMenuOpen: boolean;
  setStartMenuOpen: (v: boolean) => void;
}

const WindowContext = createContext<WindowContextType | null>(null);

export const useWindows = () => {
  const ctx = useContext(WindowContext);
  if (!ctx) throw new Error('useWindows must be inside WindowProvider');
  return ctx;
};

let nextZ = 10;

export const WindowProvider = ({ children }: { children: ReactNode }) => {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [startMenuOpen, setStartMenuOpen] = useState(false);

  const openApp = useCallback((appId: string) => {
    setWindows(prev => {
      const existing = prev.find(w => w.id === appId);
      if (existing) {
        return prev.map(w => w.id === appId ? {
          ...w,
          isOpen: true,
          isMinimized: false,
          isMaximized: appId === 'file-explorer' ? true : w.isMaximized,
          zIndex: ++nextZ,
        } : w);
      }
      const app = APPS.find(a => a.id === appId);
      if (!app) return prev;
      const offset = prev.length * 30;
      return [...prev, {
        id: appId,
        title: app.title,
        icon: app.icon,
        isOpen: true,
        isMinimized: false,
        isMaximized: appId === 'file-explorer',
        zIndex: ++nextZ,
        position: appId === 'file-explorer' ? { x: 0, y: 0 } : { x: 120 + offset, y: 60 + offset },
        size: app.defaultSize,
      }];
    });
    setStartMenuOpen(false);
  }, []);

  const closeWindow = useCallback((id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isOpen: false } : w));
  }, []);

  const minimizeWindow = useCallback((id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: true } : w));
  }, []);

  const maximizeWindow = useCallback((id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMaximized: !w.isMaximized } : w));
  }, []);

  const focusWindow = useCallback((id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, zIndex: ++nextZ, isMinimized: false } : w));
  }, []);

  const updatePosition = useCallback((id: string, pos: { x: number; y: number }) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, position: pos } : w));
  }, []);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(prev => {
      const next = !prev;
      document.documentElement.classList.toggle('dark', next);
      return next;
    });
  }, []);

  // Init dark mode
  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, []);

  const activeWindowId = windows
    .filter(w => w.isOpen && !w.isMinimized)
    .sort((a, b) => b.zIndex - a.zIndex)[0]?.id ?? null;

  return (
    <WindowContext.Provider value={{
      windows, openApp, closeWindow, minimizeWindow, maximizeWindow,
      focusWindow, updatePosition, activeWindowId, isDarkMode, toggleDarkMode,
      startMenuOpen, setStartMenuOpen,
    }}>
      {children}
    </WindowContext.Provider>
  );
};
