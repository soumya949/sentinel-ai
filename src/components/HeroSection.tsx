import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

const HeroSection = ({ onStartAudit }: { onStartAudit: () => void }) => {
  return (
    <section className="bg-background text-foreground">
      <div className="container mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            <a href="https://www.openbox.ai" target="_blank" rel="noopener noreferrer" className="flex items-center">
              <img src="/openbox-logo.svg" alt="OpenBox" className="h-5 mr-2" />
            </a>
            <Shield className="w-4 h-4" />
            AI Safety & Governance Platform
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
            Test Your AI Agent for{" "}
            <span className="text-primary">Hidden Risks</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto">
            Run a 60-second audit to uncover safety, reliability, and
            governance gaps in your AI systems.
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="hero" size="xl" onClick={onStartAudit}>
              Start Free Audit
            </Button>
            <Button variant="hero-outline" size="xl" asChild>
              <a href="https://www.openbox.ai/about" target="_blank" rel="noopener noreferrer">
                Learn More
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
