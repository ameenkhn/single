import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { sections } from "@/data/sections";
import CoverPage from "./CoverPage";
import HeroSection from "./sections/HeroSection";
import ProblemSection from "./sections/ProblemSection";
import CostComparisonSection from "./sections/CostComparisonSection";
import CoreOfferSection from "./sections/CoreOfferSection";
import FeaturesSection from "./sections/FeaturesSection";
import SocialProofSection from "./sections/SocialProofSection";
import ComparisonSection from "./sections/ComparisonSection";
import OwnershipSection from "./sections/OwnershipSection";
import ProcessSection from "./sections/ProcessSection";
import FinalCTASection from "./sections/FinalCTASection";

const sectionComponents: Record<number, React.FC> = {
  1: HeroSection,
  2: ProblemSection,
  3: CostComparisonSection,
  4: CoreOfferSection,
  5: FeaturesSection,
  6: SocialProofSection,
  7: ComparisonSection,
  8: OwnershipSection,
  9: ProcessSection,
  10: FinalCTASection,
};

interface DocumentCanvasProps {
  activeId: number | null;
  onClose: () => void;
}

const DocumentCanvas = ({ activeId, onClose }: DocumentCanvasProps) => {
  const section = sections.find((s) => s.id === activeId);
  const SectionContent = activeId ? sectionComponents[activeId] : null;

  return (
    <div className="relative h-full w-full flex items-center justify-center overflow-hidden canvas-shell">
      {/* Dotted grid background */}
      <div
        className="absolute inset-0 grid-dots transition-opacity duration-500"
        style={{ opacity: activeId ? 0.3 : 1 }}
      />

      {/* Cover page — default state */}
      <AnimatePresence>
        {!activeId && (
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98, filter: "blur(2px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full h-full overflow-y-auto custom-scrollbar"
          >
            <CoverPage />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Document */}
      <AnimatePresence mode="wait">
        {activeId && section && SectionContent && (
          <motion.div
            key={activeId}
            className="document-surface absolute inset-4 md:inset-8 z-20 overflow-hidden"
            initial={{
              opacity: 0,
              scale: 0.96,
              x: 120,
              y: 26,
              skewX: -2,
              skewY: 1,
              rotateY: -16,
              borderRadius: "16px",
            }}
            animate={{
              opacity: 1,
              scale: 1,
              x: 0,
              y: 0,
              skewX: 0,
              skewY: 0,
              rotateY: 0,
              borderRadius: "24px",
            }}
            exit={{
              opacity: 0,
              scale: 0.98,
              x: -100,
              y: 18,
              skewX: 2,
              skewY: -1,
              rotateY: 14,
              borderRadius: "16px",
              transition: { duration: 0.38, ease: [0.32, 0, 0.67, 0] },
            }}
            transition={{
              type: "spring",
              stiffness: 175,
              damping: 22,
              mass: 0.72,
            }}
            style={{
              transformPerspective: 1200,
              transformOrigin: "left center",
              willChange: "transform, opacity",
            }}
          >
            {/* Header bar */}
            <div className="flex items-center justify-between px-8 pt-6 pb-2">
              <div className="flex items-center gap-3">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: `hsl(${section.color})` }}
                />
                <span className="ink-mono text-[10px] text-muted-foreground/60">
                  {String(section.id).padStart(2, "0")} / 10
                </span>
                <span className="ink-title text-[15px] font-semibold text-muted-foreground/90">
                  {section.title}
                </span>
              </div>
              <motion.button
                onClick={onClose}
                className="w-7 h-7 rounded-full flex items-center justify-center text-muted-foreground/50 hover:text-foreground hover:bg-secondary transition-all"
                whileHover={{ rotate: 90, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={14} />
              </motion.button>
            </div>

            <div className="page-separator mx-8" />

            {/* Content */}
            <div className="document-reading-area overflow-y-auto custom-scrollbar h-[calc(100%-60px)] px-8 pb-12 pt-6">
              <SectionContent />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DocumentCanvas;
