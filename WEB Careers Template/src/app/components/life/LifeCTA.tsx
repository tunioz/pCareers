import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Link } from 'react-router';

export function LifeCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="bg-[#05183f] py-32">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-8">
            Ready to experience it yourself?
          </h2>
          <Link to="/jobs">
            <motion.button
              className="bg-[#0055d5] text-white px-10 h-[48px] rounded-full text-base font-semibold inline-flex items-center gap-3 hover:bg-[#0044aa] transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              See Open Roles
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}