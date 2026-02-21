import { motion } from "framer-motion";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const pillars = [
  { num: "01", title: "Sell Anything", desc: "Courses, consultations, webinars, digital downloads, subscriptions — all from one dashboard." },
  { num: "02", title: "Automate Operations", desc: "Scheduling, reminders, follow-ups, email sequences, payment reconciliation — on autopilot." },
  { num: "03", title: "Own Your Audience", desc: "No algorithm dependency. Direct communication via email, WhatsApp, and community." },
  { num: "04", title: "Scale Without Hiring", desc: "Do the work of a 5-person ops team. One creator. One platform. Infinite leverage." },
];

const CoreOfferSection = () => (
  <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-8">
    <motion.div variants={fadeUp}>
      <span className="text-xs font-semibold uppercase tracking-widest text-primary">Value Proposition</span>
    </motion.div>
    <motion.h2 variants={fadeUp} className="text-4xl font-bold text-foreground">
      One Platform. Complete Control.
    </motion.h2>
    <motion.p variants={fadeUp} className="text-muted-foreground text-lg max-w-2xl">
      Exly replaces your entire tool stack with a single, integrated business operating system built for creators.
    </motion.p>
    <motion.div variants={stagger} className="space-y-4 pt-4">
      {pillars.map((p) => (
        <motion.div
          key={p.num}
          variants={fadeUp}
          className="flex gap-5 p-5 rounded-2xl hover:bg-secondary/50 transition-colors group cursor-default"
          whileHover={{ x: 4 }}
        >
          <span className="text-xs font-mono text-primary/40 pt-1">{p.num}</span>
          <div>
            <h3 className="font-semibold text-foreground mb-1">{p.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  </motion.div>
);

export default CoreOfferSection;
