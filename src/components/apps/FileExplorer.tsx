import { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUp, Cloud, RefreshCw } from 'lucide-react';

type FileKind = 'project' | 'skill' | 'tool' | 'concept';

type Project = {
  id: string;
  fileName: string;
  title: string;
  subtitle: string;
  summary: string;
  overview: string[];
  features: string[];
  stack: string[];
  metrics: { label: string; value: string }[];
  github: string;
  accent: string;
  size: string;
  updated: string;
};

type DocFile = {
  id: string;
  fileName: string;
  title: string;
  content: string;
  kind: FileKind;
  size: string;
  updated: string;
};

type TreeNode = {
  id: string;
  label: string;
  icon: string;
  type: 'folder' | 'file';
  fileId?: string;
  fileKind?: FileKind;
  children?: TreeNode[];
};

const projects: Project[] = [
  {
    id: 'emotion-detection',
    fileName: 'emotion-detection.md',
    title: 'Facial Emotion Recognition',
    subtitle: 'Deep CNN | Real-time Emotion Detection',
    summary: 'Real-time emotion classifier trained on FER-2013 with a production-ready inference pipeline.',
    overview: [
      '4-layer CNN (64→128→256→512 filters) for hierarchical feature learning',
      '35,000+ FER-2013 grayscale images with augmentation',
      'Live video inference pipeline with OpenCV integration',
    ],
    features: [
      'BatchNorm, Dropout, MaxPooling for stability and generalization',
      'EarlyStopping + ReduceLROnPlateau to curb overfitting',
      'Exported Keras model for deployment-ready inference',
    ],
    stack: ['Python', 'TensorFlow', 'Keras', 'OpenCV'],
    metrics: [
      { label: 'Dataset', value: '35,000+ images' },
      { label: 'Classes', value: '7 emotions' },
      { label: 'Inference', value: 'Real-time' },
    ],
    github: 'https://github.com/Rajarshisaha10/Emotion_Detector',
    accent: 'from-blue-500/40 via-cyan-400/30 to-emerald-400/30',
    size: '4.2 KB',
    updated: 'Feb 2025',
  },
  {
    id: 'stock-predictor',
    fileName: 'stock-predictor.md',
    title: 'LSTM Stock Market Price Prediction',
    subtitle: 'Time-Series Forecasting | Multi-Feature Signals',
    summary: 'Stacked LSTM model forecasting close prices using multi-signal market inputs.',
    overview: [
      'Sliding window sequences with MinMaxScaler normalization',
      'Multi-feature inputs: Open, High, Low, Close, Volume',
      'Trend visualization for train/test evaluation',
    ],
    features: [
      'Adam optimizer with gradient clipping',
      'Hyperparameter tuning for units, dropout, lookback, learning rate',
      'MSE/RMSE evaluation with visual diagnostics',
    ],
    stack: ['Python', 'TensorFlow', 'Keras', 'Pandas', 'Scikit-learn'],
    metrics: [
      { label: 'Model', value: 'Stacked LSTM' },
      { label: 'Inputs', value: '5 signals' },
      { label: 'Eval', value: 'MSE / RMSE' },
    ],
    github: 'https://github.com/Rajarshisaha10/stock_market_pred',
    accent: 'from-indigo-500/40 via-purple-400/30 to-fuchsia-400/30',
    size: '3.6 KB',
    updated: 'Jan 2025',
  },
  {
    id: 'housing-pipeline',
    fileName: 'housing-model.md',
    title: 'Housing Price Prediction',
    subtitle: 'Regression Pipeline | Feature Engineering',
    summary: 'End-to-end regression workflow to identify price drivers and optimize performance.',
    overview: [
      'EDA with missing value handling and outlier treatment',
      'Categorical encoding for model-ready data',
      'Modular pipeline for preprocessing and training',
    ],
    features: [
      'Benchmarked Linear, Ridge, Lasso, Random Forest, XGBoost',
      'GridSearchCV with k-fold validation',
      'MAE/RMSE/R² reporting for clear evaluation',
    ],
    stack: ['Python', 'Scikit-learn', 'XGBoost', 'Pandas', 'Seaborn'],
    metrics: [
      { label: 'Models', value: '5 compared' },
      { label: 'Validation', value: 'K-fold' },
      { label: 'Metrics', value: 'MAE / RMSE / R²' },
    ],
    github: 'https://github.com/Rajarshisaha10/House_price_pred',
    accent: 'from-amber-400/40 via-orange-400/30 to-rose-400/30',
    size: '3.9 KB',
    updated: 'Dec 2024',
  },
];

const docs: DocFile[] = [
  {
    id: 'skills',
    fileName: 'skills.md',
    title: 'Technical Skills',
    kind: 'skill',
    content: '# Technical Skills\n\n## Languages\n- Python\n- JavaScript\n- HTML\n- CSS\n\n## Frameworks\n- Django\n\n## Machine Learning\n- Model training\n- Evaluation pipelines\n- Data preprocessing\n\n## APIs\n- REST APIs\n- Integration workflows',
    size: '2.1 KB',
    updated: 'Mar 2025',
  },
  {
    id: 'tools',
    fileName: 'tools.md',
    title: 'Tools & Technologies',
    kind: 'tool',
    content: '# Tools & Technologies\n\n## Daily Stack\n- Git & GitHub\n- VS Code\n\n## ML Ecosystem\n- Hugging Face\n- TensorFlow\n- PyTorch',
    size: '1.4 KB',
    updated: 'Mar 2025',
  },
  {
    id: 'concepts',
    fileName: 'concepts.md',
    title: 'Core Concepts',
    kind: 'concept',
    content: '# Core Concepts\n\n- Data Structures & Algorithms\n- OOP\n- REST APIs\n- System Design',
    size: '1.1 KB',
    updated: 'Mar 2025',
  },
];

const tree: TreeNode[] = [
  {
    id: 'projects-folder',
    label: 'Projects',
    icon: '📁',
    type: 'folder',
    children: projects.map(project => ({
      id: `file-${project.id}`,
      label: project.fileName,
      icon: '📄',
      type: 'file',
      fileId: project.id,
      fileKind: 'project',
    })),
  },
  {
    id: 'skills-folder',
    label: 'Skills',
    icon: '📁',
    type: 'folder',
    children: docs.filter(doc => doc.kind === 'skill').map(doc => ({
      id: `file-${doc.id}`,
      label: doc.fileName,
      icon: '📄',
      type: 'file',
      fileId: doc.id,
      fileKind: doc.kind,
    })),
  },
  {
    id: 'tools-folder',
    label: 'Tools',
    icon: '📁',
    type: 'folder',
    children: docs.filter(doc => doc.kind !== 'skill').map(doc => ({
      id: `file-${doc.id}`,
      label: doc.fileName,
      icon: '📄',
      type: 'file',
      fileId: doc.id,
      fileKind: doc.kind,
    })),
  },
];

const parseMarkdown = (content: string) => {
  const blocks = content.split(/\n{2,}/);
  return blocks.map((block, index) => {
    const trimmed = block.trim();
    if (!trimmed) return null;

    if (trimmed.startsWith('# ')) {
      return (
        <h1 key={`h1-${index}`} className="text-xl font-semibold text-foreground">
          {trimmed.slice(2)}
        </h1>
      );
    }

    if (trimmed.startsWith('## ')) {
      return (
        <h2 key={`h2-${index}`} className="text-sm font-semibold text-foreground">
          {trimmed.slice(3)}
        </h2>
      );
    }

    if (trimmed.startsWith('- ')) {
      const items = trimmed.split('\n').map(line => line.replace(/^[-*]\s*/, ''));
      return (
        <div key={`ul-${index}`} className="space-y-2 text-xs text-foreground">
          {items.map(item => (
            <div key={item} className="flex gap-2">
              <span className="text-primary">●</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      );
    }

    return (
      <p key={`p-${index}`} className="text-xs text-foreground leading-relaxed">
        {trimmed}
      </p>
    );
  });
};

const FileExplorer = () => {
  const [activeFileId, setActiveFileId] = useState(projects[0].id);
  const [activeFileKind, setActiveFileKind] = useState<FileKind>('project');
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({
    'projects-folder': false,
    'skills-folder': false,
    'tools-folder': false,
  });

  const activeProject = useMemo(
    () => projects.find(project => project.id === activeFileId),
    [activeFileId]
  );

  const activeDoc = useMemo(
    () => docs.find(doc => doc.id === activeFileId),
    [activeFileId]
  );

  const activeTitle = activeFileKind === 'project'
    ? activeProject?.title ?? 'Project'
    : activeDoc?.title ?? 'Document';

  const activeFileName = activeFileKind === 'project'
    ? activeProject?.fileName ?? 'project.md'
    : activeDoc?.fileName ?? 'document.md';

  const breadcrumb = activeFileKind === 'project'
    ? `Projects / ${activeFileName}`
    : activeFileKind === 'skill'
      ? `Skills / ${activeFileName}`
      : `Tools / ${activeFileName}`;

  const toggleFolder = (id: string) => {
    setOpenFolders(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const openFile = (fileId: string, kind: FileKind) => {
    setActiveFileId(fileId);
    setActiveFileKind(kind);
  };

  const renderTree = (nodes: TreeNode[], depth = 0) => nodes.map(node => {
    const padding = `pl-${Math.min(depth * 3 + 2, 10)}`;

    if (node.type === 'folder') {
      const isOpen = openFolders[node.id];
      return (
        <div key={node.id}>
          <button
            onClick={() => toggleFolder(node.id)}
            className={`w-full flex items-center gap-2 py-1.5 ${padding} text-xs text-foreground hover:text-primary transition`}
          >
            <span>{node.icon}</span>
            <span className="font-medium">{node.label}</span>
            <span className="ml-auto text-[10px] text-muted-foreground">{isOpen ? '▾' : '▸'}</span>
          </button>
          {isOpen && node.children ? (
            <div className="space-y-1">
              {renderTree(node.children, depth + 1)}
            </div>
          ) : null}
        </div>
      );
    }

    const isActive = node.fileId === activeFileId;
    return (
      <button
        key={node.id}
        onClick={() => openFile(node.fileId ?? '', node.fileKind ?? 'project')}
        className={`w-full flex items-center gap-2 py-1.5 ${padding} rounded-md text-[11px] transition ${
          isActive
            ? 'bg-[hsl(var(--win-subtle-hover))] text-foreground'
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        <span>{node.icon}</span>
        <span className="truncate">{node.label}</span>
      </button>
    );
  });

  return (
    <div className="h-full bg-[radial-gradient(60%_60%_at_0%_0%,hsl(var(--primary)/0.16),transparent_60%),radial-gradient(50%_50%_at_100%_10%,hsl(var(--accent)/0.12),transparent_55%)]">
      <div className="flex items-center gap-3 h-14 border-b border-border bg-[hsl(var(--win-title-bar))] px-3">
        <div className="flex items-center gap-1">
          <button className="h-8 w-8 rounded-lg border border-border bg-[hsl(var(--win-subtle))] text-muted-foreground transition hover:text-foreground hover:border-primary" type="button">
            <ArrowLeft className="mx-auto h-4 w-4" />
          </button>
          <button className="h-8 w-8 rounded-lg border border-border bg-[hsl(var(--win-subtle))] text-muted-foreground transition hover:text-foreground hover:border-primary" type="button">
            <ArrowRight className="mx-auto h-4 w-4" />
          </button>
          <button className="h-8 w-8 rounded-lg border border-border bg-[hsl(var(--win-subtle))] text-muted-foreground transition hover:text-foreground hover:border-primary" type="button">
            <ArrowUp className="mx-auto h-4 w-4" />
          </button>
          <button className="h-8 w-8 rounded-lg border border-border bg-[hsl(var(--win-subtle))] text-muted-foreground transition hover:text-foreground hover:border-primary" type="button">
            <RefreshCw className="mx-auto h-4 w-4" />
          </button>
        </div>
        <div className="flex flex-1 items-center gap-2 rounded-lg border border-border bg-[hsl(var(--win-subtle))] px-3 py-2 text-xs text-foreground">
          <Cloud className="h-4 w-4 text-primary" />
          <span className="text-muted-foreground">Project Explorar</span>
          <span className="text-muted-foreground">›</span>
          <span className="truncate">{breadcrumb}</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-border bg-[hsl(var(--win-subtle))] px-3 py-2 text-xs text-muted-foreground w-48 sm:w-64">
          <span>Search</span>
          <span className="text-foreground truncate">{activeFileName}</span>
        </div>
      </div>
      <div className="grid h-[calc(100%-56px)] grid-cols-12 gap-6">
        <aside className="col-span-12 lg:col-span-2 border-b lg:border-b-0 lg:border-r border-border bg-[linear-gradient(180deg,hsl(var(--win-subtle))_0%,transparent_100%)] px-3 py-4 lg:px-4 lg:py-5 space-y-4">
          <div className="rounded-xl border border-border bg-[hsl(var(--win-subtle))] p-3 shadow-sm">
            <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Project Explorar</div>
            <div className="mt-2 flex items-center gap-2">
              <div className="h-9 w-9 rounded-lg bg-[hsl(var(--win-title-bar))] border border-border flex items-center justify-center text-xs font-semibold">
                RS
              </div>
              <div>
                <div className="text-xs font-semibold text-foreground">Rajarshi Saha</div>
                <div className="text-[10px] text-muted-foreground">ML Engineer</div>
              </div>
            </div>
          </div>

          <div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">File Tree</div>
            <div className="mt-2 space-y-1">
              {renderTree(tree)}
            </div>
          </div>
        </aside>

        <main className="col-span-12 lg:col-span-7 overflow-auto">
          <div className="border-b border-border px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="rounded-t-md border border-border bg-[hsl(var(--win-title-bar))] px-3 py-1 text-[11px] text-foreground shadow-sm">
                📄 {activeFileName}
              </div>
            </div>
            <div className="mt-2 text-[11px] text-muted-foreground">{breadcrumb}</div>
          </div>

          <div className="px-4 py-5 font-code">
            <div className="rounded-2xl border border-border bg-[hsl(var(--win-subtle))] p-6 shadow-sm space-y-5">
              {activeFileKind === 'project' && activeProject ? (
                <>
                  <div className={`h-28 w-full rounded-2xl bg-gradient-to-r ${activeProject.accent} border border-border`} />
                  <div>
                    <h1 className="text-2xl font-semibold text-foreground">{activeProject.title}</h1>
                    <div className="mt-1 text-sm text-muted-foreground">{activeProject.subtitle}</div>
                    <p className="mt-4 text-sm text-foreground">{activeProject.summary}</p>
                  </div>
                  <div className="space-y-3">
                    <h2 className="text-sm font-semibold text-foreground">Overview</h2>
                    <div className="space-y-2 text-xs text-foreground">
                      {activeProject.overview.map(item => (
                        <div key={item} className="flex gap-2">
                          <span className="text-primary">●</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h2 className="text-sm font-semibold text-foreground">Key Features</h2>
                    <div className="space-y-2 text-xs text-foreground">
                      {activeProject.features.map(item => (
                        <div key={item} className="flex gap-2">
                          <span className="text-primary">●</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h2 className="text-sm font-semibold text-foreground">Tech Stack</h2>
                    <div className="flex flex-wrap gap-2">
                      {activeProject.stack.map(item => (
                        <span
                          key={item}
                          className="rounded-full border border-border bg-[hsl(var(--win-title-bar))] px-3 py-1 text-xs text-foreground"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h2 className="text-sm font-semibold text-foreground">Metrics</h2>
                    <div className="flex flex-wrap gap-3">
                      {activeProject.metrics.map(metric => (
                        <div
                          key={metric.label}
                          className="rounded-2xl border border-border bg-[hsl(var(--win-title-bar))] px-4 py-3"
                        >
                          <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{metric.label}</div>
                          <div className="mt-1 text-sm font-semibold text-foreground">{metric.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <a
                      href={activeProject.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-[hsl(var(--win-title-bar))] px-4 py-2 text-xs font-semibold text-foreground transition hover:border-primary"
                    >
                      View on GitHub
                    </a>
                  </div>
                </>
              ) : activeDoc ? (
                <div className="space-y-4">
                  {parseMarkdown(activeDoc.content)}
                </div>
              ) : null}
            </div>
          </div>
        </main>

        <aside className="col-span-12 lg:col-span-3 border-t lg:border-t-0 lg:border-l border-border bg-[hsl(var(--win-subtle))] px-4 py-5 space-y-4">
          <div className="rounded-2xl border border-border bg-[hsl(var(--win-title-bar))] p-4 shadow-sm">
            <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">File Info</div>
            <div className="mt-3 space-y-2 text-xs text-foreground">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Name</span>
                <span>{activeFileName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Type</span>
                <span>Markdown</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Size</span>
                <span>{activeFileKind === 'project' ? activeProject?.size : activeDoc?.size}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Updated</span>
                <span>{activeFileKind === 'project' ? activeProject?.updated : activeDoc?.updated}</span>
              </div>
            </div>
          </div>

          {activeFileKind === 'project' && activeProject ? (
            <div className="rounded-2xl border border-border bg-[hsl(var(--win-title-bar))] p-4 shadow-sm">
              <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Quick Preview</div>
              <div className="mt-3 rounded-xl border border-dashed border-border bg-[hsl(var(--win-subtle))] px-3 py-10 text-center text-[11px] text-muted-foreground">
                Drop a demo GIF or screenshot here.
              </div>
            </div>
          ) : null}
        </aside>
      </div>
    </div>
  );
};

export default FileExplorer;
