import wallpaper from '@/assets/wallpaper.jpg';
import { WindowProvider, useWindows } from '@/contexts/WindowContext';
import Taskbar from '@/components/os/Taskbar';
import StartMenu from '@/components/os/StartMenu';
import Window from '@/components/os/Window';
import FileExplorer from '@/components/apps/FileExplorer';
import Terminal from '@/components/apps/Terminal';
import Notepad from '@/components/apps/Notepad';
import Settings from '@/components/apps/Settings';
import { APPS } from '@/lib/windowManager';

const AppContent: Record<string, React.ReactNode> = {
  'file-explorer': <FileExplorer />,
  'terminal': <Terminal />,
  'notepad': <Notepad />,
  'settings': <Settings />,
};

const Desktop = () => {
  const { windows, openApp } = useWindows();

  return (
    <div className="w-screen h-screen overflow-hidden relative select-none">
      {/* Wallpaper */}
      <img
        src={wallpaper}
        alt="Desktop wallpaper"
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />

      {/* Identity overlay */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute top-24 left-[18%] text-[hsl(0,0%,100%)] drop-shadow-2xl space-y-3 float-slow">
          <div className="text-5xl sm:text-6xl font-semibold tracking-wide">RAJARSHI SAHA</div>
          <div className="text-lg sm:text-xl text-[hsl(0,0%,90%)]">AI Engineer • System Builder</div>
          <div className="max-w-xl text-sm sm:text-base text-[hsl(0,0%,85%)]">
            Building intelligent systems that solve real-world problems with practical, deployable ML.
          </div>
        </div>
        <div className="absolute inset-0 opacity-10 text-[120px] sm:text-[160px] font-semibold text-[hsl(0,0%,100%)] tracking-[0.6em] flex items-center justify-center">
          RS
        </div>
        <div className="absolute bottom-24 left-[18%] text-[10px] uppercase tracking-[0.5em] text-[hsl(0,0%,85%)]">
          AI • SYSTEMS • DATA • AUTOMATION
        </div>
      </div>

      <div className="absolute top-6 right-6 z-10 rounded-2xl bg-[hsl(0,0%,0%/0.38)] backdrop-blur-md border border-[hsl(0,0%,100%/0.15)] px-5 py-4 text-[11px] text-[hsl(0,0%,92%)] space-y-2">
        <div className="uppercase tracking-[0.35em] text-[10px] text-[hsl(0,0%,75%)]">System Profile</div>
        <div className="flex justify-between gap-6">
          <span className="text-[hsl(0,0%,75%)]">Name</span>
          <span>Rajarshi Saha</span>
        </div>
        <div className="flex justify-between gap-6">
          <span className="text-[hsl(0,0%,75%)]">Role</span>
          <span>AI Engineer</span>
        </div>
        <div className="flex justify-between gap-6">
          <span className="text-[hsl(0,0%,75%)]">Focus</span>
          <span>ML Systems</span>
        </div>
        <div className="flex justify-between gap-6">
          <span className="text-[hsl(0,0%,75%)]">Mission</span>
          <span>Real-time AI apps</span>
        </div>
        <div className="flex justify-between gap-6">
          <span className="text-[hsl(0,0%,75%)]">Status</span>
          <span>Online</span>
        </div>
      </div>

      {/* Desktop icons */}
      <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
        {APPS.map(app => (
          <button
            key={app.id}
            onDoubleClick={() => openApp(app.id)}
            className="flex flex-col items-center gap-1 p-2 rounded-md hover:bg-[hsl(0,0%,100%,0.12)] w-20 text-center transition-colors"
          >
            <span className="text-3xl drop-shadow-lg">{app.icon}</span>
            <span className="text-[11px] text-[hsl(0,0%,100%)] drop-shadow-md leading-tight">{app.title}</span>
          </button>
        ))}
      </div>

      {/* Windows */}
      {windows.map(win => (
        <Window key={win.id} windowState={win}>
          {AppContent[win.id]}
        </Window>
      ))}

      {/* Start Menu */}
      <StartMenu />

      {/* Taskbar */}
      <Taskbar />
    </div>
  );
};

const Index = () => (
  <WindowProvider>
    <Desktop />
  </WindowProvider>
);

export default Index;
