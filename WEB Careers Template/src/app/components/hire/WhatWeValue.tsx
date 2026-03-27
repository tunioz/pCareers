import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function WhatWeValue() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const values = [
    {
      title: 'Problem-Solving Ability',
      description: 'We seek candidates who can identify complex challenges, break them down systematically, and develop innovative solutions that create real impact.',
      image: 'https://images.unsplash.com/photo-1759643808386-66f61b88e29d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9ibGVtJTIwc29sdmluZyUyMHN0cmF0ZWd5JTIwcHV6emxlfGVufDF8fHx8MTc3MzgzODc5NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      title: 'Communication & Collaboration',
      description: 'Clear communication and effective teamwork are essential. We value those who can articulate ideas, listen actively, and work seamlessly with diverse teams.',
      image: 'https://images.unsplash.com/photo-1758873269276-9518d0cb4a0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMGNvbW11bmljYXRpb24lMjBtZWV0aW5nfGVufDF8fHx8MTc3MzgzODc5Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      title: 'Growth Mindset',
      description: 'We look for continuous learners who embrace challenges, adapt quickly to new technologies, and constantly seek to improve their skills and knowledge.',
      image: 'https://images.unsplash.com/photo-1746021375246-7dc8ab0583f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncm93dGglMjBtaW5kc2V0JTIwbGVhcm5pbmclMjBib29rc3xlbnwxfHx8fDE3NzM4Mzg3OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      title: 'Attention to Detail',
      description: 'Precision and thoroughness matter. We value candidates who take pride in their work, ensuring quality and excellence in every deliverable.',
      image: 'https://images.unsplash.com/photo-1673141531727-e4a7c642f3b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdHRlbnRpb24lMjBkZXRhaWwlMjBwcmVjaXNpb24lMjBxdWFsaXR5fGVufDF8fHx8MTc3MzgzODc5Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      title: 'Passion for Quality',
      description: 'A commitment to excellence drives everything we do. We seek those who are dedicated to shipping high-quality work that users love and trust.',
      image: 'https://images.unsplash.com/photo-1761178334145-76c3d8ac30dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxleGNlbGxlbmNlJTIwcXVhbGl0eSUyMGF3YXJkJTIwYWNoaWV2ZW1lbnR8ZW58MXx8fHwxNzczODM4Nzk3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
  ];

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-[#3a3a3a] mb-4">
            What We Value in Candidates
          </h2>
        </motion.div>

        {/* Horizontal Carousel */}
        <div className="overflow-x-auto scrollbar-hide -mx-6 px-6 lg:-mx-12 lg:px-12">
          <div className="flex gap-6 min-w-max pb-4">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="bg-[#e5e7eb] w-[320px] h-[380px] rounded-3xl overflow-hidden p-8 flex flex-col justify-end relative flex-shrink-0"
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <ImageWithFallback
                    src={value.image}
                    alt={value.title}
                    className="absolute h-full left-[-75%] max-w-none top-0 w-[250%] object-cover"
                  />
                </div>
                <div className="absolute bg-gradient-to-b from-[24%] from-[rgba(0,38,77,0)] inset-0 opacity-60 to-[#00264d]" />
                <div className="relative z-10 pb-2">
                  <h3 className="text-2xl font-bold text-white leading-tight mb-3">{value.title}</h3>
                  <p className="text-white/90 text-sm leading-relaxed">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Pagination Dots */}
        <motion.div
          className="flex justify-center gap-2 mt-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          {values.map((_, index) => (
            <button
              key={index}
              className="w-2.5 h-2.5 rounded-full bg-[#d1d5db] hover:bg-[#0055d5] transition-colors"
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}