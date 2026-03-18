import { useState } from 'react';

const DEFAULT_CONTENT = `# Rajarshi Saha | Machine Learning Engineer

## About Me
I build intelligent systems that turn complex data into practical, real-world outcomes. My work spans end-to-end ML workflows, from data preparation and model training to deployment-ready inference pipelines. I enjoy bridging research-grade models with production-friendly engineering.

## Education
- B.Tech in Computer Science and Engineering
- VIT Chennai, India

## Contact
- Location: Chennai, India
- Email: rajarshisaha123.4@gmail.com
- GitHub: github.com/Rajarshisaha10

## Technical Snapshot
- Languages: Python, JavaScript, HTML, CSS
- Frameworks: Django
- ML Stack: TensorFlow, PyTorch, Hugging Face
- Concepts: DSA, OOP, REST APIs, System Design

Tip: Explore projects in Project Explorer or run commands in AI Lab.exe.`;

const Notepad = () => {
  const [content, setContent] = useState(DEFAULT_CONTENT);

  return (
    <div className="flex flex-col h-full bg-card">
      {/* Menu bar */}
      <div className="flex items-center h-7 px-2 border-b border-border text-xs text-muted-foreground gap-3 shrink-0">
        <span className="win-subtle-hover px-2 py-0.5 rounded cursor-pointer">File</span>
        <span className="win-subtle-hover px-2 py-0.5 rounded cursor-pointer">Edit</span>
        <span className="win-subtle-hover px-2 py-0.5 rounded cursor-pointer">View</span>
      </div>

      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        className="flex-1 p-3 bg-transparent text-foreground text-sm font-mono resize-none outline-none leading-relaxed"
        spellCheck={false}
      />

      {/* Status bar */}
      <div className="flex items-center justify-between h-6 px-3 border-t border-border text-[10px] text-muted-foreground shrink-0">
        <span>Ln {content.split('\n').length}, Col 1</span>
        <span>UTF-8</span>
      </div>
    </div>
  );
};

export default Notepad;
