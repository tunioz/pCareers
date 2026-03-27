import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Target, Eye, CheckCircle } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function MissionVisionGoals() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 auto-rows-[302px]">
          {/* Box 1 - Title */}
          <motion.div
            className="bg-[#05183f] md:col-span-2 rounded-2xl p-8 flex flex-col justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white">Who we are?</h2>
          </motion.div>

          {/* Box 2 - Image */}
          <motion.div
            className="bg-gray-200 md:col-span-1 rounded-2xl overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwbWVldGluZyUyMGNvbGxhYm9yYXRpb258ZW58MXx8fHwxNzczNzQ4NTU3fDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Team collaboration"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Box 3 - Our Mission (Featured large box) */}
          <motion.div
            className="bg-[#05183f] md:col-span-3 rounded-2xl p-8 relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {/* Background decoration */}
            <div className="absolute bottom-0 right-0 opacity-10">
              <svg className="w-64 h-52" viewBox="0 0 250 200" fill="none">
                {/* Target/Mission icon with strokes only */}
                <circle cx="125" cy="100" r="70" stroke="white" strokeWidth="3" fill="none" />
                <circle cx="125" cy="100" r="50" stroke="white" strokeWidth="3" fill="none" />
                <circle cx="125" cy="100" r="30" stroke="white" strokeWidth="3" fill="none" />
                <circle cx="125" cy="100" r="10" stroke="white" strokeWidth="3" fill="none" />
                {/* Crosshair lines */}
                <line x1="125" y1="20" x2="125" y2="180" stroke="white" strokeWidth="2" />
                <line x1="45" y1="100" x2="205" y2="100" stroke="white" strokeWidth="2" />
              </svg>
            </div>
            <div className="relative z-10 flex flex-col gap-4">
              <h3 className="text-2xl font-bold text-white">Our Mission</h3>
              <p className="text-white/80 text-sm leading-relaxed">
                To democratize data security and privacy by providing world-class cloud storage that
                protects individual rights while delivering exceptional performance and accessibility
                to everyone, everywhere.
              </p>
            </div>
          </motion.div>

          {/* Box 4 - Image 2 */}
          <motion.div
            className="bg-gray-200 md:col-span-2 rounded-2xl overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMG9mZmljZXxlbnwxfHx8fDE3NzM4MzA4NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Team working together"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Box 5 - Our Vision */}
          <motion.div
            className="bg-[#05183f] md:col-span-2 rounded-2xl p-8"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="flex flex-col justify-between h-full">
              <div className="flex flex-col gap-4">
                <h3 className="text-2xl font-bold text-white">Our Vision</h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  To become the global standard for secure cloud storage, championing digital privacy
                  rights and setting the benchmark for what users should expect from their cloud
                  providers worldwide.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Box 6 - Our Goals */}
          <motion.div
            className="bg-[#05183f] md:col-span-2 rounded-2xl p-8"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <div className="flex flex-col justify-between h-full">
              <div className="flex flex-col gap-4">
                <h3 className="text-2xl font-bold text-white">Our Goals</h3>
                <ul className="space-y-2">
                  <motion.li
                    className="flex items-start gap-2 text-white/80 text-xs"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.6, duration: 0.4 }}
                  >
                    <CheckCircle size={16} className="text-[#E6FF00] mt-0.5 flex-shrink-0" />
                    <span>Expand zero-knowledge encryption to 50M+ users by 2027</span>
                  </motion.li>
                  <motion.li
                    className="flex items-start gap-2 text-white/80 text-xs"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.7, duration: 0.4 }}
                  >
                    <CheckCircle size={16} className="text-[#E6FF00] mt-0.5 flex-shrink-0" />
                    <span>Achieve carbon-neutral data centers across all locations</span>
                  </motion.li>
                  <motion.li
                    className="flex items-start gap-2 text-white/80 text-xs"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.8, duration: 0.4 }}
                  >
                    <CheckCircle size={16} className="text-[#E6FF00] mt-0.5 flex-shrink-0" />
                    <span>Lead industry standards for privacy-first cloud storage</span>
                  </motion.li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}