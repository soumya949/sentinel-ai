import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle, XCircle, Shield,
  TrendingUp
} from "lucide-react";
import {
  Answer, calculateScore, getRiskLevel, getCategoryScores,
  quickQuestions, advancedQuestions,
} from "@/data/auditQuestions";

interface FinalResultsProps {
  answers: Record<number, Answer>;
  isBasicOnly?: boolean;
}

const allQuestions = [...quickQuestions, ...advancedQuestions];

const FinalResults = ({ answers, isBasicOnly }: FinalResultsProps) => {
  const questions = isBasicOnly ? quickQuestions : allQuestions;
  const score = calculateScore(answers);
  const risk = getRiskLevel(score);
  const categories = getCategoryScores(answers, questions);
  const improvedScore = Math.min(100, score + 23);
  const scoreDelta = Math.max(0, improvedScore - score);

  const projectCategoryScore = (current: number) => {
    const gap = 100 - current;
    const boost = Math.min(35, Math.max(10, Math.round(gap * 0.45)));
    return Math.min(100, current + boost);
  };

  const projectedCategories = [...categories]
    .map((c) => {
      const projected = projectCategoryScore(c.score);
      return { ...c, projected, delta: Math.max(0, projected - c.score) };
    })
    .sort((a, b) => b.delta - a.delta);

  const criticalIssues = [
    categories.find((c) => c.name === "Monitoring" && c.score < 60) && "No real-time monitoring detected",
    categories.find((c) => c.name === "Output Risk" && c.score < 70) && "No output verification system",
    categories.find((c) => c.name === "Control Risk" && c.score < 60) && "No action approval system",
    categories.find((c) => c.name === "Governance" && c.score < 70) && "Governance framework incomplete",
    categories.find((c) => c.name === "Input Risk" && c.score < 60) && "Input validation gaps",
  ].filter(Boolean);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6 max-w-4xl">
        {isBasicOnly && (
          <div className="mb-12">
            <p className="font-semibold text-primary mb-2">AI Safety & Governance</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
              Audit Report
            </h1>
            <p className="text-muted-foreground mt-3 max-w-2xl">
              This summary is based on your responses. Explore where OpenBox can improve safety, visibility, and control.
            </p>
          </div>
        )}

        {/* Score */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-2xl p-10 shadow-lg text-center mb-8"
        >
          <div className="mb-8">
            <p className="font-semibold text-primary mb-2">Risk Assessment</p>
            <h2 className="text-3xl font-bold text-foreground">
              Your AI Safety Score
            </h2>
          </div>
          <div className="relative w-48 h-48 mx-auto mb-6">
            <svg className="w-48 h-48 -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="50" fill="none" stroke="hsl(var(--border))" strokeWidth="10" />
              <motion.circle
                cx="60" cy="60" r="50" fill="none"
                stroke={`hsl(var(--${risk.color}))`}
                strokeWidth="10" strokeLinecap="round"
                strokeDasharray="314"
                initial={{ strokeDashoffset: 314 }}
                animate={{ strokeDashoffset: 314 - (314 * score) / 100 }}
                transition={{ duration: 2, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.span
                className="text-5xl font-bold text-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                {score}
              </motion.span>
              <span className="text-muted-foreground">/100</span>
            </div>
          </div>

          {/* Risk bar */}
          <div className="max-w-md mx-auto mb-4">
            <div className="h-3 rounded-full bg-muted overflow-hidden flex">
              <div className="bg-risk h-full" style={{ width: "33%" }} />
              <div className="bg-warning h-full" style={{ width: "34%" }} />
              <div className="bg-success h-full" style={{ width: "33%" }} />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>High Risk</span>
              <span>Moderate</span>
              <span>Low Risk</span>
            </div>
          </div>

          <span className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold bg-${risk.color}/10 text-${risk.color}`}>
            <AlertTriangle className="w-4 h-4" />
            {risk.label}
          </span>
        </motion.div>

        {/* Category Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8"
        >
          {categories.map((cat, i) => {
            const catRisk = getRiskLevel(cat.score);
            return (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="bg-card border border-border rounded-2xl p-6 shadow-lg"
              >
                <h4 className="font-semibold text-foreground mb-3">{cat.name}</h4>
                <div className="flex items-end gap-2 mb-2">
                  <span className="text-3xl font-bold text-foreground">{cat.score}</span>
                  <span className="text-muted-foreground text-sm mb-1">/100</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full bg-${catRisk.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${cat.score}%` }}
                    transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Critical Issues */}
        {criticalIssues.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-card border border-border rounded-2xl p-8 mb-8"
          >
            <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <XCircle className="w-6 h-6 text-risk" />
              Critical Issues Found
            </h3>
            <ul className="space-y-3">
              {criticalIssues.map((issue, i) => (
                <li key={i} className="flex items-start gap-3 p-3 rounded-xl bg-risk/5 border border-risk/10">
                  <AlertTriangle className="w-5 h-5 text-risk mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{issue}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Improvement Simulation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-card border border-border rounded-2xl p-8 mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-6 h-6 text-primary" />
            <h3 className="text-xl font-bold text-foreground">Improvement Simulation</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            Focus on your overall score first, then drill into the biggest improvement areas.
          </p>
          <div className="rounded-xl border border-border bg-background p-5 max-w-3xl mx-auto">
            <div className="mb-5">
              <p className="text-xs font-medium text-muted-foreground">Overall score</p>
              <div className="mt-2 grid gap-3 sm:grid-cols-3 items-end">
                <div>
                  <p className="text-xs text-muted-foreground">Without OpenBox</p>
                  <p className={`text-4xl font-bold text-${risk.color}`}>{score}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">With OpenBox</p>
                  <p className="text-4xl font-bold" style={{ color: "hsl(var(--success))" }}>{improvedScore}</p>
                </div>
                <div className="sm:text-right">
                  <p className="text-xs text-muted-foreground">Difference</p>
                  <p className="text-2xl font-semibold" style={{ color: "hsl(var(--success))" }}>+{scoreDelta}</p>
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-4">
              <div className="grid grid-cols-4 gap-3 text-xs font-medium text-muted-foreground mb-3">
                <span>Area</span>
                <span className="text-right">Without OpenBox</span>
                <span className="text-right">With OpenBox</span>
                <span className="text-right">Difference</span>
              </div>
              <div className="space-y-2">
                {projectedCategories.map((c) => (
                  <div key={c.name} className="grid grid-cols-4 gap-3 items-center">
                    <span className="text-sm font-medium text-foreground">{c.name}</span>
                    <span className="text-sm text-muted-foreground text-right">{c.score}</span>
                    <span className="text-sm text-muted-foreground text-right">{c.projected}</span>
                    <span className="text-sm font-semibold text-right" style={{ color: "hsl(var(--success))" }}>
                      +{c.delta}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-card border border-border rounded-2xl p-8 text-center mb-16"
        >
          <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-foreground mb-2">Secure Your AI Systems</h3>
          <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
            Protect your AI agents with OpenBox.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-2 w-full max-w-md mx-auto">
            <Button variant="hero" size="default" className="px-5" asChild>
              <a
                href="https://docs.openbox.ai"
                target="_blank"
                rel="noopener noreferrer"
              >
                Secure Your AI
              </a>
            </Button>
            <Button variant="hero-outline" size="default" className="px-5" asChild>
              <a
                href="https://calendly.com/openbox-ai/30min?month=2026-04"
                target="_blank"
                rel="noopener noreferrer"
              >
                Book Demo
              </a>
            </Button>
          </div>
        </motion.div>

        {/* Footer */}
        <footer className="border-t border-border pt-8 pb-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              <span className="font-semibold text-foreground">OpenBox</span>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">Privacy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms</a>
              <a href="#" className="hover:text-primary transition-colors">Contact</a>
              <a href="#" className="hover:text-primary transition-colors">Blog</a>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2026 OpenBox. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default FinalResults;
