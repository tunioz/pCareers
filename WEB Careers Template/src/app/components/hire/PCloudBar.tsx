import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { CheckCircle } from 'lucide-react';

export function PCloudBar() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const criteria = [
    {
      title: 'Technical Excellence',
      description: 'Deep expertise in your domain, proven track record of solving complex technical challenges, and continuous learning.',
    },
    {
      title: 'Product Thinking',
      description: 'Understanding user needs, thinking holistically about features, and balancing technical decisions with business impact.',
    },
    {
      title: 'Ownership & Initiative',
      description: 'Taking responsibility for outcomes, driving projects forward independently, and going beyond assigned tasks.',
    },
    {
      title: 'Communication Clarity',
      description: 'Articulating complex ideas simply, writing clearly, and communicating effectively across technical and non-technical audiences.',
    },
    {
      title: 'Collaborative Impact',
      description: 'Elevating team performance, sharing knowledge generously, and creating positive working relationships.',
    },
    {
      title: 'Values Alignment',
      description: 'Commitment to privacy, security, quality, and user trust — the core principles that define pCloud.',
    },
  ];

  return (
    <section ref={ref} className="py-20 bg-[#f4f4f4]">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-[#3a3a3a] mb-4">The pCloud Bar</h2>
          <p className="text-lg text-[#4b5563] max-w-3xl mx-auto">
            Standards we evaluate against, not a checklist. We're looking for top 1% talent, but we value diverse backgrounds and experiences.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {criteria.map((criterion, index) => (
            <motion.div
              key={criterion.title}
              className="bg-white rounded-3xl p-6 border border-gray-200"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0, 85, 213, 0.1)' }}
            >
              <div className="flex items-start gap-4">
                <motion.div
                  className="flex-shrink-0"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <CheckCircle className="text-[#0055d5]" size={24} />
                </motion.div>
                <div>
                  <h3 className="text-lg font-bold text-[#3a3a3a] mb-2">{criterion.title}</h3>
                  <p className="text-[#4b5563] leading-relaxed">{criterion.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
