import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Shield, Activity, BarChart3, AlertTriangle } from "lucide-react";

const FloatingCard = ({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    className={`glass-card rounded-2xl p-4 ${className}`}
    style={{ animation: `float 6s ease-in-out ${delay}s infinite` }}
  >
    {children}
  </motion.div>
);

const HeroSection = ({ onStartAudit }: { onStartAudit: () => void }) => {
  return (
    <section className="gradient-hero min-h-[90vh] flex items-center relative overflow-hidden">
      {/* Subtle gradient orbs */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-6">
              <Shield className="w-4 h-4" />
              AI Safety & Governance Platform
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              Test Your AI Agent for{" "}
              <span className="text-primary">Hidden Risks</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg">
              Run a 60-second audit to uncover safety, reliability, and
              governance gaps in your AI systems.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="xl" onClick={onStartAudit}>
                Start Free Audit
              </Button>
              <Button variant="hero-outline" size="xl">
                Learn More
              </Button>
            </div>
          </motion.div>

          {/* Right Visual - Dashboard Mockup */}
          <div className="relative hidden lg:block">
            {/* Main dashboard card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="glass-card rounded-2xl p-6 shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 rounded-full bg-risk" />
                <div className="w-3 h-3 rounded-full bg-warning" />
                <div className="w-3 h-3 rounded-full bg-success" />
                <span className="text-sm text-muted-foreground ml-2">AI Agent Dashboard</span>
              </div>

              {/* Score meter */}
              <div className="text-center mb-6">
                <div className="relative w-32 h-32 mx-auto mb-3">
                  <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="50" fill="none" stroke="hsl(var(--border))" strokeWidth="8" />
                    <circle
                      cx="60" cy="60" r="50" fill="none"
                      stroke="hsl(var(--warning))" strokeWidth="8"
                      strokeDasharray="314" strokeDashoffset="100"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold text-foreground">68</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">Risk Score</p>
              </div>

              {/* Mini analytics */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Input Risk", value: "Low", color: "bg-success/10 text-success" },
                  { label: "Output Risk", value: "Med", color: "bg-warning/10 text-warning" },
                  { label: "Control", value: "High", color: "bg-risk/10 text-risk" },
                ].map((item) => (
                  <div key={item.label} className="bg-muted/50 rounded-xl p-3 text-center">
                    <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${item.color}`}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Floating cards */}
            <FloatingCard className="absolute -top-4 -right-4 w-48" delay={0.4}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Agent Risk</p>
                  <p className="text-sm font-bold text-foreground">Score: 72</p>
                </div>
              </div>
            </FloatingCard>

            <FloatingCard className="absolute -bottom-6 -left-6 w-56" delay={0.6}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-success" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Governance</p>
                  <p className="text-sm font-bold text-foreground">12 Breaches Prevented</p>
                </div>
              </div>
            </FloatingCard>

            <FloatingCard className="absolute top-1/2 -right-10 w-44" delay={0.8}>
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-warning" />
                <p className="text-xs font-medium text-foreground">3 Issues Found</p>
              </div>
            </FloatingCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
