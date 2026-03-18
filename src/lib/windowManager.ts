export interface WindowState {
  id: string;
  title: string;
  icon: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

export interface AppDefinition {
  id: string;
  title: string;
  icon: string;
  defaultSize: { width: number; height: number };
}

export const APPS: AppDefinition[] = [
  { id: 'file-explorer', title: 'Project Explorar', icon: '📁', defaultSize: { width: 760, height: 520 } },
  { id: 'terminal', title: 'Neural Lab', icon: '🤖', defaultSize: { width: 680, height: 440 } },
  { id: 'notepad', title: 'About_Rajarshi.txt', icon: '📄', defaultSize: { width: 560, height: 420 } },
  { id: 'settings', title: 'HireMe.exe', icon: '📬', defaultSize: { width: 600, height: 440 } },
];
