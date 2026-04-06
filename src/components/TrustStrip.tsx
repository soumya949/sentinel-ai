import { motion } from "framer-motion";
import { ShieldCheck, BarChart2, Eye, Scale } from "lucide-react";

const features = [
  { icon: ShieldCheck, title: "Detect AI Risks", desc: "Identify vulnerabilities in your AI agents" },
  { icon: BarChart2, title: "Get Reliability Score", desc: "Quantify your system's safety posture" },
  { icon: Eye, title: "Identify Blind Spots", desc: "Uncover hidden failure modes" },
  { icon: Scale, title: "Improve Governance", desc: "Ensure compliance and accountability" },
];

const TrustStrip = () => (
  <section className="py-20 bg-card">
    <div className="container mx-auto px-6">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group p-6 rounded-2xl border border-border/50 hover:border-primary/20 hover:shadow-lg transition-all duration-300 bg-card"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <f.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
            <p className="text-sm text-muted-foreground">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustStrip;
