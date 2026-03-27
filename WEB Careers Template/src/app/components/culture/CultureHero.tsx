import { motion } from 'motion/react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function CultureHero() {
  return (
    <section className="relative min-h-[650px] flex items-end overflow-hidden pt-32">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMG9mZmljZXxlbnwxfHx8fDE3NzM4MzA4NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Culture at pCloud"
          className="absolute max-w-none object-cover size-full"
        />
        <div className="absolute bg-gradient-to-r from-[#0055d5] from-[40%] inset-0 to-[40%] to-[rgba(0,85,213,0)] px-[0px] pt-[80px] pb-[0px]" />
      </div>

      {/* Content */}
      <div className="relative w-full max-w-[1280px] mx-auto px-20 pb-20">
        <div className="max-w-[550px]">
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-white text-xs font-semibold uppercase tracking-[1.2px] opacity-80 mb-6">
              CULTURE AT PCLOUD
            </div>
          </motion.div>

          <motion.h1
            className="text-white text-[72px] font-bold leading-[72px] mb-6"
            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
          >
            Become a <span className="block">Better You</span>
          </motion.h1>

          <motion.div
            className="flex gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <motion.button
              className="bg-[#0055d5] text-white px-8 h-[56px] rounded-full flex items-center justify-center gap-2 text-base font-semibold hover:bg-[#0044aa] transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Open Roles
            </motion.button>
            <motion.button
              className="border border-white/30 text-white px-8 h-[56px] rounded-full text-base font-semibold hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              See Our Benefits
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}