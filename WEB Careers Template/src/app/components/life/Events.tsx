import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Calendar, Users, Trophy, Coffee } from 'lucide-react';

export function Events() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const events = [
    {
      id: 1,
      icon: Users,
      date: 'First Friday of Every Month',
      title: 'Monthly All-Hands',
      description: 'Company-wide meeting where we share updates, celebrate wins, and align on our goals for the upcoming month.',
      color: '#0055d5',
    },
    {
      id: 2,
      icon: Trophy,
      date: 'Quarterly',
      title: 'Hackathons',
      description: '48-hour innovation sprints where teams work on passion projects, experiment with new technologies, and compete for fun prizes.',
      color: '#E6FF00',
    },
    {
      id: 3,
      icon: Calendar,
      date: 'Annual',
      title: 'Company Retreat',
      description: 'A week-long off-site where the entire company gathers to collaborate, connect, and celebrate our achievements together.',
      color: '#0055d5',
    },
    {
      id: 4,
      icon: Coffee,
      date: 'Weekly',
      title: 'Team Lunches & Socials',
      description: 'Regular team gatherings for lunch, coffee, or after-work activities to build relationships beyond work.',
      color: '#E6FF00',
    },
  ];

  return (
    <section ref={ref} className="bg-[#05183f] py-20">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white">
            Events & Community
          </h2>
        </motion.div>

        {/* Event Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 group hover:bg-white/10 transition-all"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -5 }}
            >
              {/* Icon */}
              <motion.div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                style={{
                  backgroundColor: event.color,
                  color: event.color === '#E6FF00' ? '#05183f' : 'white',
                }}
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <event.icon size={28} />
              </motion.div>

              {/* Date Badge */}
              <div className="inline-block px-4 py-1 bg-white/10 rounded-full text-white/70 text-sm mb-4">
                {event.date}
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-white mb-3">{event.title}</h3>
              <p className="text-white/70 leading-relaxed">{event.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
