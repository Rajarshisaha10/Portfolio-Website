import { useMemo, useState } from 'react';
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  BarChart3,
  Brain,
  ChevronRight,
  Cloud,
  FileText,
  Folder,
  FolderOpen,
  Globe,
  Mail,
  RefreshCw,
  Settings2,
  Sparkles,
  User,
} from 'lucide-react';

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
      '4-layer CNN (64 -> 128 -> 256 -> 512 filters) for hierarchical feature learning',
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
      'MAE/RMSE/R2 reporting for clear evaluation',
    ],
    stack: ['Python', 'Scikit-learn', 'XGBoost', 'Pandas', 'Seaborn'],
    metrics: [
      { label: 'Models', value: '5 compared' },
      { label: 'Validation', value: 'K-fold' },
      { label: 'Metrics', value: 'MAE / RMSE / R2' },
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
    type: 'folder',
    children: projects.map(project => ({
      id: `file-${project.id}`,
      label: project.fileName,
      type: 'file',
      fileId: project.id,
      fileKind: 'project',
    })),
  },
  {
    id: 'skills-folder',
    label: 'Skills',
    type: 'folder',
    children: docs.filter(doc => doc.kind === 'skill').map(doc => ({
      id: `file-${doc.id}`,
      label: doc.fileName,
      type: 'file',
      fileId: doc.id,
      fileKind: doc.kind,
    })),
  },
  {
    id: 'tools-folder',
    label: 'Tools',
    type: 'folder',
    children: docs.filter(doc => doc.kind !== 'skill').map(doc => ({
      id: `file-${doc.id}`,
      label: doc.fileName,
      type: 'file',
      fileId: doc.id,
      fileKind: doc.kind,
    })),
  },
];

const navPrimary = [
  { id: 'explorer', label: 'Project Explorer', icon: Folder },
  { id: 'neural', label: 'Neural Lab', icon: Brain },
  { id: 'about', label: 'About', icon: User },
  { id: 'contact', label: 'Contact', icon: Mail },
];

const navSecondary = [
  { id: 'settings', label: 'Settings', icon: Settings2 },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'socials', label: 'Socials', icon: Globe },
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
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
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
    'projects-folder': true,
    'skills-folder': true,
    'tools-folder': true,
  });

  const activeProject = useMemo(
    () => projects.find(project => project.id === activeFileId),
    [activeFileId]
  );

  const activeDoc = useMemo(
    () => docs.find(doc => doc.id === activeFileId),
    [activeFileId]
  );

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
    if (node.type === 'folder') {
      const isOpen = openFolders[node.id];
      return (
        <div key={node.id}>
          <button
            onClick={() => toggleFolder(node.id)}
            className={`group w-full flex items-center gap-2 rounded-md px-2 py-2 text-xs font-medium transition-all duration-200 ${
              isOpen
                ? 'bg-[hsl(var(--win-subtle-hover))] text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground hover:bg-[hsl(var(--win-subtle-hover))]'
            }`}
            style={{ paddingLeft: 8 + depth * 12 }}
          >
            {isOpen ? (
              <FolderOpen className="h-4 w-4 text-primary/80 transition-transform duration-200 group-hover:scale-105" />
            ) : (
              <Folder className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-hover:scale-105 group-hover:text-foreground" />
            )}
            <span className="tracking-wide">{node.label}</span>
            <ChevronRight
              className={`ml-auto h-3.5 w-3.5 transition-transform duration-200 ${
                isOpen ? 'rotate-90 text-primary' : 'text-muted-foreground'
              }`}
            />
          </button>
          {isOpen && node.children ? (
            <div className="space-y-0.5 mt-0.5 animate-in slide-in-from-top-2 fade-in duration-200">
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
        className={`group relative w-full flex items-center gap-2 rounded-md px-2 py-1.5 text-[11.5px] transition-all duration-200 ${
          isActive
            ? 'bg-[hsl(0,0%,100%,0.12)] text-foreground shadow-sm font-medium win-border'
            : 'text-muted-foreground hover:bg-[hsl(0,0%,100%,0.06)] hover:text-foreground'
        }`}
        style={{ paddingLeft: 8 + depth * 12 }}
      >
        <span
          className={`absolute left-1 top-1/2 h-4 w-[2px] -translate-y-1/2 rounded-full transition-opacity ${
            isActive ? 'bg-primary opacity-100' : 'bg-transparent opacity-0'
          }`}
        />
        <FileText className="h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground" />
        <span className="truncate">{node.label}</span>
      </button>
    );
  });

  return (
    <div className="file-explorer h-full bg-[radial-gradient(60%_60%_at_0%_0%,hsl(var(--primary)/0.16),transparent_60%),radial-gradient(50%_50%_at_100%_10%,hsl(var(--accent)/0.12),transparent_55%)]">
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
        <div className="flex flex-1 items-center gap-1.5 rounded-lg border border-border bg-[hsl(var(--win-subtle))] px-3 py-2 text-xs">
          <Cloud className="h-4 w-4 text-primary opacity-80" />
          <span className="text-foreground/60 whitespace-nowrap">Project Explorer</span>
          <span className="text-foreground/30 whitespace-nowrap tracking-tight">&gt;</span>
          <span className="text-foreground/60 whitespace-nowrap">{activeFileKind === 'project' ? 'Projects' : activeFileKind.charAt(0).toUpperCase() + activeFileKind.slice(1)}</span>
          <span className="text-foreground/30 whitespace-nowrap tracking-tight">&gt;</span>
          <span className="text-foreground font-semibold truncate">{activeFileName}</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-border bg-[hsl(var(--win-subtle))] px-3 py-2 text-xs text-muted-foreground w-48 sm:w-64">
          <span>Search</span>
          <span className="text-foreground truncate">{activeFileName}</span>
        </div>
      </div>
      <div className="grid h-[calc(100%-56px)] grid-cols-12 gap-6">
        <aside className="col-span-12 lg:col-span-2 border-b lg:border-b-0 lg:border-r border-border bg-[linear-gradient(180deg,hsl(var(--win-subtle))_0%,transparent_100%)] px-3 py-4 lg:px-4 lg:py-5 space-y-5">
          <div className="rounded-2xl bg-gradient-to-br from-[hsl(var(--primary)/0.45)] via-transparent to-[hsl(var(--accent)/0.35)] p-[1px] shadow-[0_12px_30px_-18px_rgba(0,0,0,0.6)]">
            <div className="rounded-[15px] border border-border/70 bg-[linear-gradient(145deg,hsl(var(--win-title-bar)),hsl(var(--win-subtle)))] p-3">
              <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                <span>Project Explorer</span>
                <span className="flex items-center gap-1 text-[9px] text-emerald-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Online
                </span>
              </div>
              <div className="mt-3 flex items-center gap-2.5">
                <div className="relative h-10 w-10 rounded-xl bg-[linear-gradient(135deg,hsl(var(--primary)/0.5),hsl(var(--accent)/0.4))] border border-border flex items-center justify-center text-xs font-semibold text-foreground shadow-sm">
                  RS
                  <span className="absolute -bottom-1 -right-1 h-2.5 w-2.5 rounded-full border-2 border-[hsl(var(--win-title-bar))] bg-emerald-400" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground tracking-tight">Rajarshi Saha</div>
                  <div className="text-[11px] text-primary font-medium">ML Engineer</div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              <span>File Tree</span>
              <span className="h-px flex-1 bg-border/70" />
            </div>
            <div className="space-y-1">
              {renderTree(tree)}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              <span>Navigation</span>
              <span className="h-px flex-1 bg-border/70" />
            </div>
            <div className="space-y-1">
              {navPrimary.map((item, index) => {
                const isActive = index === 0;
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    type="button"
                    title={item.label}
                    className={`group flex w-full items-center gap-2 rounded-lg border border-transparent px-2.5 py-2 text-xs transition-all duration-200 ${
                      isActive
                        ? 'bg-[hsl(var(--win-subtle-hover))] text-foreground shadow-sm border-border/70'
                        : 'text-muted-foreground hover:text-foreground hover:bg-[hsl(var(--win-subtle-hover))]'
                    }`}
                  >
                    <Icon className={`h-4 w-4 ${isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'}`} />
                    <span className="max-w-0 overflow-hidden whitespace-nowrap text-[11px] opacity-0 transition-all duration-200 group-hover:max-w-[140px] group-hover:opacity-100">
                      {item.label}
                    </span>
                    {isActive ? <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" /> : null}
                  </button>
                );
              })}
            </div>
            <div className="h-px bg-border/60" />
            <div className="space-y-1">
              {navSecondary.map(item => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    type="button"
                    title={item.label}
                    className="group flex w-full items-center gap-2 rounded-lg border border-transparent px-2.5 py-2 text-xs text-muted-foreground transition-all duration-200 hover:text-foreground hover:bg-[hsl(var(--win-subtle-hover))]"
                  >
                    <Icon className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
                    <span className="max-w-0 overflow-hidden whitespace-nowrap text-[11px] opacity-0 transition-all duration-200 group-hover:max-w-[140px] group-hover:opacity-100">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              <span>Quick Actions</span>
              <span className="h-px flex-1 bg-border/70" />
            </div>
            <div className="grid gap-2">
              <button
                type="button"
                className="inline-flex items-center justify-between rounded-lg border border-border bg-[hsl(var(--win-subtle))] px-3 py-2 text-[11px] font-medium text-foreground transition-all hover:-translate-y-0.5 hover:bg-[hsl(var(--win-subtle-hover))] hover:shadow-sm"
              >
                New Project
                <Sparkles className="h-3.5 w-3.5 text-primary" />
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-between rounded-lg border border-border bg-[hsl(var(--win-subtle))] px-3 py-2 text-[11px] font-medium text-foreground transition-all hover:-translate-y-0.5 hover:bg-[hsl(var(--win-subtle-hover))] hover:shadow-sm"
              >
                Add Skill
                <Activity className="h-3.5 w-3.5 text-primary" />
              </button>
            </div>
          </div>
        </aside>

        <main className="col-span-12 lg:col-span-7 overflow-auto">
          <div className="border-b border-border px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="rounded-t-md border border-border bg-[hsl(var(--win-title-bar))] px-3 py-1 text-[11px] text-foreground shadow-sm">
                <span className="inline-flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5 text-primary/80" />
                  {activeFileName}
                </span>
              </div>
            </div>
            <div className="mt-2 text-[11px] text-muted-foreground">{breadcrumb}</div>
          </div>

            <div className="rounded-2xl border border-border bg-[hsl(var(--win-subtle))] p-8 shadow-sm space-y-8">
              {activeFileKind === 'project' && activeProject ? (
                <>
                  <div className="border-b border-border/50 pb-6">
                    <h1 className="text-3xl font-semibold text-foreground tracking-tight">{activeProject.title}</h1>
                    <div className="mt-2 text-[15px] font-medium text-muted-foreground">{activeProject.subtitle}</div>
                    <p className="mt-5 text-[15px] text-foreground/80 leading-relaxed max-w-3xl">{activeProject.summary}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h2 className="text-[15px] font-semibold text-foreground">Overview</h2>
                      <div className="space-y-3 text-[13px] text-foreground/80">
                        {activeProject.overview.map(item => (
                          <div key={item} className="flex gap-3 items-start">
                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                            <span className="flex-1 leading-relaxed">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h2 className="text-[15px] font-semibold text-foreground">Key Features</h2>
                      <div className="space-y-3 text-[13px] text-foreground/80">
                        {activeProject.features.map(item => (
                          <div key={item} className="flex gap-3 items-start">
                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                            <span className="flex-1 leading-relaxed">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-border/50">
                    <h2 className="text-[15px] font-semibold text-foreground">Metrics</h2>
                    <div className="flex flex-wrap gap-4">
                      {activeProject.metrics.map(metric => (
                        <div
                          key={metric.label}
                          className="rounded-xl border border-border bg-[hsl(var(--win-title-bar))] px-5 py-4 w-40 transition-transform duration-200 hover:-translate-y-1 hover:shadow-md"
                        >
                          <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">{metric.label}</div>
                          <div className="mt-1.5 text-[15px] font-semibold text-foreground">{metric.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : activeDoc ? (
                <div className="space-y-4">
                  {parseMarkdown(activeDoc.content)}
                </div>
              ) : null}
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
            <>
              <div className="rounded-2xl border border-border bg-[hsl(var(--win-title-bar))] p-4 shadow-sm space-y-4">
                <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Tech Stack</div>
                <div className="flex flex-wrap gap-2">
                  {activeProject.stack.map(item => (
                    <span
                      key={item}
                      className="rounded-md border border-border bg-[hsl(var(--win-subtle))] px-2.5 py-1 text-xs text-foreground shadow-sm transition-transform hover:-translate-y-0.5 hover:bg-[hsl(0,0%,100%,0.08)] cursor-default"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-[hsl(var(--win-title-bar))] p-4 shadow-sm space-y-4">
                <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Actions</div>
                
                <a
                  href={activeProject.github}
                  target="_blank"
                  rel="noreferrer"
                   className="w-full inline-flex justify-center items-center gap-2 rounded-md border border-border bg-[hsl(var(--primary))] px-4 py-2 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:bg-[hsl(var(--primary)/0.9)] hover:shadow-lg active:scale-[0.98]"
                >
                  View on GitHub
                </a>

                <button
                  disabled
                  className="w-full inline-flex justify-center items-center gap-2 rounded-md border border-border bg-transparent px-4 py-2 text-sm font-semibold text-muted-foreground opacity-60 cursor-not-allowed"
                >
                  Live Demo (Coming Soon)
                </button>
              </div>
            </>
          ) : null}

          <div className="rounded-2xl border border-border bg-[hsl(var(--win-title-bar))] p-4 shadow-sm space-y-4">
            <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Activity</div>
            <div className="space-y-3 text-xs text-foreground/80">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <BarChart3 className="h-3.5 w-3.5 text-primary" />
                  Updated portfolio
                </span>
                <span className="text-[10px] text-muted-foreground">2d ago</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Activity className="h-3.5 w-3.5 text-primary" />
                  Added new skill
                </span>
                <span className="text-[10px] text-muted-foreground">5d ago</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                  New project draft
                </span>
                <span className="text-[10px] text-muted-foreground">1w ago</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default FileExplorer;
