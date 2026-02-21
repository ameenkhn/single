import { motion } from "framer-motion";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const points = [
  { title: "Your Domain", desc: "Custom domain with full SSL. It's your brand, not ours." },
  { title: "Your Data", desc: "Export everything anytime. Student lists, revenue data, content — it's all yours." },
  { title: "Your Revenue", desc: "Direct payouts to your bank. No platform holds on your money." },
  { title: "Your Audience", desc: "No algorithm gatekeeping. Reach everyone who signed up, every time." },
];

const OwnershipSection = () => (
  <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-8">
    <motion.div variants={fadeUp}>
      <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "hsl(199 89% 48%)" }}>
        Asset Control
      </span>
    </motion.div>
    <motion.h2 variants={fadeUp} className="text-4xl font-bold text-foreground">
      You Own Everything
    </motion.h2>
    <motion.p variants={fadeUp} className="text-muted-foreground text-lg max-w-2xl">
      Unlike marketplace platforms, Exly gives you full ownership of your brand, audience, data, and revenue. No lock-in. No dependencies.
    </motion.p>
    <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
      {points.map((p, i) => (
        <motion.div
          key={i}
          variants={fadeUp}
          className="p-6 rounded-2xl border border-border/50 hover:border-primary/30 transition-all"
          whileHover={{ scale: 1.03 }}
        >
          <h3 className="font-semibold text-foreground mb-2">{p.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
        </motion.div>
      ))}
    </motion.div>
  </motion.div>
);

export default OwnershipSection;
