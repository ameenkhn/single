import { motion } from "framer-motion";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

const HeroSection = () => (
  <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-6">
    <motion.div variants={fadeUp}>
      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
        Strategic Growth Brief
      </span>
    </motion.div>
    <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl font-bold leading-[1.1] text-foreground">
      Your Audience Is Growing.
      <br />
      <span className="text-primary">Your Platform Should Too.</span>
    </motion.h1>
    <motion.p variants={fadeUp} className="text-base text-muted-foreground max-w-xl leading-relaxed">
      Exly gives creators, coaches, and educators a single system to monetize, manage, and scale their
      business — without stitching together 8 different tools.
    </motion.p>
    <motion.div variants={fadeUp} className="flex gap-3 pt-2">
      <button className="btn-primary text-sm">Start Building Free</button>
      <button className="px-6 py-3.5 rounded-xl text-sm font-medium text-foreground border border-border hover:bg-secondary transition-colors">
        View Growth Playbook
      </button>
    </motion.div>
    <motion.div variants={fadeUp} className="flex items-center gap-6 pt-4 text-[12px] text-muted-foreground/60">
      <span>✓ No credit card</span>
      <span>✓ 14-day free trial</span>
      <span>✓ Full access</span>
    </motion.div>
  </motion.div>
);

export default HeroSection;
