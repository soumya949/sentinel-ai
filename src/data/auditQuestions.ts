export interface AuditQuestion {
  id: number;
  question: string;
  category: string;
}

export const quickQuestions: AuditQuestion[] = [
  { id: 1, question: "Does your AI agent have defined input validation rules?", category: "Input Risk" },
  { id: 2, question: "Are outputs verified before being sent to end users?", category: "Output Risk" },
  { id: 3, question: "Is there a human-in-the-loop for critical decisions?", category: "Control Risk" },
  { id: 4, question: "Do you have real-time monitoring for AI behavior?", category: "Monitoring" },
  { id: 5, question: "Are AI actions logged and auditable?", category: "Governance" },
  { id: 6, question: "Is there a rollback mechanism for AI decisions?", category: "Control Risk" },
  { id: 7, question: "Does your AI have rate limiting on actions?", category: "Input Risk" },
  { id: 8, question: "Are edge cases tested in your AI pipeline?", category: "Output Risk" },
  { id: 9, question: "Do you have an incident response plan for AI failures?", category: "Governance" },
  { id: 10, question: "Is your AI compliant with relevant regulations?", category: "Governance" },
];

export const advancedQuestions: AuditQuestion[] = [
  { id: 11, question: "Does your AI system detect and handle adversarial inputs?", category: "Input Risk" },
  { id: 12, question: "Are there automated tests for AI output quality?", category: "Output Risk" },
  { id: 13, question: "Is there multi-level approval for high-risk AI actions?", category: "Control Risk" },
  { id: 14, question: "Do you track model drift over time?", category: "Monitoring" },
  { id: 15, question: "Are AI decisions explainable to stakeholders?", category: "Governance" },
  { id: 16, question: "Is there a data provenance trail for training data?", category: "Input Risk" },
  { id: 17, question: "Are outputs checked for bias and fairness?", category: "Output Risk" },
  { id: 18, question: "Do you have sandboxed environments for AI testing?", category: "Control Risk" },
  { id: 19, question: "Are system health metrics monitored in real-time?", category: "Monitoring" },
  { id: 20, question: "Is there a formal AI ethics review process?", category: "Governance" },
  { id: 21, question: "Does your system handle graceful degradation?", category: "Control Risk" },
  { id: 22, question: "Are third-party AI components audited?", category: "Input Risk" },
  { id: 23, question: "Do you have SLAs for AI response accuracy?", category: "Output Risk" },
  { id: 24, question: "Is there continuous security scanning on AI endpoints?", category: "Monitoring" },
  { id: 25, question: "Do you conduct regular AI risk assessments?", category: "Governance" },
];

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
