import { useWindows } from '@/contexts/WindowContext';
import { APPS } from '@/lib/windowManager';

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

  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const dateStr = now.toLocaleDateString([], { month: 'numeric', day: 'numeric', year: 'numeric' });

  return (
    <div className="fixed bottom-0 left-0 right-0 h-12 win-taskbar win-border z-[9999] flex items-center justify-center px-3">
      {/* Start button */}
      <button
        onClick={() => setStartMenuOpen(!startMenuOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-md win-subtle-hover text-lg"
        title="Start"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <rect x="1" y="1" width="8" height="8" rx="1" fill="hsl(var(--primary))" />
          <rect x="11" y="1" width="8" height="8" rx="1" fill="hsl(var(--primary))" />
          <rect x="1" y="11" width="8" height="8" rx="1" fill="hsl(var(--primary))" />
          <rect x="11" y="11" width="8" height="8" rx="1" fill="hsl(var(--primary))" />
        </svg>
      </button>

      {/* Pinned / open apps */}
      <div className="flex items-center gap-1 ml-2">
        {APPS.map(app => {
          const win = windows.find(w => w.id === app.id);
          const isActive = win?.isOpen && !win?.isMinimized;
          return (
            <button
              key={app.id}
              onClick={() => handleAppClick(app.id)}
              className={`relative flex items-center justify-center w-10 h-10 rounded-md win-subtle-hover text-lg transition-all ${isActive ? 'bg-[hsl(var(--win-subtle-hover))]' : ''}`}
              title={app.title}
            >
              <span>{app.icon}</span>
              {win?.isOpen && (
                <div className={`absolute bottom-0.5 h-[3px] rounded-full transition-all ${isActive ? 'w-4 bg-primary' : 'w-1.5 bg-muted-foreground'}`} />
              )}
            </button>
          );
        })}
      </div>

      {/* System tray */}
      <div className="absolute right-3 flex items-center gap-3 text-xs text-muted-foreground">
        <span>🔊</span>
        <span>📶</span>
        <div className="text-right leading-tight">
          <div>{timeStr}</div>
          <div>{dateStr}</div>
        </div>
      </div>
    </div>
  );
};

export default Taskbar;
