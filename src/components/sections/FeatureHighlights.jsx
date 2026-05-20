import { motion } from 'framer-motion';
import { Zap, Shield, Workflow, LineChart, Sparkles, Target } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'AI-Powered Analysis',
    description: 'Leverages advanced AI to analyze your resume against 1000+ job requirements in seconds.'
  },
  {
    icon: Target,
    title: 'ATS Score Optimization',
    description: 'Get a detailed ATS compatibility score and specific recommendations to improve it.'
  },
  {
    icon: Workflow,
    title: 'Skill Gap Analysis',
    description: 'Identify missing skills and get targeted suggestions to bridge your experience gaps.'
  },
  {
    icon: LineChart,
    title: 'Keyword Optimization',
    description: 'Discover high-impact keywords from your target job descriptions to include.'
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'Your resume is never stored. All analysis happens securely on your machine.'
  },
  {
    icon: Sparkles,
    title: 'Actionable Insights',
    description: 'Get clear, practical suggestions you can implement immediately.'
  }
];

export default function FeatureHighlights() {
  return (
    <section className="py-20 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-violet-500/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-blue-500/5 blur-3xl" />
      </div>

      <div className="container-center relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-black tracking-tight mb-4">
            Why <span className="text-gradient">HireLens AI?</span>
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Everything you need to create an ATS-optimized resume that actually gets past the screening bots.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group glass-card rounded-2xl p-6 hover:bg-white/8 hover:border-white/20 transition-all duration-300"
              >
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-12 h-12 rounded-xl bg-linear-to-br from-violet-500/20 to-blue-500/20 flex items-center justify-center mb-4 group-hover:from-violet-500/30 group-hover:to-blue-500/30 transition-all"
                >
                  <Icon className="w-6 h-6 text-gradient" />
                </motion.div>

                {/* Content */}
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-white transition-all">
                  {feature.title}
                </h3>
                <p className="text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors">
                  {feature.description}
                </p>

                {/* Accent Line */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-linear-to-b from-violet-500/50 to-transparent rounded-l-2xl group-hover:from-violet-500 transition-all" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
