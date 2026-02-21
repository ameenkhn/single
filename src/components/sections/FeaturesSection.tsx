import { motion } from "framer-motion";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const features = [
  { icon: "📹", title: "Live & Recorded Courses", desc: "Host webinars, drip content, and build a full learning library." },
  { icon: "📅", title: "Smart Scheduling", desc: "Integrated calendar with automated reminders and rescheduling." },
  { icon: "💳", title: "Payments & Invoicing", desc: "Accept payments via UPI, cards, and net banking. Auto-invoicing." },
  { icon: "📧", title: "Email & WhatsApp", desc: "Built-in campaigns, automations, and broadcast messaging." },
  { icon: "👥", title: "Community", desc: "Private groups, discussion forums, and member-only content." },
  { icon: "📊", title: "Analytics Dashboard", desc: "Revenue, engagement, funnel metrics — all in real-time." },
  { icon: "🌐", title: "Website Builder", desc: "No-code pages with custom domains and SEO optimization." },
  { icon: "🔒", title: "Secure & Compliant", desc: "SSL, GDPR-ready, data encryption, and role-based access." },
];

const FeaturesSection = () => (
  <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-8">
    <motion.div variants={fadeUp}>
      <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "hsl(160 84% 39%)" }}>
        Capability Matrix
      </span>
    </motion.div>
    <motion.h2 variants={fadeUp} className="text-4xl font-bold text-foreground">
      Everything You Need. Nothing You Don't.
    </motion.h2>
    <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4">
      {features.map((f, i) => (
        <motion.div
          key={i}
          variants={fadeUp}
          className="flex gap-4 p-4 rounded-xl hover:bg-secondary/50 transition-all cursor-default"
          whileHover={{ scale: 1.03, boxShadow: "0 4px 20px -4px hsl(var(--foreground) / 0.08)" }}
        >
          <span className="text-xl flex-shrink-0 mt-0.5">{f.icon}</span>
          <div>
            <h3 className="text-sm font-semibold text-foreground">{f.title}</h3>
            <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{f.desc}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  </motion.div>
);

export default FeaturesSection;
