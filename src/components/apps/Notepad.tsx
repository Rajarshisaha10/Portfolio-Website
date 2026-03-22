import { useState } from 'react';

const DEFAULT_CONTENT = `# Rajarshi Saha | Machine Learning Engineer

## About Me
I design and deploy real-world machine learning systems with a focus on performance, scalability, and usability.

My work goes beyond model training — I build complete pipelines, from data processing to real-time inference and user-facing applications.

I’m particularly interested in bridging the gap between research models and production-ready systems.

---

## What I Build
- Real-time ML systems (low-latency inference)
- End-to-end pipelines (data → model → deployment)
- Interactive AI applications with practical use cases

---

## Featured Work
- Facial Emotion Recognition  
  → Real-time CNN-based system with OpenCV integration  
  → Trained on FER-2013 with optimized inference pipeline  

- AI Therapist Assistant  
  → Emotion-aware conversational system using Gemini API  
  → Integrated mood tracking + crisis detection  

- Interactive Portfolio OS  
  → Browser-based Windows-style environment  
  → Custom window manager, terminal, and UI system  

---

## Technical Stack
Languages:
- Python, JavaScript

ML / AI:
- TensorFlow, PyTorch, Hugging Face

Backend:
- Django, Flask, REST APIs

Systems:
- Real-time inference pipelines
- Model optimization & deployment

---

## Education
B.Tech in Computer Science  
VIT Chennai, India

---

## Contact
Location: Chennai, India  
Email: rajarshisaha123.4@gmail.com  
GitHub: github.com/Rajarshisaha10  

---

## Quick Note
Open Project Explorer to view systems.  
Run commands in AI Lab.exe for interactive demos.`;

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
