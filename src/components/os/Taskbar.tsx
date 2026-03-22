import { useEffect, useState } from 'react';
import { useWindows } from '@/contexts/WindowContext';
import { APPS } from '@/lib/windowManager';
import { Wifi, Volume2, BatteryMedium } from 'lucide-react';

const Taskbar = () => {
  const { windows, openApp, focusWindow, minimizeWindow, startMenuOpen, setStartMenuOpen } = useWindows();

  const handleAppClick = (appId: string) => {
    const win = windows.find(w => w.id === appId);
    if (win?.isOpen && !win.isMinimized) {
      minimizeWindow(appId);
    } else {
      openApp(appId);
    }
  };

  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const dateStr = now.toLocaleDateString([], { month: 'numeric', day: 'numeric', year: 'numeric' });

  return (
    <div className="fixed bottom-0 left-0 right-0 h-12 px-2 win-taskbar win-shadow win-border z-[9999] flex items-center justify-between w-full">
      <div className="flex items-center justify-center mx-auto">
        {/* Start button */}
        <button
          onClick={() => setStartMenuOpen(!startMenuOpen)}
          className="flex items-center justify-center w-10 h-10 mx-1 rounded-md win-subtle-hover transition-colors"
          title="Start"
          aria-label="Open Start menu"
        >
          <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
            <rect x="1" y="1" width="8" height="8" rx="1" fill="#00a4ef" />
            <rect x="11" y="1" width="8" height="8" rx="1" fill="#00a4ef" />
            <rect x="1" y="11" width="8" height="8" rx="1" fill="#00a4ef" />
            <rect x="11" y="11" width="8" height="8" rx="1" fill="#00a4ef" />
          </svg>
        </button>

        {/* Pinned / open apps */}
        <div className="flex items-center gap-1 mx-2">
          {APPS.map(app => {
            const win = windows.find(w => w.id === app.id);
            const isActive = win?.isOpen && !win?.isMinimized;
            return (
              <button
                key={app.id}
                onClick={() => handleAppClick(app.id)}
                className={`relative flex items-center justify-center w-10 h-10 rounded-md win-subtle-hover transition-all ${isActive ? 'bg-[hsl(var(--win-subtle-hover))]' : ''}`}
                title={app.title}
                aria-label={app.title}
              >
                <div className="w-5 h-5 flex-shrink-0">{app.icon}</div>
                {win?.isOpen && (
                  <div className={`absolute bottom-0.5 h-[3px] rounded-full transition-all ${isActive ? 'w-4 bg-primary' : 'w-1.5 bg-muted-foreground'}`} />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* System tray */}
      <div className="flex items-center text-xs text-foreground">
        <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-md win-subtle-hover cursor-pointer transition-colors" title="Network, Volume, Battery">
          <Wifi className="w-[14px] h-[14px]" />
          <Volume2 className="w-[14px] h-[14px]" />
          <BatteryMedium className="w-[14px] h-[14px]" />
        </div>
        
        <div className="text-right leading-[1.2] ml-1 px-2 py-2 rounded-md win-subtle-hover cursor-pointer flex flex-col items-end transition-colors text-[11px]">
          <div>{timeStr}</div>
          <div>{dateStr}</div>
        </div>
      </div>
    </div>
  );
};

export default Taskbar;
