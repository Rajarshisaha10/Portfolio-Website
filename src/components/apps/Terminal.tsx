import { useState, useRef, useEffect } from 'react';
import { useWindows } from '@/contexts/WindowContext';

interface TerminalLine {
  type: 'input' | 'output';
  text: string;
}

const COMMANDS: Record<string, string> = {
  help: `Available commands:
  help            - Show this help message
  whoami          - About me
  mission         - What I am building
  skills          - View technical skills
  projects        - Open Project Explorar
  contact         - Contact details
  clear           - Clear terminal
  ls              - List workspace`,
  whoami: `Rajarshi Saha — AI Engineer
I build ML systems that feel practical, fast, and real-world ready.
Focus: Computer Vision • Time-Series • Production ML`,
  mission: `Current Mission:
Building intelligent systems that solve real-world problems,
with a focus on deployable AI and human-centered outcomes.`,
  skills: `Core Skills:
  Python, Django, JavaScript, HTML, CSS
  TensorFlow, PyTorch, Hugging Face
  REST APIs, System Design, DSA`,
  contact: `Contact:
  Email: rajarshisaha123.4@gmail.com
  GitHub: github.com/Rajarshisaha10`,
  ls: `📁 ML-Projects/    📁 Skills/    📁 Tools/    📄 README.md`,
};

const Terminal = () => {
  const { openApp } = useWindows();
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: 'output', text: 'Booting RajarshiOS...' },
    { type: 'output', text: 'Neural modules online. System status: GREEN.' },
    { type: 'output', text: 'Type "help" to explore this workspace.\n' },
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const raw = input.trim();
    const cmd = raw.toLowerCase();
    const newLines: TerminalLine[] = [
      ...lines,
      { type: 'input', text: `RS:\\Neural-Lab> ${raw}` },
    ];

    if (cmd === 'clear') {
      setLines([]);
      setInput('');
      return;
    }

    if (cmd === 'projects' || cmd === 'open projects') {
      newLines.push({ type: 'output', text: 'Opening Project Explorar...' });
      setLines(newLines);
      openApp('file-explorer');
      setInput('');
      return;
    }

    if (cmd in COMMANDS) {
      newLines.push({ type: 'output', text: COMMANDS[cmd] });
      setLines(newLines);
      setInput('');
      return;
    }

    if (cmd === 'get-projects') {
      newLines.push({ type: 'output', text: 'Command "get-projects" updated to "projects".' });
      setLines(newLines);
      setInput('');
      return;
    }

    if (cmd === 'get-skills') {
      newLines.push({ type: 'output', text: 'Command "get-skills" updated to "skills".' });
      setLines(newLines);
      setInput('');
      return;
    }

    if (cmd === 'get-contact') {
      newLines.push({ type: 'output', text: 'Command "get-contact" updated to "contact".' });
      setLines(newLines);
      setInput('');
      return;
    }

    if (cmd) {
      newLines.push({ type: 'output', text: `'${cmd}' is not recognized. Type 'help' for commands.` });
      setLines(newLines);
    } else {
      setLines(newLines);
    }

    setInput('');
  };

  return (
    <div
      className="flex flex-col h-full bg-[hsl(220,15%,6%)] text-[hsl(0,0%,88%)] font-mono text-xs"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Tab bar */}
      <div className="flex items-center h-8 bg-[hsl(220,12%,10%)] px-2 shrink-0">
        <div className="flex items-center gap-2 px-3 py-1 bg-[hsl(220,15%,6%)] rounded-t text-[10px]">
          <span>🤖</span>
          <span>Neural Lab</span>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-3 space-y-0.5">
        {lines.map((line, i) => (
          <div key={i} className={`whitespace-pre-wrap ${line.type === 'input' ? 'text-[hsl(207,90%,65%)]' : ''}`}>
            {line.text}
          </div>
        ))}

        <form onSubmit={handleSubmit} className="flex items-center">
          <span className="text-[hsl(207,90%,65%)] mr-1">RS:\Neural-Lab&gt;</span>
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            className="flex-1 bg-transparent outline-none caret-[hsl(0,0%,88%)]"
            autoFocus
          />
        </form>
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default Terminal;
