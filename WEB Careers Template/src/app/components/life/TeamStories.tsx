import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function TeamStories() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const stories = [
    {
      id: 1,
      name: 'Maria Santos',
      role: 'Senior Backend Engineer',
      photo: 'https://images.unsplash.com/photo-1712174766230-cb7304feaafe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGRldmVsb3BlciUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MzgxMDc4Mnww&ixlib=rb-4.1.0&q=80&w=1080',
      quote: 'The autonomy I have here to architect solutions and the trust the team places in me has been transformative for my career. Every day brings new challenges that push me to grow.',
    },
    {
      id: 2,
      name: 'David Chen',
      role: 'DevOps Engineer',
      photo: 'https://images.unsplash.com/photo-1660074127797-1c429fbb8cd6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBlbmdpbmVlciUyMHBvcnRyYWl0fGVufDF8fHx8MTc3Mzc4NDE0M3ww&ixlib=rb-4.1.0&q=80&w=1080',
      quote: 'Working at pCloud means being part of a mission that matters. We\'re not just building features—we\'re protecting people\'s privacy and that drives everything we do.',
    },
    {
      id: 3,
      name: 'Sarah Anderson',
      role: 'Product Designer',
      photo: 'https://images.unsplash.com/photo-1771072428050-1492abb58f4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGRlc2lnbmVyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzczNzkzMjQ0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      quote: 'The design culture here is incredible. We have the freedom to experiment, the support to learn from failures, and the resources to create experiences that truly delight users.',
    },
    {
      id: 4,
      name: 'James Wilson',
      role: 'Engineering Manager',
      photo: 'https://images.unsplash.com/photo-1713946598467-fcf9332c56ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBtYW5hZ2VyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzczODEwNzgzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      quote: 'Leading a team at pCloud has taught me that great engineering culture isn\'t built—it\'s cultivated. The support from leadership and the passion from the team makes all the difference.',
    },
  ];

  return (
    <section ref={ref} className="bg-[#f4f4f4] py-20">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-[#3a3a3a]">
            Our Team Stories
          </h2>
        </motion.div>

        {/* Story Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {stories.map((story, index) => (
            <motion.div
              key={story.id}
              className="bg-white rounded-3xl p-8 group hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.15, duration: 0.6 }}
            >
              {/* Photo */}
              <div className="flex items-start gap-6 mb-6">
                <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                  <ImageWithFallback
                    src={story.photo}
                    alt={story.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[#3a3a3a] mb-1">{story.name}</h3>
                  <p className="text-[#4b5563]">{story.role}</p>
                </div>
              </div>

              {/* Quote */}
              <blockquote className="text-[#4b5563] leading-relaxed mb-6 italic">
                "{story.quote}"
              </blockquote>

              {/* Read Story Link */}
              <motion.a
                href="#"
                className="inline-flex items-center gap-2 text-[#0055d5] font-semibold group-hover:gap-3 transition-all"
                whileHover={{ x: 5 }}
              >
                Read story
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </motion.a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
