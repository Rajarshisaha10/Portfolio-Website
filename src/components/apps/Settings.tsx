import { useWindows } from '@/contexts/WindowContext';
import { Mail, Github, Copy, ExternalLink, Briefcase, Award, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

const ACTION_SECTIONS = [
  { id: 'hiring', icon: <Briefcase className="w-4 h-4" />, label: 'Hiring Dashboard' },
  { id: 'profile', icon: <Award className="w-4 h-4" />, label: 'Experience Wins' },
];

const Settings = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('rajarshisaha123.4@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex h-full bg-[hsl(var(--background))] overflow-hidden">
      {/* Sidebar */}
      <div className="w-48 border-r border-border/50 p-3 space-y-1 shrink-0 bg-[hsl(var(--win-title-bar)/0.3)]">
        <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground px-3 mb-3 mt-2">Navigation</div>
        {ACTION_SECTIONS.map(s => (
          <div
            key={s.id}
            className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm cursor-pointer transition-all duration-200 win-subtle-hover ${s.id === 'hiring' ? 'bg-[hsl(var(--win-subtle-hover))]' : ''}`}
          >
            {s.icon}
            <span className="text-foreground font-medium">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 p-8 overflow-auto custom-scrollbar space-y-8">
        {/* Hero Section */}
        <div className="space-y-4">
          <div className="space-y-1">
            <h1 className="text-4xl font-bold text-foreground tracking-tight">Rajarshi Saha</h1>
            <p className="text-[15px] font-medium text-muted-foreground/90 flex items-center gap-2">
              Machine Learning Engineer <span className="text-muted-foreground/30">•</span> Real-time AI Systems
            </p>
          </div>
          <div className="flex gap-3 pt-2">
            <button 
              onClick={copyEmail}
              className="px-6 py-2.5 rounded-lg bg-[hsl(var(--primary))] text-primary-foreground text-sm font-semibold shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98] hover:shadow-xl flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              {copied ? 'Email Copied!' : 'Hire Me'}
            </button>
            <button className="px-6 py-2.5 rounded-lg border border-border bg-[hsl(var(--win-subtle))] text-foreground text-sm font-semibold transition-all hover:bg-[hsl(var(--win-subtle-hover))] active:scale-[0.98]">
              View Resume
            </button>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="win-mica rounded-xl p-5 win-border win-shadow group transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold">Email</div>
                <div className="text-sm font-medium text-foreground">rajarshisaha123.4@gmail.com</div>
              </div>
              <button 
                onClick={copyEmail}
                className="p-2 rounded-md win-subtle-hover transition-colors opacity-60 group-hover:opacity-100"
                title="Copy Email"
              >
                <Copy className={`w-4 h-4 ${copied ? 'text-primary' : ''}`} />
              </button>
            </div>
          </div>

          <a 
            href="https://github.com/Rajarshisaha10" 
            target="_blank" 
            rel="noopener noreferrer"
            className="win-mica rounded-xl p-5 win-border win-shadow group transition-all duration-300 hover:-translate-y-1 block"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold">GitHub</div>
                <div className="text-sm font-medium text-foreground">Rajarshisaha10</div>
              </div>
              <div className="p-2 rounded-md win-subtle-hover opacity-60 group-hover:opacity-100">
                <Github className="w-4 h-4" />
              </div>
            </div>
          </a>
        </div>

        {/* What I Bring Section */}
        <div className="space-y-4">
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-bold">Value Proposition</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: 'Real-time ML', desc: 'Low-latency inference systems' },
              { title: 'Full Pipelines', desc: 'Data -> Model -> Scale' },
              { title: 'Deployable AI', desc: 'Practical, production-ready' }
            ].map(v => (
              <div key={v.title} className="p-4 rounded-xl bg-[hsl(var(--win-title-bar)/0.4)] border border-border shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-primary mb-3" />
                <div className="text-sm font-semibold text-foreground">{v.title}</div>
                <div className="text-[11px] text-muted-foreground mt-1">{v.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Me? Section */}
        <div className="win-mica rounded-xl p-6 win-border win-shadow space-y-4">
          <div className="flex items-center gap-3">
             <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Award className="w-6 h-6 text-primary" />
             </div>
             <div>
                <h2 className="text-lg font-bold text-foreground">Why Hire Me?</h2>
                <p className="text-xs text-muted-foreground leading-relaxed">Specific wins from my engineering lab</p>
             </div>
          </div>
          <ul className="space-y-3 pt-2">
            <li className="flex items-start gap-3">
               <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
               <p className="text-[13px] text-foreground/80 leading-relaxed">Built and optimized real-time **facial emotion detection** systems with custom CNN architectures.</p>
            </li>
            <li className="flex items-start gap-3">
               <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
               <p className="text-[13px] text-foreground/80 leading-relaxed">Experience architecting **end-to-end ML pipelines** using TensorFlow, Keras, and Scikit-learn.</p>
            </li>
            <li className="flex items-start gap-3">
               <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
               <p className="text-[13px] text-foreground/80 leading-relaxed">Strong focus on **production-ready code**, ensuring models are actually deliverable and efficient.</p>
            </li>
          </ul>
        </div>

        {/* Footer CTA */}
        <div className="pt-4 pb-8 border-t border-border/50 text-center space-y-4">
           <h3 className="text-xl font-semibold text-foreground">Ready to start building?</h3>
           <button 
             onClick={copyEmail}
             className="px-8 py-3 rounded-xl bg-[hsl(var(--primary))] text-primary-foreground text-sm font-bold shadow-xl shadow-primary/30 transition-all hover:scale-[1.05] active:scale-[0.95] hover:shadow-2xl"
           >
              Let's Work Together
           </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
