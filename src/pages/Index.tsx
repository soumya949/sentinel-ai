import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import TrustStrip from "@/components/TrustStrip";
import AuditQuiz from "@/components/AuditQuiz";
import PartialResults from "@/components/PartialResults";
import FinalResults from "@/components/FinalResults";
import { Button } from "@/components/ui/button";
import { quickQuestions, Answer } from "@/data/auditQuestions";

type Phase = "landing" | "quick-audit" | "partial-results" | "final-results" | "ineligible";

const Index = () => {
  const [phase, setPhase] = useState<Phase>("landing");
  const [quickAnswers, setQuickAnswers] = useState<Record<number, Answer>>({});
  const [allAnswers, setAllAnswers] = useState<Record<number, Answer>>({});

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleStartAudit = () => {
    setPhase("quick-audit");
    setTimeout(scrollToTop, 100);
  };

  const handleQuickComplete = (answers: Record<number, Answer>) => {
    setQuickAnswers(answers);
    setAllAnswers(answers);

    if (answers[1] === "no" && answers[2] === "no") {
      setPhase("ineligible");
      scrollToTop();
      return;
    }

    setPhase("final-results");
    scrollToTop();
  };

  const handleViewBasic = () => {
    setPhase("final-results");
    scrollToTop();
  };

  const handleRetakeAudit = () => {
    setQuickAnswers({});
    setAllAnswers({});
    setPhase("quick-audit");
    scrollToTop();
  };

  if (phase === "quick-audit") {
    return (
      <AuditQuiz
        questions={quickQuestions}
        title="Quick AI Safety Check"
        subtitle="Answer the audit questions for a basic risk estimate"
        startIndex={0}
        totalQuestions={10}
        onComplete={handleQuickComplete}
      />
    );
  }

  if (phase === "partial-results") {
    return (
      <PartialResults
        answers={quickAnswers}
        onViewBasic={handleViewBasic}
      />
    );
  }

  if (phase === "ineligible") {
    return (
      <section className="py-20 gradient-hero min-h-[80vh] flex items-center">
        <div className="container mx-auto px-6 max-w-2xl">
          <div className="glass-card rounded-2xl p-8 shadow-2xl text-center">
            <h2 className="text-2xl font-bold text-foreground mb-3">Audit Could Not Be Completed</h2>
            <p className="text-muted-foreground mb-6">
              Audit could not be done because no AI usage was found.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                variant="hero-outline"
                size="lg"
                className="min-w-[200px]"
                onClick={handleRetakeAudit}
              >
                Start New Audit
              </Button>
              <Button variant="hero" size="lg" className="min-w-[200px]" asChild>
                <a href="https://www.openbox.ai">
                  Go to OpenBox
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
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
