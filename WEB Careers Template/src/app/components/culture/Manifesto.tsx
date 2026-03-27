import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';

export function Manifesto() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const values = [
    {
      title: 'Freedom With Responsibility',
      description:
        "We give you the autonomy to make decisions, own your projects, and work in ways that bring out your best. But with freedom comes accountability—you're trusted to deliver exceptional results, make smart trade-offs, and act in the best interest of our users and the company. We don't micromanage; we expect you to manage yourself with discipline and integrity.",
      color: '#0055d5',
    },
    {
      title: 'High Standards Always',
      description:
        "Good enough is never good enough at pCloud. We set the bar high because our users trust us with their most important data. Every line of code, every design decision, every customer interaction reflects our commitment to excellence. We challenge each other to do better, think deeper, and ship products that set industry standards rather than follow them.",
      color: '#E6FF00',
    },
    {
      title: 'Radical Transparency',
      description:
        "Information is shared openly and honestly across all levels. We believe that context enables better decisions, so we default to transparency in our communication, our roadmaps, and our challenges. You'll always know where the company is headed, why decisions are made, and how your work contributes to our mission. No politics, no hidden agendas—just honest conversation.",
      color: '#0055d5',
    },
    {
      title: 'Impact Over Process',
      description:
        "We care about outcomes, not activities. We won't bog you down with unnecessary meetings, reports, or bureaucracy. If a process doesn't directly improve our product or serve our users, we eliminate it. You're here to ship meaningful work that changes lives, not to check boxes or follow arbitrary procedures. Move fast, iterate, and make things happen.",
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
            What It Means to Be <span className="text-[#0055d5]">pCloud</span>
          </h2>
        </motion.div>

        <div className="space-y-12">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              className={`flex flex-col lg:flex-row gap-8 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              {/* Color Block */}
              <motion.div
                className="w-full lg:w-1/3 h-48 lg:h-64 rounded-3xl relative overflow-hidden"
                style={{ backgroundColor: value.color }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="text-6xl font-bold"
                    style={{ color: value.color === '#E6FF00' ? '#05183f' : 'white' }}
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ delay: index * 0.2 + 0.3, type: 'spring' }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </motion.div>
                </div>
              </motion.div>

              {/* Content */}
              <div className="w-full lg:w-2/3">
                <h3 className="text-3xl font-bold text-[#3a3a3a] mb-4">{value.title}</h3>
                <p className="text-[#4b5563] text-lg leading-relaxed">{value.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
