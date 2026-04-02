import { useEffect, useState } from 'react';
import { useWindows } from '@/contexts/WindowContext';
import { APPS } from '@/lib/windowManager';
import { BatteryMedium, Search, Volume2, Wifi } from 'lucide-react';

const Taskbar = () => {
  const { windows, openApp, minimizeWindow, startMenuOpen, setStartMenuOpen } = useWindows();

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
    <div className="fixed bottom-0 left-0 right-0 z-[9999] h-12 win-taskbar win-shadow win-border">
      <div className="relative mx-auto flex h-full w-full max-w-6xl items-center px-3">
        <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-2">
          <button
            onClick={() => setStartMenuOpen(!startMenuOpen)}
            className={`flex h-9 w-9 items-center justify-center rounded-md transition-all ${
              startMenuOpen ? 'bg-[hsl(var(--win-subtle-hover))]' : 'win-subtle-hover'
            }`}
            title="Start"
            aria-label="Open Start menu"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <rect x="1" y="1" width="8" height="8" rx="1" fill="#00a4ef" />
              <rect x="11" y="1" width="8" height="8" rx="1" fill="#00a4ef" />
              <rect x="1" y="11" width="8" height="8" rx="1" fill="#00a4ef" />
              <rect x="11" y="11" width="8" height="8" rx="1" fill="#00a4ef" />
            </svg>
          </button>

          <div className="hidden items-center gap-2 rounded-md border border-border bg-[hsl(var(--win-subtle))] px-2.5 py-1.5 text-xs text-foreground/70 sm:flex">
            <Search className="h-3.5 w-3.5" />
            <input
              placeholder="Search"
              className="w-28 bg-transparent text-[11px] text-foreground placeholder:text-foreground/40 outline-none"
              aria-label="Search"
            />
          </div>

          {APPS.map(app => {
            const win = windows.find(w => w.id === app.id);
            const isActive = win?.isOpen && !win?.isMinimized;
            return (
              <button
                key={app.id}
                onClick={() => handleAppClick(app.id)}
                className={`relative flex h-9 w-9 items-center justify-center rounded-md transition-all ${
                  isActive ? 'bg-[hsl(var(--win-subtle-hover))]' : 'win-subtle-hover'
                }`}
                title={app.title}
                aria-label={app.title}
              >
                <div className="h-5 w-5">{app.icon}</div>
                {win?.isOpen && (
                  <div className={`absolute bottom-0.5 h-[3px] rounded-full transition-all ${
                    isActive ? 'w-4 bg-primary' : 'w-1.5 bg-muted-foreground'
                  }`}
                  />
                )}
              </button>
            );
          })}
        </div>
        <div className="ml-auto flex items-center gap-2 text-xs text-foreground">
          <div className="flex items-center gap-1.5 rounded-md px-2 py-1.5 win-subtle-hover transition-colors" title="Network, Volume, Battery">
            <Wifi className="h-[14px] w-[14px]" />
            <Volume2 className="h-[14px] w-[14px]" />
            <BatteryMedium className="h-[14px] w-[14px]" />
          </div>
          <div className="flex flex-col items-end rounded-md px-2 py-1.5 text-[11px] leading-[1.1] win-subtle-hover transition-colors">
            <div>{timeStr}</div>
            <div>{dateStr}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Taskbar;
