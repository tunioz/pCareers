import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Link } from 'react-router';

export function HireCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-20 bg-[#05183f]">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-8">
            Ready to Take The Builder Test?
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/jobs">
              <motion.button
                className="bg-[#E6FF00] text-[#05183f] px-8 h-[48px] rounded-full font-bold text-base flex items-center gap-2 hover:bg-[#d4ed00] transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Apply Now
              </motion.button>
            </Link>
            
            <motion.a
              href="https://www.pcloud.com"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white px-8 h-[48px] rounded-full font-bold text-base flex items-center gap-2 hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn more about pCloud
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}