import { motion } from "framer-motion";
import { BookOpen, Zap, Shield, TrendingUp } from "lucide-react";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0, 0, 0.2, 1] as const } },
};

const pillars = [
  {
    icon: BookOpen,
    title: "All-in-One Platform",
    desc: "Courses, scheduling, payments, community, and marketing — unified in a single system.",
  },
  {
    icon: TrendingUp,
    title: "Growth-First Architecture",
    desc: "Built for creators who think in funnels, retention curves, and lifetime value — not just content.",
  },
  {
    icon: Shield,
    title: "Full Ownership",
    desc: "Your audience, your data, your domain. No platform lock-in, no algorithm dependency.",
  },
  {
    icon: Zap,
    title: "Zero Revenue Share",
    desc: "One fixed investment. Keep 100% of what you earn. Scale without increasing platform costs.",
  },
];

const CoverPage = () => (
  <motion.div
    variants={stagger}
    initial="hidden"
    animate="show"
    className="max-w-2xl mx-auto py-16 px-8"
  >
    <motion.div variants={fadeUp} className="space-y-1">
      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
        Exly — Growth Partnership
      </span>
    </motion.div>

    <motion.h1
      variants={fadeUp}
      className="text-4xl md:text-5xl font-bold text-foreground leading-[1.1] mt-6"
    >
      Zero Revenue Share.
      <br />
      One Fixed Investment.
    </motion.h1>

    <motion.p
      variants={fadeUp}
      className="text-base text-muted-foreground leading-relaxed mt-6 max-w-lg"
    >
      Exly is the operating system for creators, coaches, and educators who are
      serious about growth. This dossier outlines how Exly replaces fragmented
      tool stacks with a single, strategic platform — so you can focus on
      building your business, not managing software.
    </motion.p>

    <motion.div variants={fadeUp} className="mt-10">
      <div className="page-separator mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pillars.map((p, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            className="flex gap-3.5"
          >
            <div className="w-8 h-8 rounded-lg bg-primary/[0.07] flex items-center justify-center flex-shrink-0 mt-0.5">
              <p.icon size={15} className="text-primary" />
            </div>
            <div>
              <h3 className="text-[13px] font-semibold text-foreground">{p.title}</h3>
              <p className="text-[12px] text-muted-foreground leading-relaxed mt-0.5">{p.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>

    <motion.div variants={fadeUp} className="mt-10">
      <div className="page-separator mb-8" />
      <p className="text-[11px] text-muted-foreground/60 mb-4">
        Select a section from the notebook to begin reviewing.
      </p>
      <button className="btn-primary text-sm">
        Begin Review →
      </button>
    </motion.div>
  </motion.div>
);

export default CoverPage;
