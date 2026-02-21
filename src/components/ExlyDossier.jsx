import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  LayoutGroup,
  MotionConfig,
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionTemplate,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  BadgeCheck,
  BarChart3,
  Boxes,
  Brain,
  Check,
  Compass,
  Flag,
  Flame,
  Gem,
  Handshake,
  Heart,
  Lock,
  Map,
  Megaphone,
  Menu,
  PhoneCall,
  Puzzle,
  Rocket,
  Scale,
  Search,
  ShieldCheck,
  ShoppingCart,
  Signal,
  Tag,
  Target,
  Timer,
  TrendingDown,
  TrendingUp,
  Trophy,
  Wallet,
  Wrench,
  X,
  FileText,
} from "lucide-react";

const sections = [
  { id: 1, key: "hero", title: "Growth Thesis", description: "Positioning, promise, and business model" },
  { id: 2, key: "problem", title: "Agency Headache", description: "Fragmentation, fees, and growth drag" },
  { id: 3, key: "cost", title: "Economics Breakdown", description: "Traditional costs vs Exly fixed fee" },
  { id: 4, key: "core", title: "Partnership Model", description: "Fixed-fee offer and execution scope" },
  { id: 5, key: "features", title: "Growth Stack", description: "Ads, funnels, CRM, and automation" },
  { id: 6, key: "proof", title: "Proof of Scale", description: "Outcomes, budgets, and trust signals" },
  { id: 7, key: "comparison", title: "Why Exly Wins", description: "Incentives, margins, and control" },
  { id: 8, key: "ownership", title: "Ownership Guarantee", description: "You own accounts, data, and assets" },
  { id: 9, key: "process", title: "Execution Roadmap", description: "Four-phase rollout from setup to scale" },
  { id: 10, key: "cta", title: "Next Step", description: "Pilot onboarding and discovery call" },
];

const proposalTitle = "Meta Ads Growth Partnership";
const proposalTitleWithBrand = "Exly | Meta Ads Growth Partnership";

const coverParagraphs = [
  "You hire agencies to scale. You increase ad budgets. Then come extra costs - funnels, CRM, automation, creatives, tracking. And on top of that, they take a percentage of your revenue.",
  "So even when you grow, you don't really grow. The more you scale, the more you give away. Your profits shrink while agency fees rise.",
  "Exly Growth works differently. Zero revenue share. One fixed fee. No hidden cuts. We handle ads, landing pages, CRM, automation, payments, and reporting - so you scale your business, not your agency's income.",
];

const heroServiceCards = [
  {
    title: "Performance Ads",
    detail: "Meta + Google campaign setup, creative iteration, retargeting, and weekly ROAS optimization.",
  },
  {
    title: "Offer & Funnel Strategy",
    detail: "Message-to-market alignment, landing page architecture, and conversion-focused funnel flows.",
  },
  {
    title: "Creator Operations",
    detail: "Course delivery, checkout, automation, CRM, and community workflows unified in one stack.",
  },
  {
    title: "Revenue Intelligence",
    detail: "Attribution dashboards, cohort insights, and scale recommendations based on real first-party data.",
  },
];

const heroServiceIllustrations = ["ads", "funnel", "ops", "intel"];

const growthThesisServiceBlocks = [
  {
    icon: Megaphone,
    title: "Performance Engine",
    items: ["Meta + Google ads", "Creative testing", "Weekly optimization"],
  },
  {
    icon: Target,
    title: "Funnel System",
    items: ["Landing pages", "Offer positioning", "Conversion flow"],
  },
  {
    icon: BarChart3,
    title: "Backend & Tracking",
    items: ["CRM", "Payments", "Attribution dashboard", "Revenue intelligence"],
  },
  {
    icon: Wrench,
    title: "Lifecycle & Automation",
    items: ["Email + WhatsApp automation", "Lead nurturing workflows", "Retention loops"],
  },
];

const landingScreenshots = [
  {
    src: "/screenshots/growth-command-center.svg",
    title: "Growth Command Center",
    note: "Ads, funnel, CRM, and revenue visibility in one workspace.",
  },
  {
    src: "/screenshots/funnel-analytics-suite.svg",
    title: "Funnel + Attribution Suite",
    note: "Landing page and conversion tracking from click to checkout.",
  },
  {
    src: "/screenshots/revenue-ops-workspace.svg",
    title: "Revenue Ops Workspace",
    note: "Automations, retention loops, and fixed-fee economics dashboard.",
  },
];

const painPointCartoons = [
  {
    icon: "puzzle",
    name: "Coach Carla",
    role: "Fitness Coach",
    pain: "Uses 6 tools, spends 9+ hours weekly fixing automations instead of coaching clients.",
  },
  {
    icon: "wallet",
    name: "Creator Rohan",
    role: "Course Creator",
    pain: "Pays revenue share every month and loses margin even when launches perform well.",
  },
  {
    icon: "signal",
    name: "Founder Neha",
    role: "Learning Business",
    pain: "Runs ads but cannot track end-to-end attribution because checkout and CRM are disconnected.",
  },
];

const comparisonRows = [
  ["Pricing Model", "10%-20% of ad spend + extra retainers", "Fixed quarterly fee (no % of ad spend)"],
  ["Ad Strategy Support", "Usually external agency only", "Meta + Google ads with growth execution"],
  ["Data Ownership", "Partial / fragmented", "Full first-party ownership"],
  ["Tool Fragmentation", "4-8 connected tools", "Unified operating system"],
  ["Incentive Alignment", "Platform earns more as you pay more", "Exly earns fixed; you keep upside"],
];

const caricatureNotes = {
  cover: {
    badge: "Exly Team",
    title: "Brand + Performance + Platform",
    text: "We run ads, optimize funnels, and operate your stack under one fixed-fee partnership.",
  },
  hero: {
    badge: "Growth Captain",
    title: "Your growth, your margin",
    text: "Exly scales creator brands without percentage-based penalties.",
  },
  problem: {
    badge: "Pain Detector",
    title: "Too many tools, too much chaos",
    text: "We remove stack complexity and connect ads-to-revenue visibility.",
  },
  cost: {
    badge: "Margin Guard",
    title: "No revenue share tax",
    text: "As sales grow, your percentage payouts stay at zero with Exly.",
  },
  core: {
    badge: "Ops Architect",
    title: "Fixed-fee growth engine",
    text: "From onboarding to scale, Exly executes ads, funnels, and lifecycle systems.",
  },
  features: {
    badge: "Product Wizard",
    title: "Everything in one system",
    text: "Courses, checkout, CRM, automations, and attribution in one workflow.",
  },
  proof: {
    badge: "Result Reporter",
    title: "Measured outcomes",
    text: "Creators see stronger CAC efficiency and cleaner attribution loops.",
  },
  comparison: {
    badge: "Reality Check",
    title: "Aligned incentives",
    text: "Platforms win from percentages. Exly wins by delivering outcomes at a fixed fee.",
  },
  ownership: {
    badge: "Brand Protector",
    title: "Keep control",
    text: "You own data, customer journeys, and monetization strategy end to end.",
  },
  process: {
    badge: "Launch Coach",
    title: "Structured execution",
    text: "Discovery, setup, launch, and scale with one accountable Exly team.",
  },
  cta: {
    badge: "Action Prompt",
    title: "Ready to scale smart",
    text: "Book the call and build growth without giving up percentages.",
  },
};

const sectionStickerLines = {
  cover: [
    { icon: "megaphone", label: "Ads Engine" },
    { icon: "target", label: "Funnel Focus" },
    { icon: "shield", label: "No % Cuts" },
  ],
  hero: [
    { icon: "rocket", label: "Scale Faster" },
    { icon: "brain", label: "Smart Ops" },
    { icon: "gem", label: "Keep Margin" },
  ],
  problem: [
    { icon: "puzzle", label: "Tool Chaos" },
    { icon: "down", label: "Wasted Spend" },
    { icon: "timer", label: "Slow Launches" },
  ],
  cost: [
    { icon: "bar", label: "Clear Pricing" },
    { icon: "shield", label: "Margin Safe" },
    { icon: "badge", label: "Fixed Fee" },
  ],
  core: [
    { icon: "handshake", label: "Partner Model" },
    { icon: "compass", label: "Growth Plan" },
    { icon: "boxes", label: "All-in-One" },
  ],
  features: [
    { icon: "wrench", label: "Automation" },
    { icon: "cart", label: "Checkout" },
    { icon: "up", label: "Attribution" },
  ],
  proof: [
    { icon: "trophy", label: "Better ROAS" },
    { icon: "heart", label: "Creator NPS" },
    { icon: "signal", label: "Retention Up" },
  ],
  comparison: [
    { icon: "scale", label: "Fair Model" },
    { icon: "search", label: "Full Data" },
    { icon: "flag", label: "Exly Edge" },
  ],
  ownership: [
    { icon: "file", label: "Own Data" },
    { icon: "tag", label: "Own Brand" },
    { icon: "lock", label: "Own Control" },
  ],
  process: [
    { icon: "map", label: "Discovery" },
    { icon: "wrench", label: "Setup" },
    { icon: "boxes", label: "Launch" },
  ],
  cta: [
    { icon: "phone", label: "Book Call" },
    { icon: "flame", label: "Go Live" },
    { icon: "wallet", label: "Keep 100%" },
  ],
};

const stickerIconMap = {
  megaphone: Megaphone,
  target: Target,
  shield: ShieldCheck,
  rocket: Rocket,
  brain: Brain,
  gem: Gem,
  puzzle: Puzzle,
  down: TrendingDown,
  timer: Timer,
  bar: BarChart3,
  badge: BadgeCheck,
  handshake: Handshake,
  compass: Compass,
  boxes: Boxes,
  wrench: Wrench,
  cart: ShoppingCart,
  up: TrendingUp,
  trophy: Trophy,
  heart: Heart,
  signal: Signal,
  scale: Scale,
  search: Search,
  flag: Flag,
  file: FileText,
  tag: Tag,
  lock: Lock,
  map: Map,
  phone: PhoneCall,
  flame: Flame,
  wallet: Wallet,
};

const sharedSpring = {
  type: "spring",
  stiffness: 138,
  damping: 34,
  mass: 1,
};

const genieVariants = {
  collapsed: {
    opacity: 0.985,
    scale: 0.995,
    x: 8,
    y: 4,
    skewX: 0.6,
    skewY: -0.12,
    boxShadow: "0 16px 36px -28px rgba(15,23,42,0.35)",
    transition: { type: "spring", stiffness: 132, damping: 32, mass: 0.98 },
  },
  expanded: {
    opacity: 1,
    scale: 1,
    x: 0,
    y: 0,
    skewX: [0.6, -0.15, 0],
    skewY: [-0.12, 0.06, 0],
    boxShadow: "0 30px 78px -46px rgba(15,23,42,0.72)",
    transition: {
      layout: sharedSpring,
      type: "spring",
      stiffness: 142,
      damping: 34,
      mass: 1,
      times: [0, 0.78, 1],
    },
  },
};

const revealParent = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const revealItem = {
  hidden: { opacity: 0, y: 16, filter: "blur(1px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] },
  },
};

const getRevealParent = (fast) => ({
  hidden: {},
  show: {
    transition: { staggerChildren: fast ? 0.045 : 0.08, delayChildren: fast ? 0.04 : 0.1 },
  },
});

const getRevealItem = (fast) => ({
  hidden: { opacity: 0, y: 16, filter: "blur(1px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: fast ? 0.28 : 0.48, ease: [0.22, 1, 0.36, 1] },
  },
});

const tableRowReveal = {
  hidden: { opacity: 0, y: 12 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.35, ease: "easeOut" },
  }),
};

const gridStyle = {
  backgroundImage: "radial-gradient(circle, rgba(17, 24, 39, 0.13) 1px, transparent 1px)",
  backgroundSize: "22px 22px",
};

const sectionBody = {
  hero: {
    title: "Exly: Growth Brand + Revenue Operating System",
    paragraphs: [
      "Exly combines platform infrastructure with hands-on growth services, so creators get both execution power and strategic support.",
      "We acquire demand through Meta and Google paid media, convert demand through better funnels, and retain customers through lifecycle automation.",
    ],
    bullets: [
      "Zero revenue-share policy: Exly does not take percentages",
      "One fixed amount with clear commercial predictability",
      "Alternative to traditional percentage-based ad agencies",
      "Brand-led growth model with ads + services + platform",
    ],
  },
  problem: {
    title: "Pain Points We Solve",
    paragraphs: [
      "Most creator businesses run a patchwork stack: landing pages, separate checkout, CRM, automation tools, and analytics across different vendors.",
      "This creates the classic agency headache: fees scale with ad spend, incentives become misaligned, and founders still coordinate multiple teams.",
    ],
    bullets: [
      "Many creators effectively lose 30%-40% of revenue between agency fees and fragmented growth tooling",
      "Ad spend wasted because conversion events are poorly tracked",
      "High monthly SaaS burden plus hidden revenue-share taxes",
      "No single team accountable for both growth and operations",
    ],
  },
  core: {
    title: "Core Offer: Fixed Fee Partnership",
    paragraphs: [
      "Exly is positioned as a strategic growth partner: one fixed commercial model, complete execution support, and full platform ownership.",
      "We build your growth engine with paid ads, funnel architecture, CRM automation, and monetization operations under one accountable team.",
      "Pilot pricing is ₹2,60,000 per quarter (regular ₹3,90,000 per quarter), with no revenue share, no percentage of ad spend, and no hidden fees.",
    ],
    bullets: [
      "No percentage cuts from your monthly or annual revenue",
      "Ads + creative testing + audience retargeting included in growth operations",
      "Integrated funnels across courses, cohorts, calls, and memberships",
      "Dedicated account manager + media buyer + tech support",
      "Migration, onboarding, and ongoing optimization support",
    ],
  },
  features: {
    title: "Feature Stack for Revenue Expansion",
    cards: [
      { title: "Meta + Google Ads Ops", text: "Campaign strategy, setup, creative testing, and budget optimization with weekly decision loops." },
      { title: "Landing Pages on Your Domain", text: "Conversion-focused funnels built on your own branded domain and owned infrastructure." },
      { title: "CRM + Lead Management", text: "Lead routing, pipeline visibility, and conversion workflows in one connected operating layer." },
      { title: "Email + WhatsApp Automation", text: "Behavior-based journeys for nurture, reminders, follow-ups, and reactivation." },
      { title: "Payments + Checkout", text: "Integrated checkout, payment flows, and monetization operations without third-party friction." },
      { title: "Analytics + Reporting", text: "Clear ads-to-revenue measurement to optimize CAC, ROAS, and cohort value." },
    ],
  },
  comparison: {
    title: "Exly vs Percentage-Based Platforms",
    paragraphs: [
      "Platforms that charge percentages make more money when you pay more. Exly keeps incentives clean with a fixed-fee model.",
    ],
    bullets: [
      "No take-rate penalty as your business scales",
      "Combined platform + growth service capability",
      "Clear operating economics and stronger long-term margins",
    ],
  },
  ownership: {
    title: "Ownership, Brand Control, and Long-Term Equity",
    paragraphs: [
      "Your brand should not be rented from platforms that can change policy, visibility, or fees overnight.",
      "Exly is structured to make your brand stronger over time: you own customer data, journeys, and monetization logic even if you stop working with us.",
    ],
    bullets: [
      "You keep ownership of ad accounts, landing pages, funnels, leads, customer lists, and creatives",
      "First-party customer data and behavior trails",
      "Brand-consistent experience across ads, landing pages, checkout, and community",
      "Control over pricing, offers, and lifecycle messaging",
      "Scalable growth system without surrendering margin",
    ],
  },
};

const costRows = [
  ["Ad Spend Reference", "₹10,00,000/month", "₹10,00,000/month"],
  ["Agency Fees", "₹1,00,000-₹2,00,000/month (10%-20%)", "₹0"],
  ["Landing + Funnel Tools", "₹40,000-₹80,000/month", "Included"],
  ["CRM + Automation Stack", "₹30,000-₹70,000/month", "Included"],
  ["Checkout + Payment Tooling", "₹20,000-₹50,000/month", "Included"],
  ["Partnership Pricing", "Variable + scale-linked", "₹2,60,000/quarter pilot (₹3,90,000 regular)"],
  ["Revenue Share", "May include add-on % terms", "0% (No percentage cut)"],
];

const processPhases = [
  { phase: "01", label: "Discovery + Setup", text: "Audit accounts, define growth targets, and configure tracking + operating baseline." },
  { phase: "02", label: "Build + Launch", text: "Ship funnels, CRM flows, automation, and launch campaigns with first conversion loops." },
  { phase: "03", label: "Test + Optimize", text: "Improve creatives, audiences, and conversion journeys using weekly performance insights." },
  { phase: "04", label: "Scale + Dominate", text: "Expand spend with confidence and compound revenue across owned channels." },
];

const savingsBands = [
  { spend: "₹10L/month ad spend", save: "₹10L+ yearly savings potential" },
  { spend: "₹15L/month ad spend", save: "₹15L-₹20L yearly savings potential" },
  { spend: "₹20L/month ad spend", save: "₹25L+ yearly savings potential" },
];

const proofStats = [
  { label: "Ad Budgets Managed", value: 50, suffix: "Cr+" },
  { label: "Creators Scaled", value: 650, suffix: "+" },
  { label: "No Revenue Share", value: 0, suffix: "%" },
  { label: "Core Channels", value: 2, suffix: "(Meta + Google)", splitSuffix: true },
];

const backers = ["Y Combinator", "Lightspeed", "Chiratae", "Kunal Shah"];

const sectionClientQueries = {
  cover: [
    {
      icon: "clarity",
      q: "How is Exly different from a normal agency?",
      a: "Exly combines platform + services + execution under one fixed-fee partnership instead of ad-spend percentages.",
    },
    {
      icon: "money",
      q: "Will fees increase when ad spend increases?",
      a: "No. Exly does not take revenue share or a % of ad spend. Commercial terms stay fixed for the partnership period.",
    },
    {
      icon: "stack",
      q: "Is this only ads management?",
      a: "No. Exly runs ads, funnel architecture, CRM, lifecycle automation, checkout workflows, and reporting infrastructure.",
    },
    {
      icon: "timeline",
      q: "How fast can we see operational clarity?",
      a: "Most brands get cleaner attribution and weekly decision loops inside the first 2-4 weeks of execution.",
    },
  ],
  hero: [
    {
      icon: "audience",
      q: "Who is this partnership ideal for?",
      a: "Creators, coaches, and infopreneurs with active offers who need predictable growth without percentage-based agency drain.",
    },
    {
      icon: "channels",
      q: "Which channels are covered?",
      a: "Primary paid growth channels are Meta and Google, aligned to your offer, funnel stage, and customer journey.",
    },
    {
      icon: "timeline",
      q: "What happens in the first 30 days?",
      a: "Audit, tracking setup, offer-funnel alignment, campaign launch, and iterative optimization based on early signals.",
    },
    {
      icon: "support",
      q: "Who drives strategy and execution weekly?",
      a: "A dedicated team handles execution cadence with structured reviews, action items, and decision-ready reporting.",
    },
  ],
  problem: [
    {
      icon: "stack",
      q: "Why do creator stacks become inefficient?",
      a: "Tools are often purchased in silos. Data breaks between ads, pages, CRM, and checkout, reducing conversion visibility.",
    },
    {
      icon: "money",
      q: "Why are % based agencies hard on margins?",
      a: "As spend scales, fee payout rises regardless of backend system quality, creating misaligned incentives over time.",
    },
    {
      icon: "support",
      q: "Can Exly work with existing team members?",
      a: "Yes. Exly can integrate with your internal operator/VA setup while centralizing growth logic and measurement.",
    },
    {
      icon: "clarity",
      q: "What if attribution is currently unclear?",
      a: "We establish event discipline, funnel mapping, and reporting standards so decisions come from usable data, not guesswork.",
    },
  ],
  cost: [
    {
      icon: "money",
      q: "Does the fee include ad spend?",
      a: "No. Media budget remains yours. Exly fee covers strategic and operational execution infrastructure.",
    },
    {
      icon: "check",
      q: "Are there hidden platform or percentage charges?",
      a: "No hidden fees. No revenue share. No percentage of ad spend charges by Exly.",
    },
    {
      icon: "clarity",
      q: "What is the cost advantage at scale?",
      a: "At higher spend bands, fixed-fee economics typically protect a significantly larger share of yearly contribution margin.",
    },
    {
      icon: "timeline",
      q: "How quickly can savings be realized?",
      a: "Savings begin immediately once % fees and fragmented tool overhead are replaced by a consolidated fixed-fee model.",
    },
  ],
  core: [
    {
      icon: "support",
      q: "Who are the people involved from Exly?",
      a: "You get focused growth ownership across media buying, funnel operations, CRM automation, and reporting.",
    },
    {
      icon: "timeline",
      q: "What review cadence should I expect?",
      a: "Weekly performance loops with clear action plans, plus milestone reviews during launch and scaling phases.",
    },
    {
      icon: "stack",
      q: "Can Exly run both ads and backend systems?",
      a: "Yes. The model is built to align acquisition and conversion systems under one accountable operating plan.",
    },
    {
      icon: "clarity",
      q: "How is strategy decided?",
      a: "Strategy is built from offer economics, funnel bottlenecks, audience behavior, and scaled via testing priorities.",
    },
  ],
  features: [
    {
      icon: "funnel",
      q: "Do we get branded landing pages and funnels?",
      a: "Yes. Funnel experiences are built on your brand and tuned for conversion continuity from ad click to checkout.",
    },
    {
      icon: "stack",
      q: "Is CRM and lead routing included?",
      a: "Yes. Lead capture, routing logic, lifecycle stages, and follow-up workflows are part of the execution scope.",
    },
    {
      icon: "channels",
      q: "How are automations handled?",
      a: "Email and WhatsApp journeys are designed for nurture, reminder, and conversion behavior across key funnel states.",
    },
    {
      icon: "chart",
      q: "What does reporting include?",
      a: "Unified performance views across spend, lead quality, conversion, and efficiency to guide weekly optimizations.",
    },
  ],
  proof: [
    {
      icon: "proof",
      q: "What validates Exly’s scale capability?",
      a: "Managed ad budgets, creator outcomes, and repeated execution patterns across multiple growth stages.",
    },
    {
      icon: "chart",
      q: "Are outcomes tracked beyond top-line spend?",
      a: "Yes. Performance is measured through conversion quality, CAC efficiency, retention behavior, and cohort progression.",
    },
    {
      icon: "support",
      q: "Can we speak to relevant use cases?",
      a: "The engagement is designed around category-fit evidence and transparent decision logic, not generic agency templates.",
    },
    {
      icon: "clarity",
      q: "How do we know what improved?",
      a: "Structured before/after dashboards and iteration logs make performance deltas and drivers visible each cycle.",
    },
  ],
  comparison: [
    {
      icon: "money",
      q: "Why is fixed-fee better for alignment?",
      a: "Incentives stay tied to business outcomes instead of spend inflation, preserving margin as performance compounds.",
    },
    {
      icon: "lock",
      q: "How is control different vs alternatives?",
      a: "You retain brand, data, and account control while Exly executes growth operations under your ownership boundary.",
    },
    {
      icon: "stack",
      q: "What changes operationally vs fragmented tools?",
      a: "Disconnected tool chains are replaced by one growth architecture with shared metrics and execution rhythm.",
    },
    {
      icon: "clarity",
      q: "What does ‘Exly wins’ mean practically?",
      a: "Clear accountability, measurable decisions, and no percentage extraction from your top-line growth.",
    },
  ],
  ownership: [
    {
      icon: "lock",
      q: "Who owns ad accounts and audiences?",
      a: "You do. Account access, audience assets, and growth intelligence remain under your control.",
    },
    {
      icon: "stack",
      q: "Who owns pages, funnels, and CRM data?",
      a: "You retain full ownership of pages, automations, lead records, customer lists, and creative output.",
    },
    {
      icon: "timeline",
      q: "What happens if we stop engagement?",
      a: "Core infrastructure and data continuity remain with your brand; operations are handed over with documented context.",
    },
    {
      icon: "clarity",
      q: "Is there vendor lock-in risk?",
      a: "The operating model is designed for portability and ownership, minimizing dependency risk over time.",
    },
  ],
  process: [
    {
      icon: "timeline",
      q: "How long does onboarding take?",
      a: "Initial discovery and baseline setup run first, followed by staged launch and optimization cycles.",
    },
    {
      icon: "funnel",
      q: "When do campaigns go live?",
      a: "After tracking integrity and funnel readiness are validated, campaigns launch with test-and-learn sequencing.",
    },
    {
      icon: "chart",
      q: "How does optimization happen week to week?",
      a: "Creative, audience, and funnel hypotheses are prioritized, executed, and iterated via weekly performance loops.",
    },
    {
      icon: "support",
      q: "How are decisions communicated?",
      a: "Action-led reporting summarizes what changed, why it changed, and what is next in the execution queue.",
    },
  ],
  cta: [
    {
      icon: "check",
      q: "What does the discovery call cover?",
      a: "Offer audit, channel readiness, funnel bottlenecks, cost model fit, and a practical first 90-day execution path.",
    },
    {
      icon: "money",
      q: "What are the pilot commercial terms?",
      a: "Pilot pricing is fixed per quarter with no revenue share and no ad-spend percentage extraction.",
    },
    {
      icon: "timeline",
      q: "How soon can we begin post-call?",
      a: "Once alignment is confirmed, onboarding kickoff can begin with prioritized setup and launch milestones.",
    },
    {
      icon: "support",
      q: "What support can we expect during pilot?",
      a: "Hands-on execution partnership across ads, funnels, CRM, automation, and reporting rhythm.",
    },
  ],
};

const proofTestimonials = [
  {
    name: "Aarav Malhotra",
    role: "Cohort Program Creator",
    impact: "ROAS +44% in 9 weeks",
    quote:
      "We moved from scattered tools to one accountable Exly team. CAC dropped while lead quality improved.",
    variant: "trend",
  },
  {
    name: "Nisha Verma",
    role: "Business Coach",
    impact: "₹18L annual savings projected",
    quote:
      "Earlier we paid a percentage on spend. With Exly fixed fee, margins improved every time we scaled.",
    variant: "funnel",
  },
  {
    name: "Rohit Saini",
    role: "Career Mentor Brand",
    impact: "Lead-to-sale lift +31%",
    quote:
      "Ads, CRM, checkout, and automation now run in one stack. Reporting is cleaner and decisions are faster.",
    variant: "stack",
  },
  {
    name: "Simran Kaur",
    role: "Language Learning Creator",
    impact: "Retention +22% quarter-on-quarter",
    quote:
      "The team helped us redesign lifecycle flows, not just ad campaigns. We finally see compounding growth.",
    variant: "shield",
  },
  {
    name: "Dev Arora",
    role: "Skilling Founder",
    impact: "Launch CAC reduced by 28%",
    quote:
      "Exly kept ownership fully with us: accounts, audiences, funnels, and data. That was the biggest win.",
    variant: "arrow",
  },
  {
    name: "Megha Jain",
    role: "Creator Commerce Educator",
    impact: "Revenue visibility in 30 days",
    quote:
      "The fixed amount model removed fee anxiety. We could scale confidently without percentage penalties.",
    variant: "pulse",
  },
];

const statusChips = [
  { label: "Fixed Fee", tone: "indigo" },
  { label: "No Revenue Share", tone: "emerald" },
  { label: "Ads + Services", tone: "sky" },
];

const chipToneMap = {
  indigo: "bg-indigo-50 text-indigo-700 border-indigo-200",
  emerald: "bg-emerald-50 text-emerald-700 border-emerald-200",
  sky: "bg-sky-50 text-sky-700 border-sky-200",
};

const motionPresets = {
  calm: { label: "Calm", amp: 0.72, speed: 0.88 },
  standard: { label: "Standard", amp: 1, speed: 1 },
  rich: { label: "Rich", amp: 1.2, speed: 1.15 },
};

function fireMicroHaptic(pattern = [8]) {
  if (typeof window === "undefined") return;
  if (!("navigator" in window) || !navigator.vibrate) return;
  navigator.vibrate(pattern);
}

function BrandLogo({ className = "h-10 w-auto object-contain align-middle" }) {
  return <img src="/exly-proposal-logo.svg" alt="Exly logo" className={className} loading="eager" decoding="async" />;
}

function AnimatedCounter({ value, suffix = "", duration = 1.8, splitSuffix = false, suffixClassName = "" }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(count, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
    });
    const unsubscribe = rounded.on("change", (latest) => {
      setDisplay(latest);
    });
    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [count, duration, rounded, value]);

  const suffixText = suffix ? String(suffix).trim() : "";
  return (
    <span className="tabular-nums inline-flex flex-wrap items-baseline gap-x-1">
      <span>{display.toLocaleString()}</span>
      {suffixText ? (
        splitSuffix ? (
          <span className={`basis-full pt-1 text-sm font-semibold leading-snug sm:text-base ${suffixClassName}`}>{suffixText}</span>
        ) : (
          <span>{suffixText}</span>
        )
      ) : null}
    </span>
  );
}

function MagneticButton({ children, className = "", ...props }) {
  const reducedMotion = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const glow = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 220, damping: 24, mass: 0.65 });
  const y = useSpring(my, { stiffness: 220, damping: 24, mass: 0.65 });
  const glowSpring = useSpring(glow, { stiffness: 220, damping: 26, mass: 0.7 });
  const glowOpacity = useTransform(glowSpring, [0, 1], [0.14, 0.48]);

  const handleMove = (event) => {
    if (reducedMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    mx.set(Math.max(Math.min(dx / 10, 6), -6));
    my.set(Math.max(Math.min(dy / 10, 6), -6));
    const distance = Math.sqrt(dx * dx + dy * dy);
    const maxDistance = Math.max(rect.width, rect.height) * 0.55;
    glow.set(Math.max(0, 1 - distance / maxDistance));
  };

  const reset = () => {
    mx.set(0);
    my.set(0);
    glow.set(0);
  };

  return (
    <motion.button
      className={`group relative overflow-hidden rounded-xl px-6 py-3 font-semibold text-white transform-gpu ${className}`}
      style={{ x, y }}
      initial="rest"
      whileHover="hover"
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onTapStart={() => fireMicroHaptic([5])}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 230, damping: 24 }}
      {...props}
    >
      <span className="relative z-10 flex w-full items-center justify-center gap-2 text-center">
        {children}
        <ArrowUpRight className="h-4 w-4" />
      </span>
      <motion.span
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,#4F46E5,#4338CA,#4F46E5)] bg-[length:200%_100%]"
        variants={{
          rest: { backgroundPosition: "0% 50%" },
          hover: { backgroundPosition: "100% 50%" },
        }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      />
      <motion.span
        className="pointer-events-none absolute inset-y-0 -left-20 w-16 bg-white/35 blur-sm"
        variants={{
          rest: { x: "-130%" },
          hover: { x: "460%" },
        }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      />
      <motion.span
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.45)_0%,rgba(255,255,255,0.02)_62%)]"
        style={{ opacity: glowOpacity }}
      />
    </motion.button>
  );
}

function StickyDiscoveryFooter({ onSchedule, liteMotion = false, isMobile = false }) {
  return (
    <motion.div
      className="pointer-events-none relative z-40 w-full px-1 py-2 pb-[max(0.65rem,env(safe-area-inset-bottom))] md:px-0 md:py-3 md:pb-0"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: liteMotion ? 0.2 : 0.32, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className={`pointer-events-auto flex w-full items-center gap-3 rounded-2xl border border-indigo-200/70 bg-white/90 px-3 py-2.5 shadow-[0_14px_30px_-18px_rgba(79,70,229,0.35)] backdrop-blur-md md:px-4 ${
          isMobile ? "justify-between rounded-xl px-2.5 py-2" : "justify-between"
        }`}
        animate={
          liteMotion
            ? undefined
            : {
                boxShadow: [
                  "0 14px 30px -18px rgba(79,70,229,0.32)",
                  "0 18px 34px -18px rgba(79,70,229,0.4)",
                  "0 14px 30px -18px rgba(79,70,229,0.32)",
                ],
              }
        }
        transition={liteMotion ? undefined : { duration: 4.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className={`min-w-0 ${isMobile ? "pr-1" : ""}`}>
          <p className="truncate text-[10px] font-semibold uppercase tracking-[0.18em] text-[#4F46E5] md:text-xs">
            Exly Growth Partnership
          </p>
          <p className={`text-xs font-medium text-[#4B5563] md:text-sm ${isMobile ? "truncate max-w-[44vw]" : ""}`}>
            Schedule a discovery call. Zero revenue share. One fixed fee.
          </p>
        </div>
        <MagneticButton
          onClick={onSchedule}
          className={`shrink-0 px-4 py-2 text-xs font-semibold md:px-5 md:text-sm ${isMobile ? "rounded-lg justify-center whitespace-nowrap" : ""}`}
        >
          Schedule Discovery Call
        </MagneticButton>
      </motion.div>
    </motion.div>
  );
}

function MobileGrowthCallBar({ onBook }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 md:hidden">
      <div className="w-full bg-[#111827] px-4 pt-3 pb-[max(0.9rem,env(safe-area-inset-bottom))] shadow-[0_-10px_24px_-14px_rgba(17,24,39,0.65)]">
        <div className="mx-auto flex max-w-md flex-col items-center">
          <button
            onClick={onBook}
            className="inline-flex w-full items-center justify-center rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-[#111827]"
          >
            Book Free Growth Call
          </button>
          <p className="mt-1.5 text-center text-[11px] font-semibold text-white/85">0% Revenue Share</p>
        </div>
      </div>
    </div>
  );
}

function LandingScreenshotGrid({ items = landingScreenshots, liteMotion = false, mode = "three" }) {
  const cols = mode === "two" ? "md:grid-cols-2" : "md:grid-cols-3";
  return (
    <div className={`grid grid-cols-1 gap-4 ${cols}`}>
      {items.map((item, index) => (
        <motion.div
          key={item.src}
          className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
          whileHover={liteMotion ? undefined : { y: -2, boxShadow: "0 16px 30px -22px rgba(15,23,42,0.45)" }}
          transition={{ type: "spring", stiffness: 220, damping: 24, delay: index * 0.04 }}
        >
          <div className="relative aspect-[16/10] overflow-hidden bg-slate-50">
            <img
              src={item.src}
              alt={item.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="p-3">
            <p className="text-sm font-semibold text-[#111827]">{item.title}</p>
            <p className="mt-1 text-xs text-[#64748B]">{item.note}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function AnimatedCheckIcon({ className = "h-6 w-6" }) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="checkFillGradient" x1="4" y1="4" x2="20" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#22C55E" />
          <stop offset="100%" stopColor="#15803D" />
        </linearGradient>
      </defs>
      <motion.circle
        cx="12"
        cy="12"
        r="10"
        fill="url(#checkFillGradient)"
        animate={reducedMotion ? undefined : { scale: [1, 1.08, 1], opacity: [0.88, 1, 0.88] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.path
        d="M7.4 12.3l3.1 3.1 6.1-7"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reducedMotion ? false : { pathLength: 0.08, opacity: 0.8 }}
        animate={reducedMotion ? { pathLength: 1, opacity: 1 } : { pathLength: [0.08, 1, 1], opacity: [0.8, 1, 0.9] }}
        transition={{ duration: 1.25, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.circle
        cx="12"
        cy="12"
        r="10"
        fill="none"
        stroke="#22C55E"
        strokeWidth="1.6"
        animate={reducedMotion ? undefined : { scale: [1, 1.28], opacity: [0.65, 0] }}
        transition={{ duration: 1.35, repeat: Infinity, ease: "easeOut" }}
      />
      <motion.circle
        cx="12"
        cy="12"
        r="6.7"
        fill="none"
        stroke="#86EFAC"
        strokeWidth="1"
        strokeDasharray="4 3"
        animate={reducedMotion ? undefined : { rotate: [0, 360] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "50% 50%" }}
      />
      <motion.circle
        cx="18"
        cy="6.2"
        r="1.1"
        fill="#D1FAE5"
        animate={reducedMotion ? undefined : { opacity: [0.2, 1, 0.2], scale: [0.85, 1.25, 0.85] }}
        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.svg>
  );
}

function AnimatedCrossIcon({ className = "h-6 w-6" }) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="crossFillGradient" x1="4" y1="4" x2="20" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#EF4444" />
          <stop offset="100%" stopColor="#B91C1C" />
        </linearGradient>
      </defs>
      <motion.circle
        cx="12"
        cy="12"
        r="10"
        fill="url(#crossFillGradient)"
        animate={reducedMotion ? undefined : { scale: [1, 1.08, 1], opacity: [0.88, 1, 0.88] }}
        transition={{ duration: 1.55, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.g
        animate={reducedMotion ? undefined : { rotate: [0, -10, 10, -6, 6, 0] }}
        transition={{ duration: 1.45, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "50% 50%" }}
      >
        <path
          d="M8 8l8 8M16 8l-8 8"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.g>
      <motion.circle
        cx="12"
        cy="12"
        r="10"
        fill="none"
        stroke="#F87171"
        strokeWidth="1.6"
        animate={reducedMotion ? undefined : { scale: [1, 1.26], opacity: [0.65, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
      />
      <motion.circle
        cx="12"
        cy="12"
        r="6.6"
        fill="none"
        stroke="#FCA5A5"
        strokeWidth="1"
        strokeDasharray="3.5 3"
        animate={reducedMotion ? undefined : { rotate: [360, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "50% 50%" }}
      />
      <motion.circle
        cx="6.5"
        cy="18"
        r="1.1"
        fill="#FEE2E2"
        animate={reducedMotion ? undefined : { opacity: [0.2, 1, 0.2], scale: [0.85, 1.25, 0.85] }}
        transition={{ duration: 1.05, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.svg>
  );
}

function LegacyRevenueShareChart({ liteMotion = false, className = "" }) {
  const reducedMotion = useReducedMotion();
  const animateChart = !liteMotion && !reducedMotion;

  return (
    <svg viewBox="0 0 320 96" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="legacyChartArea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(239,68,68,0.28)" />
          <stop offset="100%" stopColor="rgba(239,68,68,0.03)" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="318" height="94" rx="12" fill="rgba(255,255,255,0.72)" stroke="rgba(244,63,94,0.18)" />
      {[22, 40, 58, 76].map((y) => (
        <line key={y} x1="16" y1={y} x2="304" y2={y} stroke="rgba(225,29,72,0.12)" strokeDasharray="3 4" />
      ))}
      <path
        d="M18 74 C55 72 84 66 112 59 C145 50 173 43 208 33 C241 24 270 18 302 12 L302 82 L18 82 Z"
        fill="url(#legacyChartArea)"
      />
      <motion.path
        d="M18 74 C55 72 84 66 112 59 C145 50 173 43 208 33 C241 24 270 18 302 12"
        fill="none"
        stroke="#E11D48"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={animateChart ? "0 1" : undefined}
        initial={animateChart ? { pathLength: 0.15, opacity: 0.7 } : false}
        animate={animateChart ? { pathLength: [0.15, 1, 1], opacity: [0.7, 1, 0.92] } : { pathLength: 1, opacity: 1 }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.circle
        cx="302"
        cy="12"
        r="4.8"
        fill="#E11D48"
        animate={animateChart ? { scale: [1, 1.28, 1], opacity: [0.75, 1, 0.75] } : undefined}
        transition={{ duration: 1.15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.circle
        cx="302"
        cy="12"
        r="8"
        fill="none"
        stroke="rgba(225,29,72,0.48)"
        strokeWidth="1.5"
        animate={animateChart ? { scale: [1, 1.55], opacity: [0.6, 0] } : undefined}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
      />
    </svg>
  );
}

function ExlyFixedFeeChart({ liteMotion = false, className = "" }) {
  const reducedMotion = useReducedMotion();
  const animateChart = !liteMotion && !reducedMotion;

  return (
    <svg viewBox="0 0 320 96" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="exlyChartArea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(79,70,229,0.2)" />
          <stop offset="100%" stopColor="rgba(79,70,229,0.03)" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="318" height="94" rx="12" fill="rgba(255,255,255,0.72)" stroke="rgba(99,102,241,0.2)" />
      {[22, 40, 58, 76].map((y) => (
        <line key={y} x1="16" y1={y} x2="304" y2={y} stroke="rgba(99,102,241,0.13)" strokeDasharray="3 4" />
      ))}
      <path d="M18 44 C88 44 124 44 192 44 C230 44 266 44 302 44 L302 82 L18 82 Z" fill="url(#exlyChartArea)" />
      <motion.path
        d="M18 44 C88 44 124 44 192 44 C230 44 266 44 302 44"
        fill="none"
        stroke="#4F46E5"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={animateChart ? { pathLength: 0.2, opacity: 0.7 } : false}
        animate={animateChart ? { pathLength: [0.2, 1, 1], opacity: [0.7, 1, 0.9] } : { pathLength: 1, opacity: 1 }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.path
        d="M18 66 L302 66"
        fill="none"
        stroke="#22C55E"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeDasharray="5 4"
        animate={animateChart ? { strokeDashoffset: [0, -18] } : undefined}
        transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
      />
      <motion.circle
        cx="42"
        cy="44"
        r="4.2"
        fill="#4F46E5"
        animate={animateChart ? { cx: [42, 302], opacity: [0.35, 1, 0.35] } : undefined}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.circle
        cx="278"
        cy="66"
        r="4.1"
        fill="#16A34A"
        animate={animateChart ? { scale: [1, 1.28, 1], opacity: [0.75, 1, 0.75] } : undefined}
        transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

function StickerIcon({ name, className = "h-5 w-5" }) {
  const Icon = stickerIconMap[name] ?? BadgeCheck;
  return <Icon className={className} strokeWidth={2} />;
}

function CartoonCard({ icon, name, role, pain }) {
  return (
    <motion.div
      className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
      whileHover={{ y: -2, rotate: -0.2, boxShadow: "0 16px 28px -20px rgba(15,23,42,0.45)" }}
      transition={{ type: "spring", stiffness: 220, damping: 26 }}
    >
      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
          <StickerIcon name={icon} className="h-6 w-6" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-[#111827]">{name}</p>
          <p className="text-xs text-[#6B7280]">{role}</p>
        </div>
      </div>
      <p className="mt-3 rounded-xl bg-slate-50 p-3 text-sm leading-relaxed text-[#4B5563]">"{pain}"</p>
    </motion.div>
  );
}

function TestimonialSvg({ variant = "trend", liteMotion = false }) {
  const reducedMotion = useReducedMotion();
  const animateSvg = !reducedMotion && !liteMotion;

  if (variant === "funnel") {
    return (
      <svg viewBox="0 0 72 72" className="h-12 w-12" aria-hidden="true">
        <rect x="8" y="10" width="56" height="52" rx="12" fill="#EEF2FF" />
        {[{ y: 20, w: 36 }, { y: 30, w: 26 }, { y: 40, w: 16 }].map((bar, index) => (
          <motion.rect
            key={bar.y}
            x="18"
            y={bar.y}
            width={bar.w}
            height="6"
            rx="3"
            fill="#4F46E5"
            style={{ transformOrigin: "18px 20px" }}
            initial={{ scaleX: 0.6, opacity: 0.6 }}
            animate={animateSvg ? { scaleX: [0.6, 1, 0.72, 1], opacity: [0.6, 1, 0.72, 1] } : { scaleX: 1, opacity: 1 }}
            transition={{ duration: 3 + index * 0.35, repeat: Infinity, ease: "easeInOut", delay: index * 0.08 }}
          />
        ))}
      </svg>
    );
  }

  if (variant === "stack") {
    return (
      <svg viewBox="0 0 72 72" className="h-12 w-12" aria-hidden="true">
        <rect x="8" y="10" width="56" height="52" rx="12" fill="#EFF6FF" />
        {[0, 1, 2].map((index) => (
          <motion.rect
            key={index}
            x="18"
            y={20 + index * 11}
            width="36"
            height="8"
            rx="4"
            fill={index === 1 ? "#4F46E5" : "#A5B4FC"}
            animate={animateSvg ? { y: [20 + index * 11, 18 + index * 11, 20 + index * 11] } : undefined}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: index * 0.16 }}
          />
        ))}
        <motion.path
          d="M56 52 L62 46"
          stroke="#4338CA"
          strokeWidth="2.2"
          strokeLinecap="round"
          animate={animateSvg ? { opacity: [0.45, 1, 0.45] } : undefined}
          transition={{ duration: 2.1, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    );
  }

  if (variant === "shield") {
    return (
      <svg viewBox="0 0 72 72" className="h-12 w-12" aria-hidden="true">
        <rect x="8" y="10" width="56" height="52" rx="12" fill="#ECFEFF" />
        <motion.path
          d="M36 19 L50 24 V36 C50 43 44.7 48.8 36 52 C27.3 48.8 22 43 22 36 V24 Z"
          fill="#E0E7FF"
          stroke="#4F46E5"
          strokeWidth="1.8"
          animate={animateSvg ? { scale: [1, 1.04, 1] } : undefined}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M29 35 L34 40 L43 31"
          fill="none"
          stroke="#4338CA"
          strokeWidth="2.3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0.4 }}
          animate={animateSvg ? { pathLength: 1, opacity: [0.4, 1, 0.4] } : { pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    );
  }

  if (variant === "arrow") {
    return (
      <svg viewBox="0 0 72 72" className="h-12 w-12" aria-hidden="true">
        <rect x="8" y="10" width="56" height="52" rx="12" fill="#ECFDF5" />
        <path d="M18 48 H54" stroke="#C7D2FE" strokeWidth="1.6" />
        <path d="M18 24 V48" stroke="#C7D2FE" strokeWidth="1.6" />
        <motion.path
          d="M22 44 L30 36 L38 39 L50 27"
          fill="none"
          stroke="#4F46E5"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0.6 }}
          animate={animateSvg ? { pathLength: 1, opacity: 1 } : { pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
        />
        <motion.path
          d="M47 27 L50 27 L50 30"
          fill="none"
          stroke="#4F46E5"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={animateSvg ? { opacity: [0.5, 1, 0.5] } : undefined}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    );
  }

  if (variant === "pulse") {
    return (
      <svg viewBox="0 0 72 72" className="h-12 w-12" aria-hidden="true">
        <rect x="8" y="10" width="56" height="52" rx="12" fill="#F0FDFA" />
        <motion.circle
          cx="36"
          cy="36"
          r="8"
          fill="#4F46E5"
          fillOpacity="0.2"
          stroke="#4F46E5"
          strokeWidth="1.5"
          animate={animateSvg ? { r: [8, 12, 8], opacity: [0.8, 0.35, 0.8] } : undefined}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.circle
          cx="36"
          cy="36"
          r="4"
          fill="#4338CA"
          animate={animateSvg ? { scale: [1, 1.15, 1] } : undefined}
          transition={{ duration: 2.1, repeat: Infinity, ease: "easeInOut" }}
        />
        <path d="M18 49 C25 41, 47 41, 54 49" stroke="#A5B4FC" strokeWidth="1.7" fill="none" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 72 72" className="h-12 w-12" aria-hidden="true">
      <rect x="8" y="10" width="56" height="52" rx="12" fill="#EEF2FF" />
      <path d="M18 48 H54" stroke="#C7D2FE" strokeWidth="1.6" />
      <path d="M18 20 V48" stroke="#C7D2FE" strokeWidth="1.6" />
      <motion.path
        d="M21 43 L29 34 L37 37 L45 28 L52 31"
        fill="none"
        stroke="#4F46E5"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0.65 }}
        animate={animateSvg ? { pathLength: 1, opacity: 1 } : { pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.9, ease: "easeOut" }}
      />
      <motion.circle
        cx="52"
        cy="31"
        r="2.4"
        fill="#4338CA"
        animate={animateSvg ? { scale: [1, 1.25, 1], opacity: [0.6, 1, 0.6] } : undefined}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

function ProofTestimonialCard({ testimonial, liteMotion = false, index = 0 }) {
  return (
    <motion.div
      className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.32, ease: "easeOut" }}
      whileHover={{ y: -2, borderColor: "rgba(79,70,229,0.35)", boxShadow: "0 14px 28px -20px rgba(15,23,42,0.45)" }}
    >
      <div className="flex items-start gap-3">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50/70">
          <TestimonialSvg variant={testimonial.variant} liteMotion={liteMotion} />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-[#111827]">{testimonial.name}</p>
          <p className="text-xs text-[#6B7280]">{testimonial.role}</p>
          <p className="mt-1 inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-emerald-700">
            {testimonial.impact}
          </p>
        </div>
      </div>
      <p className="mt-3 rounded-xl bg-slate-50 p-3 text-sm leading-relaxed text-[#4B5563]">"{testimonial.quote}"</p>
    </motion.div>
  );
}

function QuerySvg({ type = "clarity", liteMotion = false }) {
  const reducedMotion = useReducedMotion();
  const animateSvg = !reducedMotion && !liteMotion;

  const pulseTransition = { duration: 2.6, repeat: Infinity, ease: "easeInOut" };

  if (type === "money") {
    return (
      <svg viewBox="0 0 56 56" className="h-11 w-11" aria-hidden="true">
        <rect x="5" y="8" width="46" height="40" rx="10" fill="#EEF2FF" />
        <rect x="12" y="16" width="32" height="24" rx="6" fill="#FFFFFF" stroke="#4F46E5" strokeWidth="1.6" />
        <motion.circle cx="28" cy="28" r="5" fill="#4F46E5" fillOpacity="0.16" stroke="#4F46E5" strokeWidth="1.4" animate={animateSvg ? { scale: [1, 1.12, 1] } : undefined} transition={pulseTransition} />
        <motion.path d="M22 28 H34" stroke="#4338CA" strokeWidth="1.8" strokeLinecap="round" animate={animateSvg ? { opacity: [0.5, 1, 0.5] } : undefined} transition={pulseTransition} />
      </svg>
    );
  }

  if (type === "stack") {
    return (
      <svg viewBox="0 0 56 56" className="h-11 w-11" aria-hidden="true">
        <rect x="5" y="8" width="46" height="40" rx="10" fill="#EFF6FF" />
        {[0, 1, 2].map((idx) => (
          <motion.rect
            key={idx}
            x="12"
            y={16 + idx * 8}
            width="30"
            height="6"
            rx="3"
            fill={idx === 1 ? "#4F46E5" : "#A5B4FC"}
            animate={animateSvg ? { x: [12, 13.4, 12] } : undefined}
            transition={{ duration: 2.1 + idx * 0.2, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
        <path d="M44 34 L48 30" stroke="#4F46E5" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "timeline") {
    return (
      <svg viewBox="0 0 56 56" className="h-11 w-11" aria-hidden="true">
        <rect x="5" y="8" width="46" height="40" rx="10" fill="#ECFEFF" />
        <path d="M14 30 H44" stroke="#A5B4FC" strokeWidth="1.6" />
        {[16, 28, 40].map((x, idx) => (
          <motion.circle
            key={x}
            cx={x}
            cy="30"
            r="3.2"
            fill={idx === 1 ? "#4338CA" : "#4F46E5"}
            animate={animateSvg ? { scale: [1, 1.22, 1] } : undefined}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: idx * 0.12 }}
          />
        ))}
      </svg>
    );
  }

  if (type === "lock") {
    return (
      <svg viewBox="0 0 56 56" className="h-11 w-11" aria-hidden="true">
        <rect x="5" y="8" width="46" height="40" rx="10" fill="#F0F9FF" />
        <rect x="16" y="24" width="24" height="16" rx="4" fill="#FFFFFF" stroke="#4F46E5" strokeWidth="1.6" />
        <path d="M20 24 V20 C20 15.5 23.2 12 28 12 C32.8 12 36 15.5 36 20 V24" stroke="#4F46E5" strokeWidth="1.6" fill="none" />
        <motion.circle cx="28" cy="31.5" r="2.2" fill="#4338CA" animate={animateSvg ? { opacity: [0.45, 1, 0.45] } : undefined} transition={pulseTransition} />
      </svg>
    );
  }

  if (type === "proof") {
    return (
      <svg viewBox="0 0 56 56" className="h-11 w-11" aria-hidden="true">
        <rect x="5" y="8" width="46" height="40" rx="10" fill="#EEF2FF" />
        <path d="M14 38 L22 29 L30 33 L42 21" stroke="#4F46E5" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <motion.circle cx="42" cy="21" r="2.4" fill="#4338CA" animate={animateSvg ? { scale: [1, 1.25, 1] } : undefined} transition={pulseTransition} />
      </svg>
    );
  }

  if (type === "channels") {
    return (
      <svg viewBox="0 0 56 56" className="h-11 w-11" aria-hidden="true">
        <rect x="5" y="8" width="46" height="40" rx="10" fill="#F0FDFA" />
        <circle cx="18" cy="22" r="4" fill="#A5B4FC" />
        <circle cx="38" cy="22" r="4" fill="#4F46E5" />
        <circle cx="28" cy="36" r="4" fill="#4338CA" />
        <path d="M22 24 L34 24 M20 25 L26 33 M36 25 L30 33" stroke="#4F46E5" strokeWidth="1.6" />
      </svg>
    );
  }

  if (type === "funnel") {
    return (
      <svg viewBox="0 0 56 56" className="h-11 w-11" aria-hidden="true">
        <rect x="5" y="8" width="46" height="40" rx="10" fill="#EEF2FF" />
        {[{ y: 16, w: 28 }, { y: 24, w: 20 }, { y: 32, w: 12 }].map((row, idx) => (
          <motion.rect
            key={row.y}
            x="14"
            y={row.y}
            width={row.w}
            height="5"
            rx="2.5"
            fill="#4F46E5"
            animate={animateSvg ? { opacity: [0.55, 1, 0.55] } : undefined}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: idx * 0.14 }}
          />
        ))}
      </svg>
    );
  }

  if (type === "support") {
    return (
      <svg viewBox="0 0 56 56" className="h-11 w-11" aria-hidden="true">
        <rect x="5" y="8" width="46" height="40" rx="10" fill="#EEF2FF" />
        <circle cx="28" cy="24" r="8.5" fill="#FFFFFF" stroke="#4F46E5" strokeWidth="1.6" />
        <motion.path d="M22 31 H34" stroke="#4338CA" strokeWidth="1.8" strokeLinecap="round" animate={animateSvg ? { opacity: [0.4, 1, 0.4] } : undefined} transition={pulseTransition} />
        <path d="M19 37 C22 34.5 34 34.5 37 37" stroke="#4F46E5" strokeWidth="1.6" fill="none" />
      </svg>
    );
  }

  if (type === "audience") {
    return (
      <svg viewBox="0 0 56 56" className="h-11 w-11" aria-hidden="true">
        <rect x="5" y="8" width="46" height="40" rx="10" fill="#EEF2FF" />
        <circle cx="20" cy="24" r="4.2" fill="#A5B4FC" />
        <circle cx="28" cy="21" r="5" fill="#4F46E5" />
        <circle cx="36" cy="24" r="4.2" fill="#A5B4FC" />
        <path d="M16 34 C18 31, 22 31, 24 34 M24 35 C26 31.5, 30 31.5, 32 35 M32 34 C34 31, 38 31, 40 34" stroke="#4F46E5" strokeWidth="1.4" fill="none" />
      </svg>
    );
  }

  if (type === "check") {
    return (
      <svg viewBox="0 0 56 56" className="h-11 w-11" aria-hidden="true">
        <rect x="5" y="8" width="46" height="40" rx="10" fill="#ECFDF5" />
        <rect x="14" y="15" width="28" height="26" rx="6" fill="#FFFFFF" stroke="#10B981" strokeWidth="1.5" />
        <motion.path
          d="M21 28 L26 33 L35 24"
          fill="none"
          stroke="#059669"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0.2, opacity: 0.5 }}
          animate={animateSvg ? { pathLength: [0.2, 1, 1], opacity: [0.5, 1, 0.7] } : { pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    );
  }

  if (type === "chart") {
    return (
      <svg viewBox="0 0 56 56" className="h-11 w-11" aria-hidden="true">
        <rect x="5" y="8" width="46" height="40" rx="10" fill="#EFF6FF" />
        {[0, 1, 2, 3].map((idx) => (
          <motion.rect
            key={idx}
            x={15 + idx * 7}
            y={32 - idx * 3}
            width="4.8"
            height={8 + idx * 3}
            rx="2"
            fill={idx > 1 ? "#4F46E5" : "#A5B4FC"}
            animate={animateSvg ? { y: [32 - idx * 3, 30 - idx * 3, 32 - idx * 3] } : undefined}
            transition={{ duration: 2.3 + idx * 0.15, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 56 56" className="h-11 w-11" aria-hidden="true">
      <rect x="5" y="8" width="46" height="40" rx="10" fill="#EEF2FF" />
      <motion.path
        d="M15 36 L24 27 L30 31 L40 20"
        fill="none"
        stroke="#4F46E5"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0.55 }}
        animate={animateSvg ? { pathLength: 1, opacity: 1 } : { pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.7, ease: "easeOut" }}
      />
    </svg>
  );
}

function ServiceCardAnimatedSvg({ variant = "ads", liteMotion = false }) {
  const reducedMotion = useReducedMotion();
  const animateSvg = !reducedMotion && !liteMotion;

  if (variant === "funnel") {
    return (
      <svg viewBox="0 0 56 56" className="h-10 w-10" aria-hidden="true">
        <rect x="4" y="6" width="48" height="44" rx="10" fill="#EEF2FF" />
        {[{ y: 15, w: 30 }, { y: 24, w: 22 }, { y: 33, w: 14 }].map((row, idx) => (
          <motion.rect
            key={row.y}
            x={28 - row.w / 2}
            y={row.y}
            width={row.w}
            height="6"
            rx="3"
            fill={idx === 1 ? "#4F46E5" : "#818CF8"}
            animate={animateSvg ? { opacity: [0.55, 1, 0.55] } : undefined}
            transition={{ duration: 2 + idx * 0.2, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </svg>
    );
  }

  if (variant === "ops") {
    return (
      <svg viewBox="0 0 56 56" className="h-10 w-10" aria-hidden="true">
        <rect x="4" y="6" width="48" height="44" rx="10" fill="#ECFEFF" />
        <path d="M17 20 L39 20 L28 36 Z" fill="none" stroke="#4F46E5" strokeWidth="1.7" />
        {[{ cx: 17, cy: 20 }, { cx: 39, cy: 20 }, { cx: 28, cy: 36 }].map((node, idx) => (
          <motion.circle
            key={`${node.cx}-${node.cy}`}
            cx={node.cx}
            cy={node.cy}
            r="3.2"
            fill={idx === 2 ? "#4338CA" : "#6366F1"}
            animate={animateSvg ? { scale: [1, 1.2, 1] } : undefined}
            transition={{ duration: 2.1, repeat: Infinity, ease: "easeInOut", delay: idx * 0.16 }}
          />
        ))}
      </svg>
    );
  }

  if (variant === "intel") {
    return (
      <svg viewBox="0 0 56 56" className="h-10 w-10" aria-hidden="true">
        <rect x="4" y="6" width="48" height="44" rx="10" fill="#EFF6FF" />
        {[0, 1, 2, 3].map((idx) => (
          <motion.rect
            key={idx}
            x={13 + idx * 8}
            y={31 - idx * 3}
            width="5"
            height={9 + idx * 3}
            rx="2"
            fill={idx >= 2 ? "#4F46E5" : "#A5B4FC"}
            animate={animateSvg ? { y: [31 - idx * 3, 29 - idx * 3, 31 - idx * 3] } : undefined}
            transition={{ duration: 2.2 + idx * 0.1, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
        <motion.path
          d="M12 37 C20 33, 28 31, 42 22"
          fill="none"
          stroke="#4338CA"
          strokeWidth="1.6"
          strokeLinecap="round"
          initial={{ pathLength: 0.25, opacity: 0.45 }}
          animate={animateSvg ? { pathLength: [0.25, 1, 1], opacity: [0.45, 1, 0.75] } : { pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 56 56" className="h-10 w-10" aria-hidden="true">
      <rect x="4" y="6" width="48" height="44" rx="10" fill="#EEF2FF" />
      {[0, 1, 2].map((idx) => (
        <motion.rect
          key={idx}
          x={14 + idx * 10}
          y={31 - idx * 3}
          width="7"
          height={10 + idx * 4}
          rx="2.5"
          fill={idx === 2 ? "#4F46E5" : "#A5B4FC"}
          animate={animateSvg ? { y: [31 - idx * 3, 29 - idx * 3, 31 - idx * 3] } : undefined}
          transition={{ duration: 2.1 + idx * 0.12, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      <motion.path
        d="M13 35 L22 27 L30 30 L41 19"
        fill="none"
        stroke="#4338CA"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0.2, opacity: 0.45 }}
        animate={animateSvg ? { pathLength: [0.2, 1, 1], opacity: [0.45, 1, 0.8] } : { pathLength: 1, opacity: 1 }}
        transition={{ duration: 2.3, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

function ClientQueryCard({ item, liteMotion = false, index = 0 }) {
  return (
    <motion.div
      className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.32, ease: "easeOut" }}
      whileHover={{ y: -1.5, borderColor: "rgba(79,70,229,0.35)", boxShadow: "0 14px 24px -18px rgba(15,23,42,0.45)" }}
    >
      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50/65">
          <QuerySvg type={item.icon} liteMotion={liteMotion} />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold leading-snug text-[#111827]">{item.q}</p>
          <p className="mt-1 text-sm leading-relaxed text-[#6B7280]">{item.a}</p>
        </div>
      </div>
    </motion.div>
  );
}

function SectionClientQueryGrid({ sectionKey, liteMotion = false, compact = false }) {
  const items = sectionClientQueries[sectionKey] ?? [];
  const visibleItems = compact ? items.slice(0, 3) : items;
  if (!visibleItems.length) return null;

  return (
    <motion.div variants={revealItem} className="relative z-[1] mt-4 space-y-3 md:mt-5">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6B7280]">Client Questions Answered</p>
      <div className="grid gap-3 md:grid-cols-2">
        {visibleItems.map((item, index) => (
          <ClientQueryCard key={`${sectionKey}-${item.q}`} item={item} liteMotion={liteMotion} index={index} />
        ))}
      </div>
    </motion.div>
  );
}

const sketchThemes = {
  cover: { boardTitle: "Growth Plan", accent: "#6366F1" },
  hero: { boardTitle: "Brand Lift", accent: "#4F46E5" },
  problem: { boardTitle: "Pain Map", accent: "#EF4444" },
  cost: { boardTitle: "Fixed Fee", accent: "#10B981" },
  core: { boardTitle: "Ops Stack", accent: "#2563EB" },
  features: { boardTitle: "Product Flow", accent: "#7C3AED" },
  proof: { boardTitle: "Results", accent: "#0EA5E9" },
  comparison: { boardTitle: "Platform vs Exly", accent: "#9333EA" },
  ownership: { boardTitle: "Ownership", accent: "#0F766E" },
  process: { boardTitle: "Execution", accent: "#4F46E5" },
  cta: { boardTitle: "Action Now", accent: "#F97316" },
};

function SketchScene({ sectionKey, liteMotion = false }) {
  const reducedMotion = useReducedMotion();
  const shouldAnimate = !reducedMotion && !liteMotion;
  const theme = sketchThemes[sectionKey] ?? sketchThemes.hero;
  const sectionLines = {
    cover: ["Market map", "Offer stack", "Growth loops"],
    hero: ["Brand story", "Acquisition", "Retention"],
    problem: ["Tool chaos", "Data gaps", "High leakage"],
    cost: ["Fixed fee", "No % cut", "Higher margin"],
    core: ["Ads ops", "Funnels", "CRM + automation"],
    features: ["Checkout", "Community", "Analytics"],
    proof: ["ROAS up", "CAC down", "NPS strong"],
    comparison: ["Platform", "Exly", "Incentives"],
    ownership: ["Own brand", "Own data", "Own logic"],
    process: ["Discover", "Setup", "Launch"],
    cta: ["Book call", "Go live", "Scale smart"],
  }[sectionKey] ?? ["Plan", "Execute", "Scale"];

  const renderSceneSpecific = () => {
    switch (sectionKey) {
      case "hero":
        return (
          <g>
            <rect x="246" y="58" width="80" height="48" rx="6" fill="#FFFFFF" stroke="#111827" strokeWidth="1.3" />
            <path d="M254 96 L268 82 L282 88 L296 72 L312 76" stroke={theme.accent} strokeWidth="1.8" fill="none" strokeLinecap="round" />
            <circle cx="314" cy="76" r="2.4" fill={theme.accent} />
            <path d="M260 115 C271 106, 286 105, 298 112" stroke="#111827" strokeWidth="1.4" fill="none" strokeLinecap="round" />
            <path d="M287 107 L306 96" stroke="#111827" strokeWidth="1.4" />
          </g>
        );
      case "problem":
        return (
          <g>
            <rect x="236" y="52" width="96" height="50" rx="6" fill="#FFFFFF" stroke="#111827" strokeWidth="1.2" />
            <path d="M248 66 H320" stroke="#111827" strokeOpacity="0.45" />
            <path d="M248 78 H312" stroke="#111827" strokeOpacity="0.45" />
            <path d="M248 90 H302" stroke="#111827" strokeOpacity="0.45" />
            <path d="M255 114 L273 132" stroke="#EF4444" strokeWidth="1.8" />
            <path d="M273 114 L255 132" stroke="#EF4444" strokeWidth="1.8" />
            <path d="M289 114 L307 132" stroke="#EF4444" strokeWidth="1.8" />
            <path d="M307 114 L289 132" stroke="#EF4444" strokeWidth="1.8" />
          </g>
        );
      case "cost":
        return (
          <g>
            <rect x="236" y="56" width="98" height="66" rx="6" fill="#FFFFFF" stroke="#111827" strokeWidth="1.3" />
            <text x="246" y="72" fontSize="7" fill="#111827" fontFamily="Inter, sans-serif">Invoice</text>
            <path d="M246 80 H324" stroke="#111827" strokeOpacity="0.35" />
            <text x="246" y="93" fontSize="7" fill="#111827" fontFamily="Inter, sans-serif">% Share</text>
            <path d="M286 88 L320 100" stroke="#EF4444" strokeWidth="1.8" />
            <path d="M320 88 L286 100" stroke="#EF4444" strokeWidth="1.8" />
            <rect x="246" y="106" width="74" height="12" rx="5" fill={theme.accent} fillOpacity="0.12" stroke={theme.accent} />
            <text x="283" y="114" textAnchor="middle" fontSize="7" fill={theme.accent} fontWeight="700" fontFamily="Inter, sans-serif">Fixed Fee</text>
          </g>
        );
      case "core":
        return (
          <g>
            <rect x="236" y="56" width="96" height="24" rx="6" fill="#FFFFFF" stroke="#111827" strokeWidth="1.2" />
            <rect x="236" y="88" width="96" height="24" rx="6" fill="#FFFFFF" stroke="#111827" strokeWidth="1.2" />
            <rect x="236" y="120" width="96" height="24" rx="6" fill="#FFFFFF" stroke="#111827" strokeWidth="1.2" />
            <text x="284" y="71" textAnchor="middle" fontSize="7" fill="#111827" fontFamily="Inter, sans-serif">Ads + Creative</text>
            <text x="284" y="103" textAnchor="middle" fontSize="7" fill="#111827" fontFamily="Inter, sans-serif">Funnels + Checkout</text>
            <text x="284" y="135" textAnchor="middle" fontSize="7" fill="#111827" fontFamily="Inter, sans-serif">CRM + Lifecycle</text>
          </g>
        );
      case "features":
        return (
          <g>
            <rect x="236" y="56" width="44" height="36" rx="5" fill="#FFFFFF" stroke="#111827" strokeWidth="1.2" />
            <rect x="288" y="56" width="44" height="36" rx="5" fill="#FFFFFF" stroke="#111827" strokeWidth="1.2" />
            <rect x="236" y="100" width="44" height="36" rx="5" fill="#FFFFFF" stroke="#111827" strokeWidth="1.2" />
            <rect x="288" y="100" width="44" height="36" rx="5" fill="#FFFFFF" stroke="#111827" strokeWidth="1.2" />
            <circle cx="258" cy="74" r="5" fill={theme.accent} fillOpacity="0.18" stroke={theme.accent} />
            <circle cx="310" cy="74" r="5" fill={theme.accent} fillOpacity="0.18" stroke={theme.accent} />
            <circle cx="258" cy="118" r="5" fill={theme.accent} fillOpacity="0.18" stroke={theme.accent} />
            <circle cx="310" cy="118" r="5" fill={theme.accent} fillOpacity="0.18" stroke={theme.accent} />
          </g>
        );
      case "proof":
        return (
          <g>
            <rect x="236" y="58" width="98" height="52" rx="6" fill="#FFFFFF" stroke="#111827" strokeWidth="1.2" />
            <path d="M246 99 L263 85 L279 91 L295 72 L322 77" stroke={theme.accent} strokeWidth="1.8" fill="none" strokeLinecap="round" />
            <circle cx="322" cy="77" r="2.2" fill={theme.accent} />
            <rect x="246" y="120" width="24" height="18" rx="4" fill="#FFFFFF" stroke="#111827" strokeWidth="1.1" />
            <rect x="276" y="120" width="24" height="18" rx="4" fill="#FFFFFF" stroke="#111827" strokeWidth="1.1" />
            <rect x="306" y="120" width="24" height="18" rx="4" fill="#FFFFFF" stroke="#111827" strokeWidth="1.1" />
          </g>
        );
      case "comparison":
        return (
          <g>
            <rect x="236" y="56" width="44" height="86" rx="6" fill="#FFFFFF" stroke="#111827" strokeWidth="1.2" />
            <rect x="288" y="56" width="44" height="86" rx="6" fill="#FFFFFF" stroke="#111827" strokeWidth="1.2" />
            <text x="258" y="69" textAnchor="middle" fontSize="7" fill="#6B7280" fontFamily="Inter, sans-serif">Platform</text>
            <text x="310" y="69" textAnchor="middle" fontSize="7" fill={theme.accent} fontWeight="700" fontFamily="Inter, sans-serif">Exly</text>
            <path d="M244 82 H272 M244 96 H268 M244 110 H266" stroke="#EF4444" strokeOpacity="0.65" />
            <path d="M296 82 H324 M296 96 H324 M296 110 H324" stroke={theme.accent} strokeOpacity="0.85" />
          </g>
        );
      case "ownership":
        return (
          <g>
            <rect x="236" y="60" width="58" height="76" rx="6" fill="#FFFFFF" stroke="#111827" strokeWidth="1.2" />
            <path d="M250 78 H280 M250 90 H276 M250 102 H282" stroke="#111827" strokeOpacity="0.45" />
            <rect x="302" y="76" width="30" height="42" rx="5" fill="#FFFFFF" stroke="#111827" strokeWidth="1.2" />
            <rect x="309" y="66" width="16" height="10" rx="4" fill="#FFFFFF" stroke="#111827" strokeWidth="1.2" />
            <circle cx="317" cy="96" r="3.5" fill={theme.accent} fillOpacity="0.2" stroke={theme.accent} />
          </g>
        );
      case "process":
        return (
          <g>
            <path d="M242 106 H328" stroke="#111827" strokeOpacity="0.45" />
            {[248, 272, 296, 320].map((x, idx) => (
              <g key={x}>
                <circle cx={x} cy="106" r="8" fill="#FFFFFF" stroke="#111827" strokeWidth="1.3" />
                <text x={x} y="109" textAnchor="middle" fontSize="7" fill={idx < 3 ? theme.accent : "#111827"} fontFamily="Inter, sans-serif">
                  {idx + 1}
                </text>
              </g>
            ))}
            <path d="M248 122 H320" stroke="#111827" strokeOpacity="0.3" />
          </g>
        );
      case "cta":
        return (
          <g>
            <rect x="236" y="66" width="96" height="42" rx="8" fill={theme.accent} fillOpacity="0.12" stroke={theme.accent} strokeWidth="1.2" />
            <text x="284" y="84" textAnchor="middle" fontSize="8" fill={theme.accent} fontWeight="700" fontFamily="Inter, sans-serif">Schedule Call</text>
            <path d="M255 94 H313" stroke={theme.accent} strokeOpacity="0.6" />
            <circle cx="248" cy="128" r="8" fill="#FFFFFF" stroke="#111827" strokeWidth="1.2" />
            <circle cx="320" cy="128" r="8" fill="#FFFFFF" stroke="#111827" strokeWidth="1.2" />
            <path d="M256 128 H312" stroke="#111827" strokeWidth="1.4" />
          </g>
        );
      case "cover":
      default:
        return (
          <g>
            <rect x="236" y="56" width="96" height="52" rx="6" fill="#FFFFFF" stroke="#111827" strokeWidth="1.2" />
            <path d="M246 98 C266 70, 292 70, 322 86" stroke={theme.accent} strokeWidth="1.8" fill="none" />
            <circle cx="246" cy="98" r="2.2" fill={theme.accent} />
            <circle cx="322" cy="86" r="2.2" fill={theme.accent} />
            <rect x="246" y="116" width="26" height="18" rx="4" fill="#FFFFFF" stroke="#111827" strokeWidth="1.1" />
            <rect x="276" y="116" width="26" height="18" rx="4" fill="#FFFFFF" stroke="#111827" strokeWidth="1.1" />
            <rect x="306" y="116" width="26" height="18" rx="4" fill="#FFFFFF" stroke="#111827" strokeWidth="1.1" />
          </g>
        );
    }
  };

  return (
    <motion.svg
      viewBox="0 0 360 210"
      className="h-full w-full"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <rect x="2" y="2" width="356" height="206" rx="14" fill="#FFFFFF" stroke="#D1D5DB" strokeWidth="1.2" />
      <path d="M22 34 H336" stroke="#111827" strokeOpacity="0.18" />
      <path d="M24 188 H336" stroke="#111827" strokeOpacity="0.18" />

      <motion.path
        d="M28 151 C86 132, 202 130, 326 146"
        stroke="#111827"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        pathLength={1}
        initial={{ pathLength: 0, opacity: 0.32 }}
        animate={{ pathLength: 1, opacity: 0.72 }}
        transition={{ duration: shouldAnimate ? 0.55 : 0, ease: "easeOut" }}
      />

      <rect x="42" y="54" width="86" height="66" rx="6" fill="#FFFFFF" stroke="#111827" strokeWidth="1.6" />
      <rect x="50" y="63" width="60" height="14" rx="4" fill={theme.accent} fillOpacity="0.14" stroke={theme.accent} strokeWidth="1.1" />
      <text x="80" y="73" textAnchor="middle" fontSize="8" fill={theme.accent} fontWeight="700" fontFamily="Inter, sans-serif">
        {theme.boardTitle}
      </text>
      <text x="54" y="92" fontSize="7" fill="#111827" fontFamily="Inter, sans-serif">{sectionLines[0]}</text>
      <text x="54" y="102" fontSize="7" fill="#111827" fontFamily="Inter, sans-serif">{sectionLines[1]}</text>
      <text x="54" y="112" fontSize="7" fill="#111827" fontFamily="Inter, sans-serif">{sectionLines[2]}</text>

      <g>
        <circle cx="158" cy="66" r="10" fill="#FFFFFF" stroke="#111827" strokeWidth="1.6" />
        <path d="M158 76 V104" stroke="#111827" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M145 88 H171" stroke="#111827" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M158 104 L148 122" stroke="#111827" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M158 104 L168 122" stroke="#111827" strokeWidth="1.6" strokeLinecap="round" />
      </g>

      <g>
        <ellipse cx="232" cy="144" rx="24" ry="10" fill="#E5E7EB" />
        <circle cx="232" cy="114" r="10" fill="#FFFFFF" stroke="#111827" strokeWidth="1.6" />
        <path d="M218 126 C224 122, 240 122, 246 126" stroke="#111827" strokeWidth="1.5" fill="none" />
        <path d="M218 126 V145 H246 V126" stroke="#111827" strokeWidth="1.5" fill="#FFFFFF" />
      </g>

      <g>
        <ellipse cx="292" cy="147" rx="22" ry="9" fill="#E5E7EB" />
        <circle cx="292" cy="118" r="9" fill="#FFFFFF" stroke="#111827" strokeWidth="1.5" />
        <path d="M280 128 V146 H304 V128" stroke="#111827" strokeWidth="1.4" fill="#FFFFFF" />
      </g>

      {renderSceneSpecific()}

      <motion.g
        animate={shouldAnimate ? { y: [0, -1.8, 0] } : undefined}
        transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M198 140 H322" stroke="#111827" strokeWidth="1.8" strokeLinecap="round" />
      </motion.g>

      <motion.g
        animate={shouldAnimate ? { x: [0, 1.5, 0], y: [0, -1, 0] } : undefined}
        transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M170 58 L136 72" stroke={theme.accent} strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="170" cy="58" r="2.6" fill={theme.accent} />
      </motion.g>
    </motion.svg>
  );
}

function SectionCaricature({ sectionKey, liteMotion = false }) {
  const reducedMotion = useReducedMotion();
  const note = caricatureNotes[sectionKey] ?? caricatureNotes.hero;
  const theme = sketchThemes[sectionKey] ?? sketchThemes.hero;
  const shouldAnimate = !reducedMotion && !liteMotion;

  return (
    <motion.div
      variants={revealItem}
      className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
    >
      <motion.div
        className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-indigo-100/80"
        animate={shouldAnimate ? { scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] } : undefined}
        transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute -left-10 -bottom-10 h-24 w-24 rounded-full bg-sky-100/70"
        animate={shouldAnimate ? { y: [0, -5, 0], x: [0, 4, 0] } : undefined}
        transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative grid items-center gap-4 md:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]">
        <motion.div
          className="h-44 rounded-xl border border-slate-200 bg-slate-50 p-1.5"
          animate={shouldAnimate ? { y: [0, -2, 0] } : undefined}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <SketchScene sectionKey={sectionKey} liteMotion={liteMotion} />
        </motion.div>

        <div>
          <span
            className="inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em]"
            style={{ backgroundColor: `${theme.accent}1A`, color: theme.accent }}
          >
            {note.badge}
          </span>
          <h4 className="mt-2 text-base font-semibold text-[#111827]">{note.title}</h4>
          <p className="mt-1 text-sm leading-relaxed text-[#6B7280]">{note.text}</p>
        </div>
      </div>
    </motion.div>
  );
}

function CartoonStickerStrip({ sectionKey, liteMotion = false }) {
  const reducedMotion = useReducedMotion();
  const stickers = sectionStickerLines[sectionKey] ?? sectionStickerLines.hero;
  const shouldAnimate = !reducedMotion && !liteMotion;

  return (
    <motion.div variants={revealItem} className="relative z-[3] grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
      {stickers.map((sticker, index) => (
        <motion.div
          key={`${sectionKey}-${sticker.label}`}
          className="relative min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm"
          animate={
            shouldAnimate
              ? {
                  y: [0, -3, 0],
                  rotate: [0, index % 2 ? 0.6 : -0.6, 0],
                }
              : undefined
          }
          transition={{
            duration: 2.6 + index * 0.35,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.12,
          }}
          whileHover={{ y: -2, scale: 1.01 }}
        >
          <motion.div
            className="pointer-events-none absolute -right-5 -top-5 h-10 w-10 rounded-full bg-indigo-100/70"
            animate={shouldAnimate ? { scale: [1, 1.16, 1], opacity: [0.6, 1, 0.6] } : undefined}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
          />
          <div className="relative flex min-w-0 items-center gap-2">
            <span className="text-indigo-600">
              <StickerIcon name={sticker.icon} className="h-4 w-4" />
            </span>
            <span className="truncate text-xs font-semibold uppercase tracking-[0.12em] text-[#4B5563]">{sticker.label}</span>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

function SectionLiveCartoonPack({ sectionKey, liteMotion = false, compact = false }) {
  return (
    <div className="space-y-3">
      <SectionCaricature sectionKey={sectionKey} liteMotion={liteMotion} />
      {!compact && <CartoonStickerStrip sectionKey={sectionKey} liteMotion={liteMotion} />}
    </div>
  );
}

function AmbientCartoons({ liteMotion = false, motionProfile = motionPresets.standard }) {
  const reducedMotion = useReducedMotion();
  const shouldAnimate = !reducedMotion && !liteMotion;
  const amp = motionProfile?.amp ?? 1;
  const speed = motionProfile?.speed ?? 1;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute left-[8%] top-[14%] hidden h-12 w-12 items-center justify-center rounded-2xl border border-indigo-200 bg-white/80 text-xl shadow-sm md:flex"
        animate={shouldAnimate ? { y: [0, -10 * amp, 0], x: [0, 4 * amp, 0], rotate: [0, -4 * amp, 0] } : undefined}
        transition={{ duration: 7.2 / speed, repeat: Infinity, ease: "easeInOut" }}
      >
        <StickerIcon name="rocket" className="h-5 w-5 text-indigo-600" />
      </motion.div>
      <motion.div
        className="absolute right-[10%] top-[22%] hidden h-11 w-11 items-center justify-center rounded-full border border-sky-200 bg-white/85 text-lg shadow-sm md:flex"
        animate={shouldAnimate ? { y: [0, 8 * amp, 0], x: [0, -5 * amp, 0], rotate: [0, 5 * amp, 0] } : undefined}
        transition={{ duration: 8.4 / speed, repeat: Infinity, ease: "easeInOut", delay: 0.5 / speed }}
      >
        <StickerIcon name="target" className="h-4 w-4 text-sky-600" />
      </motion.div>
      <motion.div
        className="absolute bottom-[10%] right-[24%] hidden h-10 w-10 items-center justify-center rounded-xl border border-indigo-200 bg-white/85 text-base shadow-sm md:flex"
        animate={shouldAnimate ? { y: [0, -7 * amp, 0], rotate: [0, 3 * amp, 0] } : undefined}
        transition={{ duration: 6.8 / speed, repeat: Infinity, ease: "easeInOut", delay: 1.1 / speed }}
      >
        <StickerIcon name="bar" className="h-4 w-4 text-indigo-600" />
      </motion.div>
      <motion.div
        className="absolute left-[18%] top-[38%] hidden h-11 w-11 items-center justify-center rounded-2xl border border-violet-200 bg-white/85 shadow-sm lg:flex"
        animate={shouldAnimate ? { y: [0, -8 * amp, 0], x: [0, 3 * amp, 0], rotate: [0, -3 * amp, 0] } : undefined}
        transition={{ duration: 7.6 / speed, repeat: Infinity, ease: "easeInOut", delay: 0.3 / speed }}
      >
        <StickerIcon name="gem" className="h-4 w-4 text-violet-600" />
      </motion.div>
      <motion.div
        className="absolute left-[14%] bottom-[16%] hidden h-11 w-11 items-center justify-center rounded-2xl border border-emerald-200 bg-white/85 shadow-sm lg:flex"
        animate={shouldAnimate ? { y: [0, 7 * amp, 0], x: [0, 4 * amp, 0], rotate: [0, 4 * amp, 0] } : undefined}
        transition={{ duration: 8 / speed, repeat: Infinity, ease: "easeInOut", delay: 1.4 / speed }}
      >
        <StickerIcon name="boxes" className="h-4 w-4 text-emerald-600" />
      </motion.div>
      <motion.div
        className="absolute right-[16%] top-[42%] hidden h-11 w-11 items-center justify-center rounded-2xl border border-sky-200 bg-white/85 shadow-sm lg:flex"
        animate={shouldAnimate ? { y: [0, -9 * amp, 0], x: [0, -4 * amp, 0], rotate: [0, 4 * amp, 0] } : undefined}
        transition={{ duration: 7.4 / speed, repeat: Infinity, ease: "easeInOut", delay: 0.9 / speed }}
      >
        <StickerIcon name="shield" className="h-4 w-4 text-sky-600" />
      </motion.div>
      <motion.div
        className="absolute right-[7%] bottom-[24%] hidden h-12 w-12 items-center justify-center rounded-2xl border border-orange-200 bg-white/85 shadow-sm lg:flex"
        animate={shouldAnimate ? { y: [0, 8 * amp, 0], x: [0, -3 * amp, 0], rotate: [0, -4 * amp, 0] } : undefined}
        transition={{ duration: 8.6 / speed, repeat: Infinity, ease: "easeInOut", delay: 1.9 / speed }}
      >
        <StickerIcon name="flame" className="h-5 w-5 text-orange-600" />
      </motion.div>
      <motion.div
        className="absolute left-1/2 top-[9%] hidden h-10 w-10 -translate-x-1/2 items-center justify-center rounded-xl border border-indigo-200 bg-white/85 shadow-sm xl:flex"
        animate={shouldAnimate ? { y: [0, -6 * amp, 0], rotate: [0, 5 * amp, 0] } : undefined}
        transition={{ duration: 6.9 / speed, repeat: Infinity, ease: "easeInOut", delay: 0.6 / speed }}
      >
        <StickerIcon name="compass" className="h-4 w-4 text-indigo-600" />
      </motion.div>
    </div>
  );
}

function OdometerNumber({ value, className = "" }) {
  const formatted = String(value).padStart(2, "0");
  return (
    <span className={`relative inline-flex h-4 w-6 items-center justify-center overflow-hidden ${className}`}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={formatted}
          className="absolute inset-0 flex items-center justify-center"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
        >
          {formatted}
        </motion.span>
      </AnimatePresence>
      <motion.span
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2 bg-gradient-to-t from-white/70 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.45 }}
        transition={{ duration: 0.2 }}
      />
    </span>
  );
}

function AnimatedDivider({ fast = false }) {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-12% 0px -12% 0px", once: true });
  return (
    <motion.div
      ref={ref}
      className="relative h-px w-full overflow-hidden bg-gradient-to-r from-transparent via-slate-300 to-transparent"
      initial={{ opacity: 0, scaleX: 0.6 }}
      animate={inView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0.6 }}
      transition={{ duration: fast ? 0.22 : 0.34, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.span
        className="absolute inset-y-0 -left-10 w-8 bg-indigo-400/60 blur-[1px]"
        initial={{ x: "-100%" }}
        animate={inView ? { x: "220%" } : { x: "-100%" }}
        transition={{ duration: fast ? 0.42 : 0.56, ease: "easeOut" }}
      />
    </motion.div>
  );
}

function InkRevealTitle({ children, style, className = "", fast = false, variants }) {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-14% 0px -14% 0px", once: true });
  return (
    <motion.div ref={ref} variants={variants} className="space-y-2">
      <motion.h2 style={style} className={className}>
        {children}
      </motion.h2>
      <motion.div
        className="relative h-[5px] w-28 overflow-hidden rounded-full bg-indigo-100/70"
        initial={{ opacity: 0, scaleX: 0.72 }}
        animate={inView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0.72 }}
        transition={{ duration: fast ? 0.22 : 0.34, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="absolute inset-y-0 left-0 w-12 rounded-full bg-indigo-400/70 blur-[1px]"
          initial={{ x: "-130%" }}
          animate={inView ? { x: "240%" } : { x: "-130%" }}
          transition={{ duration: fast ? 0.44 : 0.62, ease: "easeOut", delay: fast ? 0.03 : 0.06 }}
        />
      </motion.div>
    </motion.div>
  );
}

function HaloChipRow({ compact = false, liteMotion = false }) {
  return (
    <div className={`flex flex-wrap gap-2 ${compact ? "" : "mt-1"}`}>
      {statusChips.map((chip, index) => (
        <motion.span
          key={chip.label}
          className={`relative inline-flex items-center overflow-hidden rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${chipToneMap[chip.tone]}`}
          animate={
            liteMotion
              ? undefined
              : {
                  boxShadow: [
                    "0 0 0 0 rgba(79,70,229,0.0)",
                    "0 0 0 5px rgba(79,70,229,0.09)",
                    "0 0 0 0 rgba(79,70,229,0.0)",
                  ],
                }
          }
          transition={{ duration: 6 + index * 0.4, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
        >
          <motion.span
            className="pointer-events-none absolute -left-10 top-0 h-full w-8 bg-white/55 blur-[2px]"
            animate={liteMotion ? undefined : { x: ["0%", "520%"] }}
            transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 2.4 + index * 0.25, ease: "easeInOut" }}
          />
          <span className="relative z-10">{chip.label}</span>
        </motion.span>
      ))}
    </div>
  );
}

function SectionLearnMoreBrace() {
  const reducedMotion = useReducedMotion();
  const bracePath = `M24 24
    C86 24, 86 210, 58 338
    C46 392, 46 438, 58 492
    C86 620, 86 806, 24 806`;
  const travelCx = [28, 44, 58, 50, 46, 50, 58, 70, 78, 68, 54, 38, 28, 36, 52, 68, 74, 60, 42, 30, 28];
  const travelCy = [34, 130, 240, 338, 392, 430, 492, 596, 700, 778, 806, 806, 806, 770, 700, 596, 492, 430, 338, 180, 34];
  const travelDots = [
    { r: 5, opacity: 1, delay: 0 },
    { r: 4.2, opacity: 0.72, delay: -2.2 },
    { r: 3.5, opacity: 0.5, delay: -4.4 },
  ];

  return (
    <motion.div
      className="pointer-events-none absolute left-[324px] top-[126px] z-20 hidden md:block"
      animate={reducedMotion ? undefined : { y: [0, -0.8, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg viewBox="0 0 200 840" className="h-[724px] w-[166px] overflow-visible">
        <defs>
          <linearGradient id="brace-accent-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6366F1" />
            <stop offset="55%" stopColor="#4F46E5" />
            <stop offset="100%" stopColor="#4338CA" />
          </linearGradient>
        </defs>
        <motion.path
          d={bracePath}
          fill="none"
          stroke="#C7D2FECC"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0.45 }}
          animate={{ pathLength: 1, opacity: 0.82 }}
          transition={{ duration: 1.05, ease: "easeOut" }}
        />
        <motion.path
          d={bracePath}
          fill="none"
          stroke="url(#brace-accent-gradient)"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="34 286"
          animate={reducedMotion ? undefined : { strokeDashoffset: [0, -320] }}
          transition={{ duration: 8.5, repeat: Infinity, ease: "linear" }}
        />
        {travelDots.map((dot, index) => (
          <motion.circle
            key={`brace-dot-${index}`}
            r={dot.r}
            fill="#4F46E5"
            stroke="#FFFFFF"
            strokeWidth={index === 0 ? 1.6 : 1.1}
            animate={
              reducedMotion
                ? { cx: 58, cy: 430 }
                : {
                    cx: travelCx,
                    cy: travelCy,
                    opacity: [dot.opacity * 0.7, dot.opacity, dot.opacity * 0.7],
                  }
            }
            transition={{ duration: 7.6, repeat: Infinity, ease: "easeInOut", delay: dot.delay }}
          />
        ))}
        {travelDots.slice(0, 2).map((dot, index) => (
          <motion.circle
            key={`brace-dot-ring-${index}`}
            r={dot.r + 3}
            fill="none"
            stroke="#6366F1"
            strokeWidth="1.2"
            animate={
              reducedMotion
                ? undefined
                : {
                    cx: travelCx,
                    cy: travelCy,
                    scale: [1, 1.22, 1],
                    opacity: [0.24, 0, 0.24],
                  }
            }
            transition={{ duration: 7.6, repeat: Infinity, ease: "easeInOut", delay: dot.delay }}
          />
        ))}

        <motion.path
          d="M66 358 C92 356, 106 352, 120 346"
          fill="none"
          stroke="#6366F1"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0.35 }}
          animate={{ pathLength: 1, opacity: 0.85 }}
          transition={{ delay: 0.42, duration: 0.5, ease: "easeOut" }}
        />

        <motion.g initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.48, duration: 0.32 }}>
          <rect x="120" y="322" width="76" height="42" rx="12" fill="#EEF2FF" stroke="#C7D2FE" />
          <text x="128" y="339" fill="#4338CA" fontSize="9.5" fontWeight="700" fontFamily="Inter, sans-serif">
            Open to
          </text>
          <text x="128" y="353" fill="#4338CA" fontSize="9.5" fontWeight="700" fontFamily="Inter, sans-serif">
            learn more
          </text>
        </motion.g>
      </svg>
    </motion.div>
  );
}

function MobileClickMeLabel() {
  const reducedMotion = useReducedMotion();
  return (
    <motion.svg viewBox="0 0 122 28" className="h-6 w-[112px]" aria-hidden="true">
      <motion.rect
        x="1"
        y="2"
        width="120"
        height="24"
        rx="12"
        fill="#EEF2FF"
        stroke="#C7D2FE"
        animate={reducedMotion ? undefined : { scale: [1, 1.01, 1] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "61px 14px" }}
      />
      <motion.path
        d="M24 14 H12"
        stroke="#4F46E5"
        strokeWidth="1.8"
        strokeLinecap="round"
        animate={reducedMotion ? undefined : { x: [0, -1.8, 0] }}
        transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.path
        d="M16 10 L12 14 L16 18"
        fill="none"
        stroke="#4F46E5"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={reducedMotion ? undefined : { x: [0, -1.8, 0] }}
        transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.text
        x="32"
        y="18"
        fill="#4338CA"
        fontSize="10.2"
        fontWeight="700"
        fontFamily="Inter, sans-serif"
        letterSpacing="0.03em"
        animate={reducedMotion ? undefined : { opacity: [0.72, 1, 0.72] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      >
        Click me
      </motion.text>
    </motion.svg>
  );
}

function KineticCostChart({ liteMotion = false, motionProfile = motionPresets.standard }) {
  const reducedMotion = useReducedMotion();
  const animateChart = !liteMotion && !reducedMotion;
  const speed = motionProfile?.speed ?? 1;
  const barData = [
    { label: "Traditional", value: 2.8, color: "from-rose-300 to-rose-500" },
    { label: "Exly Fixed", value: 0.87, color: "from-indigo-300 to-indigo-500" },
  ];
  const trendSeries = [
    { label: "Traditional Fees", color: "#F43F5E", values: [2.1, 2.24, 2.38, 2.56, 2.68, 2.8] },
    { label: "Exly Fixed", color: "#4F46E5", values: [0.87, 0.87, 0.87, 0.87, 0.87, 0.87] },
    { label: "Savings Gap", color: "#10B981", values: [1.23, 1.37, 1.51, 1.69, 1.81, 1.93] },
  ];
  const allValues = trendSeries.flatMap((line) => line.values);
  const maxValue = Math.max(...allValues);
  const minValue = Math.min(...allValues);
  const valueRange = Math.max(maxValue - minValue, 0.01);
  const xForIndex = (index) => 8 + index * 16.8;
  const yForValue = (value) => 62 - ((value - minValue) / valueRange) * 44;
  const pathForSeries = (values) =>
    values.map((value, index) => `${index === 0 ? "M" : "L"} ${xForIndex(index)} ${yForValue(value)}`).join(" ");
  const maxBar = Math.max(...barData.map((d) => d.value));

  return (
    <motion.div variants={revealItem} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#6B7280]">Monthly Ops Cost Snapshot</p>
        <p className="text-xs text-[#6B7280]">(₹ Lakhs, excl. ad spend)</p>
      </div>
      <div className="mb-5 rounded-xl border border-slate-200 bg-slate-50/80 p-3">
        <svg viewBox="0 0 100 68" className="h-32 w-full sm:h-36">
          {[18, 30, 42, 54, 62].map((y) => (
            <path key={`grid-${y}`} d={`M 6 ${y} H 96`} stroke="#E2E8F0" strokeWidth="0.8" />
          ))}
          {trendSeries.map((line, lineIndex) => {
            const path = pathForSeries(line.values);
            return (
              <g key={line.label}>
                <motion.path
                  d={path}
                  fill="none"
                  stroke={line.color}
                  strokeWidth={lineIndex === 1 ? 2.4 : 2.1}
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0.55 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: (0.72 + lineIndex * 0.08) / speed, ease: "easeOut", delay: lineIndex * 0.06 }}
                />
                <motion.path
                  d={path}
                  fill="none"
                  stroke={line.color}
                  strokeWidth={lineIndex === 1 ? 4.8 : 4.2}
                  strokeLinecap="round"
                  strokeOpacity={0.18}
                  strokeDasharray="10 130"
                  animate={animateChart ? { strokeDashoffset: [0, -140] } : undefined}
                  transition={{ duration: 4.4 / speed, repeat: Infinity, ease: "linear", delay: lineIndex * 0.22 }}
                />
                <motion.circle
                  cx={xForIndex(line.values.length - 1)}
                  cy={yForValue(line.values[line.values.length - 1])}
                  r="2.7"
                  fill={line.color}
                  animate={animateChart ? { scale: [1, 1.24, 1], opacity: [0.6, 1, 0.6] } : undefined}
                  transition={{ duration: 2.4 / speed, repeat: Infinity, ease: "easeInOut", delay: lineIndex * 0.14 }}
                />
              </g>
            );
          })}
        </svg>
        <div className="mt-2 flex flex-wrap gap-3">
          {trendSeries.map((line) => (
            <div key={line.label} className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#4B5563]">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: line.color }} />
              {line.label}
            </div>
          ))}
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        {barData.map((item, index) => {
          const height = Math.max((item.value / maxBar) * 134, 32);
          return (
            <div key={item.label} className="space-y-2">
              <div className="relative h-36 rounded-xl bg-slate-50 p-2 sm:h-40">
                <motion.div
                  className={`absolute inset-x-3 bottom-2 rounded-lg bg-gradient-to-t ${item.color}`}
                  initial={{ height: 12, opacity: 0.55 }}
                  animate={{ height, opacity: 1 }}
                  transition={{
                    duration: (0.5 + index * 0.08) / speed,
                    ease: [0.22, 1, 0.36, 1],
                    delay: index * 0.03,
                  }}
                />
                <motion.div
                  className="absolute inset-x-3 bottom-2 h-6 rounded-lg bg-white/25 blur-sm"
                  animate={animateChart ? { y: [0, -3, 0], opacity: [0.35, 0.55, 0.35] } : undefined}
                  transition={{ duration: 2.8 / speed, repeat: Infinity, ease: "easeInOut", delay: index * 0.15 }}
                />
              </div>
              <p className="text-sm font-semibold text-[#111827]">{item.label}</p>
              <p className="text-xs font-medium text-[#4B5563]">₹{item.value.toFixed(2)}L / month</p>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

function KineticProofChart({ liteMotion = false, motionProfile = motionPresets.standard }) {
  const reducedMotion = useReducedMotion();
  const animateChart = !liteMotion && !reducedMotion;
  const speed = motionProfile?.speed ?? 1;
  const proofLines = [
    { label: "ROAS Lift", color: "#4F46E5", values: [24, 31, 39, 46, 54, 62] },
    { label: "Retention Lift", color: "#0EA5E9", values: [18, 24, 28, 34, 38, 42] },
    { label: "CAC Reduction", color: "#10B981", values: [12, 18, 22, 27, 30, 31] },
  ];
  const xForIndex = (index) => 8 + index * 16.8;
  const yForValue = (value) => 66 - (value / 70) * 48;
  const pathForSeries = (values) =>
    values.map((value, index) => `${index === 0 ? "M" : "L"} ${xForIndex(index)} ${yForValue(value)}`).join(" ");

  return (
    <motion.div variants={revealItem} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#6B7280]">Performance Trend</p>
      <svg viewBox="0 0 100 74" className="h-32 w-full sm:h-36">
        {[16, 28, 40, 52, 64].map((y) => (
          <path key={`grid-${y}`} d={`M 6 ${y} H 96`} stroke="#E2E8F0" strokeWidth="0.8" />
        ))}
        {proofLines.map((line, lineIndex) => {
          const path = pathForSeries(line.values);
          return (
            <g key={line.label}>
              <motion.path
                d={path}
                fill="none"
                stroke={line.color}
                strokeWidth="2.2"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0.55 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: (0.72 + lineIndex * 0.08) / speed, ease: "easeOut", delay: lineIndex * 0.07 }}
              />
              <motion.path
                d={path}
                fill="none"
                stroke={line.color}
                strokeWidth="4.6"
                strokeLinecap="round"
                strokeOpacity={0.2}
                strokeDasharray="12 150"
                animate={animateChart ? { strokeDashoffset: [0, -170] } : undefined}
                transition={{ duration: (4.6 + lineIndex * 0.4) / speed, repeat: Infinity, ease: "linear" }}
              />
              <motion.circle
                cx={xForIndex(line.values.length - 1)}
                cy={yForValue(line.values[line.values.length - 1])}
                r="2.6"
                fill={line.color}
                animate={animateChart ? { scale: [1, 1.24, 1], opacity: [0.6, 1, 0.6] } : undefined}
                transition={{ duration: 2.5 / speed, repeat: Infinity, ease: "easeInOut", delay: lineIndex * 0.14 }}
              />
            </g>
          );
        })}
        <path d="M 6 66 H 96" stroke="#CBD5E1" strokeWidth="1.1" />
      </svg>
      <div className="mt-2 flex flex-wrap gap-3">
        {proofLines.map((line) => (
          <div key={line.label} className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#4B5563]">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: line.color }} />
            {line.label}
          </div>
        ))}
      </div>
      <p className="mt-2 text-xs text-[#6B7280]">Compounding uplift across ROAS, retention, and CAC efficiency over execution cycles.</p>
      <svg viewBox="0 0 100 18" className="mt-2 h-6 w-full">
        {[0, 1, 2].map((index) => (
          <motion.path
            key={`mini-wave-${index}`}
            d={`M 2 ${10 + index * 2} C 16 ${4 + index * 2}, 32 ${16 - index * 2}, 48 ${10 + index * 2} C 64 ${4 + index * 2}, 80 ${16 - index * 2}, 98 ${10 + index * 2}`}
            fill="none"
            stroke={index === 0 ? "#4F46E5" : index === 1 ? "#0EA5E9" : "#10B981"}
            strokeOpacity={0.28 + index * 0.08}
            strokeWidth="1.1"
            strokeDasharray="2 3"
            animate={animateChart ? { strokeDashoffset: [0, -30] } : undefined}
            transition={{ duration: (3.2 + index * 0.5) / speed, repeat: Infinity, ease: "linear" }}
          />
        ))}
      </svg>
    </motion.div>
  );
}

function useMotionAudio(enabled) {
  const contextRef = useRef(null);

  const play = useCallback(
    (type = "select") => {
      if (!enabled || typeof window === "undefined") return;
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;

      try {
        if (!contextRef.current) contextRef.current = new Ctx();
        const ctx = contextRef.current;
        if (ctx.state === "suspended") ctx.resume();

        const scheduleTone = (startOffset, frequency, kind = "sine", peak = 0.012, hold = 0.075) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const filter = ctx.createBiquadFilter();
          const start = ctx.currentTime + startOffset;

          filter.type = "lowpass";
          filter.frequency.value = frequency * 3.2;
          osc.type = kind;
          osc.frequency.value = frequency;
          gain.gain.value = 0.0001;

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(ctx.destination);

          gain.gain.exponentialRampToValueAtTime(peak, start + 0.01);
          gain.gain.exponentialRampToValueAtTime(0.0001, start + hold);
          osc.start(start);
          osc.stop(start + hold + 0.02);
        };

        if (type === "close") {
          scheduleTone(0, 270, "triangle", 0.011, 0.08);
          scheduleTone(0.032, 220, "sine", 0.008, 0.075);
          return;
        }

        scheduleTone(0, 340, "triangle", 0.011, 0.075);
        scheduleTone(0.03, 410, "sine", 0.009, 0.07);
      } catch {
        // Audio is optional; ignore platform restrictions.
      }
    },
    [enabled],
  );

  return play;
}

function NotebookNavItem({
  section,
  active,
  subdued,
  onSelect,
  index,
  playIntro,
  motionProfile = motionPresets.standard,
  compact = false,
}) {
  const reducedMotion = useReducedMotion();
  const amp = motionProfile?.amp ?? 1;
  const speed = motionProfile?.speed ?? 1;
  const txRaw = useMotionValue(0);
  const tyRaw = useMotionValue(0);
  const scaleRaw = useMotionValue(1);
  const tx = useSpring(txRaw, { stiffness: 250 * speed, damping: 30, mass: 0.75 });
  const ty = useSpring(tyRaw, { stiffness: 250 * speed, damping: 30, mass: 0.75 });
  const scale = useSpring(scaleRaw, { stiffness: 250 * speed, damping: 26, mass: 0.7 });
  const rotateY = useTransform(tx, [-6, 6], [-3.5, 3.5]);
  const rotateX = useTransform(ty, [-6, 6], [2.2, -2.2]);
  const shadowX = useTransform(rotateY, [-3.5, 3.5], [-7, 7]);
  const shadowY = useTransform(rotateX, [-2.2, 2.2], [13, 19]);
  const dynamicShadow = useMotionTemplate`${shadowX}px ${shadowY}px 28px -18px rgba(15,23,42,0.32)`;
  const [ripples, setRipples] = useState([]);

  const handleMove = (event) => {
    if (reducedMotion || compact) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    txRaw.set(Math.max(Math.min(px * 12 * amp, 6), -6));
    tyRaw.set(Math.max(Math.min(py * 12 * amp, 6), -6));
    scaleRaw.set(1 + 0.02 * amp);
  };

  const resetTransform = () => {
    txRaw.set(0);
    tyRaw.set(0);
    scaleRaw.set(1);
  };

  const handleClick = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const clickX = Number.isFinite(event.clientX) ? event.clientX : rect.left + rect.width / 2;
    const clickY = Number.isFinite(event.clientY) ? event.clientY : rect.top + rect.height / 2;
    const id = Date.now() + Math.random();
    const ripple = {
      id,
      x: clickX - rect.left,
      y: clickY - rect.top,
    };
    setRipples((prev) => [...prev, ripple]);
    window.setTimeout(() => {
      setRipples((prev) => prev.filter((item) => item.id !== id));
    }, 320);
    onSelect(section.id);
  };

  return (
    <motion.button
      onClick={handleClick}
      onMouseMove={compact ? undefined : handleMove}
      onMouseEnter={compact ? undefined : () => scaleRaw.set(1.02)}
      onMouseLeave={compact ? undefined : resetTransform}
      className={`group relative w-full overflow-hidden rounded-xl border px-3.5 py-2.5 text-left backdrop-blur-sm transition-all md:rounded-2xl md:px-4 md:py-3 ${
        active
          ? "border-indigo-200 bg-indigo-50/85 shadow-[0_16px_30px_-22px_rgba(79,70,229,0.45)]"
          : "border-slate-200/80 bg-white/85 shadow-sm"
      } ${
        subdued ? "opacity-55" : "opacity-100"
      }`}
      style={{
        x: compact ? 0 : tx,
        y: compact ? 0 : ty,
        scale: compact ? 1 : scale,
        rotateX: compact ? 0 : rotateX,
        rotateY: compact ? 0 : rotateY,
        boxShadow: compact ? undefined : dynamicShadow,
        transformPerspective: 920,
      }}
      initial={playIntro ? { opacity: 0, y: 10 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={
        playIntro
          ? { delay: index * (0.06 / speed), duration: 0.34 / speed, ease: [0.22, 1, 0.36, 1] }
          : { duration: compact ? 0.16 : 0.2 }
      }
      whileTap={{ scale: 0.99 }}
    >
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          className="pointer-events-none absolute rounded-full bg-indigo-400/20"
          style={{ left: ripple.x, top: ripple.y, width: 6, height: 6 }}
          initial={{ scale: 0, opacity: 0.28, x: "-50%", y: "-50%" }}
          animate={{ scale: 16, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      ))}

      <div
        className={`absolute left-0 bottom-2.5 top-2.5 w-[3px] rounded-full bg-[#4F46E5] transition-all md:bottom-3 md:top-3 ${
          active ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
        }`}
      />
      <div className="flex items-center gap-3 pl-2">
        <span className={`w-7 text-right text-[10px] font-medium md:w-6 ${active ? "text-[#4338CA]" : "text-[#6B7280]"}`}>
          {active ? <OdometerNumber value={section.id} /> : String(section.id).padStart(2, "0")}
        </span>
        <span className="relative flex h-3 w-3 items-center justify-center">
          <motion.span
            className="absolute inset-0 rounded-full border border-[#4F46E5]/55"
            animate={active ? { opacity: [0.4, 0.8, 0.4], scale: [0.75, 1.05, 0.75] } : { opacity: 0, scale: 0.6 }}
            transition={active ? { duration: 4, repeat: Infinity, ease: "easeInOut" } : { duration: 0.2 }}
          />
          <motion.span
            className={`h-2 w-2 rounded-full ${active ? "bg-[#4F46E5]" : "bg-slate-300"}`}
            animate={active ? { scale: [1, 1.12, 1] } : { scale: 1 }}
            transition={active ? { duration: 4, repeat: Infinity, ease: "easeInOut" } : { duration: 0.2 }}
          />
          <motion.span
            className="absolute inset-[-3px] rounded-full border border-[#4F46E5]/25"
            animate={active ? { opacity: [0, 0.4, 0], scale: [0.9, 1.45, 1.7] } : { opacity: 0, scale: 0.8 }}
            transition={active ? { duration: 4, repeat: Infinity, ease: "easeOut" } : { duration: 0.2 }}
          />
        </span>
        <div className="min-w-0">
          <p className={`truncate text-sm font-semibold leading-tight ${active ? "text-[#312E81]" : "text-[#111827]"}`}>{section.title}</p>
          <p className={`truncate text-[11px] md:text-xs ${active ? "text-[#4F46E5]" : "text-[#6B7280]"}`}>{section.description}</p>
        </div>
      </div>
    </motion.button>
  );
}

function SectionList({
  activeId,
  onSelect,
  faded = false,
  playIntro = false,
  motionProfile = motionPresets.standard,
  compact = false,
}) {
  const containerRef = useRef(null);
  const itemRefs = useRef({});

  useEffect(() => {
    if (!activeId) return;
    const target = itemRefs.current[activeId];
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [activeId]);

  return (
    <div
      ref={containerRef}
      className={`h-full overflow-y-auto overscroll-y-contain transition-opacity duration-300 [scrollbar-width:thin] [scrollbar-color:rgba(79,70,229,0.35)_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-indigo-300/70 [&::-webkit-scrollbar-track]:bg-transparent ${
        compact ? "space-y-2 pr-0 pb-4" : "space-y-2 pr-1.5"
      } ${faded ? "opacity-70" : "opacity-100"}`}
    >
      {sections.map((section, index) => {
        const active = activeId === section.id;
        const subdued = activeId && !active;
        return (
          <div key={section.id} ref={(node) => (itemRefs.current[section.id] = node)}>
            <NotebookNavItem
              section={section}
              active={active}
              subdued={subdued}
              onSelect={onSelect}
              index={index}
              playIntro={playIntro}
              motionProfile={motionProfile}
              compact={compact}
            />
          </div>
        );
      })}
    </div>
  );
}

function DefaultCover({ liteMotion = false, compact = false }) {
  return (
    <motion.div
      key="cover"
      variants={revealParent}
      initial="hidden"
      animate="show"
      exit="hidden"
      className="mx-auto w-full max-w-[1200px] p-5 sm:p-6 md:p-10 lg:px-12"
    >
      <motion.p variants={revealItem} className="text-xs font-semibold uppercase tracking-[0.2em] text-[#4F46E5]">
        Exly Overview
      </motion.p>
      <div className="relative">
        <motion.div
          variants={revealItem}
          animate={liteMotion ? undefined : { y: [0, -4, 0] }}
          transition={liteMotion ? undefined : { duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none relative ml-auto mb-2 w-fit rounded-full bg-gradient-to-r from-[#4F46E5] to-[#4338CA] px-4 py-2 text-center text-[10px] font-bold leading-tight text-white shadow-[0_10px_18px_-10px_rgba(79,70,229,0.65)] sm:absolute sm:-right-3 sm:-top-6 sm:mb-0 sm:text-[11px]"
        >
          <span className="block">0% REVENUE SHARE</span>
          <span className="block">YOU KEEP 100%</span>
        </motion.div>
        <motion.h1 variants={revealItem} className="mt-3 text-[1.9rem] font-bold leading-tight text-[#111827] sm:text-4xl md:mt-4 md:text-5xl">
          {proposalTitle}
        </motion.h1>
      </div>
      <motion.p variants={revealItem} className="mt-2 text-base font-medium text-[#111827] sm:text-lg">
        Zero Revenue Share. One Fixed Fee.
      </motion.p>
      <motion.div variants={revealItem} className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <motion.div
          className="relative overflow-hidden rounded-2xl border border-rose-200/70 bg-gradient-to-br from-white via-white to-rose-50/60 p-4 shadow-[0_16px_32px_-22px_rgba(239,68,68,0.38)]"
          whileHover={{ y: -2, scale: 1.005, boxShadow: "0 18px 34px -20px rgba(239,68,68,0.42)" }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-rose-400/80 via-rose-300/35 to-transparent" />
          <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-rose-200/35 blur-2xl" />
          <div className="relative flex items-start justify-between gap-3">
            <p className="text-sm font-semibold text-[#111827]">Traditional Agencies</p>
            <span className="rounded-full border border-rose-200 bg-rose-50 px-2.5 py-0.5 text-[10px] font-semibold text-rose-700">
              <motion.span
                className="inline-block"
                animate={liteMotion ? undefined : { opacity: [0.75, 1, 0.75], y: [0, -0.5, 0] }}
                transition={liteMotion ? undefined : { duration: 2.1, repeat: Infinity, ease: "easeInOut" }}
              >
                High-Cost Model
              </motion.span>
            </span>
          </div>
          <ul className="relative mt-3 space-y-2 text-sm text-[#4B5563]">
            <li className="flex items-center gap-2.5 rounded-xl border border-rose-100 bg-white/85 px-2.5 py-2 backdrop-blur-sm">
              <AnimatedCrossIcon className="h-5 w-5" />
              <span className="font-medium">20-30% revenue share</span>
            </li>
          </ul>
          <div className="relative mt-3 rounded-xl border border-rose-100/90 bg-white/75 p-2 backdrop-blur-sm">
            <LegacyRevenueShareChart liteMotion={liteMotion} className="h-20 w-full" />
            <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.11em] text-rose-700/90">
              Fee burden rises with scale
            </p>
          </div>
        </motion.div>
        <motion.div
          className="relative overflow-hidden rounded-2xl border border-indigo-200/70 bg-gradient-to-br from-white via-white to-indigo-50/65 p-4 shadow-[0_16px_32px_-22px_rgba(79,70,229,0.36)]"
          whileHover={{ y: -2, scale: 1.005, boxShadow: "0 18px 34px -20px rgba(79,70,229,0.42)" }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#4F46E5] via-[#6366F1]/45 to-transparent" />
          <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-indigo-200/35 blur-2xl" />
          <div className="relative flex items-start justify-between gap-3">
            <p className="text-sm font-semibold text-[#111827]">Exly</p>
            <span className="rounded-full border border-indigo-200 bg-indigo-50 px-2.5 py-0.5 text-[10px] font-semibold text-[#4338CA]">
              <motion.span
                className="inline-block"
                animate={liteMotion ? undefined : { opacity: [0.8, 1, 0.8], y: [0, -0.5, 0] }}
                transition={liteMotion ? undefined : { duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
              >
                Exly Advantage
              </motion.span>
            </span>
          </div>
          <ul className="relative mt-3 grid grid-cols-1 gap-3 text-sm text-[#4B5563] md:grid-cols-[minmax(0,1fr)_minmax(0,1.12fr)]">
            <motion.li
              className="group relative min-w-0 overflow-hidden rounded-2xl border border-indigo-200/85 bg-[linear-gradient(145deg,rgba(255,255,255,0.97),rgba(238,242,255,0.88))] px-3 py-3 shadow-[0_16px_30px_-24px_rgba(79,70,229,0.58)]"
              whileHover={liteMotion ? undefined : { y: -2, borderColor: "rgba(99,102,241,0.58)" }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
            >
              <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(140px_90px_at_90%_0%,rgba(99,102,241,0.16),transparent_70%)]" />
              <span className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-[#6366F1]/80 via-[#818CF8]/60 to-transparent" />
              <motion.span
                className="pointer-events-none absolute -left-10 top-0 h-full w-8 bg-white/70 blur-[2px]"
                animate={liteMotion ? undefined : { x: ["0%", "620%"] }}
                transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 1.8, ease: "easeInOut" }}
              />
              <div className="relative flex items-center gap-3">
                <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 ring-1 ring-emerald-200/85 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
                  <AnimatedCheckIcon className="h-6 w-6" />
                </span>
                <div className="min-w-0 leading-none">
                  <p className="text-[30px] font-black tracking-[-0.04em] text-[#1E293B] md:text-[32px] lg:text-[34px]">0%</p>
                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#475569]">Revenue Share</p>
                </div>
              </div>
            </motion.li>
            <motion.li
              className="group relative min-w-0 overflow-hidden rounded-2xl border border-indigo-200/85 bg-[linear-gradient(145deg,rgba(255,255,255,0.97),rgba(236,253,245,0.86))] px-3 py-3 shadow-[0_16px_30px_-24px_rgba(16,185,129,0.36)]"
              whileHover={liteMotion ? undefined : { y: -2, borderColor: "rgba(52,211,153,0.58)" }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
            >
              <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(140px_90px_at_90%_0%,rgba(16,185,129,0.14),transparent_72%)]" />
              <span className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-emerald-400/70 via-emerald-300/45 to-transparent" />
              <motion.span
                className="pointer-events-none absolute -left-10 top-0 h-full w-8 bg-white/70 blur-[2px]"
                animate={liteMotion ? undefined : { x: ["0%", "620%"] }}
                transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 2.1, ease: "easeInOut" }}
              />
              <div className="relative flex items-center gap-3">
                <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 ring-1 ring-emerald-200/85 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
                  <AnimatedCheckIcon className="h-6 w-6" />
                </span>
                <div className="min-w-0 leading-none">
                  <p className="text-[clamp(1.45rem,2.8vw,2.2rem)] font-black tracking-[-0.03em] leading-[0.95] text-[#1E293B]">Fixed</p>
                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#475569]">Monthly Fee</p>
                </div>
              </div>
            </motion.li>
          </ul>
          <div className="relative mt-3 rounded-xl border border-indigo-100/90 bg-white/80 p-2 backdrop-blur-sm">
            <ExlyFixedFeeChart liteMotion={liteMotion} className="h-20 w-full" />
            <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.11em] text-[#4338CA]/90">
              Stable model, predictable margin
            </p>
          </div>
        </motion.div>
      </motion.div>
      <motion.div
        variants={revealItem}
        className="mt-5 mx-auto flex w-fit items-center justify-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-2 text-center text-[11px] font-semibold text-[#4338CA] sm:px-4 sm:text-xs"
      >
        Exly does not take percentages from your revenue
      </motion.div>
      <div className="mt-8 space-y-4">
        {coverParagraphs.map((paragraph) => (
          <motion.p key={paragraph} variants={revealItem} className="text-sm leading-relaxed text-[#6B7280] sm:text-[15px]">
            {paragraph}
          </motion.p>
        ))}
      </div>
      <div className="mt-8">
        <SectionLiveCartoonPack sectionKey="cover" liteMotion={liteMotion} compact={compact} />
      </div>
      <motion.div variants={revealItem} className="mt-8 grid gap-3 md:grid-cols-2">
        {heroServiceCards.slice(0, 4).map((service, index) => (
          <div key={service.title} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50/70">
                <ServiceCardAnimatedSvg variant={heroServiceIllustrations[index % heroServiceIllustrations.length]} liteMotion={liteMotion} />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[#111827]">{service.title}</p>
                <p className="mt-1 text-sm text-[#6B7280]">{service.detail}</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
      <div className="mt-8">
        <motion.p variants={revealItem} className="mb-4 text-sm leading-relaxed text-[#6B7280] sm:text-[15px]">
          Because scaling shouldn't feel like chaos, dependency, or shrinking margins. You deserve growth that compounds, systems that work together, and profits that stay with you. This isn't just about running ads - it's about building a business that finally runs with clarity, control, and confidence.
        </motion.p>
        <SectionClientQueryGrid sectionKey="cover" liteMotion={liteMotion} compact={compact} />
      </div>
    </motion.div>
  );
}

function StickyHomeFooter() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 px-4 pb-[max(0.35rem,env(safe-area-inset-bottom))] md:px-8">
      <div className="mx-auto w-full max-w-[1200px] rounded-[24px_24px_0_0] bg-gradient-to-t from-[#F3F4F6] via-[#F3F4F6]/96 to-transparent px-2 pt-2">
        <div className="pointer-events-auto">
          <MagneticButton className="w-full justify-center">Schedule Discovery Call</MagneticButton>
          <p className="mt-2 text-center text-[11px] font-bold text-[#4B5563] sm:text-sm">
            No revenue share. No long contracts. No hidden fees.
          </p>
        </div>
      </div>
    </div>
  );
}

function renderSectionContent(section, motionProfile = null) {
  if (!section) return null;
  const revealParent = motionProfile?.revealParent ?? getRevealParent(false);
  const revealItem = motionProfile?.revealItem ?? getRevealItem(false);
  const fastReveal = motionProfile?.fastReveal ?? false;
  const headlineStyle = motionProfile?.headlineStyle;
  const liteMotion = motionProfile?.liteMotion ?? false;
  const preset = motionProfile?.preset ?? motionPresets.standard;
  const mobileView = motionProfile?.isMobile ?? false;

  if (section.key === "hero") {
    return (
      <motion.div variants={revealParent} initial="hidden" animate="show" exit="hidden" className="space-y-7">
        <InkRevealTitle
          variants={revealItem}
          style={headlineStyle}
          fast={fastReveal}
          className="text-2xl font-bold text-[#111827] md:text-3xl"
        >
          {sectionBody.hero.title}
        </InkRevealTitle>
        <AnimatedDivider fast={fastReveal} />
        {sectionBody.hero.paragraphs.map((paragraph) => (
          <motion.p key={paragraph} variants={revealItem} className="text-sm leading-relaxed text-[#6B7280]">
            {paragraph}
          </motion.p>
        ))}
        <SectionLiveCartoonPack sectionKey="hero" liteMotion={liteMotion} compact={mobileView} />
        <SectionClientQueryGrid sectionKey="hero" liteMotion={liteMotion} compact={mobileView} />
        <motion.div variants={revealItem} className="rounded-2xl border border-indigo-200 bg-indigo-50 p-5">
          <p className="text-xs uppercase tracking-[0.22em] text-[#4F46E5]">Commercial Promise</p>
          <p className="mt-2 text-lg font-semibold text-[#111827]">Zero Revenue Share. One Fixed Amount.</p>
          <p className="mt-1 text-sm text-[#4B5563]">
            Exly grows with your brand, not by taking percentages from your sales.
          </p>
        </motion.div>
        <motion.ul variants={revealParent} className="space-y-2">
          {sectionBody.hero.bullets.map((bullet) => (
            <motion.li key={bullet} variants={revealItem} className="flex items-start gap-2 text-sm text-[#111827]">
              <Check className="mt-0.5 h-4 w-4 text-[#4F46E5]" />
              <span>{bullet}</span>
            </motion.li>
          ))}
        </motion.ul>
        <motion.h3 variants={revealItem} className="text-lg font-semibold text-[#111827]">
          Services we execute with you
        </motion.h3>
        <motion.div variants={revealItem} className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {growthThesisServiceBlocks.map((block) => (
            <div key={block.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-[#4F46E5]">
                  <block.icon className="h-4 w-4" />
                </span>
                <p className="text-sm font-semibold text-[#111827]">{block.title}</p>
              </div>
              <ul className="mt-4 space-y-2.5">
                {block.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-[#374151]">
                    <Check className="mt-0.5 h-4 w-4 text-[#4F46E5]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>
        <motion.div variants={revealItem} className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#4F46E5]">Live Workspace Preview</p>
          <LandingScreenshotGrid items={landingScreenshots} liteMotion={liteMotion} mode="three" />
        </motion.div>
      </motion.div>
    );
  }

  if (section.key === "problem") {
    return (
      <motion.div variants={revealParent} initial="hidden" animate="show" exit="hidden" className="space-y-8">
        <InkRevealTitle
          variants={revealItem}
          style={headlineStyle}
          fast={fastReveal}
          className="text-2xl font-bold text-[#111827] md:text-3xl"
        >
          {sectionBody.problem.title}
        </InkRevealTitle>
        <AnimatedDivider fast={fastReveal} />
        {sectionBody.problem.paragraphs.map((paragraph) => (
          <motion.p key={paragraph} variants={revealItem} className="text-sm leading-relaxed text-[#6B7280]">
            {paragraph}
          </motion.p>
        ))}
        <SectionLiveCartoonPack sectionKey="problem" liteMotion={liteMotion} compact={mobileView} />
        <SectionClientQueryGrid sectionKey="problem" liteMotion={liteMotion} compact={mobileView} />
        <motion.div variants={revealItem} className="grid gap-4 md:grid-cols-3">
          {painPointCartoons.map((person) => (
            <CartoonCard key={person.name} {...person} />
          ))}
        </motion.div>
        <motion.ul variants={revealParent} className="space-y-2">
          {sectionBody.problem.bullets.map((bullet) => (
            <motion.li key={bullet} variants={revealItem} className="flex items-start gap-2 text-sm text-[#111827]">
              <Check className="mt-0.5 h-4 w-4 text-[#4F46E5]" />
              <span>{bullet}</span>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    );
  }

  if (section.key === "cost") {
    return (
      <motion.div variants={revealParent} initial="hidden" animate="show" exit="hidden" className="space-y-6">
        <InkRevealTitle
          variants={revealItem}
          style={headlineStyle}
          fast={fastReveal}
          className="text-2xl font-bold text-[#111827] md:text-3xl"
        >
          Cost Comparison
        </InkRevealTitle>
        <AnimatedDivider fast={fastReveal} />
        <motion.div variants={revealItem}>
          <HaloChipRow liteMotion={liteMotion} />
        </motion.div>
        <motion.p variants={revealItem} className="text-sm leading-relaxed text-[#6B7280]">
          For creators spending around ₹10L/month on ads, traditional 10%-20% agency pricing plus fragmented tools can create a heavy annual cost drag. Exly unifies this into a fixed-fee model with no percentage cuts.
        </motion.p>
        <SectionLiveCartoonPack sectionKey="cost" liteMotion={liteMotion} compact={mobileView} />
        <SectionClientQueryGrid sectionKey="cost" liteMotion={liteMotion} compact={mobileView} />
        <motion.div variants={revealItem} className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="text-sm font-semibold text-emerald-800">
            Margin Protection: Exly does not charge revenue share. You keep your upside as sales increase.
          </p>
        </motion.div>
        <motion.div variants={revealItem} className="grid gap-3 md:grid-cols-3">
          {savingsBands.map((band) => (
            <div key={band.spend} className="rounded-xl border border-indigo-100 bg-indigo-50/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#4F46E5]">{band.spend}</p>
              <p className="mt-1 text-sm font-semibold text-[#111827]">{band.save}</p>
            </div>
          ))}
        </motion.div>
        <KineticCostChart liteMotion={liteMotion} motionProfile={preset} />
        <motion.div variants={revealItem} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-[#6B7280]">
              <tr>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Typical Stack</th>
                <th className="px-4 py-3 text-[#4F46E5]">Exly</th>
              </tr>
            </thead>
            <tbody>
              {costRows.map((row, index) => (
                <motion.tr
                  key={row[0]}
                  custom={index}
                  variants={tableRowReveal}
                  initial="hidden"
                  animate="show"
                  className="border-t border-slate-100"
                >
                  <td className="px-4 py-3 font-medium text-[#111827]">{row[0]}</td>
                  <td className="px-4 py-3 text-[#6B7280]">{row[1]}</td>
                  <td className="px-4 py-3 font-semibold text-[#4F46E5]">{row[2]}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  if (section.key === "proof") {
    return (
      <motion.div variants={revealParent} initial="hidden" animate="show" exit="hidden" className="space-y-8">
        <InkRevealTitle
          variants={revealItem}
          style={headlineStyle}
          fast={fastReveal}
          className="text-2xl font-bold text-[#111827] md:text-3xl"
        >
          Social Proof
        </InkRevealTitle>
        <AnimatedDivider fast={fastReveal} />
        <SectionLiveCartoonPack sectionKey="proof" liteMotion={liteMotion} compact={mobileView} />
        <SectionClientQueryGrid sectionKey="proof" liteMotion={liteMotion} compact={mobileView} />
        <motion.div variants={revealItem} className="grid gap-4 md:grid-cols-4">
          {proofStats.map((counter) => (
            <div key={counter.label} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <p
                className={`font-bold text-[#4F46E5] ${
                  counter.splitSuffix ? "text-[2rem] leading-[1.06] sm:text-3xl" : "text-3xl leading-none"
                }`}
              >
                <AnimatedCounter
                  value={counter.value}
                  suffix={counter.suffix}
                  splitSuffix={Boolean(counter.splitSuffix)}
                  suffixClassName="text-[#4F46E5]/90"
                />
              </p>
              <p className="mt-2 text-xs uppercase tracking-wider text-[#6B7280]">{counter.label}</p>
            </div>
          ))}
        </motion.div>
        <motion.div variants={revealItem} className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-xs uppercase tracking-[0.18em] text-[#6B7280]">Backed By</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {backers.map((backer) => (
              <span key={backer} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-[#111827]">
                {backer}
              </span>
            ))}
          </div>
        </motion.div>
        <KineticProofChart liteMotion={liteMotion} motionProfile={preset} />
        <motion.div variants={revealItem}>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#6B7280]">Client Testimonials</p>
          <div className="grid gap-4 md:grid-cols-2">
            {proofTestimonials.map((testimonial, index) => (
              <ProofTestimonialCard
                key={testimonial.name}
                testimonial={testimonial}
                liteMotion={liteMotion}
                index={index}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    );
  }

  if (section.key === "process") {
    return (
      <motion.div variants={revealParent} initial="hidden" animate="show" exit="hidden" className="space-y-8">
        <InkRevealTitle
          variants={revealItem}
          style={headlineStyle}
          fast={fastReveal}
          className="text-2xl font-bold text-[#111827] md:text-3xl"
        >
          Process Timeline
        </InkRevealTitle>
        <AnimatedDivider fast={fastReveal} />
        <motion.p variants={revealItem} className="text-sm leading-relaxed text-[#6B7280]">
          The partnership follows four clear phases across the first weeks and months: discovery and setup, build and launch, test and optimize, then scale and dominate.
        </motion.p>
        <SectionLiveCartoonPack sectionKey="process" liteMotion={liteMotion} compact={mobileView} />
        <SectionClientQueryGrid sectionKey="process" liteMotion={liteMotion} compact={mobileView} />
        <motion.div variants={revealItem} className="grid gap-4 md:grid-cols-4">
          {processPhases.map((phase, index) => (
            <motion.div
              key={phase.phase}
              className="relative overflow-hidden rounded-xl border border-slate-200 bg-white p-4"
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.08 * index, type: "spring", stiffness: 180, damping: 16 }}
              whileHover={{
                scale: 1.03,
                borderColor: "rgba(79,70,229,0.55)",
                boxShadow: "0 12px 26px -14px rgba(79,70,229,0.45)",
              }}
            >
              <span className="text-xs font-semibold tracking-[0.2em] text-[#4F46E5]">{phase.phase}</span>
              <h3 className="mt-2 text-lg font-semibold text-[#111827]">{phase.label}</h3>
              <p className="mt-2 text-sm text-[#6B7280]">{phase.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    );
  }

  if (section.key === "cta") {
    return (
      <motion.div variants={revealParent} initial="hidden" animate="show" exit="hidden" className="space-y-8">
        <InkRevealTitle
          variants={revealItem}
          style={headlineStyle}
          fast={fastReveal}
          className="text-2xl font-bold text-[#111827] md:text-3xl"
        >
          Final CTA
        </InkRevealTitle>
        <AnimatedDivider fast={fastReveal} />
        <motion.div variants={revealItem}>
          <HaloChipRow liteMotion={liteMotion} />
        </motion.div>
        <SectionLiveCartoonPack sectionKey="cta" liteMotion={liteMotion} compact={mobileView} />
        <SectionClientQueryGrid sectionKey="cta" liteMotion={liteMotion} compact={mobileView} />
        <motion.div
          variants={revealItem}
          animate={{
            y: [0, -6, 0],
            boxShadow: [
              "0 18px 38px -26px rgba(79,70,229,0.52)",
              "0 24px 42px -24px rgba(79,70,229,0.62)",
              "0 18px 38px -26px rgba(79,70,229,0.52)",
            ],
          }}
          transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#4F46E5] to-[#4338CA] p-6 text-white md:p-10"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-indigo-100/80">Exly Partnership</p>
          <h3 className="mt-3 text-2xl font-bold md:text-3xl">Unlock your growth stack with one strategic move.</h3>
          <p className="mt-4 max-w-2xl text-sm text-indigo-100/90">
            Convert your fragmented setup into a cohesive operating system designed for predictable creator revenue. Keep ownership, keep margin, and grow with one accountable team.
          </p>
          <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-100/80">
            Pilot: ₹2,60,000/quarter • No revenue share • No hidden fees
          </p>
          <div className="mt-8">
            <MagneticButton className="bg-white/5">Schedule Discovery Call</MagneticButton>
          </div>
          <motion.div
            className="pointer-events-none absolute -left-20 top-0 h-full w-16 bg-white/25 blur-sm"
            animate={{ x: ["0%", "760%"] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.8 }}
          />
        </motion.div>
      </motion.div>
    );
  }

  if (section.key === "features") {
    return (
      <motion.div variants={revealParent} initial="hidden" animate="show" exit="hidden" className="space-y-6">
        <InkRevealTitle
          variants={revealItem}
          style={headlineStyle}
          fast={fastReveal}
          className="text-2xl font-bold text-[#111827] md:text-3xl"
        >
          {sectionBody.features.title}
        </InkRevealTitle>
        <AnimatedDivider fast={fastReveal} />
        <SectionLiveCartoonPack sectionKey="features" liteMotion={liteMotion} compact={mobileView} />
        <SectionClientQueryGrid sectionKey="features" liteMotion={liteMotion} compact={mobileView} />
        <motion.div variants={revealItem} className="grid gap-4 md:grid-cols-2">
          {sectionBody.features.cards.map((card) => (
            <motion.div
              key={card.title}
              className="rounded-xl border border-slate-200 bg-white p-5"
              whileHover={{ y: -3, borderColor: "rgba(79,70,229,0.35)" }}
            >
              <h3 className="text-base font-semibold text-[#111827]">{card.title}</h3>
              <p className="mt-2 text-sm text-[#6B7280]">{card.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    );
  }

  if (section.key === "core") {
    return (
      <motion.div variants={revealParent} initial="hidden" animate="show" exit="hidden" className="space-y-7">
        <InkRevealTitle
          variants={revealItem}
          style={headlineStyle}
          fast={fastReveal}
          className="text-2xl font-bold text-[#111827] md:text-3xl"
        >
          {sectionBody.core.title}
        </InkRevealTitle>
        <AnimatedDivider fast={fastReveal} />
        <motion.div variants={revealItem}>
          <HaloChipRow liteMotion={liteMotion} />
        </motion.div>
        {sectionBody.core.paragraphs.map((paragraph) => (
          <motion.p key={paragraph} variants={revealItem} className="text-sm leading-relaxed text-[#6B7280]">
            {paragraph}
          </motion.p>
        ))}
        <SectionClientQueryGrid sectionKey="core" liteMotion={liteMotion} compact={mobileView} />
        <motion.div variants={revealItem} className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-indigo-200 bg-indigo-50 p-5">
            <p className="text-xs uppercase tracking-[0.18em] text-[#4338CA]">Pilot Pricing</p>
            <p className="mt-2 text-2xl font-bold text-[#111827]">₹2,60,000 / quarter</p>
            <p className="mt-1 text-sm text-[#4B5563]">Regular: ₹3,90,000 per quarter</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs uppercase tracking-[0.18em] text-[#4F46E5]">Commercial Terms</p>
            <p className="mt-2 text-sm font-semibold text-[#111827]">No revenue share. No percentage of ad spend. No hidden fees.</p>
          </div>
        </motion.div>
        <motion.div variants={revealItem} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="relative aspect-[16/9] overflow-hidden">
            <img
              src={landingScreenshots[2].src}
              alt={landingScreenshots[2].title}
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="border-t border-slate-100 p-4">
            <p className="text-sm font-semibold text-[#111827]">{landingScreenshots[2].title}</p>
            <p className="mt-1 text-sm text-[#64748B]">{landingScreenshots[2].note}</p>
          </div>
        </motion.div>
        <SectionLiveCartoonPack sectionKey="core" liteMotion={liteMotion} compact={mobileView} />
        <motion.div variants={revealItem} className="rounded-2xl border border-indigo-200 bg-white p-5 shadow-sm">
          <p className="text-xs uppercase tracking-[0.18em] text-[#4F46E5]">Exly Brand Positioning</p>
          <p className="mt-2 text-base font-semibold text-[#111827]">
            We are not just a tool. Exly is a growth brand that provides platform + services + execution accountability.
          </p>
        </motion.div>
        <motion.ul variants={revealParent} className="space-y-2">
          {sectionBody.core.bullets.map((bullet) => (
            <motion.li key={bullet} variants={revealItem} className="flex items-start gap-2 text-sm text-[#111827]">
              <Check className="mt-0.5 h-4 w-4 text-[#4F46E5]" />
              <span>{bullet}</span>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    );
  }

  if (section.key === "comparison") {
    return (
      <motion.div variants={revealParent} initial="hidden" animate="show" exit="hidden" className="space-y-7">
        <InkRevealTitle
          variants={revealItem}
          style={headlineStyle}
          fast={fastReveal}
          className="text-2xl font-bold text-[#111827] md:text-3xl"
        >
          {sectionBody.comparison.title}
        </InkRevealTitle>
        <AnimatedDivider fast={fastReveal} />
        <motion.div variants={revealItem}>
          <HaloChipRow liteMotion={liteMotion} />
        </motion.div>
        {sectionBody.comparison.paragraphs.map((paragraph) => (
          <motion.p key={paragraph} variants={revealItem} className="text-sm leading-relaxed text-[#6B7280]">
            {paragraph}
          </motion.p>
        ))}
        <SectionLiveCartoonPack sectionKey="comparison" liteMotion={liteMotion} compact={mobileView} />
        <SectionClientQueryGrid sectionKey="comparison" liteMotion={liteMotion} compact={mobileView} />
        <motion.div variants={revealItem} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-[#6B7280]">
              <tr>
                <th className="px-4 py-3">Dimension</th>
                <th className="px-4 py-3">Typical Platform</th>
                <th className="px-4 py-3 text-[#4F46E5]">Exly</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, index) => (
                <motion.tr
                  key={row[0]}
                  custom={index}
                  variants={tableRowReveal}
                  initial="hidden"
                  animate="show"
                  className="border-t border-slate-100"
                >
                  <td className="px-4 py-3 font-medium text-[#111827]">{row[0]}</td>
                  <td className="px-4 py-3 text-[#6B7280]">{row[1]}</td>
                  <td className="px-4 py-3 font-semibold text-[#4F46E5]">{row[2]}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          </div>
        </motion.div>
        <motion.ul variants={revealParent} className="space-y-2">
          {sectionBody.comparison.bullets.map((bullet) => (
            <motion.li key={bullet} variants={revealItem} className="flex items-start gap-2 text-sm text-[#111827]">
              <Check className="mt-0.5 h-4 w-4 text-[#4F46E5]" />
              <span>{bullet}</span>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    );
  }

  const content = sectionBody[section.key];
  if (!content) return null;

  return (
    <motion.div variants={revealParent} initial="hidden" animate="show" exit="hidden" className="space-y-6">
      <InkRevealTitle
        variants={revealItem}
        style={headlineStyle}
        fast={fastReveal}
        className="text-2xl font-bold text-[#111827] md:text-3xl"
      >
        {content.title}
      </InkRevealTitle>
      <AnimatedDivider fast={fastReveal} />
      <SectionLiveCartoonPack sectionKey={section.key} liteMotion={liteMotion} compact={mobileView} />
      <SectionClientQueryGrid sectionKey={section.key} liteMotion={liteMotion} compact={mobileView} />
      {content.paragraphs?.map((paragraph) => (
        <motion.p key={paragraph} variants={revealItem} className="text-sm leading-relaxed text-[#6B7280]">
          {paragraph}
        </motion.p>
      ))}
      <motion.ul variants={revealParent} className="space-y-2">
        {content.bullets?.map((bullet) => (
          <motion.li key={bullet} variants={revealItem} className="flex items-start gap-2 text-sm text-[#111827]">
            <Check className="mt-0.5 h-4 w-4 text-[#4F46E5]" />
            <span>{bullet}</span>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
}

function ActiveSectionPanel({ section, onClose, isMobile, liteMotion = false, motionProfile = motionPresets.standard }) {
  if (!section) return null;
  const amp = motionProfile?.amp ?? 1;
  const speed = motionProfile?.speed ?? 1;
  const scrollY = useMotionValue(0);
  const headlineScale = useTransform(scrollY, [0, 320], [1, 0.98]);
  const gridShiftY = useTransform(scrollY, [0, 800], [0, -22]);
  const [isFastScroll, setIsFastScroll] = useState(false);
  const fastRef = useRef(false);
  const scrollMetaRef = useRef({ top: 0, time: 0 });
  const revealParentVariant = useMemo(() => getRevealParent(isFastScroll), [isFastScroll]);
  const revealItemVariant = useMemo(() => getRevealItem(isFastScroll), [isFastScroll]);
  const sectionContent = renderSectionContent(section, {
    revealParent: revealParentVariant,
    revealItem: revealItemVariant,
    fastReveal: isFastScroll,
    headlineStyle: { scale: headlineScale, transformOrigin: "left center" },
    liteMotion,
    isMobile,
    preset: motionProfile,
  });

  const handleContentScroll = useCallback(
    (event) => {
      const top = event.currentTarget.scrollTop;
      scrollY.set(top);
      const now = performance.now();
      const prev = scrollMetaRef.current;
      const dt = Math.max(now - prev.time, 16);
      const dy = top - prev.top;
      const velocity = Math.abs((dy / dt) * 1000);
      const nextFast = velocity > 980;
      if (nextFast !== fastRef.current) {
        fastRef.current = nextFast;
        setIsFastScroll(nextFast);
      }
      scrollMetaRef.current = { top, time: now };
    },
    [scrollY],
  );

  return (
    <motion.div
      variants={genieVariants}
      initial={false}
      animate="expanded"
      exit="collapsed"
      transition={sharedSpring}
      className={`relative z-20 h-full w-full overflow-hidden rounded-[26px] border border-slate-200/80 bg-white shadow-[0_28px_70px_-44px_rgba(15,23,42,0.75)] transform-gpu will-change-transform ${
        isMobile ? "mx-0 mt-0 rounded-none border-0 shadow-none" : ""
      }`}
    >
      {!isMobile && (
        <>
          <motion.div
            className="pointer-events-none absolute right-0 top-0 z-30 h-full w-14 bg-gradient-to-l from-white/50 via-white/5 to-transparent"
            initial={{ x: 16, opacity: 0 }}
            animate={{ x: 0, opacity: 0.75 }}
            exit={{ x: 16, opacity: 0 }}
            transition={{ duration: 0.34 / speed, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.div
            key={`curl-sweep-${section.id}`}
            className="pointer-events-none absolute right-2 top-6 z-30 h-[86%] w-10 bg-gradient-to-l from-slate-400/25 via-white/35 to-transparent blur-sm"
            initial={{ x: 42, opacity: 0 }}
            animate={{ x: [-6, 2, -1], opacity: [0.14, 0.28, 0.18] }}
            transition={{ duration: 0.72 / speed, ease: [0.22, 1, 0.36, 1] }}
          />
        </>
      )}
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 md:px-8 md:py-4">
        <div className="flex min-w-0 items-center gap-2.5 md:gap-3">
          <span className="inline-flex items-center text-[11px] font-medium text-[#6B7280]">
            <OdometerNumber value={section.id} className="mr-1.5" /> / 10
          </span>
          <span className="h-2 w-2 rounded-full bg-[#4F46E5]" />
          <h2 className="truncate text-sm font-semibold text-[#111827] md:text-base">{section.title}</h2>
        </div>
        <motion.button
          onClick={onClose}
          className="rounded-full p-2 text-[#6B7280] transition hover:bg-slate-100 hover:text-[#111827] md:p-2.5"
          whileHover={{ rotate: 90, scale: 1.06 }}
          whileTap={{ scale: 0.92 }}
          aria-label="Close section"
        >
          <X className="h-4 w-4" />
        </motion.button>
      </div>
      <motion.div
        className="relative h-[calc(100%-65px)] shadow-[0_18px_40px_-34px_rgba(15,23,42,0.34)]"
        animate={
          isMobile || liteMotion
            ? undefined
            : {
                scale: [1, 1 + 0.002 * amp, 1],
                boxShadow: [
                  "0 18px 40px -34px rgba(15,23,42,0.34)",
                  "0 20px 42px -34px rgba(15,23,42,0.4)",
                  "0 18px 40px -34px rgba(15,23,42,0.34)",
                ],
              }
        }
        transition={
          isMobile || liteMotion
            ? undefined
            : {
                duration: 9.5 / speed,
                repeat: Infinity,
                ease: "easeInOut",
              }
        }
      >
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={isMobile ? gridStyle : { ...gridStyle, y: gridShiftY }}
        />
        <motion.div
          className="h-full overflow-y-auto px-4 py-4 md:px-8 md:py-6"
          style={isMobile ? { paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))" } : undefined}
          onScroll={handleContentScroll}
          initial={false}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.28 / speed }}
        >
          {sectionContent ?? (
            <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
              <h3 className="text-lg font-semibold text-[#111827]">{section.title}</h3>
              <p className="mt-2 text-sm text-[#6B7280]">Section content is loading. Please click the section again.</p>
            </div>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function ExlyDossier() {
  const reducedMotion = useReducedMotion();
  const [activeId, setActiveId] = useState(null);
  const [mobileListOpen, setMobileListOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarIntroDone, setSidebarIntroDone] = useState(false);
  const [liteMotion, setLiteMotion] = useState(false);

  const lightXRaw = useMotionValue(50);
  const lightYRaw = useMotionValue(34);
  const lightOpacityRaw = useMotionValue(0);
  const lightX = useSpring(lightXRaw, { stiffness: 210, damping: 28, mass: 0.7 });
  const lightY = useSpring(lightYRaw, { stiffness: 210, damping: 28, mass: 0.7 });
  const lightOpacity = useSpring(lightOpacityRaw, { stiffness: 180, damping: 24, mass: 0.7 });
  const paperLight = useMotionTemplate`radial-gradient(340px circle at ${lightX}% ${lightY}%, rgba(255,255,255,0.72), rgba(255,255,255,0) 72%)`;
  const playMotionAudio = useMotionAudio(!reducedMotion);
  const motionProfile = useMemo(() => (isMobile ? motionPresets.calm : motionPresets.standard), [isMobile]);
  const shouldLiteMotion = liteMotion || isMobile;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const cpuLite = typeof navigator.hardwareConcurrency === "number" && navigator.hardwareConcurrency <= 4;
    const memoryLite = typeof navigator.deviceMemory === "number" && navigator.deviceMemory <= 4;
    const saveDataLite = Boolean(connection?.saveData);
    const reducedPref = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateLiteMode = () => {
      setLiteMotion(cpuLite || memoryLite || saveDataLite || reducedPref.matches);
    };
    updateLiteMode();
    if (reducedPref.addEventListener) {
      reducedPref.addEventListener("change", updateLiteMode);
      return () => reducedPref.removeEventListener("change", updateLiteMode);
    }
    reducedPref.addListener(updateLiteMode);
    return () => reducedPref.removeListener(updateLiteMode);
  }, []);

  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setMobileListOpen(false);
      if (mobile && activeId !== null) setMobileListOpen(false);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [activeId]);

  useEffect(() => {
    const timeout = window.setTimeout(() => setSidebarIntroDone(true), 860);
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.title = proposalTitleWithBrand;
    }
  }, []);

  const activeSection = useMemo(() => sections.find((section) => section.id === activeId) || null, [activeId]);

  const handleCanvasMove = useCallback(
    (event) => {
      if (isMobile || shouldLiteMotion || reducedMotion) return;
      const rect = event.currentTarget.getBoundingClientRect();
      lightXRaw.set(((event.clientX - rect.left) / rect.width) * 100);
      lightYRaw.set(((event.clientY - rect.top) / rect.height) * 100);
      lightOpacityRaw.set(0.8);
    },
    [isMobile, shouldLiteMotion, reducedMotion, lightXRaw, lightYRaw, lightOpacityRaw],
  );

  const resetCanvasLight = useCallback(() => {
    lightOpacityRaw.set(0);
  }, [lightOpacityRaw]);

  const openSection = useCallback(
    (id) => {
      fireMicroHaptic([8]);
      playMotionAudio("select");
      setActiveId(id);
      setMobileListOpen(false);
    },
    [playMotionAudio],
  );

  const closeSection = useCallback(() => {
    fireMicroHaptic([5, 20, 6]);
    playMotionAudio("close");
    setActiveId(null);
    if (isMobile) setMobileListOpen(false);
  }, [isMobile, playMotionAudio]);

  const goBackToMobileList = useCallback(() => {
    fireMicroHaptic([5]);
    playMotionAudio("close");
    setActiveId(null);
    setMobileListOpen(true);
  }, [playMotionAudio]);

  const openDiscoveryCTA = useCallback(() => {
    fireMicroHaptic([8, 20, 8]);
    playMotionAudio("select");
    const ctaId = sections.find((section) => section.key === "cta")?.id ?? 10;
    setActiveId(ctaId);
    setMobileListOpen(false);
  }, [playMotionAudio]);

  return (
    <MotionConfig reducedMotion="user">
      <LayoutGroup id="exly-dossier">
        <div
          className="relative h-screen h-[100dvh] w-screen overflow-hidden bg-[#F3F4F6] text-[#111827] [font-family:Inter,sans-serif]"
          onMouseMove={handleCanvasMove}
          onMouseLeave={resetCanvasLight}
        >
          <motion.div className="pointer-events-none absolute inset-0" style={gridStyle} />
          <motion.div className="pointer-events-none absolute inset-0" style={{ backgroundImage: paperLight, opacity: lightOpacity }} />

          <main className="relative z-10 h-full overflow-y-auto p-0 md:p-8">
            <div className="pb-8 md:pb-10" style={isMobile ? { paddingBottom: "max(4.25rem, calc(3.75rem + env(safe-area-inset-bottom)))" } : undefined}>
              <DefaultCover liteMotion={shouldLiteMotion} compact={isMobile} />
            </div>
          </main>
          <StickyHomeFooter />
        </div>
      </LayoutGroup>
    </MotionConfig>
  );
}
