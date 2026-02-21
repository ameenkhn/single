import { motion } from "framer-motion";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const rows = [
  { feature: "Courses & Webinars", exly: true, kajabi: true, teachable: true, graphy: true },
  { feature: "Scheduling & Booking", exly: true, kajabi: false, teachable: false, graphy: false },
  { feature: "Built-in Payments (India)", exly: true, kajabi: false, teachable: false, graphy: true },
  { feature: "WhatsApp Integration", exly: true, kajabi: false, teachable: false, graphy: false },
  { feature: "Community", exly: true, kajabi: true, teachable: false, graphy: false },
  { feature: "Email Marketing", exly: true, kajabi: true, teachable: false, graphy: false },
  { feature: "Analytics Dashboard", exly: true, kajabi: true, teachable: true, graphy: true },
  { feature: "₹999/mo Starting Price", exly: true, kajabi: false, teachable: false, graphy: false },
];

const Check = () => <span className="text-primary font-bold">✓</span>;
const Cross = () => <span className="text-muted-foreground/40">—</span>;

const ComparisonSection = () => (
  <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-8">
    <motion.div variants={fadeUp}>
      <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "hsl(25 95% 53%)" }}>
        Competitive Positioning
      </span>
    </motion.div>
    <motion.h2 variants={fadeUp} className="text-4xl font-bold text-foreground">
      How Exly Stacks Up
    </motion.h2>
    <motion.div variants={fadeUp} className="rounded-2xl border border-border overflow-hidden">
      <div className="grid grid-cols-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground p-4 bg-secondary/30">
        <span>Feature</span>
        <span className="text-center text-primary">Exly</span>
        <span className="text-center">Kajabi</span>
        <span className="text-center">Teachable</span>
        <span className="text-center">Graphy</span>
      </div>
      {rows.map((row, i) => (
        <motion.div
          key={i}
          variants={fadeUp}
          className="grid grid-cols-5 p-4 border-t border-border/50 text-sm hover:bg-secondary/20 transition-colors"
        >
          <span className="text-foreground font-medium">{row.feature}</span>
          <span className="text-center"><Check /></span>
          <span className="text-center">{row.kajabi ? <Check /> : <Cross />}</span>
          <span className="text-center">{row.teachable ? <Check /> : <Cross />}</span>
          <span className="text-center">{row.graphy ? <Check /> : <Cross />}</span>
        </motion.div>
      ))}
    </motion.div>
  </motion.div>
);

export default ComparisonSection;
