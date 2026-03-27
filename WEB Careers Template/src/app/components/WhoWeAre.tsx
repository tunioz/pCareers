import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Link } from 'react-router';

export function WhoWeAre() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 auto-rows-[302px]">
          {/* Box 1 - Who we are title */}
          <motion.div
            className="bg-[#05183f] md:col-span-2 rounded-2xl p-8 flex flex-col justify-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white">
              Who we are?
            </h2>
            <Link 
              to="/culture" 
              className="inline-flex items-center gap-2 text-[#17bed0] hover:text-[#14a8b8] transition-colors text-lg font-medium"
            >
              Read more 
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </Link>
          </motion.div>

          {/* Box 2 - Image 1 */}
          <motion.div
            className="bg-gray-200 md:col-span-1 rounded-2xl overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1646153114001-495dfb56506d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB0ZWNoJTIwb2ZmaWNlJTIwd29ya3NwYWNlfGVufDF8fHx8MTc3Mzc0ODU1N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Modern tech office workspace"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Box 3 - Featured large box (Our Mission) */}
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
              <h3 className="text-2xl font-bold text-white">Our mission</h3>
              <p className="text-white/80 text-lg leading-relaxed">
                Empower individuals and businesses with secure, private cloud storage they can trust. We put you in control of your data with cutting-edge encryption technology.
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
              src="https://images.unsplash.com/photo-1758873269317-51888e824b28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwdGVhbSUyMGNvbGxhYm9yYXRpb24lMjBicmFpbnN0b3JtaW5nfGVufDF8fHx8MTc3MzgzMDg1Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Diverse team collaboration"
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
                <h3 className="text-2xl font-bold text-white">Our vision</h3>
                <p className="text-white/80 text-lg leading-relaxed">
                  Become the global standard for private cloud storage, championing digital rights worldwide. Privacy is a fundamental right, not a luxury.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Box 6 - Our Standard */}
          <motion.div
            className="bg-[#05183f] md:col-span-2 rounded-2xl p-8"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <div className="flex flex-col justify-between h-full">
              <div className="flex flex-col gap-4">
                <h3 className="text-2xl font-bold text-white">Our goals</h3>
                <p className="text-white/80 text-lg leading-relaxed">
                  Zero-knowledge encryption powered by Swiss privacy heritage. 99.92% uptime with infrastructure built on Swiss precision. Only you can access your files.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}