import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const phases = [
  {
    num: "01",
    title: "Sign Up",
    desc: "Create your account in under 60 seconds. No credit card needed.",
    detail: "Choose your niche, set your business name, and get a personalized onboarding path."
  },
  {
    num: "02",
    title: "Set Up Your Offerings",
    desc: "Create courses, sessions, or digital products with our guided builder.",
    detail: "Drag-and-drop content builder, pricing tiers, and automated delivery setup."
  },
  {
    num: "03",
    title: "Connect & Launch",
    desc: "Add your domain, connect payments, and go live.",
    detail: "Custom domain mapping, payment gateway integration, and launch checklist to ensure readiness."
  },
  {
    num: "04",
    title: "Grow & Scale",
    desc: "Use built-in marketing tools and analytics to 10x your business.",
    detail: "Email campaigns, referral programs, funnel analytics, and audience segmentation."
  },
];

const ProcessSection = () => {
  const [active, setActive] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "hsl(160 84% 39%)" }}>
        Implementation Phases
      </span>
      <h2 className="text-4xl font-bold text-foreground">
        From Zero to Live in 4 Steps
      </h2>
      <div className="flex gap-2 border-b border-border pb-0 pt-4">
        {phases.map((p, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`relative px-5 py-3 text-sm font-medium transition-colors rounded-t-lg ${
              active === i ? "text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <span className="font-mono text-[10px] mr-1 opacity-50">{p.num}</span>
            {p.title}
            {active === i && (
              <motion.div
                layoutId="process-underline"
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3 }}
          className="p-6 rounded-2xl bg-secondary/30"
        >
          <h3 className="text-lg font-semibold text-foreground mb-2">{phases[active].desc}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{phases[active].detail}</p>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default ProcessSection;
