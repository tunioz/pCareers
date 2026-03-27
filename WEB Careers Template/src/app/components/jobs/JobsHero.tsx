import { motion } from 'motion/react';

export function JobsHero() {
  return (
    <section className="relative pt-32 pb-12 lg:pt-40 lg:pb-16 overflow-hidden bg-gradient-to-br from-[#0055d5]/5 to-white">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative">
        <div className="text-center max-w-4xl mx-auto">
          <motion.h1
            className="text-5xl lg:text-7xl font-bold text-[#3a3a3a] mb-4 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            What will you build for{' '}
            <span className="text-[#0055d5]">24M+</span> people?
          </motion.h1>
          <motion.p
            className="text-xl text-[#4b5563] mt-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Join our world-class team of builders
          </motion.p>
        </div>
      </div>
    </section>
  );
}
