export interface Section {
  id: number;
  title: string;
  color: string;
  description: string;
}

export const sections: Section[] = [
  { id: 1, title: "Hero", color: "239 84% 67%", description: "Growth positioning" },
  { id: 2, title: "Problem", color: "0 72% 51%", description: "Market pain points" },
  { id: 3, title: "Cost Comparison", color: "25 95% 53%", description: "Financial analysis" },
  { id: 4, title: "Core Offer", color: "239 84% 67%", description: "Value proposition" },
  { id: 5, title: "Features", color: "160 84% 39%", description: "Capability matrix" },
  { id: 6, title: "Social Proof", color: "280 67% 52%", description: "Validation data" },
  { id: 7, title: "Comparison", color: "25 95% 53%", description: "Competitive positioning" },
  { id: 8, title: "Ownership", color: "199 89% 48%", description: "Asset control model" },
  { id: 9, title: "Process", color: "160 84% 39%", description: "Implementation phases" },
  { id: 10, title: "Final CTA", color: "239 84% 67%", description: "Conversion action" },
];
