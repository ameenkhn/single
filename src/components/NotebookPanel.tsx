import { motion } from "framer-motion";
import { sections } from "@/data/sections";

interface NotebookPanelProps {
  activeId: number | null;
  onSelect: (id: number) => void;
}

const NotebookPanel = ({ activeId, onSelect }: NotebookPanelProps) => {
  return (
    <div className="panel-shell h-full flex flex-col">
      {/* Brand header */}
      <div className="notebook-panel-header px-6 pt-8 pb-6">
        <p className="notebook-script text-white/85">Growth Notes</p>
        <h1 className="text-3xl font-semibold tracking-tight text-white mt-2">Exly</h1>
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70 mt-0.5">
          Growth Dossier
        </p>
        <p className="text-[10px] text-white/55 mt-1">10 Strategic Sections</p>
      </div>

      <div className="page-separator mx-6 opacity-40" />

      {/* Section list */}
      <div className="flex-1 overflow-y-auto custom-scrollbar px-4 pt-4 pb-8 space-y-1.5">
        {sections.map((section, i) => {
          const isActive = activeId === section.id;
          return (
            <motion.button
              key={section.id}
              onClick={() => onSelect(section.id)}
              className={`notebook-item w-full text-left ${isActive ? "active" : ""}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.35 }}
              layout
            >
              <div className="accent-bar" />
              <div className="flex items-center gap-3 pl-2">
                <span className="ink-mono text-[10px] text-white/55 w-4 text-right">
                  {String(section.id).padStart(2, "0")}
                </span>
                <div
                  className={`dot-indicator ${isActive ? "active" : ""}`}
                  style={isActive ? {
                    background: `hsl(${section.color})`,
                    boxShadow: `0 0 6px 1px hsl(${section.color} / 0.3)`,
                  } : undefined}
                />
                <div className="flex-1 min-w-0">
                  <p className={`text-[13px] font-medium truncate ${isActive ? "text-white" : "text-white/85"}`}>
                    {section.title}
                  </p>
                  <p className="text-[10px] text-white/55 truncate">
                    {section.description}
                  </p>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default NotebookPanel;
