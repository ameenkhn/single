import { motion } from "framer-motion";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

const FinalCTASection = () => (
  <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-8">
    <div className="cta-card text-primary-foreground text-center">
      <motion.div variants={fadeUp}>
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] opacity-70">
          Ready to Scale?
        </span>
      </motion.div>
      <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold mt-4 leading-tight">
        Start Building Your
        <br />
        Creator Empire Today
      </motion.h2>
      <motion.p variants={fadeUp} className="text-base opacity-70 max-w-md mx-auto mt-4 leading-relaxed">
        Join 650+ creators who've consolidated their entire business on Exly.
        No credit card required. Full access for 14 days.
      </motion.p>
      <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
        <button className="px-10 py-3.5 rounded-xl bg-card text-foreground font-semibold text-sm hover:bg-card/90 transition-all">
          Start Free Trial
        </button>
        <button className="px-10 py-3.5 rounded-xl border border-primary-foreground/20 text-primary-foreground font-medium text-sm hover:bg-primary-foreground/10 transition-colors">
          Talk to Sales
        </button>
      </motion.div>
      <motion.p
        variants={fadeUp}
        className="text-[11px] opacity-50 mt-6"
        animate={{ opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        Limited: Early-adopter pricing locked for first 100 signups
      </motion.p>
    </div>
  </motion.div>
);

export default FinalCTASection;
