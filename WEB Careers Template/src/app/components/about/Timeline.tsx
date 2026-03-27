import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Calendar } from 'lucide-react';

export function Timeline() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const milestones = [
    {
      year: '2013',
      milestone: 'pCloud founded in Switzerland with mission to protect digital privacy',
    },
    {
      year: '2015',
      milestone: 'Reached 1 million users and launched mobile apps for iOS and Android',
    },
    {
      year: '2017',
      milestone: 'Introduced pCloud Encryption with zero-knowledge architecture',
    },
    {
      year: '2019',
      milestone: 'Expanded to 10M+ users and opened data centers in Luxembourg and Dallas',
    },
    {
      year: '2021',
      milestone: 'Achieved 99.92% uptime and launched pCloud Pass password manager',
    },
    {
      year: '2023',
      milestone: 'Surpassed 20M users and 400 petabytes of stored data worldwide',
    },
    {
      year: '2026',
      milestone: 'Serving 24M+ users across 195 countries with 500+ petabytes capacity',
    },
  ];

  return (
    <section ref={ref} className="py-20 bg-[#05183f] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            13+ years of <span className="text-[#E6FF00]">building trust</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#E6FF00]/20 hidden lg:block" />

          <div className="space-y-12">
            {milestones.map((item, index) => (
              <motion.div
                key={item.year}
                className={`flex flex-col lg:flex-row gap-8 items-center ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.2, duration: 0.6 }}
              >
                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                  <motion.div
                    className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl"
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-[#E6FF00] text-3xl font-bold mb-2">{item.year}</div>
                    <p className="text-white/80">{item.milestone}</p>
                  </motion.div>
                </div>

                {/* Center Icon */}
                <motion.div
                  className="relative z-10"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ delay: index * 0.2 + 0.3, type: 'spring' }}
                >
                  <motion.div
                    className="w-16 h-16 bg-[#E6FF00] rounded-full flex items-center justify-center"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Calendar className="text-[#05183f]" size={28} />
                  </motion.div>
                </motion.div>

                {/* Spacer for opposite side */}
                <div className="flex-1 hidden lg:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
