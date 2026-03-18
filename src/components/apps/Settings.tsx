import { useWindows } from '@/contexts/WindowContext';

const CONTACT_SECTIONS = [
  { id: 'profile', icon: '👤', label: 'Profile' },
  { id: 'contact', icon: '📬', label: 'Contact' },
  { id: 'status', icon: '🧠', label: 'Status' },
];

const Settings = () => {
  const { isDarkMode, toggleDarkMode } = useWindows();

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-48 border-r border-border p-3 space-y-1 shrink-0">
        {CONTACT_SECTIONS.map(s => (
          <div
            key={s.id}
            className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm cursor-pointer win-subtle-hover ${s.id === 'contact' ? 'bg-[hsl(var(--win-subtle-hover))]' : ''}`}
          >
            <span>{s.icon}</span>
            <span className="text-foreground">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-auto space-y-5">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Contact.exe</h2>
          <p className="text-xs text-muted-foreground mt-1">Reach out or connect — always open to collaborations.</p>
        </div>

        <div className="win-subtle rounded-lg p-4 win-border">
          <h3 className="text-sm font-medium text-foreground">Contact Info</h3>
          <div className="mt-3 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Email</span>
              <span className="text-foreground">rajarshisaha123.4@gmail.com</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">GitHub</span>
              <span className="text-foreground">github.com/Rajarshisaha10</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Location</span>
              <span className="text-foreground">Chennai, India</span>
            </div>
          </div>
        </div>

        <div className="win-subtle rounded-lg p-4 win-border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-foreground">Appearance</h3>
              <p className="text-xs text-muted-foreground mt-1">Toggle light/dark mode</p>
            </div>
            <button
              onClick={toggleDarkMode}
              className={`relative w-11 h-6 rounded-full transition-colors ${isDarkMode ? 'bg-primary' : 'bg-muted-foreground/30'}`}
            >
              <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-card shadow transition-transform ${isDarkMode ? 'left-[22px]' : 'left-0.5'}`} />
            </button>
          </div>
        </div>

        <div className="win-subtle rounded-lg p-4 win-border">
          <h3 className="text-sm font-medium text-foreground">Status</h3>
          <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
            <div className="rounded-md border border-border bg-[hsl(var(--win-title-bar))] p-3">
              <div className="text-muted-foreground">User</div>
              <div className="text-foreground font-semibold mt-1">Rajarshi</div>
            </div>
            <div className="rounded-md border border-border bg-[hsl(var(--win-title-bar))] p-3">
              <div className="text-muted-foreground">Mode</div>
              <div className="text-foreground font-semibold mt-1">Building</div>
            </div>
            <div className="rounded-md border border-border bg-[hsl(var(--win-title-bar))] p-3">
              <div className="text-muted-foreground">Focus</div>
              <div className="text-foreground font-semibold mt-1">AI Systems</div>
            </div>
            <div className="rounded-md border border-border bg-[hsl(var(--win-title-bar))] p-3">
              <div className="text-muted-foreground">Status</div>
              <div className="text-foreground font-semibold mt-1">Online</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
