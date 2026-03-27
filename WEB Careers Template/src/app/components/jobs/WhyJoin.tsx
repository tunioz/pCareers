import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { DollarSign, Zap, TrendingUp, Clock } from 'lucide-react';

export function WhyJoin() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const benefits = [
    {
      icon: DollarSign,
      title: 'Top 1% Compensation',
      description: 'Market-rate salaries, competitive equity packages, performance bonuses',
      color: '#0055d5',
    },
    {
      icon: Zap,
      title: 'Real Impact',
      description: 'Serving 24M+ users, leading Swiss privacy standards, trusted by millions globally',
      color: '#E6FF00',
    },
    {
      icon: TrendingUp,
      title: 'Continuous Growth',
      description: 'Training budgets, mentorship programs, challenging projects, career development',
      color: '#0055d5',
    },
    {
      icon: Clock,
      title: 'Work-Life Balance',
      description: 'Flexible hours, remote-friendly, generous paid time off, wellness support',
      color: '#E6FF00',
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
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Build Something That <span className="text-[#E6FF00]">Matters</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -10, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            >
              <motion.div
                className="w-14 h-14 rounded-full flex items-center justify-center mb-6"
                style={{
                  backgroundColor: benefit.color,
                  color: benefit.color === '#E6FF00' ? '#05183f' : 'white',
                }}
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <benefit.icon size={28} />
              </motion.div>
              <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
              <p className="text-white/70 leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
