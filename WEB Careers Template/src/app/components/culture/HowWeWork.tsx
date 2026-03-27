import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Users, Zap, Share2, GitMerge, MessageSquare, Play } from 'lucide-react';

export function HowWeWork() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const principles = [
    {
      icon: Users,
      principle: 'Small Teams Big Impact',
      description: 'Lean, autonomous squads with full ownership and decision-making power.',
    },
    {
      icon: Zap,
      principle: 'Ship Fast Learn Faster',
      description: 'Rapid iteration cycles with continuous deployment and instant feedback loops.',
    },
    {
      icon: Share2,
      principle: 'Context Over Control',
      description: 'Share information freely and trust people to make the right decisions.',
    },
    {
      icon: GitMerge,
      principle: 'Cross-Functional Collaboration',
      description: 'Engineers, designers, and product work together from ideation to launch.',
    },
    {
      icon: MessageSquare,
      principle: 'Debate Decide Commit',
      description: 'Healthy discussion before decisions, unified execution after commitment.',
    },
    {
      icon: Play,
      principle: 'Bias for Action',
      description: 'Move quickly, learn from mistakes, and iterate rather than wait for perfection.',
    },
  ];

  return (
    <section ref={ref} className="py-20 bg-[#05183f]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white">
            Built for <span className="text-[#E6FF00]">Performance</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {principles.map((item, index) => (
            <motion.div
              key={item.principle}
              className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 group"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{
                y: -10,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderColor: 'rgba(230, 255, 0, 0.3)',
              }}
            >
              <motion.div
                className="w-14 h-14 bg-[#E6FF00] rounded-full flex items-center justify-center mb-6"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <item.icon size={28} className="text-[#05183f]" />
              </motion.div>
              <h3 className="text-xl font-bold text-white mb-3">{item.principle}</h3>
              <p className="text-white/70 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
