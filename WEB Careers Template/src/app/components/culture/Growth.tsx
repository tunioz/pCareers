import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { BookOpen, Users, Rocket, TrendingUp } from 'lucide-react';

export function Growth() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const pillars = [
    {
      icon: BookOpen,
      title: 'Continuous Learning',
      description:
        'Access a $3,000 annual learning budget for courses, conferences, and certifications. Attend industry events, enroll in advanced training programs, and expand your skill set with full company support. We invest in your growth because your development drives our innovation.',
      color: '#0055d5',
    },
    {
      icon: Users,
      title: 'Mentorship & Coaching',
      description:
        'Get paired with senior mentors who guide your career trajectory through regular 1:1 sessions. Join our peer mentorship circles, access leadership coaching programs, and learn from the best minds in the industry. Growth happens faster when you learn from those who have walked the path.',
      color: '#E6FF00',
    },
    {
      icon: Rocket,
      title: 'Real Challenges',
      description:
        'Work on projects that impact 24 million users worldwide. Take ownership of meaningful work that pushes your abilities and expands your expertise. We give you the autonomy to tackle complex problems, make architectural decisions, and see the direct impact of your contributions.',
      color: '#0055d5',
    },
    {
      icon: TrendingUp,
      title: 'Career Ownership',
      description:
        'Define your own career path with transparent progression frameworks and internal mobility opportunities. Whether you want to go deep as an individual contributor or grow into leadership, we provide clear pathways, regular career conversations, and the support to get you there.',
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
            The Path to a <span className="text-[#0055d5]">Better You</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              className="relative p-8 rounded-3xl overflow-hidden group"
              style={{ backgroundColor: pillar.color }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
            >
              {/* Background Pattern */}
              <motion.div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                  backgroundSize: '30px 30px',
                }}
                animate={{
                  backgroundPosition: ['0px 0px', '30px 30px'],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />

              <div className="relative z-10">
                <motion.div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-6 bg-white/20 backdrop-blur-sm"
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                >
                  <pillar.icon
                    size={32}
                    style={{ color: pillar.color === '#E6FF00' ? '#05183f' : 'white' }}
                  />
                </motion.div>
                <h3
                  className="text-2xl font-bold mb-4"
                  style={{ color: pillar.color === '#E6FF00' ? '#05183f' : 'white' }}
                >
                  {pillar.title}
                </h3>
                <p
                  className="leading-relaxed"
                  style={{
                    color: pillar.color === '#E6FF00' ? 'rgba(5, 24, 63, 0.8)' : 'rgba(255, 255, 255, 0.9)',
                  }}
                >
                  {pillar.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
