import { motion, AnimatePresence } from 'framer-motion';
import { useWindows } from '@/contexts/WindowContext';
import { APPS } from '@/lib/windowManager';

const SKILLS = ['Python', 'TensorFlow', 'Keras', 'Scikit-learn', 'XGBoost', 'Flask', 'NumPy', 'Pandas'];

const PROJECTS = [
  { name: 'Facial Emotion Recognition', date: 'Recently added' },
  { name: 'LSTM Stock Predictor', date: 'Yesterday' },
  { name: 'Housing Price Prediction', date: 'Today' },
];

const StartMenu = () => {
  const { startMenuOpen, setStartMenuOpen, openApp } = useWindows();

  return (
    <AnimatePresence>
      {startMenuOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[9990]"
            onClick={() => setStartMenuOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            className="fixed bottom-14 left-1/2 -translate-x-1/2 w-[580px] h-[520px] rounded-lg win-start-menu win-shadow win-border z-[9995] flex flex-col overflow-hidden"
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Search */}
            <div className="p-4 pb-2">
              <div className="flex items-center gap-2 px-3 py-2 rounded-full win-subtle win-border text-sm text-muted-foreground">
                <span>🔍</span>
                <span>Type here to search</span>
              </div>
            </div>

            {/* Pinned */}
            <div className="px-4 pt-2">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-foreground">Pinned</span>
                <button className="text-xs text-muted-foreground win-subtle px-2 py-1 rounded">All apps →</button>
              </div>
              <div className="grid grid-cols-6 gap-1">
                {APPS.map(app => (
                  <button
                    key={app.id}
                    onClick={() => openApp(app.id)}
                    className="flex flex-col items-center gap-1 p-2 rounded-md win-subtle-hover"
                  >
                    <span className="text-2xl">{app.icon}</span>
                    <span className="text-[11px] text-foreground truncate w-full text-center">{app.title}</span>
                  </button>
                ))}
                {SKILLS.slice(0, 4).map(skill => (
                  <div key={skill} className="flex flex-col items-center gap-1 p-2 rounded-md win-subtle-hover">
                    <span className="text-2xl">💡</span>
                    <span className="text-[11px] text-foreground truncate w-full text-center">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended */}
            <div className="px-4 pt-4 flex-1">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-foreground">Recommended</span>
                <button className="text-xs text-muted-foreground win-subtle px-2 py-1 rounded">More →</button>
              </div>
              <div className="space-y-1">
                {PROJECTS.map(p => (
                  <div key={p.name} className="flex items-center gap-3 p-2 rounded-md win-subtle-hover cursor-pointer">
                    <span className="text-lg">📄</span>
                    <div>
                      <div className="text-sm text-foreground">{p.name}</div>
                      <div className="text-[11px] text-muted-foreground">{p.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-3 border-t border-border">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-md win-subtle-hover cursor-pointer">
                <span className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">RS</span>
                <span className="text-sm text-foreground">Rajarshi Saha</span>
              </div>
              <button className="p-2 rounded-md win-subtle-hover" title="Power">
                ⏻
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default StartMenu;
