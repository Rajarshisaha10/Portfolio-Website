import { motion } from 'framer-motion';
import { useWindows } from '@/contexts/WindowContext';
import { type WindowState } from '@/lib/windowManager';
import { useRef, useCallback, type ReactNode } from 'react';

interface WindowProps {
  windowState: WindowState;
  children: ReactNode;
}

const Window = ({ windowState, children }: WindowProps) => {
  const { closeWindow, minimizeWindow, maximizeWindow, focusWindow, updatePosition, activeWindowId } = useWindows();
  const dragRef = useRef<{ startX: number; startY: number; posX: number; posY: number } | null>(null);
  const windowRef = useRef<HTMLDivElement>(null);

  const isActive = activeWindowId === windowState.id;

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    focusWindow(windowState.id);
    if (windowState.isMaximized) return;
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      posX: windowState.position.x,
      posY: windowState.position.y,
    };

    const onMove = (ev: MouseEvent) => {
      if (!dragRef.current) return;
      const dx = ev.clientX - dragRef.current.startX;
      const dy = ev.clientY - dragRef.current.startY;
      updatePosition(windowState.id, {
        x: dragRef.current.posX + dx,
        y: dragRef.current.posY + dy,
      });
    };

    const onUp = () => {
      dragRef.current = null;
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }, [windowState.id, windowState.isMaximized, windowState.position, focusWindow, updatePosition]);

  if (!windowState.isOpen) return null;

  const style = windowState.isMaximized
    ? { left: 0, top: 0, width: '100%', height: 'calc(100% - 48px)', zIndex: windowState.zIndex }
    : {
        left: windowState.position.x,
        top: windowState.position.y,
        width: windowState.size.width,
        height: windowState.size.height,
        zIndex: windowState.zIndex,
      };

  return (
    <motion.div
      ref={windowRef}
      className={`fixed rounded-lg win-mica win-shadow win-border flex flex-col overflow-hidden ${windowState.isMinimized ? 'animate-win-minimize pointer-events-none' : 'animate-win-open'}`}
      style={style}
      onClick={() => focusWindow(windowState.id)}
      initial={false}
    >
      {/* Title bar */}
      <div
        className={`flex items-center h-9 px-3 shrink-0 select-none cursor-default ${isActive ? '' : 'opacity-70'}`}
        onMouseDown={onMouseDown}
      >
        <span className="text-sm mr-2">{windowState.icon}</span>
        <span className="text-xs text-foreground flex-1 truncate">{windowState.title}</span>
        <div className="flex items-center -mr-1">
          <button
            onClick={(e) => { e.stopPropagation(); minimizeWindow(windowState.id); }}
            className="w-[46px] h-8 flex items-center justify-center hover:bg-[hsl(var(--win-subtle-hover))] rounded-sm transition-colors"
          >
            <span className="text-[10px] text-foreground">─</span>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); maximizeWindow(windowState.id); }}
            className="w-[46px] h-8 flex items-center justify-center hover:bg-[hsl(var(--win-subtle-hover))] rounded-sm transition-colors"
          >
            <span className="text-[10px] text-foreground">{windowState.isMaximized ? '❐' : '□'}</span>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); closeWindow(windowState.id); }}
            className="w-[46px] h-8 flex items-center justify-center hover:bg-destructive hover:text-destructive-foreground rounded-sm transition-colors"
          >
            <span className="text-[10px]">✕</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </motion.div>
  );
};

export default Window;
