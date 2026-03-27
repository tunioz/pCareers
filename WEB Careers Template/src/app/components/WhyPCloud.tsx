import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { TrendingUp, Globe, Award, Zap } from 'lucide-react';

export function WhyPCloud() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const reasons = [
    {
      icon: TrendingUp,
      title: 'Top 1% Only',
      description:
        'Compensation benchmarked to top tier. Culture and impact that drive excellence.',
      color: '#0055d5',
    },
    {
      icon: Globe,
      title: 'Global Impact',
      description: 'Trusted by 24M+ users. Operating in 195+ countries. Storing 500+ petabytes.',
      color: '#E6FF00',
    },
    {
      icon: Award,
      title: 'Swiss Quality',
      description:
        'Zero-knowledge encryption. Swiss privacy standards. 99.92% uptime track record.',
      color: '#0055d5',
    },
    {
      icon: Zap,
      title: 'Impact, Not Bureaucracy',
      description: 'We ship fast. You own your impact. Autonomy > process.',
      color: '#E6FF00',
    },
  ];

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-[#3a3a3a]">
            Why the <span className="text-[#0055d5]">top 1%</span> choose pCloud
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              className="relative group"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.15, duration: 0.6 }}
            >
              <motion.div
                className="bg-[#f4f4f4] p-8 rounded-3xl h-full relative overflow-hidden"
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                {/* Background accent */}
                <motion.div
                  className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20"
                  style={{ backgroundColor: reason.color }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.3, 0.2],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.5,
                  }}
                />

                <motion.div
                  className="relative z-10"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                    style={{
                      backgroundColor: reason.color,
                      color: reason.color === '#E6FF00' ? '#05183f' : 'white',
                    }}
                  >
                    <reason.icon size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-[#3a3a3a] mb-3">{reason.title}</h3>
                  <p className="text-[#4b5563] text-sm leading-relaxed">{reason.description}</p>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
