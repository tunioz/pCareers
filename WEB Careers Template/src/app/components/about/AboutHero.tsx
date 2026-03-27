import { motion } from 'motion/react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function AboutHero() {
  return (
    <section className="relative min-h-[650px] flex items-end overflow-hidden pt-32">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1758873268663-5a362616b5a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB0ZWFtJTIwY29sbGFib3JhdGlvbiUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NzM5MDA0ODh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="About pCloud"
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
              ABOUT PCLOUD
            </div>
          </motion.div>

          <motion.h1
            className="text-white text-[72px] font-bold leading-[72px] mb-6"
            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
          >
            We build the world's most{' '}
            <span className="block">trusted cloud storage.</span>
          </motion.h1>

          <motion.p
            className="text-white text-lg leading-7 opacity-90 mb-6 max-w-[448px]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Founded with a mission to empower individuals and businesses with secure, reliable cloud storage solutions that protect privacy and enhance productivity.
          </motion.p>

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
              See open roles
            </motion.button>
            <motion.button
              className="border border-white/30 text-white px-8 h-[56px] rounded-full text-base font-semibold hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Read our story
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}