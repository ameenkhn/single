import { motion } from "framer-motion";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const rows = [
  { tool: "Video Hosting", separate: "₹3,000/mo", exly: "Included" },
  { tool: "Payment Gateway", separate: "2.5% + ₹3/txn", exly: "Included" },
  { tool: "Email Marketing", separate: "₹2,500/mo", exly: "Included" },
  { tool: "Scheduling", separate: "₹1,200/mo", exly: "Included" },
  { tool: "Website Builder", separate: "₹1,500/mo", exly: "Included" },
  { tool: "CRM", separate: "₹2,000/mo", exly: "Included" },
  { tool: "Community", separate: "₹1,800/mo", exly: "Included" },
];

const CostComparisonSection = () => (
  <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-8">
    <motion.div variants={fadeUp}>
      <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "hsl(25 95% 53%)" }}>
        Financial Analysis
      </span>
    </motion.div>
    <motion.h2 variants={fadeUp} className="text-4xl font-bold text-foreground">
      The Real Cost of "Free" Tools
    </motion.h2>
    <motion.div variants={fadeUp} className="rounded-2xl border border-border overflow-hidden">
      <div className="grid grid-cols-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground p-4 bg-secondary/30">
        <span>Tool</span>
        <span className="text-center">Separate Stack</span>
        <span className="text-center text-primary font-bold">Exly</span>
      </div>
      {rows.map((row, i) => (
        <motion.div
          key={i}
          variants={fadeUp}
          className="grid grid-cols-3 p-4 border-t border-border/50 text-sm hover:bg-secondary/20 transition-colors"
        >
          <span className="text-foreground font-medium">{row.tool}</span>
          <span className="text-center text-muted-foreground">{row.separate}</span>
          <span className="text-center text-primary font-semibold">{row.exly}</span>
        </motion.div>
      ))}
      <motion.div
        variants={fadeUp}
        className="grid grid-cols-3 p-5 border-t-2 border-primary/20 bg-primary/5"
      >
        <span className="font-bold text-foreground">Total / month</span>
        <span className="text-center text-muted-foreground font-semibold line-through">₹12,000+</span>
        <motion.span
          className="text-center text-primary font-bold text-lg"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          ₹999
        </motion.span>
      </motion.div>
    </motion.div>
    <motion.p variants={fadeUp} className="text-sm text-muted-foreground">
      That's <strong className="text-primary">₹1,32,000+ saved annually</strong> — reinvested into growth.
    </motion.p>
  </motion.div>
);

export default CostComparisonSection;
