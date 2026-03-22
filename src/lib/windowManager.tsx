import React from 'react';
import { FolderOpen, Terminal as TerminalIcon, FileText, Mail } from 'lucide-react';

export interface WindowState {
  id: string;
  title: string;
  icon: React.ReactNode;
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
  icon: React.ReactNode;
  defaultSize: { width: number; height: number };
}

export const APPS: AppDefinition[] = [
  { id: 'file-explorer', title: 'Project Explorar', icon: <FolderOpen color="#dac071" fill="#dac071" className="w-full h-full" />, defaultSize: { width: 760, height: 520 } },
  { id: 'terminal', title: 'Neural Lab', icon: <TerminalIcon className="w-full h-full text-zinc-300" />, defaultSize: { width: 680, height: 440 } },
  { id: 'notepad', title: 'About_Rajarshi.txt', icon: <FileText className="w-full h-full text-blue-300" />, defaultSize: { width: 560, height: 420 } },
  { id: 'settings', title: 'HireMe.exe', icon: <Mail className="w-full h-full text-indigo-400" />, defaultSize: { width: 600, height: 440 } },
];
