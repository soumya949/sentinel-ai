import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Lock, AlertTriangle, Shield, ArrowRight } from "lucide-react";
import { Answer, calculateScore, getRiskLevel, getCategoryScores, quickQuestions } from "@/data/auditQuestions";

interface PartialResultsProps {
  answers: Record<number, Answer>;
  onContinue: () => void;
  onViewBasic: () => void;
}

const PartialResults = ({ answers, onContinue, onViewBasic }: PartialResultsProps) => {
  const score = calculateScore(answers);
  const risk = getRiskLevel(score);
  const categories = getCategoryScores(answers, quickQuestions);

  const detectedIssues = [
    score < 70 && "Insufficient output verification processes",
    categories.find((c) => c.name === "Monitoring" && c.score < 60) && "Limited real-time monitoring coverage",
    categories.find((c) => c.name === "Governance" && c.score < 70) && "Governance framework gaps detected",
  ].filter(Boolean);

  return (
    <section className="py-20 gradient-hero min-h-[80vh] flex items-center">
      <div className="container mx-auto px-6 max-w-3xl">
        {/* Score Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card rounded-2xl p-8 shadow-2xl text-center mb-8"
        >
          <h2 className="text-2xl font-bold text-foreground mb-6">Quick Audit Results</h2>

          <div className="relative w-40 h-40 mx-auto mb-4">
            <svg className="w-40 h-40 -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="50" fill="none" stroke="hsl(var(--border))" strokeWidth="8" />
              <motion.circle
                cx="60" cy="60" r="50" fill="none"
                stroke={`hsl(var(--${risk.color}))`}
                strokeWidth="8" strokeLinecap="round"
                strokeDasharray="314"
                initial={{ strokeDashoffset: 314 }}
                animate={{ strokeDashoffset: 314 - (314 * score) / 100 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.span
                className="text-4xl font-bold text-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {score}
              </motion.span>
              <span className="text-sm text-muted-foreground">/100</span>
            </div>
          </div>

          <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold bg-${risk.color}/10 text-${risk.color}`}>
            <AlertTriangle className="w-4 h-4" />
            {risk.label}
          </span>

          {detectedIssues.length > 0 && (
            <div className="mt-6 text-left">
              <p className="text-sm font-medium text-foreground mb-3">Issues Detected:</p>
              <ul className="space-y-2">
                {detectedIssues.map((issue, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <AlertTriangle className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" />
                    {issue}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>

        {/* Locked Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4 mb-8"
        >
          {["Detailed Risk Breakdown", "Critical Vulnerabilities", "Compliance Gaps"].map((title) => (
            <div key={title} className="relative rounded-2xl border border-border overflow-hidden">
              <div className="blur-locked p-6 bg-card">
                <div className="h-4 bg-muted rounded w-3/4 mb-3" />
                <div className="h-3 bg-muted rounded w-1/2 mb-2" />
                <div className="h-3 bg-muted rounded w-2/3" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-card/30 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Lock className="w-5 h-5" />
                  <span className="font-medium">{title}</span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card rounded-2xl p-8 text-center"
        >
          <Shield className="w-10 h-10 text-primary mx-auto mb-4" />
          <h3 className="text-xl font-bold text-foreground mb-2">
            Your AI may have deeper risks we haven't fully analyzed.
          </h3>
          <p className="text-muted-foreground mb-6">
            Complete the advanced audit to uncover critical vulnerabilities and get a comprehensive report.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="hero" size="lg" onClick={onContinue}>
              Get Full AI Audit <ArrowRight className="w-4 h-4" />
            </Button>
            <Button variant="hero-outline" size="lg" onClick={onViewBasic}>
              View Basic Report
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PartialResults;
