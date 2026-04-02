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
import React from 'react';
import { Briefcase, CircleDot, Cpu, Mail, Plus, Rocket, Target, User } from 'lucide-react';

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
          <div className="text-5xl sm:text-6xl font-semibold tracking-wide transition-colors hover:text-white" style={{ fontFamily: 'Segoe UI' }}>
            RAJARSHI SAHA
          </div>
          <div className="text-lg sm:text-xl text-[hsl(0,0%,90%)]">AI Engineer - System Builder</div>
          <div className="max-w-xl text-sm sm:text-base text-[hsl(0,0%,85%)]">
            Building intelligent systems that solve real-world problems with practical, deployable ML.
          </div>
          <div className="pointer-events-auto flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => openApp('file-explorer')}
              className="rounded-full border border-[hsl(0,0%,100%/0.2)] bg-[hsl(0,0%,0%/0.35)] px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-[hsl(0,0%,100%/0.15)]"
            >
              View Projects
            </button>
            <button
              onClick={() => openApp('notepad')}
              className="rounded-full border border-[hsl(0,0%,100%/0.2)] bg-[hsl(0,0%,0%/0.15)] px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 shadow-lg transition-all hover:-translate-y-0.5 hover:text-white hover:bg-[hsl(0,0%,100%/0.15)]"
            >
              Contact Me
            </button>
          </div>
        </div>
        <div className="absolute inset-0 opacity-10 text-[120px] sm:text-[160px] font-semibold text-[hsl(0,0%,100%)] tracking-[0.6em] flex items-center justify-center">
          RS
        </div>
        <div className="absolute bottom-24 left-[18%] text-[10px] uppercase tracking-[0.5em] text-[hsl(0,0%,85%)]">
          AI - SYSTEMS - DATA - AUTOMATION
        </div>
      </div>

      <div className="absolute top-6 right-6 z-10 rounded-2xl bg-[hsl(0,0%,0%/0.38)] backdrop-blur-md border border-[hsl(0,0%,100%/0.15)] px-5 py-4 text-[11px] text-[hsl(0,0%,92%)] space-y-3">
        <div className="uppercase tracking-[0.35em] text-[10px] text-[hsl(0,0%,75%)]">System Profile</div>
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-6 border-b border-[hsl(0,0%,100%/0.08)] pb-2">
            <span className="flex items-center gap-2 text-[hsl(0,0%,75%)]">
              <User className="h-3.5 w-3.5" />
              Name
            </span>
            <span className="font-code text-[12px] text-white">Rajarshi Saha</span>
          </div>
          <div className="flex items-center justify-between gap-6 border-b border-[hsl(0,0%,100%/0.08)] pb-2">
            <span className="flex items-center gap-2 text-[hsl(0,0%,75%)]">
              <Briefcase className="h-3.5 w-3.5" />
              Role
            </span>
            <span className="font-code text-[12px] text-white">AI Engineer</span>
          </div>
          <div className="flex items-center justify-between gap-6 border-b border-[hsl(0,0%,100%/0.08)] pb-2">
            <span className="flex items-center gap-2 text-[hsl(0,0%,75%)]">
              <Target className="h-3.5 w-3.5" />
              Focus
            </span>
            <span className="font-code text-[12px] text-white">ML Systems</span>
          </div>
          <div className="flex items-center justify-between gap-6 border-b border-[hsl(0,0%,100%/0.08)] pb-2">
            <span className="flex items-center gap-2 text-[hsl(0,0%,75%)]">
              <Rocket className="h-3.5 w-3.5" />
              Mission
            </span>
            <span className="font-code text-[12px] text-white">Real-time AI apps</span>
          </div>
          <div className="flex items-center justify-between gap-6">
            <span className="flex items-center gap-2 text-[hsl(0,0%,75%)]">
              <CircleDot className="h-3.5 w-3.5 text-emerald-400" />
              Status
            </span>
            <span className="font-code text-[12px] text-emerald-200">Online</span>
          </div>
        </div>
        <div className="pt-2">
          <div className="text-[10px] uppercase tracking-[0.3em] text-[hsl(0,0%,75%)]">Neural Activity</div>
          <div className="mt-2 h-2 rounded-full bg-[hsl(0,0%,100%/0.1)] overflow-hidden">
            <div className="h-full w-2/3 rounded-full bg-[hsl(200,100%,60%/0.7)] animate-pulse" />
          </div>
          <div className="mt-2 flex items-center justify-between text-[10px] text-[hsl(0,0%,80%)]">
            <span className="flex items-center gap-1">
              <Cpu className="h-3 w-3 text-primary" />
              Models running
            </span>
            <span className="font-code text-[11px] text-white">3</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-20 right-6 z-10 pointer-events-auto flex flex-col gap-2">
        <button className="inline-flex items-center gap-2 rounded-full border border-[hsl(0,0%,100%/0.2)] bg-[hsl(0,0%,0%/0.35)] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-[hsl(0,0%,100%/0.15)]">
          <Plus className="h-3.5 w-3.5" />
          New Project
        </button>
        <button className="inline-flex items-center gap-2 rounded-full border border-[hsl(0,0%,100%/0.2)] bg-[hsl(0,0%,0%/0.25)] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90 shadow-lg transition-all hover:-translate-y-0.5 hover:bg-[hsl(0,0%,100%/0.15)]">
          <Rocket className="h-3.5 w-3.5" />
          Run Demo
        </button>
        <button className="inline-flex items-center gap-2 rounded-full border border-[hsl(0,0%,100%/0.2)] bg-[hsl(0,0%,0%/0.2)] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80 shadow-lg transition-all hover:-translate-y-0.5 hover:text-white hover:bg-[hsl(0,0%,100%/0.15)]">
          <Mail className="h-3.5 w-3.5" />
          Live Models
        </button>
      </div>

      {/* Desktop icons */}
      <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
        {APPS.map(app => (
          <button
            key={app.id}
            onDoubleClick={() => openApp(app.id)}
            onPointerUp={(e) => {
              if (e.pointerType === 'touch') openApp(app.id);
            }}
            className="flex flex-col items-center justify-center gap-1.5 p-2 rounded-md hover:bg-[hsl(0,0%,100%,0.1)] w-[76px] h-[84px] text-center transition-colors border border-transparent hover:border-[hsl(0,0%,100%,0.15)] focus:bg-[hsl(0,0%,100%,0.15)] focus:border-[hsl(0,0%,100%,0.2)]"
            aria-label={`Open ${app.title}`}
          >
            <div className="w-10 h-10 drop-shadow-md flex-shrink-0 transition-transform hover:scale-105 active:scale-95">{app.icon}</div>
            <span className="text-[11px] text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] leading-[1.2]">{app.title}</span>
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
