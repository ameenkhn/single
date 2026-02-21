import { motion } from "framer-motion";
import AnimatedCounter from "@/components/AnimatedCounter";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const testimonials = [
  { name: "Priya Sharma", role: "Yoga Instructor", quote: "Switched from 5 tools to Exly. Revenue grew 3x in 4 months." },
  { name: "Arjun Mehta", role: "Business Coach", quote: "The automation alone saves me 15 hours/week. Game-changer." },
  { name: "Sneha Patel", role: "Language Tutor", quote: "Finally own my student data. No more platform dependency." },
];

const SocialProofSection = () => (
  <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-8">
    <motion.div variants={fadeUp}>
      <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "hsl(280 67% 52%)" }}>
        Validation Data
      </span>
    </motion.div>
    <motion.h2 variants={fadeUp} className="text-4xl font-bold text-foreground">
      Trusted by Creators Who Scale
    </motion.h2>
    <motion.div variants={stagger} className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4">
      <AnimatedCounter end={50} suffix="Cr+" prefix="₹" label="Revenue Generated" />
      <AnimatedCounter end={650} suffix="+" label="Active Creators" />
      <AnimatedCounter end={12} suffix="+" label="Industries Served" />
      <AnimatedCounter end={98} suffix="%" label="Satisfaction Rate" />
    </motion.div>
    <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
      {testimonials.map((t, i) => (
        <motion.div
          key={i}
          variants={fadeUp}
          className="p-6 rounded-2xl bg-secondary/30 border border-border/50 hover:border-primary/20 transition-all"
          whileHover={{ scale: 1.03 }}
        >
          <p className="text-sm text-foreground leading-relaxed mb-4">"{t.quote}"</p>
          <div>
            <p className="text-sm font-semibold text-foreground">{t.name}</p>
            <p className="text-xs text-muted-foreground">{t.role}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  </motion.div>
);

export default SocialProofSection;
