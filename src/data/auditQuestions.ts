export interface AuditQuestion {
  id: number;
  question: string;
  category: string;
}

export const quickQuestions: AuditQuestion[] = [
  { id: 1, question: "Are you currently using AI in your workflows or products?", category: "Entry Intent" },
  { id: 2, question: "Are you planning to use AI in the near future?", category: "Entry Intent" },
  { id: 3, question: "Do you validate or sanitize user inputs before processing?", category: "Input Risk" },
  { id: 4, question: "Does your agent verify outputs against a trusted source (RAG, DB, validation)?", category: "Output Risk" },
  { id: 5, question: "Can your system detect or flag hallucinated or incorrect outputs?", category: "Output Risk" },
  { id: 6, question: "Do you control what actions your agent can perform (write, delete, execute)?", category: "Control Risk" },
  { id: 7, question: "Can your agent execute actions without human approval?", category: "Control Risk" },
  { id: 8, question: "Can you track every decision or action your agent takes?", category: "Monitoring" },
  { id: 9, question: "Do you log inputs, outputs, and actions of your agent?", category: "Monitoring" },
  { id: 10, question: "Do you have safeguards against harmful, biased, or unsafe outputs?", category: "Governance" },
  { id: 11, question: "Can you explain or verify how a specific output was generated?", category: "Governance" },
];

export const advancedQuestions: AuditQuestion[] = [];

export type Answer = "yes" | "no" | "partially";

export function calculateScore(answers: Record<number, Answer>): number {
  let score = 0;
  const total = Object.keys(answers).length;
  if (total === 0) return 0;
  
  Object.values(answers).forEach((a) => {
    if (a === "yes") score += 100;
    else if (a === "partially") score += 50;
  });
  
  return Math.round(score / total);
}

export function getRiskLevel(score: number): { label: string; color: string } {
  if (score >= 80) return { label: "Low Risk", color: "success" };
  if (score >= 60) return { label: "Moderate Risk", color: "warning" };
  return { label: "High Risk", color: "risk" };
}

export function getCategoryScores(answers: Record<number, Answer>, questions: AuditQuestion[]) {
  const cats: Record<string, { total: number; score: number }> = {};
  questions.forEach((q) => {
    if (!cats[q.category]) cats[q.category] = { total: 0, score: 0 };
    const a = answers[q.id];
    if (a) {
      cats[q.category].total++;
      if (a === "yes") cats[q.category].score += 100;
      else if (a === "partially") cats[q.category].score += 50;
    }
  });
  return Object.entries(cats).map(([name, { total, score }]) => ({
    name,
    score: total > 0 ? Math.round(score / total) : 0,
  }));
}
