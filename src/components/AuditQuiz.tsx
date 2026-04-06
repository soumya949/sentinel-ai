import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight, Check, Circle, CircleDot } from "lucide-react";
import { AuditQuestion, Answer } from "@/data/auditQuestions";

interface AuditQuizProps {
  questions: AuditQuestion[];
  title: string;
  subtitle: string;
  startIndex: number;
  totalQuestions: number;
  onComplete: (answers: Record<number, Answer>) => void;
}

const AuditQuiz = ({ questions, title, subtitle, startIndex, totalQuestions, onComplete }: AuditQuizProps) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, Answer>>({});

  const question = questions[currentQ];
  const progress = ((startIndex + currentQ) / totalQuestions) * 100;
  const options: { value: Answer; label: string }[] = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
    { value: "partially", label: "Partially" },
  ];

  const handleAnswer = (answer: Answer) => {
    const updated = { ...answers, [question.id]: answer };
    setAnswers(updated);

    if (currentQ < questions.length - 1) {
      setTimeout(() => setCurrentQ((p) => p + 1), 300);
    }
  };

  const canFinish = Object.keys(answers).length === questions.length;

  return (
    <section className="py-20 gradient-hero min-h-[80vh] flex items-center">
      <div className="container mx-auto px-6 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-8 shadow-2xl"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">{title}</h2>
            <p className="text-muted-foreground">{subtitle}</p>
          </div>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Question {startIndex + currentQ + 1}</span>
              <span>{startIndex + currentQ + 1}/{totalQuestions}</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full gradient-primary rounded-full"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Question */}
          <AnimatePresence mode="wait">
            <motion.div
              key={question.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-2">
                <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                  {question.category}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-6">
                {question.question}
              </h3>

              <div className="space-y-3">
                {options.map((opt) => {
                  const selected = answers[question.id] === opt.value;
                  return (
                    <button
                      key={opt.value}
                      onClick={() => handleAnswer(opt.value)}
                      className={`w-full flex items-center gap-3 p-4 rounded-xl border transition-all duration-200 text-left ${
                        selected
                          ? "border-primary bg-primary/5 shadow-sm"
                          : "border-border hover:border-primary/30 hover:bg-muted/50"
                      }`}
                    >
                      {selected ? (
                        <CircleDot className="w-5 h-5 text-primary flex-shrink-0" />
                      ) : (
                        <Circle className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                      )}
                      <span className={`font-medium ${selected ? "text-primary" : "text-foreground"}`}>
                        {opt.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <Button
              variant="ghost"
              onClick={() => setCurrentQ((p) => Math.max(0, p - 1))}
              disabled={currentQ === 0}
            >
              Back
            </Button>
            {currentQ < questions.length - 1 ? (
              <Button
                variant="default"
                onClick={() => setCurrentQ((p) => p + 1)}
                disabled={!answers[question.id]}
              >
                Next <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button variant="hero" onClick={() => onComplete(answers)} disabled={!canFinish}>
                <Check className="w-4 h-4" /> View Results
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AuditQuiz;
