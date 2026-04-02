import { useState, useRef, useEffect, useCallback } from 'react';
import { useWindows } from '@/contexts/WindowContext';

interface TerminalLine {
  type: 'input' | 'output' | 'system' | 'error';
  text: string;
}

type Theme = 'dark' | 'hacker' | 'blue' | 'white';

const THEMES: Record<Theme, { bg: string, text: string, primary: string, accent: string }> = {
  dark: {
    bg: 'bg-[hsl(220,15%,6%)]',
    text: 'text-[hsl(0,0%,88%)]',
    primary: 'text-[hsl(207,90%,65%)]',
    accent: 'text-[hsl(150,100%,50%)]',
  },
  hacker: {
    bg: 'bg-[#0a0a0a]',
    text: 'text-[#00ff41]',
    primary: 'text-[#00ff41]',
    accent: 'text-[#008f11]',
  },
  blue: {
    bg: 'bg-[#001f3f]',
    text: 'text-[#7fdbff]',
    primary: 'text-[#0074d9]',
    accent: 'text-[#39cccc]',
  },
  white: {
    bg: 'bg-[#f8f9fa]',
    text: 'text-[#212529]',
    primary: 'text-[#007bff]',
    accent: 'text-[#6c757d]',
  }
};

const MODELS = [
  { name: 'Stock market analyzer', status: 'READY' },
  { name: 'Emotion Detector', status: 'READY' },
  { name: 'House pred', status: 'READY' },
];

const Terminal = () => {
  const { openApp } = useWindows();
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [theme, setTheme] = useState<Theme>('dark');
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const addLine = useCallback((text: string, type: TerminalLine['type'] = 'output') => {
    setLines(prev => [...prev, { text, type }]);
  }, []);

  const simulateBoot = useCallback(async () => {
    setIsTyping(true);
    const bootSequence = [
      { text: 'Booting RajarshiOS...', delay: 100 },
      { text: '[✓] Loading neural modules...', delay: 400 },
      { text: '[✓] Connecting to inference engine...', delay: 300 },
      { text: '[⚡] GPU acceleration enabled', delay: 200 },
      { text: 'Neural modules online. System status: OPTIMAL.', delay: 300 },
      { text: 'Type "help" to explore this workspace.\n', delay: 100 },
    ];

    for (const step of bootSequence) {
      await new Promise(resolve => setTimeout(resolve, step.delay));
      addLine(step.text, step.text.startsWith('[') ? 'system' : 'output');
    }
    setIsTyping(false);
  }, [addLine]);

  useEffect(() => {
    if (lines.length === 0) {
      simulateBoot();
    }
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const COMMANDS: Record<string, () => void | string> = {
    help: () => `Available commands:
  help            - Show this help message
  projects        - View my works
  models          - List loaded neural models
  status          - Neural core health check
  run [model]     - Initialize model execution
  theme [name]    - Switch theme (hacker, blue, white, dark)
  clear           - Wipe terminal memory
  whoami          - About the creator`,
    
    status: () => `🧠 Neural Core: ACTIVE
⚡ Inference Speed: OPTIMAL
📡 Connections: STABLE
🔋 Power Usage: 42%
🌡️ Core Temp: 38°C`,
    
    models: () => `Loaded Models:\n${MODELS.map(m => `- ${m.name} [${m.status}]`).join('\n')}`,
    
    projects: () => {
      addLine('Opening Project Explorer...', 'system');
      openApp('file-explorer');
      return '';
    },
    
    whoami: () => `Rajarshi Saha — AI Engineer
I build ML systems that feel practical, fast, and real-world ready.
Focus: Computer Vision • Time-Series • Production ML`,

    clear: () => {
      setLines([]);
      return '';
    },

    run: (args?: string) => {
      if (!args) return 'Error: Specify a model name. Example: run chatbot_v2';
      const model = MODELS.find(m => m.name === args || m.name.includes(args));
      if (!model) return `Error: Model '${args}' not found.`;
      
      simulateModelRun(model.name);
      return '';
    },

    theme: (args?: string) => {
      if (!args || !THEMES[args as Theme]) {
        return `Available themes: ${Object.keys(THEMES).join(', ')}`;
      }
      setTheme(args as Theme);
      return `Theme switched to ${args}.`;
    }
  };

  const simulateModelRun = async (modelName: string) => {
    setIsTyping(true);
    addLine(`Initializing ${modelName}...`, 'system');
    await new Promise(r => setTimeout(r, 600));
    addLine('Loading weights...', 'system');
    
    const progressSteps = 10;
    for (let i = 1; i <= progressSteps; i++) {
      await new Promise(r => setTimeout(r, 200));
      const progress = '[' + '█'.repeat(i) + ' '.repeat(progressSteps - i) + '] ' + (i * 10) + '%';
      setLines(prev => {
        const last = prev[prev.length - 1];
        if (last && last.text.includes('%')) {
          return [...prev.slice(0, -1), { text: progress, type: 'system' }];
        }
        return [...prev, { text: progress, type: 'system' }];
      });
    }
    
    await new Promise(r => setTimeout(r, 300));
    addLine(`${modelName} execution complete. Results streamed to dashboard.`, 'output');
    setIsTyping(false);
  };

  const handleCommand = (raw: string) => {
    const [cmd, ...args] = raw.trim().toLowerCase().split(' ');
    
    addLine(`RS:\\Neural-Lab> ${raw}`, 'input');

    if (COMMANDS[cmd]) {
      const result = typeof COMMANDS[cmd] === 'function' 
        ? (COMMANDS[cmd] as any)(args.join(' ')) 
        : COMMANDS[cmd];
      if (result) addLine(result);
    } else if (cmd) {
      addLine(`'${cmd}' is not recognized. Type 'help' for commands.`, 'error');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isTyping || !input.trim()) return;

    const val = input.trim();
    handleCommand(val);
    setHistory(prev => [val, ...prev].slice(0, 50));
    setHistoryIndex(-1);
    setInput('');
    setSuggestions([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        const nextIndex = historyIndex + 1;
        setHistoryIndex(nextIndex);
        setInput(history[nextIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInput(history[nextIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (suggestions.length > 0) {
        setInput(suggestions[0]);
        setSuggestions([]);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInput(val);
    
    if (val.trim()) {
      const matches = Object.keys(COMMANDS).filter(c => c.startsWith(val.toLowerCase()));
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }
  };

  const currentTheme = THEMES[theme];

  return (
    <div
      className={`flex h-full ${currentTheme.bg} ${currentTheme.text} font-mono text-xs overflow-hidden`}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Main Terminal Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className={`flex items-center h-8 bg-black/20 px-2 shrink-0 border-b border-white/5`}>
          <div className={`flex items-center gap-2 px-3 py-1 bg-black/40 rounded-t text-[10px]`}>
            <span>🤖</span>
            <span>Neural Lab - {theme.toUpperCase()}</span>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-3 space-y-0.5 scrollbar-hide">
          {lines.map((line, i) => (
            <div 
              key={i} 
              className={`whitespace-pre-wrap transition-opacity duration-300
                ${line.type === 'input' ? currentTheme.primary : ''} 
                ${line.type === 'system' ? currentTheme.accent : ''}
                ${line.type === 'error' ? 'text-red-400' : ''}
              `}
            >
              {line.text}
            </div>
          ))}

          {!isTyping && (
            <div className="relative">
              <form onSubmit={handleSubmit} className="flex items-center">
                <span className={`${currentTheme.primary} mr-1 shrink-0`}>RS:\Neural-Lab&gt;</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent outline-none border-none p-0 focus:ring-0"
                  autoFocus
                  spellCheck={false}
                  autoComplete="off"
                />
                <span className="animate-pulse ml-0.5">█</span>
              </form>
              
              {suggestions.length > 0 && (
                <div className="absolute left-[110px] top-full mt-1 bg-black/80 border border-white/10 p-1 rounded z-10">
                  <div className="text-[10px] opacity-50 mb-1 px-1">Suggestions:</div>
                  {suggestions.map(s => (
                    <div key={s} className="px-1 hover:bg-white/10 cursor-pointer" onClick={() => {
                      setInput(s);
                      setSuggestions([]);
                      inputRef.current?.focus();
                    }}>
                      {s}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Right Panel - System Monitor */}
      <div className="w-48 shrink-0 border-l border-white/5 bg-black/10 p-3 hidden md:flex flex-col gap-4 text-[10px]">
        <div>
          <div className="opacity-50 mb-2 uppercase tracking-widest font-bold">🧠 Live System Monitor</div>
          <div className="space-y-2">
            <StatItem label="CPU" value="32%" color="bg-blue-500" />
            <StatItem label="GPU" value="68%" color="bg-purple-500" />
            <StatItem label="RAM" value="4.2GB" color="bg-green-500" />
          </div>
        </div>
        
        <div className="mt-4">
          <div className="opacity-50 mb-2 uppercase tracking-widest font-bold">📡 Neural Metrics</div>
          <div className="space-y-1">
            <div className="flex justify-between"><span>Models:</span> <span className={currentTheme.accent}>3 Active</span></div>
            <div className="flex justify-between"><span>Latency:</span> <span className={currentTheme.accent}>120ms</span></div>
            <div className="flex justify-between"><span>Status:</span> <span className="text-green-500">STABLE</span></div>
          </div>
        </div>

        <div className="mt-auto opacity-30 text-[8px] leading-tight">
          RAJARSHI-OS v2.0.4-LTS
          <br />
          NEURAL-KERNEL: ACTIVE
        </div>
      </div>
    </div>
  );
};

const StatItem = ({ label, value, color }: { label: string, value: string, color: string }) => (
  <div className="space-y-1">
    <div className="flex justify-between px-0.5">
      <span>{label}</span>
      <span>{value}</span>
    </div>
    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
      <div className={`h-full ${color}`} style={{ width: value }} />
    </div>
  </div>
);

export default Terminal;
