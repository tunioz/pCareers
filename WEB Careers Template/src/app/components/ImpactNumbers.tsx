import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';

export function ImpactNumbers() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const stats = [
    { number: '24M+', label: 'Users worldwide' },
    { number: '195+', label: 'Countries' },
    { number: '500+', label: 'Petabytes Stored' },
    { number: '13+', label: 'Years of Excellence' },
    { number: '99.92%', label: 'Uptime' },
  ];

  return (
    <section ref={ref} className="py-20 bg-[#0055d5]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <motion.div
                className="text-4xl lg:text-5xl font-bold text-[#E6FF00] mb-2"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.5, type: 'spring' }}
              >
                {stat.number}
              </motion.div>
              <div className="text-white/80 text-sm lg:text-base">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
