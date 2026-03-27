import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Bot, Users } from 'lucide-react';

export function AIPolicy() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const policies = [
    {
      icon: Bot,
      statement: 'We use AI to screen resumes (spelling, format checks) but humans review all applications',
      explanation: 'AI tools help us efficiently identify formatting issues and basic qualifications, but every application is personally reviewed by our recruiting team. We believe technology should support, not replace, human judgment in hiring.',
      color: '#0055d5',
    },
    {
      icon: Users,
      statement: 'We do not use AI in interviews or evaluations—all assessments are human-reviewed',
      explanation: 'Every interview, technical assessment, and hiring decision is made by real people. We\'re committed to fair, human-centered evaluation that considers context, potential, and the full picture of each candidate.',
      color: '#E6FF00',
    },
  ];

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-[#3a3a3a] mb-4">Our AI Policy</h2>
        </motion.div>

        <div className="space-y-8">
          {policies.map((policy, index) => (
            <motion.div
              key={index}
              className="relative bg-[#f4f4f4] rounded-3xl p-8 overflow-hidden"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              {/* Decorative Element */}
              <motion.div
                className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10"
                style={{ backgroundColor: policy.color }}
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ delay: index * 0.2 + 0.3, duration: 0.6 }}
              />

              <div className="relative flex flex-col md:flex-row gap-6">
                <motion.div
                  className="flex-shrink-0"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: policy.color,
                      color: policy.color === '#E6FF00' ? '#05183f' : 'white',
                    }}
                  >
                    <policy.icon size={32} />
                  </div>
                </motion.div>

                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[#3a3a3a] mb-3">{policy.statement}</h3>
                  <p className="text-[#4b5563] leading-relaxed">{policy.explanation}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
