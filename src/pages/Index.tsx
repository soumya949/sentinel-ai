import { useState, useRef } from "react";
import HeroSection from "@/components/HeroSection";
import TrustStrip from "@/components/TrustStrip";
import AuditQuiz from "@/components/AuditQuiz";
import PartialResults from "@/components/PartialResults";
import FinalResults from "@/components/FinalResults";
import { quickQuestions, advancedQuestions, Answer } from "@/data/auditQuestions";

type Phase = "landing" | "quick-audit" | "partial-results" | "advanced-audit" | "final-results";

const Index = () => {
  const [phase, setPhase] = useState<Phase>("landing");
  const [quickAnswers, setQuickAnswers] = useState<Record<number, Answer>>({});
  const [allAnswers, setAllAnswers] = useState<Record<number, Answer>>({});
  const auditRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleStartAudit = () => {
    setPhase("quick-audit");
    setTimeout(scrollToTop, 100);
  };

  const handleQuickComplete = (answers: Record<number, Answer>) => {
    setQuickAnswers(answers);
    setAllAnswers(answers);
    setPhase("partial-results");
    scrollToTop();
  };

  const handleContinueAdvanced = () => {
    setPhase("advanced-audit");
    scrollToTop();
  };

  const handleViewBasic = () => {
    setPhase("final-results");
    scrollToTop();
  };

  const handleAdvancedComplete = (advAnswers: Record<number, Answer>) => {
    setAllAnswers({ ...quickAnswers, ...advAnswers });
    setPhase("final-results");
    scrollToTop();
  };

  if (phase === "quick-audit") {
    return (
      <AuditQuiz
        questions={quickQuestions}
        title="Quick AI Safety Check"
        subtitle="Answer 10 questions for a basic risk estimate"
        startIndex={0}
        totalQuestions={25}
        onComplete={handleQuickComplete}
      />
    );
  }

  if (phase === "partial-results") {
    return (
      <PartialResults
        answers={quickAnswers}
        onContinue={handleContinueAdvanced}
        onViewBasic={handleViewBasic}
      />
    );
  }

  if (phase === "advanced-audit") {
    return (
      <AuditQuiz
        questions={advancedQuestions}
        title="Advanced AI Risk Assessment"
        subtitle="Uncover critical vulnerabilities and governance gaps"
        startIndex={10}
        totalQuestions={25}
        onComplete={handleAdvancedComplete}
      />
    );
  }

  if (phase === "final-results") {
    const isBasicOnly = Object.keys(allAnswers).length <= 10;
    return <FinalResults answers={allAnswers} isBasicOnly={isBasicOnly} />;
  }

  return (
    <div>
      <HeroSection onStartAudit={handleStartAudit} />
      <TrustStrip />
    </div>
  );
};

export default Index;
