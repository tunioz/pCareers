import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';

interface FilterTagsProps {
  tags: string[];
  activeTags: string[];
  onTagToggle: (tag: string) => void;
}

export function FilterTags({ tags, activeTags, onTagToggle }: FilterTagsProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section ref={ref} className="py-8 bg-white border-b border-gray-200">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex flex-wrap gap-3">
          {tags.map((tag, index) => {
            const isActive = activeTags.includes(tag);
            return (
              <motion.button
                key={tag}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#0055d5] text-white'
                    : 'bg-[#f4f4f4] text-[#4b5563] hover:bg-[#e5e5e5]'
                }`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onTagToggle(tag)}
              >
                {tag}
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
