import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Target, Eye, CheckCircle, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function Strengths() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

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
            Security and privacy are not features.{' '}
            <span className="text-[#0055d5]">They're our foundation.</span>
          </h2>
        </motion.div>

        {/* Horizontal Carousel */}
        <div className="overflow-x-auto scrollbar-hide -mx-6 px-6 lg:-mx-12 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {/* Card 1 - Zero-Knowledge Encryption */}
            <motion.div
              className="bg-[#e5e7eb] w-full h-[280px] rounded-3xl overflow-hidden p-6 flex flex-col justify-end relative"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1638645540399-40229456a236?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbmNyeXB0aW9uJTIwc2VjdXJpdHklMjBsb2NrJTIwc2hpZWxkfGVufDF8fHx8MTc3MzgzNzA5NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Zero-Knowledge Encryption"
                  className="absolute h-full left-[-75%] max-w-none top-0 w-[250%] object-cover"
                />
              </div>
              <div className="absolute bg-gradient-to-b from-[24%] from-[rgba(0,38,77,0)] inset-0 opacity-60 to-[#00264d]" />
              <div className="relative z-10 pb-2">
                <h3 className="text-xl font-bold text-white leading-tight">Zero-Knowledge Encryption</h3>
              </div>
            </motion.div>

            {/* Card 2 - Swiss Privacy Standards */}
            <motion.div
              className="bg-[#e5e7eb] w-full h-[280px] rounded-3xl overflow-hidden p-6 flex flex-col justify-end relative"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1640022578241-4a3275e7ffce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2lzcyUyMGFscHMlMjBtb3VudGFpbnMlMjBzd2l0emVybGFuZHxlbnwxfHx8fDE3NzM4MzcwOTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Swiss Privacy Standards"
                  className="absolute h-full left-[-75%] max-w-none top-0 w-[250%] object-cover"
                />
              </div>
              <div className="absolute bg-gradient-to-b from-[24%] from-[rgba(0,38,77,0)] inset-0 opacity-60 to-[#00264d]" />
              <div className="relative z-10 pb-2">
                <h3 className="text-xl font-bold text-white leading-tight">Swiss Privacy Standards</h3>
              </div>
            </motion.div>

            {/* Card 3 - 99.92% Uptime */}
            <motion.div
              className="bg-[#e5e7eb] w-full h-[280px] rounded-3xl overflow-hidden p-6 flex flex-col justify-end relative"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1548544027-1a96c4c24c7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZXJ2ZXIlMjB1cHRpbWUlMjBuZXR3b3JrJTIwaW5mcmFzdHJ1Y3R1cmV8ZW58MXx8fHwxNzczODM3MDk1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="99.92% Uptime"
                  className="absolute h-full left-[-75%] max-w-none top-0 w-[250%] object-cover"
                />
              </div>
              <div className="absolute bg-gradient-to-b from-[24%] from-[rgba(0,38,77,0)] inset-0 opacity-60 to-[#00264d]" />
              <div className="relative z-10 pb-2">
                <h3 className="text-xl font-bold text-white leading-tight">99.92% Uptime</h3>
              </div>
            </motion.div>

            {/* Card 4 - 500+ Petabytes of Trust */}
            <motion.div
              className="bg-[#e5e7eb] w-full h-[280px] rounded-3xl overflow-hidden p-6 flex flex-col justify-end relative"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1599678927496-7afcfda4f0ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwY2VudGVyJTIwc3RvcmFnZSUyMHNlcnZlcnN8ZW58MXx8fHwxNzczODM3MDk1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="500+ Petabytes of Trust"
                  className="absolute h-full left-[-75%] max-w-none top-0 w-[250%] object-cover"
                />
              </div>
              <div className="absolute bg-gradient-to-b from-[24%] from-[rgba(0,38,77,0)] inset-0 opacity-60 to-[#00264d]" />
              <div className="relative z-10 pb-2">
                <h3 className="text-xl font-bold text-white leading-tight">500+ Petabytes of Trust</h3>
              </div>
            </motion.div>

            {/* Card 5 - Top 1% Team */}
            <motion.div
              className="bg-[#e5e7eb] w-full h-[280px] rounded-3xl overflow-hidden p-6 flex flex-col justify-end relative"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1562577308-c8b2614b9b9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGl0ZSUyMHRlYW0lMjBwcm9mZXNzaW9uYWxzJTIwY29sbGFib3JhdGlvbnxlbnwxfHx8fDE3NzM4MzcwOTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Top 1% Team"
                  className="absolute h-full left-[-75%] max-w-none top-0 w-[250%] object-cover"
                />
              </div>
              <div className="absolute bg-gradient-to-b from-[24%] from-[rgba(0,38,77,0)] inset-0 opacity-60 to-[#00264d]" />
              <div className="relative z-10 pb-2">
                <h3 className="text-xl font-bold text-white leading-tight">Top 1% Team</h3>
              </div>
            </motion.div>

            {/* Card 6 - 13+ Years of Innovation */}
            <motion.div
              className="bg-[#e5e7eb] w-full h-[280px] rounded-3xl overflow-hidden p-6 flex flex-col justify-end relative"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1763298464558-1b63197f2a9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbm5vdmF0aW9uJTIwdGVjaG5vbG9neSUyMGZ1dHVyZSUyMGdyb3d0aHxlbnwxfHx8fDE3NzM4MzcwOTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="13+ Years of Innovation"
                  className="absolute h-full left-[-75%] max-w-none top-0 w-[250%] object-cover"
                />
              </div>
              <div className="absolute bg-gradient-to-b from-[24%] from-[rgba(0,38,77,0)] inset-0 opacity-60 to-[#00264d]" />
              <div className="relative z-10 pb-2">
                <h3 className="text-xl font-bold text-white leading-tight">13+ Years of Innovation</h3>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}